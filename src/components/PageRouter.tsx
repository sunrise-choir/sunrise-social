import { Box } from '@chakra-ui/react'
import { findIndex } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'

import { State, useRouterContext } from '@/context/router'

export default Router

interface RenderedView {
  state: State
  element: ReactElement
}

interface RouterProps {}

function Router(_props: RouterProps): ReactElement {
  const { state, route } = useRouterContext()
  const { key } = state

  console.log('route', route)
  console.log('route state', state)

  const [views, setViews] = useState<Array<RenderedView>>([])

  useEffect(
    () => {
      if (route == null) return

      const { Component: RouteComponent } = route

      const newView: RenderedView = {
        element: React.createElement(RouteComponent, { key }, null),
        state,
      }

      const existingViewIndex = findIndex(views, ['state', state])
      if (existingViewIndex === -1) {
        setViews([...views, newView])
      } else {
        setViews([
          ...views.slice(0, existingViewIndex),
          newView,
          ...views.slice(existingViewIndex + 1),
        ])
      }
    },
    // don't re-effect on a change in `views`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, route],
  )

  return (
    <>
      {views.map((view) => {
        const isVisible = view.state == state
        const visClass = isVisible ? '' : ' hidden'
        return (
          <Box
            className={`view${visClass}`}
            key={view.state.key}
            sx={{
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              visibility: isVisible ? 'visible' : 'hidden',
            }}
          >
            {view.element}
          </Box>
        )
      })}
    </>
  )
}
