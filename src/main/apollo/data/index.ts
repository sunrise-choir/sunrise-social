import { SsbData, SsbDataConfig } from './ssb'

export type Data = ReturnType<typeof Data>

interface DataContext extends SsbDataConfig {}

export function Data(context: DataContext) {
  const { ssb } = context

  return {
    ssb: SsbData({ ssb }),
  }
}

export default Data
