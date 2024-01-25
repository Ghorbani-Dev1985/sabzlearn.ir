import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, List, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CloseOutlined, ExpandMore } from '@mui/icons-material'
import RtlProvider from '../../common/RtlProvider/RtlProvider'
import Logo from '../../assets/Images/Logo/logo.webp'
import LogoType from '../../assets/Images/svgs/logoType.svg'

function MobileNav() {
 
  const [openMobileNav , setMobileNav] = useState(false)
  const [expanded, setExpanded] = useState(false)
 console.log(openMobileNav)

const handleChangeAccordion = (panel) => (event, isExpanded) => {
  setExpanded(isExpanded ? panel : false);
};
const toggleDrawer = (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setMobileNav((prev) => !prev);
};
  return (
   <>
   
    <button onClick={toggleDrawer}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
    </svg>
    </button>
    <RtlProvider>

    <Drawer
    anchor='left'
    open={openMobileNav}
    onClose={toggleDrawer}
    >
    <Box className="w-64 pb-16 px-7 text-slate-400">
      <Box className="flex-between pb-5 mt-5 relative">
        <div className='flex-center gap-x-2'>
        <img src={Logo} alt='ghorbani-dev.ir' className='w-14' />
        <img src={LogoType} alt='ghorbani-dev.ir' className='w-20 h-9' />
        </div>
        <div onClick={toggleDrawer}>
          <CloseOutlined />
        </div>
      </Box>
<Accordion className='!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none' expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMore className='!size-5 !text-slate-500 dark:text-slate-400'/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>
            General settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden' expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMore className='!text-slate-500 !size-5 dark:text-slate-400' />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          >
          <Typography>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden' expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMore className='!text-slate-500 !size-5 dark:text-slate-400' />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          >
          <Typography>
            Advanced settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='!text-slate-500 dark:bg-gray-700 dark:text-slate-400 !border-none !shadow-none before:hidden' expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMore className='!text-slate-500 !size-5 dark:text-slate-400' />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          >
          <Typography>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
      </Box>
          </Drawer>
      </RtlProvider>
      
   </>
  )
}

export default MobileNav