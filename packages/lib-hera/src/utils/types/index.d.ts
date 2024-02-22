export type IOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type IRequired<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>
