import { HeaderList } from '@olympus/fe-rn-atena/src/components/header-list'
import { render, screen } from '@testing-library/react-native'
import { describe, expect, it } from 'vitest'

describe('@olympus/fe-rn-atena/component/<HeaderList/>', () => {
  it.each([undefined, null, 0, -1])('should render empty message', (total) => {
    render(<HeaderList total={total as any as number} title="OLYMPUS" />)
    const cpfInputError = screen.queryByText('Você não tem registros')
    expect(cpfInputError).toBeTruthy()
  })
  it.each([1, 2])(
    'should render message stating that there is news',
    (total) => {
      render(<HeaderList total={total as any as number} title="OLYMPUS" />)
      const cpfInputError = screen.queryByText('Você tem')
      expect(cpfInputError).toBeTruthy()
    },
  )
})
