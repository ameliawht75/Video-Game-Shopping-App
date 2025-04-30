import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import GameList from './components/GameList.tsx'
import CartList from './components/CartList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
       {
    path: '/',
    element: <GameList />,
  },
  {
    path: '/cart',
    element: <CartList />,
  }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
