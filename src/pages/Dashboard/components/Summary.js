import React from 'react';
import Card from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import { formatThousandSeparator } from '../../../libs/core/format';
import { useGetBlockDetailQuery, useGetBlockNumberQuery } from '../../../libs/queries';
import { Link } from 'react-router-dom';

const Summary = () => {
  const getBlockNumberQuery = useGetBlockNumberQuery();

  const getBlockDetailQuery = useGetBlockDetailQuery(getBlockNumberQuery.data);

  return (
    <Card className="flex flex-col gap-4">
      {[
        {
          label: 'Total Blocks',
          value: formatThousandSeparator(getBlockNumberQuery.data ?? 0),
          isLoading: getBlockNumberQuery.isLoading,
        },
        {
          label: 'Latest Block',
          value: getBlockDetailQuery.data?.hash,
          isLoading: getBlockDetailQuery.isLoading,
          url: `/blocks/${getBlockDetailQuery.data?.hash}`,
        },
        {
          label: 'Latest Transaction',
          value: getBlockDetailQuery.data?.transactions[0],
          isLoading: getBlockDetailQuery.isLoading,
          url: `/transactions/${getBlockDetailQuery.data?.transactions[0]}`,
        },
      ].map(entry => (
        <div key={entry.label} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-12 md:col-span-3">
            <h3 className="font-semibold">{entry.label}</h3>
          </div>
          <div className="col-span-12 md:col-span-9">
            {entry.isLoading ? (
              <Skeleton className="h-8" />
            ) : (
              <>
                <Link to={entry.url ?? '#'}>
                  <p className="truncate" title={entry.value}>
                    {entry.value}
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Summary;
