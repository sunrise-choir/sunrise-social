import Connections from './Connections'
import Mentions from './Mentions'
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'
import Private from './Private'
import Public from './Public'

export const initialRouteId = 'public'

export const routes = [
  {
    Component: Public,
    id: 'public',
  },
  {
    Component: Private,
    id: 'private',
  },
  {
    Component: MyProfile,
    id: 'my-profile',
  },
  {
    Component: OtherProfile,
    id: 'other-profile',
    // params: feedId
  },
  {
    Component: Connections,
    id: 'connections',
  },
  {
    Component: Mentions,
    id: 'mentions',
  },
]
