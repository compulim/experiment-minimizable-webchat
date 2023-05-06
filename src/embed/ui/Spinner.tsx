import { memo } from 'react';

import './Spinner.css';

const Spinner = memo(() => (
  <div className="webchat-float__spinner-body">
    <i className="webchat-float__spinner-icon ms-Icon ms-Icon--ProgressRingDots" role="image" title="Loading" />
  </div>
));

export default Spinner;
