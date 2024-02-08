import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'
import { CoursesContextProvider } from '../../Contexts/CoursesContext'
import { BlogsContextProvider } from '../../Contexts/BlogsContext'
import { EditModalProvider } from '../../Contexts/EditModalContext'


function MainProvider({children}) {
  return (
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <ShowLoadingProvider>
      <ShowRealtimeDatasProvider>
      <EditModalProvider>

      <AuthProvider>
        <CoursesContextProvider>
          <BlogsContextProvider>
            {children}
          </BlogsContextProvider>
        </CoursesContextProvider>
      </AuthProvider>
      </EditModalProvider>
      </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
         
  )
}

export default MainProvider