import constate from 'constate'
import { find } from 'lodash'
import { ComponentType, useCallback, useMemo } from 'react'

import useLocalStorageState from '@/hooks/useLocalStorageState'

export type RouteId = string

export interface Route {
  id: RouteId
  Component: ComponentType
}

export type Params = Record<string, string>

export interface State {
  routeId: RouteId
  params: Params
}

export interface RouterContext {
  state: State
  navigate: (nextRouteId: RouteId, nextParams?: Params) => void
  route: Route | undefined
}

export interface RouterContextProps {
  initialRouteId: RouteId
  routes: Array<Route>
}

const ROUTER_STATE_STORAGE_KEY = '@sunrise-social/router/state'

function useRouter(options: RouterContextProps): RouterContext {
  const { initialRouteId, routes } = options

  const [state, setState] = useLocalStorageState<State>({
    initialState: {
      params: {},
      routeId: initialRouteId,
    },
    key: ROUTER_STATE_STORAGE_KEY,
  })

  const route: Route | undefined = useMemo(() => {
    const { routeId } = state
    return find(routes, ['id', routeId])
  }, [state, routes])

  const navigate = useCallback(
    (nextRouteId, nextParams = {}) => {
      setState({
        params: nextParams,
        routeId: nextRouteId,
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
