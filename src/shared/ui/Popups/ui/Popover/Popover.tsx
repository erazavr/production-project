import { Popover as HPopover } from '@headlessui/react';
import { type ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { type DropDownDirection } from '@/shared/types/ui';
import { mapDirectionClasses } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropDownDirection;
  children: ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, direction = 'bottom right', trigger, children } = props;
  const menuClasses = [mapDirectionClasses[direction]];

  return (
    <HPopover className={classNames('', {}, [className, popupCls.popup])}>
      <HPopover.Button as={'div'} className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>
      <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
}
