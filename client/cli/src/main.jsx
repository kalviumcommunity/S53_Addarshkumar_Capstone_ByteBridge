import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './components/context/Parentcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider theme={theme}>
    <AppProvider>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </AppProvider>
  </ChakraProvider>
)
