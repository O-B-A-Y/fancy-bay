import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import { Breakpoint } from '../../types/style';
import styles from './Grid.module.scss';

type GridBreakpoint = {
  [key in Size]?: Cols | Rows;
};

type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type AlignItems = 'start' | 'end' | 'center' | 'stretch';
type AlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';
type JustifyItems = 'start' | 'end' | 'center' | 'stretch';

type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

interface GridProps {
  rows?: GridBreakpoint | Rows;
  cols?: GridBreakpoint | Cols;
  rowGap?: Breakpoint<GapSize> | GapSize;
  colGap?: Breakpoint<GapSize> | GapSize;
  flowRow?: boolean;
  flowCol?: boolean;
  justifyItems?: Breakpoint<JustifyContent> | JustifyItems;
  alignItems?: Breakpoint<AlignItems> | AlignItems;
  alignContent?: Breakpoint<AlignContent> | AlignContent;
  justifyContent?: Breakpoint<JustifyContent> | JustifyContent;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * React Component for CSS Grid
 * @param props Properties for Grid container
 * @returns Grid component
 */
const Grid: React.FC<GridProps> = ({
  children,
  rows,
  cols,
  rowGap,
  colGap,
  flowRow,
  flowCol,
  justifyItems,
  alignItems,
  alignContent,
  justifyContent,
  className,
  style,
}) => {
  const classNames = clsx({
    [styles.grid]: children,
    // Default
    [styles[`grid-rows-${rows}@${Size.NotAvailable}`]]: rows,
    [styles[`grid-cols-${cols}@${Size.NotAvailable}`]]: cols,
    [styles[`gap-row-${rowGap}@${Size.NotAvailable}`]]: rowGap,
    [styles[`gap-col-${colGap}@${Size.NotAvailable}`]]: colGap,
    [styles[`justify-content-${justifyContent}@${Size.NotAvailable}`]]:
      justifyContent,
    [styles[`align-items-${alignItems}@${Size.NotAvailable}`]]: alignItems,
    [styles[`justify-items-${justifyItems}@${Size.NotAvailable}`]]:
      justifyItems,
    [styles[`align-content-${alignContent}@${Size.NotAvailable}`]]:
      alignContent,
    // Responsive rows
    [styles[`grid-rows-${(rows as GridBreakpoint).xs}@${Size.ExtraSmall}`]]: (
      rows as GridBreakpoint
    )?.xs,
    [styles[`grid-rows-${(rows as GridBreakpoint)?.sm}@${Size.Small}`]]: (
      rows as GridBreakpoint
    )?.sm,
    [styles[`grid-rows-${(rows as GridBreakpoint)?.md}@${Size.Medium}`]]: (
      rows as GridBreakpoint
    )?.md,
    [styles[`grid-rows-${(rows as GridBreakpoint)?.lg}@${Size.Large}`]]: (
      rows as GridBreakpoint
    )?.lg,
    [styles[`grid-rows-${(rows as GridBreakpoint)?.xl}@${Size.ExtraLarge}`]]: (
      rows as GridBreakpoint
    )?.xl,
    // Responsive columns
    [styles[`grid-cols-${(cols as GridBreakpoint)?.xs}@${Size.ExtraSmall}`]]: (
      cols as GridBreakpoint
    )?.xs,
    [styles[`grid-cols-${(cols as GridBreakpoint)?.sm}@${Size.Small}`]]: (
      cols as GridBreakpoint
    )?.sm,
    [styles[`grid-cols-${(cols as GridBreakpoint)?.md}@${Size.Medium}`]]: (
      cols as GridBreakpoint
    )?.md,
    [styles[`grid-cols-${(cols as GridBreakpoint)?.lg}@${Size.Large}`]]: (
      cols as GridBreakpoint
    )?.lg,
    [styles[`grid-cols-${(cols as GridBreakpoint)?.xl}@${Size.ExtraLarge}`]]: (
      cols as GridBreakpoint
    )?.xl,
    // Placements styles
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
    // --JUSTIFY-ITEMS--
    // xs
    [styles[
      `justify-items-${(justifyItems as Breakpoint<JustifyItems>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (justifyItems as Breakpoint<JustifyItems>)?.xs,
    // sm
    [styles[
      `justify-items-${(justifyItems as Breakpoint<JustifyItems>)?.sm}@${
        Size.Small
      }`
    ]]: (justifyItems as Breakpoint<JustifyItems>)?.sm,
    // md
    [styles[
      `justify-items-${(justifyItems as Breakpoint<JustifyItems>)?.md}@${
        Size.Medium
      }`
    ]]: (justifyItems as Breakpoint<JustifyItems>)?.md,
    // lg
    [styles[
      `justify-items-${(justifyItems as Breakpoint<JustifyItems>)?.lg}@${
        Size.Large
      }`
    ]]: (justifyItems as Breakpoint<JustifyItems>)?.lg,
    // xl
    [styles[
      `justify-items-${(justifyItems as Breakpoint<JustifyItems>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (justifyItems as Breakpoint<JustifyItems>)?.xl,
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
    // Others
    [styles[`grid-flow-row`]]: flowRow,
    [styles[`grid-flow-col`]]: flowCol,
    // Additional class names
    [`${className}`]: className,
  });

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default Grid;
