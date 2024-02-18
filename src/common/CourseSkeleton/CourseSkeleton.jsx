import { Avatar, Skeleton } from '@mui/material'
import React from 'react'

function CourseSkeleton({listsToRender}) {
  return (
      <>
      {
        Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col overflow-hidden min-h-96 bg-white dark:bg-gray-800 shadow-light dark:shadow-none dark:xl:border dark:border-gray-700 rounded-2xl">
            <Skeleton variant="rounded" width={'100%'} height={150} />
            <Skeleton animation="wave" width={100} height={20} className='my-4'/>
             <Skeleton animation="wave" width={'97%'} height={100} className='mx-auto'/>
             <div className='flex-between px-2'>
             <Skeleton animation="wave" width={'40%'} height={20} className='my-4'/>
             <Skeleton animation="wave" width={'40%'} height={20} className='my-4'/>
             </div>
             <div className='flex-between px-2'>
             <Skeleton animation="wave" width={'40%'} height={60}/>
             <Skeleton animation="wave" width={'40%'} height={60}/>
             </div>
              </div> 
            </React.Fragment>
          ))
        }
        </>
  )
}

export default CourseSkeleton

