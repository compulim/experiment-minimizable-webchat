import { Components, hooks } from 'botframework-webchat';
import { memo, useEffect, useMemo } from 'react';
import { wrapWith } from 'react-wrap-with';

import Spinner from './Spinner';
import useDirectLine from './providers/WebChatService/useDirectLine';
import usePrevious from '../../common/hooks/internal/usePrevious';
import WebChatServiceProvider from './providers/WebChatService/WebChatServiceProvider';

import type { NotifyCallback } from '../../common/types/NotifyCallback';

const { BasicWebChat, Composer } = Components;
const { useActivities } = hooks;

const Initialized = wrapWith(Composer, undefined, ['directLine'])(
  memo(({ onNotify }: { onNotify: NotifyCallback }) => {
    const [activities] = useActivities();

    const prevActivities = usePrevious(activities);

    useMemo(() => activities === prevActivities || onNotify(), [activities, onNotify, prevActivities]);

    return <BasicWebChat />;
  })
);

const Uninitialized = memo(() => {
  return <Spinner />;
});

const WebChatLoader = memo(({ onNotify }: { onNotify: NotifyCallback }) => {
  const [directLine] = useDirectLine();

  return directLine ? <Initialized directLine={directLine} onNotify={onNotify} /> : <Uninitialized />;
});

export default memo(wrapWith(WebChatServiceProvider)(WebChatLoader));
