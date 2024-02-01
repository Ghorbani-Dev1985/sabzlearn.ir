import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <AuthProvider>
            {children}
      </AuthProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider