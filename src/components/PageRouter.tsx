import { Box } from '@chakra-ui/react'
import { findIndex } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'

import { useRouterContext } from '@/context/router'

export default Router

interface RenderedView {
  path: string
  element: ReactElement
}

interface RouterProps {}

function Router(_props: RouterProps): ReactElement {
  const { path, match } = useRouterContext()

  const [views, setViews] = useState<Array<RenderedView>>([])

  useEffect(
    () => {
      if (match === null) return

      const {
        route: { Component: RouteComponent },
      } = match

      const newView = {
        element: React.createElement(RouteComponent, { key: path }, null),
        path,
      }

      const existingViewIndex = findIndex(views, ['path', path])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, match],
  )

  return (
    <>
      {views.map((view) => {
        const isVisible = view.path === path
        const visClass = isVisible ? '' : ' hidden'
        return (
          <Box
            className={`view${visClass}`}
            key={view.path}
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
