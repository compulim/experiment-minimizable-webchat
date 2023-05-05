// import './windowAsGlobalThis';
// import { DirectLine } from 'botframework-directlinejs';

// console.log('DirectLine: Hello, World!');

// function subscribeObservableFromPort(observable: any, port: MessagePort, name: string) {
//   port.addEventListener('message', ({ ports }) => {
//     console.log(`worker:${name}:subscribe`);

//     const [sendPort] = ports;

//     observable.subscribe({
//       complete() {
//         console.log(`worker:${name}:complete`);
//         sendPort.postMessage(['complete']);
//       },
//       error({ message }: Error) {
//         console.log(`worker:${name}:error`, { message });
//         sendPort.postMessage(['error', message]);
//       },
//       next(value: any) {
//         console.log(`worker:${name}:next`, value);
//         sendPort.postMessage(['next', value]);
//       }
//     });
//   });

//   port.start();
// }

// let directLine;

// addEventListener('connect', ({ ports }) => {
//   console.log('worker:connect', { ports });

//   ports[0].addEventListener('message', ({ data, ports }) => {
//     if (data[0] !== 'create') {
//       return;
//     }

//     console.log('worker:create', { data, ports });

//     const [activityPort, connectionStatusPort, mainPort, postActivityPort] = ports;

//     directLine = directLine || new DirectLine({ token: data[1] });

//     subscribeObservableFromPort(directLine.activity$, activityPort, 'activity');
//     subscribeObservableFromPort(directLine.connectionStatus$, connectionStatusPort, 'connectionStatus');

//     postActivityPort.addEventListener('message', ({ data, ports }) => {
//       const observable = directLine.postActivity(data);

//       console.log('worker:postActivity', { data, observable, ports });

//       subscribeObservableFromPort(observable, ports[0], 'postActivity');
//     });

//     postActivityPort.start();

//     mainPort.postMessage([token]);

//     console.log('worker:done');
//   });

//   ports[0].start();
// });
