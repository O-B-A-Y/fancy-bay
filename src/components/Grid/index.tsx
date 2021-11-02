import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import styles from './Grid.module.scss';

type GridBreakpoint = {
  [key in Size]?: Cols | Rows;
};

type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Rows = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type JustifyItems = 'start' | 'end' | 'center' | 'stretch';
type AlignItems = 'start' | 'end' | 'center' | 'stretch';
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
  rowGap?: GapSize;
  colGap?: GapSize;
  flowRow?: boolean;
  flowCol?: boolean;
  justifyItems?: JustifyItems;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
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
  justifyContent,
  style,
}) => {
  const classNames = clsx({
    [styles.grid]: children,
    // Default rows & columns
    [styles[`grid-rows-${rows}@${Size.NotAvailable}`]]: rows,
    [styles[`grid-cols-${cols}@${Size.NotAvailable}`]]: cols,
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
    [styles[`gap-row-${rowGap}`]]: rowGap,
    [styles[`gap-col-${colGap}`]]: colGap,
    [styles[`grid-flow-row`]]: flowRow,
    [styles[`grid-flow-col`]]: flowCol,
    [styles[`justify-items-${justifyItems}`]]: justifyItems,
    [styles[`align-items-${alignItems}`]]: alignItems,
    [styles[`justify-content-${justifyContent}`]]: justifyContent,
  });

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default Grid;
