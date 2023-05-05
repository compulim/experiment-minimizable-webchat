import { Components, hooks } from 'botframework-webchat';
import { memo, useMemo } from 'react';
import { wrapWith } from 'react-wrap-with';

import Spinner from './Spinner';
import useDirectLine from './providers/WebChatService/useDirectLine';
import usePrevious from '../../common/hooks/internal/usePrevious';
import WebChatServiceProvider from './providers/WebChatService/WebChatServiceProvider';

const { BasicWebChat, Composer } = Components;
const { useActivities } = hooks;

const Initialized = wrapWith(Composer, undefined, ['directLine'])(
  memo(() => {
    const [activities] = useActivities();
    // TODO: Implement this and postMessage to outside.
    // const notify = useNotifyCallback();
    const notify = () => {};

    const prevActivities = usePrevious(activities);

    useMemo(() => activities === prevActivities || notify(), [activities, notify, prevActivities]);

    return <BasicWebChat />;
  })
);

const Uninitialized = memo(() => {
  return <Spinner />;
});

const WebChatLoader = memo(() => {
  const [directLine] = useDirectLine();

  return directLine ? <Initialized directLine={directLine} /> : <Uninitialized />;
});

export default memo(wrapWith(WebChatServiceProvider)(WebChatLoader));
