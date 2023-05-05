import { createRoot } from 'react-dom/client';

import App from './ui/App';

const rootElement = document.getElementsByTagName('main')[0];

rootElement && createRoot(rootElement).render(<App />);
