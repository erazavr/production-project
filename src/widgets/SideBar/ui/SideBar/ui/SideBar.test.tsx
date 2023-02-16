import { fireEvent, screen } from '@testing-library/react'
import {
  renderWithTranslation
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { SideBar } from './SideBar'

describe('SideBar test', () => {
  test('render SideBar', () => {
    renderWithTranslation(<SideBar/>)
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toBeInTheDocument()
  })
  test('collapse SideBar', () => {
    renderWithTranslation(<SideBar/>)
    const sidebar = screen.getByTestId('sidebar')
    const toggleBtn = screen.getByTestId('sidebar-toggle')

    fireEvent.click(toggleBtn)

    expect(sidebar).toBeInTheDocument()
    expect(sidebar).toHaveClass('collapsed')
  })
})
