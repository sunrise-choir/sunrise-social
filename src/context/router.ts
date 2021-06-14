import constate from 'constate'
import { range } from 'lodash'
import { Key, pathToRegexp } from 'path-to-regexp'
import { ComponentType, useCallback, useMemo, useState } from 'react'

export interface Route {
  path: string
  Component: ComponentType
}

export interface Matcher {
  route: Route
  keys: Array<Key>
  regexp: RegExp
}

export interface Match {
  route: Route
  params: Record<string, string>
}

export interface RouterContext {
  path: string
  navigate: (nextPath: string) => void
  match: Match | null
}

export interface RouterContextProps {
  initialRoute: string
  routes: Array<Route>
}

function useRouter(options: RouterContextProps): RouterContext {
  const { initialRoute, routes } = options

  const [path, setPath] = useState<string>(initialRoute)

  const matchers: Array<Matcher> = useMemo(() => {
    return routes.map((route) => {
      const { path } = route
      let keys: Array<Key> = []
      console.log('path', path)
      const regexp = pathToRegexp(path, keys, {
        sensitive: true,
        start: true,
        strict: true,
      })
      return { keys, regexp, route }
    })
  }, [routes])

  const match: Match | null = useMemo(() => {
    for (const matcher of matchers) {
      const { route, regexp, keys } = matcher
      const result = regexp.exec(path)
      if (result == null) continue
      const params = range(keys.length).reduce(
        (sofar: Match['params'], nextIndex) => {
          const nextKey = keys[nextIndex]
          const { name: nextKeyName } = nextKey
          const nextValue = result[nextIndex + 1]
          sofar[nextKeyName] = nextValue
          return sofar
        },
        {},
      )
      return { params, route }
    }
    return null
  }, [path, matchers])

  const navigate = useCallback(
    (nextPath) => {
      setPath(nextPath)
    },
    [setPath],
  )

  return {
    match,
    navigate,
    path,
  }
}

const [RouterContextProvider, useRouterContext] = constate(useRouter)

export { RouterContextProvider, useRouterContext }
