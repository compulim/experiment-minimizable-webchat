const worker = new SharedWorker('./static/js/store.js');

type SubscribeCallback = () => void;

export default async function createStore() {
  return new Promise(resolve => {
    let lastState: any;
    const subscribeCallbacks: SubscribeCallback[] = [];

    const { port1: dispatchPort1, port2: dispatchPort2 } = new MessageChannel();
    const { port1: initialPort1, port2: initialPort2 } = new MessageChannel();
    const { port1: subscribePort1, port2: subscribePort2 } = new MessageChannel();

    const store = {
      dispatch: (action: any): void => {
        dispatchPort1.postMessage(action);
      },
      getState: () => lastState,
      subscribe: (callback: () => void) => {
        subscribeCallbacks.push(callback);
      }
    };

    initialPort1.addEventListener('message', ({ data }) => {
      lastState = data;

      resolve(store);
    });

    initialPort1.start();

    subscribePort1.addEventListener('message', ({ data }) => {
      lastState = data;

      subscribeCallbacks.forEach(callback => callback());
    });

    subscribePort1.start();

    worker.port.postMessage(undefined, [dispatchPort2, initialPort2, subscribePort2]);
  });
}
