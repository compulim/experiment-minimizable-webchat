import './App.css';

import { Components, hooks } from 'botframework-webchat';
import { memo, useCallback, useEffect } from 'react';
import { messagePortRPC } from 'message-port-rpc';
import { wrapWith } from 'react-wrap-with';

import Spinner from './Spinner';
import useDirectLine from './providers/WebChatService/useDirectLine';
import WebChatServiceProvider from './providers/WebChatService/WebChatServiceProvider';

import type { ClosePopoverCallback } from '../../common/types/ClosePopoverCallback';
import type { FocusSendBoxCallback } from '../../common/types/FocusSendBoxCallback';
import type { KeyboardEventHandler } from 'react';

const { BasicWebChat, Composer } = Components;
const { useFocus } = hooks;

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
        const focus = useFocus();

        const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
          ({ key }) =>
            // TODO: Web Chat should have a way to emit event for Escape key in send box.
            key === 'Escape' &&
            document.activeElement?.classList.contains('webchat__send-box-text-box__input') &&
            onClosePopover(),
          [onClosePopover]
        );

        useEffect(
          () => messagePortRPC<FocusSendBoxCallback>(focusSendBoxPort, () => Promise.resolve(focus('sendBox'))).detach,
          [focus, focusSendBoxPort]
        );

        useEffect(() => focus('sendBox'), [focus]);

        return (
          <div className="webchat-float__embed-container" onKeyDown={handleKeyDown}>
            <BasicWebChat />
          </div>
        );
      }
    )
  )
);

const WebChatLoader = memo(
  ({ focusSendBoxPort, onClosePopover }: { focusSendBoxPort: MessagePort; onClosePopover: ClosePopoverCallback }) => {
    const [directLine] = useDirectLine();

    return directLine ? (
      <Initialized directLine={directLine} focusSendBoxPort={focusSendBoxPort} onClosePopover={onClosePopover} />
    ) : (
      <Spinner />
    );
  }
);

export default memo(wrapWith(WebChatServiceProvider)(WebChatLoader));
