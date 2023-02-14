import { render, screen } from '@testing-library/react'
import { Button, VariantButton } from './Button'

describe('Test Button', () => {
  test('render button', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
  test('with class - clear', () => {
    render(<Button variant={VariantButton.CLEAR}>TEST</Button>)
    expect(screen.getByText('TEST')).toHaveClass('clear')
  })
})
