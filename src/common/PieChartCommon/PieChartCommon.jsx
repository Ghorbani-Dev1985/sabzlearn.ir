import { Box, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import {ResponsiveContainer ,PieChart, Pie , Sector , Cell, Tooltip} from 'recharts'


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 170} y={ey} textAnchor={textAnchor} fill="#333">{`مبلغ فروش ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 170} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(درصد فروش ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function PieChartCommon({key, title , data , dataKey  }) {
  const [activeIndex , setActiveIndex] = useState(0)

 const onPieEnter = (_, index) => {
    setActiveIndex(index)
  };
  return (
    <Box key={key} className="my-8 shadow-round p-2 rounded-lg">
      <h3 className='my-3'>{title}</h3>
      {
        data.length ? <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie  
             activeIndex={activeIndex}
             activeShape={renderActiveShape}
             data={data}
             cx="50%"
             cy="50%"
             innerRadius={60}
             outerRadius={90}
             onMouseEnter={onPieEnter}
            fill="#0ea5e9" dataKey={dataKey} />
          </PieChart>
      </ResponsiveContainer>   : <Box className="w-full flex-center"><Skeleton variant="rounded" className='size-96 rounded-full' /></Box>
      }
    </Box>
  )
}

export default PieChartCommon