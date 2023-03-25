import { Fragment, memo } from 'react';

import FloatingWebChat from './FloatingWebChat';

const App = memo(() => (
  <Fragment>
    <h1>Hello, World!</h1>
    <FloatingWebChat />
  </Fragment>
));

export default App;
