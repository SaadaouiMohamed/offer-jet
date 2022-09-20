import { CircularProgress } from '@mui/material'
import React, { useEffect, useState, useTransition } from 'react'

export default function Test() {
    const [input, setInput] = useState('')
    const [isPending, startTransition] = useTransition()
const [list,setList] = useState([])
    const listSize = 2000


    
    function handleList (e){
        setInput(e.target.value)
        startTransition(()=>{
            const l = []
            for(let i=0;i<listSize;i++){
               l.push(e.target.value)
                
            }
            setList(l)
        })
       
    }
   

   
  return (
    <div>
    <input type='text' value={input} onChange={handleList} className='p-3 border'></input>
   
    {isPending ? <CircularProgress disableShrink/>
       : list.map((el,i) =>{
           return <p key={i}>{el}</p>
    })
    }
    
    </div>
  )
}
