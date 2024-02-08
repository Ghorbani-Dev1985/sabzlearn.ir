import React from 'react'
import { Skeleton } from '@mui/material'
function SkeletonLoging({listsToRender}) {
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

export default SkeletonLoging
