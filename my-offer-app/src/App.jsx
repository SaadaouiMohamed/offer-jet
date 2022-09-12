import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/app.css'
import OfferList from './component/OffreList'
import { Stack } from '@mui/material'
function App() {
 

  return (
    <div className="App">
      <Stack>
      <OfferList />
      </Stack>
    </div>
  )
}

export default App
