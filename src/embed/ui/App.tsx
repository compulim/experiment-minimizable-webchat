import { Components, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo } from 'react';
import { messagePortRPC } from 'message-port-rpc';
import { wrapWith } from 'react-wrap-with';

import Spinner from './Spinner';
import useDirectLine from './providers/WebChatService/useDirectLine';
import usePrevious from '../../common/hooks/internal/usePrevious';
import WebChatServiceProvider from './providers/WebChatService/WebChatServiceProvider';

import type { FocusCallback } from '../../common/types/FocusCallback';
import type { NotifyCallback } from '../../common/types/NotifyCallback';

const { BasicWebChat, Composer } = Components;
const { useActivities, useFocus } = hooks;

const Initialized = memo(
  wrapWith(Composer, undefined, ['directLine'])(
    memo(({ focusPort, onNotify }: { focusPort: MessagePort; onNotify: NotifyCallback }) => {
      const [activities] = useActivities();
      const focus = useFocus();

      const prevActivities = usePrevious(activities);

      useMemo(() => activities === prevActivities || onNotify(), [activities, onNotify, prevActivities]);

      useEffect(
        () => messagePortRPC<FocusCallback>(focusPort, () => Promise.resolve(focus('sendBox'))).detach,
        [focus, focusPort]
      );

      useEffect(() => focus('sendBox'), [focus]);

      return <BasicWebChat />;
    })
  )
);

const Uninitialized = memo(() => {
  return <Spinner />;
});

const WebChatLoader = memo(({ focusPort, onNotify }: { focusPort: MessagePort; onNotify: NotifyCallback }) => {
  const [directLine] = useDirectLine();

  return directLine ? (
    <Initialized directLine={directLine} focusPort={focusPort} onNotify={onNotify} />
  ) : (
    <Uninitialized />
  );
});

export default memo(wrapWith(WebChatServiceProvider)(WebChatLoader));
