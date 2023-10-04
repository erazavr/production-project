import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export enum TextVariant {
  PRIMARY = 'primary',
  ERROR = 'error',
  INVERTED = 'inverted',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h3',
};

export const Text = memo(function Text(props: TextProps) {
  const {
    className,
    text,
    title,
    variant = TextVariant.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Text',
  } = props;

  const additional: string[] = [className, cls[variant], cls[align], cls[size]];

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div className={classNames('', {}, additional)}>
      {title && (
        <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
});
