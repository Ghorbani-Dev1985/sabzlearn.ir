import { Box, Skeleton } from '@mui/material'
import React from 'react'
import {ResponsiveContainer , LineChart , Line , XAxis , CartesianGrid, Tooltip} from 'recharts'


function Chart({key, title , data , dataKey , grid}) {
  return (
    <Box key={key} className="my-8 shadow-round p-2 rounded-lg">
      <h3 className='my-3'>{title}</h3>
      {
        data.length ? <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data} >
            <XAxis dataKey="name" stroke='#5550bd'/>
            <Line type="monotone" dataKey={dataKey} stroke='#5550bd'/>
            <Tooltip />
            {
                grid && <CartesianGrid stroke='#c0dfdf' strokeDasharray="10" />
            }
        </LineChart>
      </ResponsiveContainer>   : <Skeleton variant="rounded" className='w-full h-full min-h-96' />
      }
    </Box>
  )
}

export default Chart