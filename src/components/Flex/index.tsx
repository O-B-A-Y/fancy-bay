/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import { Breakpoint } from '../../types/style';
import styles from './Flex.module.scss';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right';
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface FlexProps {
  direction?: Breakpoint<FlexDirection> | FlexDirection;
  wrap?: Breakpoint<FlexWrap> | FlexWrap;
  justifyContent?: Breakpoint<JustifyContent> | JustifyContent;
  alignItems?: Breakpoint<AlignItems> | AlignItems;
  alignContent?: Breakpoint<AlignContent> | AlignContent;
  rowGap?: Breakpoint<GapSize> | GapSize;
  colGap?: Breakpoint<GapSize> | GapSize;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Flex: React.FC<FlexProps> = ({
  children,
  direction,
  wrap,
  justifyContent,
  alignItems,
  alignContent,
  rowGap,
  colGap,
  className,
  style,
  onClick,
}) => {
  const classNames = clsx({
    // Default
    [styles.flex]: true,
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.na ?? direction}@${
        Size.NotAvailable
      }`
    ]]: (direction as Breakpoint<FlexDirection>)?.na ?? direction,
    [styles[
      `flex-${(wrap as Breakpoint<FlexWrap>)?.na ?? wrap}@${Size.NotAvailable}`
    ]]: (wrap as Breakpoint<FlexWrap>)?.na ?? wrap,
    [styles[
      `justify-content-${
        (justifyContent as Breakpoint<JustifyContent>)?.na ?? justifyContent
      }@${Size.NotAvailable}`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.na ?? justifyContent,
    [styles[
      `align-items-${
        (alignItems as Breakpoint<AlignItems>)?.na ?? alignItems
      }@${Size.NotAvailable}`
    ]]: (alignItems as Breakpoint<AlignItems>)?.na ?? alignItems,
    [styles[
      `align-content-${
        (alignContent as Breakpoint<AlignContent>)?.na ?? alignContent
      }@${Size.NotAvailable}`
    ]]: (alignContent as Breakpoint<AlignContent>)?.na ?? alignContent,
    [styles[
      `gap-row-${(rowGap as Breakpoint<GapSize>)?.na ?? rowGap}@${
        Size.NotAvailable
      }`
    ]]: (rowGap as Breakpoint<GapSize>)?.na ?? rowGap,
    [styles[
      `gap-col-${(colGap as Breakpoint<GapSize>)?.na ?? colGap}@${
        Size.NotAvailable
      }`
    ]]: (colGap as Breakpoint<GapSize>)?.na ?? colGap,

    /* * Breakpoints * */
    // --DIRECTION--
    // xs
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.xs}@${Size.ExtraSmall}`
    ]]: (direction as Breakpoint<FlexDirection>)?.xs,
    // sm
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.sm}@${Size.Small}`
    ]]: (direction as Breakpoint<FlexDirection>)?.sm,
    // md
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.md}@${Size.Medium}`
    ]]: (direction as Breakpoint<FlexDirection>)?.md,
    // lg
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.lg}@${Size.Large}`
    ]]: (direction as Breakpoint<FlexDirection>)?.lg,
    // xl
    [styles[
      `flex-${(direction as Breakpoint<FlexDirection>)?.xl}@${Size.ExtraLarge}`
    ]]: (direction as Breakpoint<FlexDirection>)?.xl,
    // --WRAP--
    // xs
    [styles[`flex-${(wrap as Breakpoint<FlexWrap>)?.xs}@${Size.ExtraSmall}`]]: (
      wrap as Breakpoint<FlexWrap>
    )?.xs,
    // sm
    [styles[`flex-${(wrap as Breakpoint<FlexWrap>)?.sm}@${Size.Small}`]]: (
      wrap as Breakpoint<FlexWrap>
    )?.sm,
    // md
    [styles[`flex-${(wrap as Breakpoint<FlexWrap>)?.md}@${Size.Medium}`]]: (
      wrap as Breakpoint<FlexWrap>
    )?.md,
    // lg
    [styles[`flex-${(wrap as Breakpoint<FlexWrap>)?.lg}@${Size.Large}`]]: (
      wrap as Breakpoint<FlexWrap>
    )?.lg,
    // xl
    [styles[`flex-${(wrap as Breakpoint<FlexWrap>)?.xl}@${Size.ExtraLarge}`]]: (
      wrap as Breakpoint<FlexWrap>
    )?.xl,
    // --JUSTIFY-CONTENT--
    // xs
    [styles[
      `justify-content-${(justifyContent as Breakpoint<JustifyContent>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.xs,
    // sm
    [styles[
      `justify-content-${(justifyContent as Breakpoint<JustifyContent>)?.sm}@${
        Size.Small
      }`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.sm,
    // md
    [styles[
      `justify-content-${(justifyContent as Breakpoint<JustifyContent>)?.md}@${
        Size.Medium
      }`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.md,
    // lg
    [styles[
      `justify-content-${(justifyContent as Breakpoint<JustifyContent>)?.lg}@${
        Size.Large
      }`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.lg,
    // xl
    [styles[
      `justify-content-${(justifyContent as Breakpoint<JustifyContent>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (justifyContent as Breakpoint<JustifyContent>)?.xl,
    // -ALIGN-ITEMS--
    // xs
    [styles[
      `align-items-${(alignItems as Breakpoint<AlignItems>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (alignItems as Breakpoint<AlignItems>)?.xs,
    // sm
    [styles[
      `align-items-${(alignItems as Breakpoint<AlignItems>)?.sm}@${Size.Small}`
    ]]: (alignItems as Breakpoint<AlignItems>)?.sm,
    // md
    [styles[
      `align-items-${(alignItems as Breakpoint<AlignItems>)?.md}@${Size.Medium}`
    ]]: (alignItems as Breakpoint<AlignItems>)?.md,
    // lg
    [styles[
      `align-items-${(alignItems as Breakpoint<AlignItems>)?.lg}@${Size.Large}`
    ]]: (alignItems as Breakpoint<AlignItems>)?.lg,
    // xl
    [styles[
      `align-items-${(alignItems as Breakpoint<AlignItems>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (alignItems as Breakpoint<AlignItems>)?.xl,
    // --ALIGN-CONTENT--
    // xs
    [styles[
      `align-content-${(alignContent as Breakpoint<AlignContent>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (alignContent as Breakpoint<AlignContent>)?.xs,
    // sm
    [styles[
      `align-content-${(alignContent as Breakpoint<AlignContent>)?.sm}@${
        Size.Small
      }`
    ]]: (alignContent as Breakpoint<AlignContent>)?.sm,
    // md
    [styles[
      `align-content-${(alignContent as Breakpoint<AlignContent>)?.md}@${
        Size.Medium
      }`
    ]]: (alignContent as Breakpoint<AlignContent>)?.md,
    // lg
    [styles[
      `align-content-${(alignContent as Breakpoint<AlignContent>)?.lg}@${
        Size.Large
      }`
    ]]: (alignContent as Breakpoint<AlignContent>)?.lg,
    // xl
    [styles[
      `align-content-${(alignContent as Breakpoint<AlignContent>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (alignContent as Breakpoint<AlignContent>)?.xl,
    // --GAP-ROW--
    // xs
    [styles[
      `gap-row-${(rowGap as Breakpoint<GapSize>)?.xs}@${Size.ExtraSmall}`
    ]]: (rowGap as Breakpoint<GapSize>)?.xs,
    // sm
    [styles[`gap-row-${(rowGap as Breakpoint<GapSize>)?.sm}@${Size.Small}`]]: (
      rowGap as Breakpoint<GapSize>
    )?.sm,
    // md
    [styles[`gap-row-${(rowGap as Breakpoint<GapSize>)?.md}@${Size.Medium}`]]: (
      rowGap as Breakpoint<GapSize>
    )?.md,
    // lg
    [styles[`gap-row-${(rowGap as Breakpoint<GapSize>)?.lg}@${Size.Large}`]]: (
      rowGap as Breakpoint<GapSize>
    )?.lg,
    // xl
    [styles[
      `gap-row-${(rowGap as Breakpoint<GapSize>)?.xl}@${Size.ExtraLarge}`
    ]]: (rowGap as Breakpoint<GapSize>)?.xl,
    // --GAP-COL--
    // xs
    [styles[
      `gap-col-${(colGap as Breakpoint<GapSize>)?.xs}@${Size.ExtraSmall}`
    ]]: (colGap as Breakpoint<GapSize>)?.xs,
    // sm
    [styles[`gap-col-${(colGap as Breakpoint<GapSize>)?.sm}@${Size.Small}`]]: (
      colGap as Breakpoint<GapSize>
    )?.sm,
    // md
    [styles[`gap-col-${(colGap as Breakpoint<GapSize>)?.md}@${Size.Medium}`]]: (
      colGap as Breakpoint<GapSize>
    )?.md,
    // lg
    [styles[`gap-col-${(colGap as Breakpoint<GapSize>)?.lg}@${Size.Large}`]]: (
      colGap as Breakpoint<GapSize>
    )?.lg,
    // xl
    [styles[
      `gap-col-${(colGap as Breakpoint<GapSize>)?.xl}@${Size.ExtraLarge}`
    ]]: (colGap as Breakpoint<GapSize>)?.xl,
    // Additional class names
    [`${className}`]: className,
  });
  return (
    <div className={classNames} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Flex;
