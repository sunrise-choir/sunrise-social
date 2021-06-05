import { gql } from '@apollo/client'

export default gql`
  schema {
    query: Query
  }

  type Agent {
    """
    The public key of the agent on the SSB network.
    """
    id: String!
  }

  type Query {
    """
    The current agent with publishing rights on this machine. Kinda like the "current logged in user" on a sytem where you log in.
    """
    currentAgent: Agent
  }
`
