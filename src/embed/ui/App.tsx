import { Components, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo } from 'react';
import { messagePortRPC } from 'message-port-rpc';
import { wrapWith } from 'react-wrap-with';

import Spinner from './Spinner';
import useDirectLine from './providers/WebChatService/useDirectLine';
import WebChatServiceProvider from './providers/WebChatService/WebChatServiceProvider';

import type { ClosePopoverCallback } from '../../common/types/ClosePopoverCallback';
import type { FocusSendBoxCallback } from '../../common/types/FocusSendBoxCallback';

const { BasicWebChat, Composer } = Components;
const { useActivities, useFocus } = hooks;

const Initialized = memo(
  wrapWith(Composer, undefined, ['directLine'])(
    memo(
      ({
        focusSendBoxPort,
        onClosePopover
      }: {
        focusSendBoxPort: MessagePort;
        onClosePopover: ClosePopoverCallback;
      }) => {
        const [activities] = useActivities();
        const focus = useFocus();
        const lastActivity = activities[activities.length - 1];

        useMemo(
          () => lastActivity && lastActivity.type === 'message' && lastActivity.text === 'close' && onClosePopover(),
          [lastActivity, onClosePopover]
        );

        useEffect(
          () => messagePortRPC<FocusSendBoxCallback>(focusSendBoxPort, () => Promise.resolve(focus('sendBox'))).detach,
          [focus, focusSendBoxPort]
        );

        useEffect(() => focus('sendBox'), [focus]);

        return <BasicWebChat />;
      }
    )
  )
);

const Uninitialized = memo(() => {
  return <Spinner />;
});

const WebChatLoader = memo(
  ({ focusSendBoxPort, onClosePopover }: { focusSendBoxPort: MessagePort; onClosePopover: ClosePopoverCallback }) => {
    const [directLine] = useDirectLine();

    return directLine ? (
      <Initialized directLine={directLine} focusSendBoxPort={focusSendBoxPort} onClosePopover={onClosePopover} />
    ) : (
      <Uninitialized />
    );
  }
);

export default memo(wrapWith(WebChatServiceProvider)(WebChatLoader));
