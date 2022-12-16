import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AppThemeProvider } from './shared/contexts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './shared/contexts/auth/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <AppThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppThemeProvider>
  </AuthProvider>
)