import { useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';
import useNear from './useNear';

const useChiun = () => {
  const { wallet } = useNear();
  const { utils, Contract } = nearAPI;

  const connect = () => {
    return new Contract(wallet.account(), 'chiunhau.testnet', {
      viewMethods: ['ft_balance_of', 'storage_balance_of'],
      changeMethods: ['ft_transfer', 'storage_deposit'],
      sender: wallet.account(),
    });
  };

  const getBalanceOf = async (accountId) => {
    return await connect().ft_balance_of({
      account_id: accountId,
    });
  };

  const getStorageBalanceOf = async (accountId) => {
    return await connect().storage_balance_of({
      account_id: accountId,
    });
  };

  const transfer = async (receiverId, amount) => {
    return await connect().ft_transfer(
      {
        receiver_id: receiverId,
        amount,
      },
      30000000000000,
      1
    );
  };

  const hasDeposit = async (accoundId) => {
    const balance = await getStorageBalanceOf(accoundId);

    if (balance === null) {
      return false;
    }
    return true;
  };
  const createStorageDeposit = async (accoundId) => {
    return await connect().storage_deposit(
      {},
      30000000000000,
      utils.format.parseNearAmount('0.00125')
    );
  };

  return {
    getBalanceOf,
    getStorageBalanceOf,
    createStorageDeposit,
    transfer,
    hasDeposit,
  };
};

export default useChiun;
