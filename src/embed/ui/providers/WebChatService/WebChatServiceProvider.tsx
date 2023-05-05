import { createDirectLine } from 'botframework-webchat';
import { memo, useEffect, useMemo, useState } from 'react';

import WebChatServiceContext from './private/WebChatServiceContext';

import type { ReactNode } from 'react';
import type { WebChatServiceContextType } from './private/WebChatServiceContext';

type DirectLine = ReturnType<typeof createDirectLine>;

type Props = { children?: ReactNode };

const FloatingWebChatProvider = memo(({ children }: Props) => {
  const [directLine, setDirectLine] = useState<ReturnType<typeof createDirectLine>>();

  useEffect(() => {
    const abortController = new AbortController();

    (async function ({ signal }) {
      // const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', {
      const res = await fetch('https://webchat-mockbot3.azurewebsites.net/api/token/directline', {
        method: 'POST',
        signal
      });

      if (res.ok) {
        const body = await res.json();

        // TODO: Propagates error.
        signal.aborted || setDirectLine(createDirectLine({ token: body.token }));
      }
    })(abortController);

    return () => abortController.abort();
  }, []);

  const directLineState = useMemo<readonly [] | readonly [DirectLine]>(
    () => Object.freeze(directLine ? [directLine] : []),
    [directLine]
  );

  const context = useMemo<WebChatServiceContextType>(() => ({ directLineState }), [directLineState]);

  return <WebChatServiceContext.Provider value={context}>{children}</WebChatServiceContext.Provider>;
});

export default FloatingWebChatProvider;
