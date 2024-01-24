
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import Header from './Components/Header/Header'


function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
    <Header />
    </>
  )
}

export default App
