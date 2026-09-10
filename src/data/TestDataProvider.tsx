import { LocalDataSourceProvider } from '@vuu-ui/vuu-data-test'
import type { ReactNode } from 'react'
import './algo-module'

export const TestDataProvider = ({ children }: { children: ReactNode }) => {
  return <LocalDataSourceProvider>{children}</LocalDataSourceProvider>
}
