import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo(function Icon(props: IconProps) {
  const { className, Svg, inverted, ...rest } = props;
  return (
    <Svg
      {...rest}
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
    />
  );
});
