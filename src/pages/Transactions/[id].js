import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';
import { useGetTransactionDetailQuery, useGetTransactionReceiptQuery } from '../../libs/queries';

const TransactionDetailPage = () => {
  const params = useParams();
  const txId = params.id;

  const getTransactionDetailQuery = useGetTransactionDetailQuery(txId);

  const getTransactionReceiptQuery = useGetTransactionReceiptQuery(txId);

  return (
    <Card>
      <div>
        <Link to="/" className="btn btn-ghost btn-outline">
          Back
        </Link>
      </div>

      {getTransactionDetailQuery.isLoading ? (
        <Skeleton className="h-64" />
      ) : (
        [
          'Transaction Detail',
          ...Object.entries(getTransactionDetailQuery.data ?? {}),
          'Transaction Receipt',
          ...Object.entries(getTransactionReceiptQuery.data ?? {}),
        ]
          .map(entry => {
            if (typeof entry === 'string') {
              return entry;
            }

            const [label, value] = entry;

            return {
              label,
              value,
            };
          })
          .filter(
            entry => typeof entry === 'string' || typeof entry.value === 'string' || typeof entry.value === 'number'
          )
          .map((entry, idx) => {
            const isBlockHash = entry.label === 'blockHash';
            const isAddr = ['from', 'to'].includes(entry.label);
            const hasHref = isBlockHash || isAddr;

            return typeof entry === 'string' ? (
              <Fragment key={`${entry.label}${idx}`}>
                <h2 className="font-semibold text-xl">{entry}</h2>
                <div className="h-[2px] bg-base-300" />
              </Fragment>
            ) : (
              <div key={`${entry.label}${idx}`} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <h3 className="font-semibold">
                    {entry.label}
                    {hasHref ? ' ↗️' : null}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-9">
                  {getTransactionDetailQuery.isLoading ? (
                    <Skeleton className="h-8" />
                  ) : isBlockHash ? (
                    <Link to={`/blocks/${entry.value}`}>
                      <p className="truncate" title={entry.value}>
                        {entry.value}
                      </p>
                    </Link>
                  ) : isAddr ? (
                    <Link to={`/?addr=${entry.value}`}>
                      <p className="truncate" title={entry.value}>
                        {entry.value}
                      </p>
                    </Link>
                  ) : (
                    <p className="truncate" title={entry.value}>
                      {entry.label === 'timestamp' ? new Date(entry.value).toString() : entry.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })
      )}
    </Card>
  );
};

export default TransactionDetailPage;
