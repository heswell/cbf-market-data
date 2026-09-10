import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TestDataProvider } from './data/TestDataProvider.tsx'

import '@vuu-ui/vuu-icons/style'
import '@vuu-ui/vuu-theme/style'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <TestDataProvider>
    <App />
  </TestDataProvider>,
)
