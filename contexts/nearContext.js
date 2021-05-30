import React, { createContext, useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';

const initialState = {
  near: {},
  wallet: {},
  account: {},
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
  getChiunBalance: () => {},
};

const NearContext = createContext(initialState);

export const NearProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [account, setAccount] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(async () => {
    const { connect, keyStores, WalletConnection } = nearAPI;

    const config = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    };

    const near = await connect(config);
    const wallet = new WalletConnection(near);

    setData({ near, wallet });
    initAccount(wallet);
  }, []);

  const checkIsSignedIn = (wallet) => {
    if (typeof wallet.isSignedIn === 'function') {
      return wallet.isSignedIn();
    }

    return false;
  };

  const getAccount = (wallet) => {
    if (typeof wallet.account === 'function') {
      return wallet.account();
    }

    return {};
  };

  const signIn = async () => {
    const { wallet } = data;

    if (typeof wallet.requestSignIn === 'function') {
      wallet.requestSignIn('nnnft.chiunhau.testnet');
    }

    return false;
  };

  const signOut = () => {
    const { wallet } = data;
    wallet.signOut();
    setIsSignedIn(false);
  };

  const initAccount = (wallet) => {
    setIsSignedIn(checkIsSignedIn(wallet));
    setAccount(getAccount(wallet));
  };

  return (
    <NearContext.Provider
      value={{ ...data, account, signIn, signOut, isSignedIn }}
    >
      {children}
    </NearContext.Provider>
  );
};

export default NearContext;
