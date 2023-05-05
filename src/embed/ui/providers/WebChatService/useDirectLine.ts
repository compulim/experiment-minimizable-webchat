import useWebChatServiceContext from './private/useWebChatServiceContext';

import type { createDirectLine } from 'botframework-webchat';

export default function useDirectLine(): readonly [] | readonly [ReturnType<typeof createDirectLine>] {
  return useWebChatServiceContext().directLineState;
}
