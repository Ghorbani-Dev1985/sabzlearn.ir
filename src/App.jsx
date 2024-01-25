
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
     <main className='overflow-hidden max-w-[1920px] mx-auto'>
        <section className='container'>

        </section>
     </main>
    </>
  )
}

export default App
