import React from 'react';
import { Button } from 'baseui/button';

import useNear from '../hooks/useNear';

const SignIn = () => {
  const { signIn } = useNear();

  return (
    <>
      <Button onClick={signIn}>Sign In</Button>
    </>
  );
};

export default SignIn;
