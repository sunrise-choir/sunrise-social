import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'whitesmoke',
        color: '#2b2b2b',
        margin: 0,
        overflow: 'hidden',
      },
      html: {
        fontSize: '12px',
        lineHeight: 1.2,
      },
      'html, body, #app': {
        height: '100vh',
      },
      'html, input, select': {
        fontFamily: 'system-ui, sans-serif',
      },
    },
  },
})

export default theme
