import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TestDataProvider } from './data/TestDataProvider.tsx';

import '@vuu-ui/vuu-icons/style';
import '@vuu-ui/vuu-theme/style';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TestDataProvider>
    <App />
  </TestDataProvider>
);
