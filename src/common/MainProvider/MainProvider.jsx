import React from 'react'
import { OpenCloseProvider } from '../../Contexts/openCloseContext'
import { DarkModeContextProvider } from '../../Contexts/DarkModeContext'
import { AuthProvider } from '../../Contexts/AuthContext'
import { ShowLoadingProvider } from '../../Contexts/ShowLoadingContext'
import { ShowRealtimeDatasProvider } from '../../Contexts/ShowRealtimeDatasContext'
import { CoursesContextProvider } from '../../Contexts/CoursesContext'
import { BlogsContextProvider } from '../../Contexts/BlogsContext'
import { EditModalProvider } from '../../Contexts/EditModalContext'
import { DetailsModalProvider } from '../../Contexts/DetailsModalContext'


function MainProvider({children}) {
  return (
      <AuthProvider>
   <OpenCloseProvider>
    <DarkModeContextProvider>
      <CoursesContextProvider>
      <ShowLoadingProvider>
      <ShowRealtimeDatasProvider>
      <EditModalProvider>
       <DetailsModalProvider>
        <BlogsContextProvider>
            {children}
          </BlogsContextProvider>
       </DetailsModalProvider>
      </EditModalProvider>
      </ShowRealtimeDatasProvider>
      </ShowLoadingProvider>
      </CoursesContextProvider>
    </DarkModeContextProvider>
   </OpenCloseProvider>
      </AuthProvider>
         
  )
}

export default MainProvider