import constate from 'constate'
import { find } from 'lodash'
import { ComponentType, useCallback, useMemo } from 'react'

import useLocalStorageState from '@/hooks/useLocalStorageState'

export type Key = string

export interface Route {
  key: Key
  Component: ComponentType
}

export type Params = Record<string, string>

export interface State {
  key: Key
  params: Params
}

export interface RouterContext {
  state: State
  navigate: (nextKey: Key, nextParams?: Params) => void
  route: Route | undefined
}

export interface RouterContextProps {
  initialKey: Key
  routes: Array<Route>
}

const ROUTER_STATE_STORAGE_KEY = '@sunrise-social/router/state'

function useRouter(options: RouterContextProps): RouterContext {
  const { initialKey, routes } = options

  const [state, setState] = useLocalStorageState<State>({
    initialState: {
      key: initialKey,
      params: {},
    },
    key: ROUTER_STATE_STORAGE_KEY,
  })

  const route: Route | undefined = useMemo(() => {
    const { key } = state
    return find(routes, ['key', key])
  }, [state, routes])

  const navigate = useCallback(
    (nextKey, nextParams = {}) => {
      setState({
        key: nextKey,
        params: nextParams,
      })
    },
    [setState],
  )

  return {
    navigate,
    route,
    state,
  }
}

const [RouterContextProvider, useRouterContext] = constate(useRouter)

export { RouterContextProvider, useRouterContext }
