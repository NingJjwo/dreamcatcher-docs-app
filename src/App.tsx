import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes'

// App.tsx stays tiny on purpose.
// Routes live in their own file.
// If you add auth: wrap RouterProvider
// with <AuthProvider> here.

export default function App() {
  return <RouterProvider router={router} />
}
