export type IFrameSetupMessage = {
  closePopoverPort: MessagePort;
  focusSendBoxPort: MessagePort;

  // TODO: More things to send.
  //       - CSS stylesheet for override
  //       - Language
};
