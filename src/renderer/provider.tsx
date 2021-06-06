import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import React, { ComponentProps } from 'react'

interface ProviderProps
  extends ComponentProps<typeof ApolloProvider>,
    ComponentProps<typeof ChakraProvider> {
  children: React.ReactNode
}

export default function Provider(props: ProviderProps) {
  const { client, children } = props

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <CSSReset />
        {children}
      </ChakraProvider>
    </ApolloProvider>
  )
}
