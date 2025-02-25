import { InjectorFactory } from '@olympus/be-di-ilitia'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactElement } from 'react'
import { HttpClient } from '../services/client-http'
import { AxiosApiClient } from '../services/client-http/adapters/axios-client'

const MINUTE = 1000 * 60

const api = InjectorFactory.resolve(AxiosApiClient, { name: 'HTTP_CLIENT' })
export const clientHttp = InjectorFactory.resolve(HttpClient)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
    },
  },
})
export const ContextReactQuery: FC<{
  children: ReactElement
  baseUrl?: string
}> = ({ children, baseUrl }) => {
  api.boot(baseUrl)
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
