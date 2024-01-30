import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

function Layout() {
  return (
    <>
    <Header />
    <main className='min-h-screen max-w-[1920px] mx-auto'>
     <section className='pt-10 lg:pt-25'>
       <div className='container'>
        <Outlet />
       </div>
     </section>
    </main>
    <Footer />
    </>
  )
}

export default Layout
