import { Box, Container } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

export default PageLayout

interface PageLayoutProps {
  children: ReactNode
}

function PageLayout(props: PageLayoutProps) {
  const { children } = props

  return (
    <Box
      className="scroller"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Container className="container" maxWidth="container.lg">
        {children}
      </Container>
    </Box>
  )
}
