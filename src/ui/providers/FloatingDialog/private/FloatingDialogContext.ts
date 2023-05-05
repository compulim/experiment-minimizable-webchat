import { createContext } from 'react';

type FloatingDialogContextType = {
  closeCallback: () => void;
  hasNotificationState: readonly [boolean];
  notifyCallback: () => void;
  openCallback: () => void;
  openedState: readonly [boolean];
};

const PropertyThrowOnGet = {
  get: () => {
    throw new Error('This hook cannot be used outside of <FloatingWebChatProvider>.');
  }
};

const defaultProperties: Record<keyof FloatingDialogContextType, typeof PropertyThrowOnGet> = {
  closeCallback: PropertyThrowOnGet,
  hasNotificationState: PropertyThrowOnGet,
  notifyCallback: PropertyThrowOnGet,
  openCallback: PropertyThrowOnGet,
  openedState: PropertyThrowOnGet
};

const FloatingDialogContext = createContext<FloatingDialogContextType>(Object.create({}, defaultProperties));

export default FloatingDialogContext;
export type { FloatingDialogContextType };
