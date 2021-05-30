import React from 'react';
import { Button } from 'baseui/button';

import useNear from '../hooks/useNear';
import useChiun from '../hooks/useChiun';

const CreateDeposit = ({ onSuccess }) => {
  const { createStorageDeposit } = useChiun();

  const handleClick = () => {
    createStorageDeposit().then((r) => {
      console.log(r);
      onSuccess();
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Open deposit</Button>
    </>
  );
};

export default CreateDeposit;
