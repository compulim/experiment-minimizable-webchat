import { createContext } from 'react';
import { createDirectLine } from 'botframework-webchat';

type FloatingWebChatContextType = {
  closeCallback: () => void;
  directLineState: readonly [ReturnType<typeof createDirectLine> | undefined];
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

const defaultProperties: Record<keyof FloatingWebChatContextType, typeof PropertyThrowOnGet> = {
  closeCallback: PropertyThrowOnGet,
  directLineState: PropertyThrowOnGet,
  hasNotificationState: PropertyThrowOnGet,
  notifyCallback: PropertyThrowOnGet,
  openCallback: PropertyThrowOnGet,
  openedState: PropertyThrowOnGet
};

const FloatingWebChatContext = createContext<FloatingWebChatContextType>(Object.create({}, defaultProperties));

export default FloatingWebChatContext;
export type { FloatingWebChatContextType };
