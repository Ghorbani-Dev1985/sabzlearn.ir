import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'
import { CoursesContextProvider } from '../../Contexts/CoursesContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <ShowLoadingProvider>
      <ShowRealtimeDatasProvider>
      <AuthProvider>
        <CoursesContextProvider>
            {children}
        </CoursesContextProvider>
      </AuthProvider>
      </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider