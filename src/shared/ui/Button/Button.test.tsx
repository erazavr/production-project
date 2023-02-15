import { Button, VariantButton } from '@/shared/ui/Button/Button'
import { render, screen } from '@testing-library/react'

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
