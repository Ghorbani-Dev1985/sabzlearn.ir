import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDetailsModal } from '../../../Contexts/DetailsModalContext';
import { Close } from '@mui/icons-material';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DetailsModal({children}) {
    const {showDetailsModal , setShowDetailsModal} = useDetailsModal()
  return (
    <Dialog
    open={showDetailsModal}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => setShowDetailsModal(false)}
    aria-describedby="alert-dialog-slide-description"
    maxWidth="lg"
  >
    <DialogTitle className='flex-between bg-slate-100 p-5 dark:bg-gray-800 dark:text-white'>
            <p className='flex flex-1 justify-center font-DanaBold'>مشاهده جزییات </p>
           <p onClick={() => setShowDetailsModal(false)} className='text-rose-500 cursor-pointer flex-center'><Close /></p> 
    </DialogTitle>
    <DialogContent className='dark:bg-gray-main dark:text-white !p-12'>
     {children}
    </DialogContent>
  </Dialog>
  )
}

export default DetailsModal
