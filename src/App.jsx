
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import MainProvider from './common/MainProvider/MainProvider'


function App() {
  let router = useRoutes(routes)
  return (
    <>
     <Toaster />
     <MainProvider> 
            {router}
     </MainProvider>
    </>
  )
}

export default App
