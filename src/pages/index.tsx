import Connections from './Connections'
import Mentions from './Mentions'
import MyProfile from './MyProfile'
import OtherProfile from './OtherProfile'
import Private from './Private'
import Public from './Public'

export const initialKey = 'public'

export const routes = [
  {
    Component: Public,
    key: 'public',
  },
  {
    Component: Private,
    key: 'private',
  },
  {
    Component: MyProfile,
    key: 'my-profile',
  },
  {
    Component: OtherProfile,
    key: 'other-profile',
    // params: feedId
  },
  {
    Component: Connections,
    key: 'connections',
  },
  {
    Component: Mentions,
    key: 'mentions',
  },
]
