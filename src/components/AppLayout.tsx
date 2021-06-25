import { Box, Button, Grid } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { useRouterContext } from '@/context/router'

export default AppLayout

interface AppLayoutProps {
  children: ReactNode
}

function AppLayout(props: AppLayoutProps) {
  const { children } = props

  return (
    <Grid
      className="window"
      templateColumns={'1fr'}
      templateRows={'auto 1fr'}
      templateAreas={"'header' 'main'"}
      sx={{
        height: '100%',
      }}
    >
      <Header />
      <Main>{children}</Main>
    </Grid>
  )
}

interface HeaderProps {}

function Header(_props: HeaderProps) {
  const { navigate } = useRouterContext()

  return (
    <Box
      className="top"
      gridArea="header"
      sx={{
        alignItems: 'center',
        background: '#fff',
        borderBottom: '2px solid #e4edff',
        boxShadow: '0 0 3px #7f7f7f',
        display: 'flex',
        padding: 2,
        position: 'relative',
        zIndex: '100',
      }}
    >
      <Button onClick={() => navigate('public')}>public</Button>
      <Button onClick={() => navigate('private')}>private</Button>
      <Button onClick={() => navigate('my-profile')}>profile</Button>
      <Button onClick={() => navigate('mentions')}>mentions</Button>
      <Button onClick={() => navigate('connections')}>connections</Button>
    </Box>
  )
}

interface MainProps {
  children: ReactNode
}

function Main(props: MainProps) {
  const { children } = props

  return (
    <Box
      className="main"
      gridArea="main"
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}
