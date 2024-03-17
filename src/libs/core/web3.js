import { Alchemy, Network, Utils } from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

export const getBlockNumber = async () => await alchemy.core.getBlockNumber();

/**
 * @param {string | number} blockId
 */
export const getBlockDetail = async blockId => await alchemy.core.getBlock(blockId);

/**
 * @param {string} address
 */
export const getBalance = async address => await alchemy.core.getBalance(address);

/**
 * @param {string} txId
 */
export const getTransactionDetail = async txId => await alchemy.core.getTransaction(txId);

/**
 * @param {string} txId
 */
export const getTransactionReceipt = async txId => await alchemy.core.getTransactionReceipt(txId);

/**
 * @param {string} wei
 */
export const formatEther = wei => Utils.formatEther(wei);
