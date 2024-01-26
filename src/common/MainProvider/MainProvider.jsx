import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
            {children}
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider