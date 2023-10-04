import { Menu } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { type DropDownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClasses } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './Dropdown.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropDownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClasses[direction]];

  return (
    <Menu
      as={'div'}
      className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item, i) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.active]: active })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                key={i}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={i} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
