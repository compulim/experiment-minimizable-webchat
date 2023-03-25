import useFloatingWebChatContext from './private/useFloatingWebChatContext';

import type { createDirectLine } from 'botframework-webchat';

export default function useDirectLine(): readonly [ReturnType<typeof createDirectLine> | undefined] {
  return useFloatingWebChatContext().directLineState;
}
