// @ts-ignore
import Observable from 'core-js/features/observable';

const worker = new SharedWorker('./static/js/directline.js');

function createObservableForPort(subscribeCallback: (port: MessagePort) => void, name: string) {
  return new Observable((observer: any) => {
    console.log(`app:${name}:subscribe`);

    const { port1, port2 } = new MessageChannel();

    port2.addEventListener('message', ({ data }) => {
      if (data[0] === 'complete') {
        console.log(`app:${name}:complete`);
        observer.complete();
      } else if (data[0] === 'error') {
        console.log(`app:${name}:error`, data[1]);
        observer.error(data[1]);
      } else if (data[0] === 'next') {
        console.log(`app:${name}:next`, data[1]);
        observer.next(data[1]);
      }
    });

    port2.start();

    subscribeCallback(port1);
  });
}

export default function createDirectLineJSForWorker({ token }: { token: string }) {
  const { port1: activityPort1, port2: activityPort2 } = new MessageChannel();
  const { port1: connectionStatusPort1, port2: connectionStatusPort2 } = new MessageChannel();
  const { port1: mainPort1, port2: mainPort2 } = new MessageChannel();
  const { port1: postActivityPort1, port2: postActivityPort2 } = new MessageChannel();

  worker.port.postMessage(['create', token], [activityPort2, connectionStatusPort2, mainPort2, postActivityPort2]);

  const directLine = {
    activity$: createObservableForPort(port => activityPort1.postMessage(undefined, [port]), 'activity'),
    connectionStatus$: createObservableForPort(
      port => connectionStatusPort1.postMessage(undefined, [port]),
      'connectionStatus'
    ),
    postActivity: (activity: any) => {
      const { port1, port2 } = new MessageChannel();

      postActivityPort1.postMessage(activity, [port2]);

      return createObservableForPort(port => port1.postMessage(undefined, [port]), 'postActivity');
    },
    token: undefined as string | undefined
  };

  mainPort1.addEventListener('message', ({ data }) => {
    directLine.token = data[0];
  });

  mainPort1.start();

  return directLine;
}
