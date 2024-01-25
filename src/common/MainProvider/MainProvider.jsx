import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
            {children}
   </OpenCloseProvider>
         
  )
}

export default MainProvider