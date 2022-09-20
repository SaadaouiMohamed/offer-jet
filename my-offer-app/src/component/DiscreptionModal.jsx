import { Box, Modal, Portal, Typography } from '@mui/material'
import React,{useState} from 'react'

export default function DiscreptionModal(props) {

    const handleClose = () => props.setOpen(false)
  return (
    <div>
    <Modal
  open={props.open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className='bg-[#36383d] relative w-[400px] m-auto p-4 mt-8 pb-20 '>
    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-[#bd976f]'>
     {props.item.title}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    {props.item.city} | {props.item.employment_type_code}
    
  </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {props.item.translations.en.sharing_description
      }
    </Typography>
    <button onClick={() => handleClose()} id='closeModale'><i className="fa-sharp fa-solid fa-xmark xmark"></i></button>
  </Box>
</Modal>
    </div>
  )
}
