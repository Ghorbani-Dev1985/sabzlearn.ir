import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'
import { CoursesContextProvider } from '../../Contexts/CoursesContext'
import { BlogsContextProvider } from '../../Contexts/BlogsContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <ShowLoadingProvider>
      <ShowRealtimeDatasProvider>
      <AuthProvider>
        <CoursesContextProvider>
          <BlogsContextProvider>
            {children}
          </BlogsContextProvider>
        </CoursesContextProvider>
      </AuthProvider>
      </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider