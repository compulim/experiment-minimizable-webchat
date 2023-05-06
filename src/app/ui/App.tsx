import { Fragment, memo } from 'react';

import FloatingWebChat from './FloatingWebChat';

const App = memo(() => (
  <Fragment>
    <h1>Hello, World!</h1>
    <a href="." target="_blank">Open self</a>
    <FloatingWebChat />
  </Fragment>
));

export default App;
