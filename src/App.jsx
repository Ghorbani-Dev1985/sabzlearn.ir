
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
import MainProvider from './Components/MainProvider/MainProvider'

function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
     <MainProvider>
     <main className=''>   
        <div className='grid grid-cols-12'>
      
         <div className='col-span-2'><Sidebar /></div>
         <div className='col-span-10 p-16 my-6 ml-4 rounded-3xl bg-white'>{router}</div>
        </div>
     </main>
     </MainProvider>
    </>
  )
}

export default App
