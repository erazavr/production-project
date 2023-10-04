import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { SideBar } from './SideBar';

describe('SideBar test', () => {
  test('render SideBar', () => {
    componentRender(<SideBar />);
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
  });
  test('collapse SideBar', () => {
    componentRender(<SideBar />);
    const sidebar = screen.getByTestId('sidebar');
    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);

    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('collapsed');
  });
});
