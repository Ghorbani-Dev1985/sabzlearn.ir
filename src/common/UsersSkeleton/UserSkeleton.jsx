import { Avatar, Skeleton } from '@mui/material'
import React from 'react'

function UserSkeleton({listsToRender}) {
  return (
      <>
      {
        Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <React.Fragment key={index}> 
             <Skeleton animation="wave" />
            </React.Fragment>
          ))
        }
        </>
  )
}

export default UserSkeleton

