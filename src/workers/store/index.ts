import { createStore } from 'botframework-webchat-core';

let store: ReturnType<typeof createStore>;

addEventListener('connect' as 'message', ({ ports: [port] }) => {
  port.addEventListener('message', ({ ports: [dispatchPort, initialPort, updatePort] }) => {
    store = store || createStore();

    initialPort.postMessage(store.getState());

    dispatchPort.addEventListener('message', ({ data }) => store.dispatch(data));
    dispatchPort.start();

    store.subscribe(() => updatePort.postMessage(store.getState()));
  });

  port.start();
});
