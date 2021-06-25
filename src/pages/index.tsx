import Connections from './Connections'
import Mentions from './Mentions'
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'
import Private from './Private'
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
    Component: MyProfile,
    path: '/profile',
  },
  {
    Component: OtherProfile,
    path: '/profile/:feedId',
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
