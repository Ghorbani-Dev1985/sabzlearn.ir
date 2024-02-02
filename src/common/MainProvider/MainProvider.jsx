import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <ShowLoadingProvider>
      <ShowRealtimeDatasProvider>
      <AuthProvider>
            {children}
      </AuthProvider>
      </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider