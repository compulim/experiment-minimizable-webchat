// import { memo } from 'react';
// import { wrapWith } from 'react-wrap-with';

// import FloatingDialogProvider from './providers/FloatingDialog/FloatingDialogProvider';
// import FloatingLayer from './FloatingLayer';
// import useCloseCallback from './providers/FloatingDialog/useCloseCallback';
// import useInitialized from './providers/FloatingDialog/useInitialized';
// import useOpenCallback from './providers/FloatingDialog/useOpenCallback';
// import useOpened from './providers/FloatingDialog/useOpened';
// import WebChatIFrame from './WebChatIFrame';

// const FloatingWebChat = memo(() => {
//   const [initialized] = useInitialized();
//   const [opened] = useOpened();
//   const handleClose = useCloseCallback();
//   const handleOpen = useOpenCallback();

//   return (
//     <FloatingLayer open={opened} hasNotification={false} onClose={handleClose} onOpen={handleOpen}>
//       {initialized && <WebChatIFrame />}
//     </FloatingLayer>
//   );
// });

// export default memo(wrapWith(FloatingDialogProvider)(FloatingWebChat));
