import Connections from './Connections'
import Mentions from './Mentions'
import Private from './Private'
import Profile from './Profile'
import Public from './Public'

export const initialRoute = '/public'

export const routes = [
  {
    Component: Public,
    path: '/public',
  },
  {
    Component: Private,
    path: '/private',
  },
  {
    Component: Profile,
    path: '/profile',
  },
  {
    Component: Profile,
    path: '/profile',
  },
  {
    Component: Profile,
    path: '/profile',
  },
  {
    Component: Connections,
    path: '/connections',
  },
  {
    Component: Mentions,
    path: '/mentions',
  },
]
