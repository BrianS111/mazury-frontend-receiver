import * as React from 'react';

import { WagmiProvider } from './wagmi';
import { ReduxProvider } from './redux';
import { SwrProvider } from './swr';
import { OnboardingProvider } from './onboarding/OnboardingProvider'; //is unncessary and ideally should be moved to the page where used

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ReduxProvider>
      <SwrProvider>
        <WagmiProvider>
          <OnboardingProvider>{children}</OnboardingProvider>
        </WagmiProvider>
      </SwrProvider>
    </ReduxProvider>
  );
};
