import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider theme={theme}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </ChakraProvider>
)
