import React, { useState } from 'react';
import Card from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import { useGetAddressBalance } from '../../../libs/queries';
import { formatEther } from '../../../libs/core/web3';

const WalletInspector = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const [address, setAddress] = useState(searchParams.get('addr') ?? 'vitalik.eth');

  const { data, isLoading } = useGetAddressBalance(address);

  return (
    <Card>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-12 md:col-span-3">
          <label className="font-semibold">Address</label>
        </div>
        <div className="col-span-12 md:col-span-9">
          <input
            className="input input-bordered w-full"
            placeholder="Enter an address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>

        {address && (
          <>
            <div className="col-span-12 md:col-span-3">
              <label className="font-semibold">Balance</label>
            </div>
            <div className="col-span-12 md:col-span-9">
              {isLoading ? <Skeleton className="h-8" /> : `${formatEther(data)} ETH`}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default WalletInspector;
