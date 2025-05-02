import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root.tsx'
import GameList from './components/GameList.tsx'
import CartList from './components/CartList.tsx'
import { gamesListLoader } from './components/GameList.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import GameDetails from './components/GameDetails.tsx'
import ReviewPage from './components/ReviewPage.tsx'
import SellItemForm from './components/SellItemForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
       {
    path: '/',
    element: <GameList />,
    loader: gamesListLoader,
  },
  {
    path: '/cart',
    element: <CartList />,
  },
  {
    path: "/games/:gameId",
    element: <GameDetails />,
  },
  {
    path: "/reviews",
    element: <ReviewPage />,
  },
  {
    path: "/sell",
    element: <SellItemForm />,
  }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
