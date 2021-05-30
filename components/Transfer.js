import React, { useEffect, useMemo, useState } from 'react';
import { styled, useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

import useNear from '../hooks/useNear';
import useChiun from '../hooks/useChiun';

const Transfer = () => {
  const { wallet, isSignedIn } = useNear();
  const { getBalanceOf, transfer } = useChiun();
  const [css] = useStyletron();

  const [value, setValue] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [balance, setBalance] = useState(0);

  const updateBalance = async () => {
    await getBalanceOf(wallet.getAccountId()).then((r) => setBalance(r));
  };

  const handleSubmit = async () => {
    console.log(receiver, value);
    await transfer(receiver, value).then((r) => console.log(r));
  };

  useEffect(() => {
    if (isSignedIn) {
      updateBalance();
    }
  }, [wallet, isSignedIn]);

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <FormControl label="Amount" caption={`Balance: ${balance}`}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Amount"
          clearOnEscape
        />
      </FormControl>
      <FormControl label="To">
        <Input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver"
          clearOnEscape
        />
      </FormControl>
      <Button onClick={handleSubmit}>SEND</Button>
    </div>
  );
};

export default Transfer;
