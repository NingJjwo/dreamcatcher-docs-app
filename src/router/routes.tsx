import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'
import DocsPage from '../pages/DocsPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
