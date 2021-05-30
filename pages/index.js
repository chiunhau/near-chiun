import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';

import useNear from '../hooks/useNear';
import useChiun from '../hooks/useChiun';

import SignInTemplate from '../components/SignIn';
import CreateDepositTemplate from '../components/CreateDeposit';
import TransferTemplate from '../components/Transfer';

export default function Home() {
  const [css] = useStyletron();
  const { wallet, isSignedIn } = useNear();
  const { hasDeposit } = useChiun();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(async () => {
    if (isSignedIn) {
      console.log(await hasDeposit(wallet.getAccountId()));
      if (await hasDeposit(wallet.getAccountId())) {
        setCurrentStep(2);
        return;
      }
      setCurrentStep(1);
    }
  }, [wallet, isSignedIn]);

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      })}
    >
      <ProgressSteps current={currentStep}>
        <NumberedStep title="Sign in with NEAR">
          <SignInTemplate />
        </NumberedStep>
        <NumberedStep title="Open deposit in CHIUN">
          <CreateDepositTemplate onSuccess={() => setCurrentStep(2)} />
        </NumberedStep>
        <NumberedStep title="Start transfer CHIUN tokens">
          <TransferTemplate />
        </NumberedStep>
      </ProgressSteps>
    </div>
  );
}
