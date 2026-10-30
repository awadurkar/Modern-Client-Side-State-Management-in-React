import { createContext, useContext, type ReactNode } from 'react';
import { useActorRef } from '@xstate/react';
import type { ActorRefFrom } from 'xstate';
import { checkoutMachine } from './checkoutMachine';

type CheckoutActor = ActorRefFrom<typeof checkoutMachine>;

const CheckoutActorContext = createContext<CheckoutActor | null>(null);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const actor = useActorRef(checkoutMachine);

  return (
    <CheckoutActorContext.Provider value={actor}>
      {children}
    </CheckoutActorContext.Provider>
  );
}

export function useCheckoutActor(): CheckoutActor {
  const actor = useContext(CheckoutActorContext);
  if (actor === null) {
    throw new Error('useCheckoutActor must be used within a CheckoutProvider');
  }
  return actor;
}
