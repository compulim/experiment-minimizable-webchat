import { createContext } from 'react';

type FloatingPopoverContextType = {
  closeCallback: () => void;
  hasNotificationState: readonly [boolean];
  initializedState: readonly [boolean];
  notifyCallback: () => void;
  openCallback: () => void;
  openedState: readonly [boolean];
};

const PropertyThrowOnGet = {
  get: () => {
    throw new Error('This hook cannot be used outside of <FloatingWebChatProvider>.');
  }
};

const defaultProperties: Record<keyof FloatingPopoverContextType, typeof PropertyThrowOnGet> = {
  closeCallback: PropertyThrowOnGet,
  hasNotificationState: PropertyThrowOnGet,
  initializedState: PropertyThrowOnGet,
  notifyCallback: PropertyThrowOnGet,
  openCallback: PropertyThrowOnGet,
  openedState: PropertyThrowOnGet
};

const FloatingPopoverContext = createContext<FloatingPopoverContextType>(Object.create({}, defaultProperties));

export default FloatingPopoverContext;
export type { FloatingPopoverContextType };
