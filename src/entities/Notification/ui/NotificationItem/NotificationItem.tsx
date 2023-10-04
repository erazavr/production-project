import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Card, CardVariant } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { memo } from 'react';
import { type Notification } from '../../model/types/notifications';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo(function NotificationItem(
  props: NotificationItemProps,
) {
  const { className, item } = props;

  const content = (
    <Card
      variant={CardVariant.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text text={item.description} title={item.title} />
    </Card>
  );

  if (item.href) {
    return (
      <AppLink className={cls.link} target={'_blank'} to={item.href}>
        {content}
      </AppLink>
    );
  }

  return content;
});
