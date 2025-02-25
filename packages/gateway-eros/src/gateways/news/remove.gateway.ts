import { useMutation } from '@tanstack/react-query'
import { clientHttp } from '../../contexts/react-query'
const mutationFn = async <T>(id: T) => {
  await clientHttp.delete<T>(`/olympus/news/${id}`)
  return true
}
export const useRemoveNews = <T>() => {
  return useMutation({
    mutationFn: (id: T) => {
      return mutationFn<T>(id)
    },
  })
}
