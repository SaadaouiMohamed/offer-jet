import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/app.css'
import OfferList from './component/OffreList'
import { Stack, ThemeProvider } from '@mui/material'
import Test from './component/Test'
import theme from './component/libs/mui/theme'
function App() {
 

  return (
    <ThemeProvider theme={theme}>
      <Stack className='relative overflow-clip'>
  <OfferList />
      </Stack>
      </ThemeProvider>
  )
}

export default App
