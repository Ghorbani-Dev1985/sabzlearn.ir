
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import Header from './Components/Header/Header'
import MainProvider from './common/MainProvider/MainProvider'
import Footer from './Components/Footer/Footer'


function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
     <MainProvider>
    <Header />
     <main className='overflow-hidden min-h-screen max-w-[1920px] mx-auto'>
      <section className='pt-10 lg:pt-25'>
        <div className='container'>
            {router}
        </div>
      </section>
     </main>
     <Footer />
     </MainProvider>
    </>
  )
}

export default App
