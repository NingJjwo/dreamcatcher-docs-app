import { createBrowserRouter } from 'react-router-dom'
import Navbar from '../components/NavBar'
import HomePage from '../pages/HomePage'
import DocsPage from '../pages/DocsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <DocsPage /> },
    ],
  },
])