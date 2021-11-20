/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import { Breakpoint } from '../../types/style';
import styles from './FlexItem.module.scss';

type Flex = 'one' | 'auto' | 'initial' | 'none';
type FlexGrow = 0 | 1;
type FlexShrink = 0 | 1;
type Order =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'first'
  | 'last'
  | 'none';
type AlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

interface FlexItemProps {
  flex?: Breakpoint<Flex> | Flex;
  grow?: Breakpoint<FlexGrow> | FlexGrow;
  shrink?: Breakpoint<FlexShrink> | FlexShrink;
  order?: Breakpoint<Order> | Order;
  alignSelf?: Breakpoint<AlignSelf> | AlignSelf;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const FlexItem: React.FC<FlexItemProps> = ({
  children,
  flex,
  grow,
  shrink,
  order,
  alignSelf,
  className,
  style,
  onClick,
}) => {
  const classNames = clsx({
    // Default
    [styles[`flex-${flex}@${Size.NotAvailable}`]]: flex,
    [styles[`flex-grow-${grow}@${Size.NotAvailable}`]]: grow,
    [styles[`flex-shrink-${shrink}@${Size.NotAvailable}`]]: shrink,
    [styles[`order-${order}@${Size.NotAvailable}`]]: order,
    [styles[`align-self-${alignSelf}@${Size.NotAvailable}`]]: alignSelf,

    /* * Breakpoints * */
    // -FLEX-
    // xs
    [styles[`flex-${(flex as Breakpoint<Flex>)?.xs}@${Size.ExtraSmall}`]]: (
      flex as Breakpoint<Flex>
    )?.xs,
    // sm
    [styles[`flex-${(flex as Breakpoint<Flex>)?.sm}@${Size.Small}`]]: (
      flex as Breakpoint<Flex>
    )?.sm,
    // md
    [styles[`flex-${(flex as Breakpoint<Flex>)?.md}@${Size.Medium}`]]: (
      flex as Breakpoint<Flex>
    )?.md,
    // lg
    [styles[`flex-${(flex as Breakpoint<Flex>)?.lg}@${Size.Large}`]]: (
      flex as Breakpoint<Flex>
    )?.lg,
    // xl
    [styles[`flex-${(flex as Breakpoint<Flex>)?.xl}@${Size.ExtraLarge}`]]: (
      flex as Breakpoint<Flex>
    )?.xl,
    // -GROW-
    [styles[
      `flex-grow-${(grow as Breakpoint<FlexGrow>)?.xs}@${Size.ExtraSmall}`
    ]]: (grow as Breakpoint<FlexGrow>)?.xs,
    // sm
    [styles[`flex-grow-${(grow as Breakpoint<FlexGrow>)?.sm}@${Size.Small}`]]: (
      grow as Breakpoint<FlexGrow>
    )?.sm,
    // md
    [styles[`flex-grow-${(grow as Breakpoint<FlexGrow>)?.md}@${Size.Medium}`]]:
      (grow as Breakpoint<FlexGrow>)?.md,
    // lg
    [styles[`flex-grow-${(grow as Breakpoint<FlexGrow>)?.lg}@${Size.Large}`]]: (
      grow as Breakpoint<FlexGrow>
    )?.lg,
    // xl
    [styles[
      `flex-grow-${(grow as Breakpoint<FlexGrow>)?.xl}@${Size.ExtraLarge}`
    ]]: (grow as Breakpoint<FlexGrow>)?.xl,
    // -SHRINK-
    [styles[
      `flex-shrink-${(shrink as Breakpoint<FlexShrink>)?.xs}@${Size.ExtraSmall}`
    ]]: (shrink as Breakpoint<FlexShrink>)?.xs,
    // sm
    [styles[
      `flex-shrink-${(shrink as Breakpoint<FlexShrink>)?.sm}@${Size.Small}`
    ]]: (shrink as Breakpoint<FlexShrink>)?.sm,
    // md
    [styles[
      `flex-shrink-${(shrink as Breakpoint<FlexShrink>)?.md}@${Size.Medium}`
    ]]: (shrink as Breakpoint<FlexShrink>)?.md,
    // lg
    [styles[
      `flex-shrink-${(shrink as Breakpoint<FlexShrink>)?.lg}@${Size.Large}`
    ]]: (shrink as Breakpoint<FlexShrink>)?.lg,
    // xl
    [styles[
      `flex-shrink-${(shrink as Breakpoint<FlexShrink>)?.xl}@${Size.ExtraLarge}`
    ]]: (shrink as Breakpoint<FlexShrink>)?.xl,
    // -ORDER-
    [styles[`order-${(order as Breakpoint<Order>)?.xs}@${Size.ExtraSmall}`]]: (
      order as Breakpoint<Order>
    )?.xs,
    // sm
    [styles[`order-${(order as Breakpoint<Order>)?.sm}@${Size.Small}`]]: (
      order as Breakpoint<Order>
    )?.sm,
    // md
    [styles[`order-${(order as Breakpoint<Order>)?.md}@${Size.Medium}`]]: (
      order as Breakpoint<Order>
    )?.md,
    // lg
    [styles[`order-${(order as Breakpoint<Order>)?.lg}@${Size.Large}`]]: (
      order as Breakpoint<Order>
    )?.lg,
    // xl
    [styles[`order-${(order as Breakpoint<Order>)?.xl}@${Size.ExtraLarge}`]]: (
      order as Breakpoint<Order>
    )?.xl,
    // -ALIGN-SELF-
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.xs,
    // sm
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.sm}@${Size.Small}`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.sm,
    // md
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.md}@${Size.Medium}`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.md,
    // lg
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.lg}@${Size.Large}`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.lg,
    // xl
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.xl,
    // Additional class names
    [`${className}`]: className,
  });
  return (
    <div className={classNames} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default FlexItem;
