import { useQuery } from '@tanstack/react-query';
import { getBalance, getBlockDetail, getBlockNumber, getTransactionDetail, getTransactionReceipt } from './core/web3';

export const useGetBlockNumberQuery = () => {
  return useQuery({
    queryKey: ['getBlockNumber'],
    queryFn: getBlockNumber,
  });
};

/**
 * @param {string | number} blockId
 */
export const useGetBlockDetailQuery = blockId => {
  return useQuery({
    queryKey: ['useGetBlockDetail', blockId],
    queryFn: async () => await getBlockDetail(blockId),
    enabled: !!blockId,
  });
};

/**
 * @param {string} address
 */
export const useGetAddressBalance = address => {
  return useQuery({
    queryKey: ['useGetAddressBalance', address],
    queryFn: async () => await getBalance(address),
    enabled: !!address,
  });
};

/**
 * @param {string} txId
 */
export const useGetTransactionDetailQuery = txId => {
  return useQuery({
    queryKey: ['useGetTransactionDetailQuery', txId],
    queryFn: async () => await getTransactionDetail(txId),
    enabled: !!txId,
  });
};

/**
 * @param {string} txId
 */
export const useGetTransactionReceiptQuery = txId => {
  return useQuery({
    queryKey: ['useGetTransactionReceiptQuery', txId],
    queryFn: async () => await getTransactionReceipt(txId),
    enabled: !!txId,
  });
};
