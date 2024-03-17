import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetBlockDetailQuery } from '../../libs/queries';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';

const BlockDetailPage = () => {
  const params = useParams();
  const blockId = params.id;

  const { data, isLoading } = useGetBlockDetailQuery(blockId);

  return (
    <Card>
      <h2 className="card-title">Block Detail</h2>

      <div>
        <Link to="/" className="btn btn-ghost btn-outline">
          Back
        </Link>
      </div>

      {isLoading ? (
        <Skeleton className="h-64" />
      ) : (
        Object.entries(data ?? {})
          .map(([label, value]) => {
            return {
              label,
              value,
            };
          })
          .filter(entry => typeof entry.value === 'string' || typeof entry.value === 'number')
          .map(entry => {
            const isParentHash = entry.label === 'parentHash';

            return (
              <div key={entry.label} className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  <h3 className="font-semibold">
                    {entry.label}
                    {isParentHash ? ' ↗️' : null}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-9">
                  {isLoading ? (
                    <Skeleton className="h-8" />
                  ) : isParentHash ? (
                    <Link to={`/blocks/${entry.value}`}>
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

export default BlockDetailPage;
