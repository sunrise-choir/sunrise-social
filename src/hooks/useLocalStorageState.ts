import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface LocalStorageStateOptions<T> {
  initialState: T
  key: string
}
export default function useLocalStorageState<T>(
  options: LocalStorageStateOptions<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const { initialState, key } = options

  const [state, setState] = useState<T>(() => {
    const json = localStorage.getItem(key)
    if (json == null) return initialState
    return JSON.parse(json)
  })

  useEffect(() => {
    const json = JSON.stringify(state)
    localStorage.setItem(key, json)
  }, [key, state])

  return [state, setState]
}
