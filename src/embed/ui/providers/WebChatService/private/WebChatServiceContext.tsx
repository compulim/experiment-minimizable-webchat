import { createContext } from 'react';
import { createDirectLine } from 'botframework-webchat';

type WebChatServiceContextType = {
  directLineState: readonly [] | readonly [ReturnType<typeof createDirectLine>];
};

const PropertyThrowOnGet = {
  get: () => {
    throw new Error('This hook cannot be used outside of <WebChatServiceProvider>.');
  }
};

const defaultProperties: Record<keyof WebChatServiceContextType, typeof PropertyThrowOnGet> = {
  directLineState: PropertyThrowOnGet
};

export default createContext<WebChatServiceContextType>(Object.create({}, defaultProperties));
export type { WebChatServiceContextType };
