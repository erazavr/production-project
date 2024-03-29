import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text';
import { memo } from 'react';
import { type ArticleImageBlock } from '../../model/types/article';

import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  function ArticleImageBlockComponent(props: ArticleImageBlockComponentProps) {
    const { className, block } = props;

    return (
      <div className={classNames('', {}, [className])}>
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  },
);
