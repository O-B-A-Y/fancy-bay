import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import { Breakpoint } from '../../types/style';
import styles from './GridItem.module.scss';

type GridSpanBreakpoint = {
  [key in Size]?: GridSpan;
};

type GridPositionBreakpoint = {
  [key in Size]?: GridPosition;
};

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type JustifySelf = 'start' | 'end' | 'center' | 'stretch';
type AlignSelf = 'start' | 'end' | 'center' | 'stretch';

interface GridItemProps {
  rowSpan?: GridSpanBreakpoint | GridSpan;
  colSpan?: GridSpanBreakpoint | GridSpan;
  rowStart?: GridPositionBreakpoint | GridPosition;
  rowEnd?: GridPositionBreakpoint | GridPosition;
  colStart?: GridPositionBreakpoint | GridPosition;
  colEnd?: GridPositionBreakpoint | GridPosition;
  justifySelf?: Breakpoint<JustifySelf> | JustifySelf;
  alignSelf?: Breakpoint<AlignSelf> | AlignSelf;
  className?: string;
  style?: React.CSSProperties;
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  rowSpan,
  colSpan,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  justifySelf,
  alignSelf,
  className,
  style,
}) => {
  const classNames = clsx({
    // Default Spans & Positions
    [styles[`row-span-${rowSpan}@${Size.NotAvailable}`]]: rowSpan,
    [styles[`col-span-${colSpan}@${Size.NotAvailable}`]]: colSpan,
    [styles[`row-start-${rowStart}@${Size.NotAvailable}`]]: rowStart,
    [styles[`row-end-${rowEnd}@${Size.NotAvailable}`]]: rowEnd,
    [styles[`col-start-${colStart}@${Size.NotAvailable}`]]: colStart,
    [styles[`col-end-${colEnd}@${Size.NotAvailable}`]]: colEnd,
    [styles[`justify-self-${justifySelf}@${Size.NotAvailable}`]]: justifySelf,
    [styles[`align-self-${alignSelf}@${Size.NotAvailable}`]]: alignSelf,
    /* * Responsive Spans * */
    // xs
    [styles[
      `row-span-${(rowSpan as GridSpanBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowSpan as GridSpanBreakpoint)?.xs,
    [styles[`col-span-${colSpan}@${Size.ExtraSmall}`]]: (
      colSpan as GridSpanBreakpoint
    )?.xs,
    // sm
    [styles[`row-span-${(rowSpan as GridSpanBreakpoint)?.sm}@${Size.Small}`]]: (
      rowSpan as GridSpanBreakpoint
    )?.sm,
    [styles[`col-span-${(colSpan as GridSpanBreakpoint)?.sm}@${Size.Small}`]]: (
      colSpan as GridSpanBreakpoint
    )?.sm,
    // md
    [styles[`row-span-${(rowSpan as GridSpanBreakpoint)?.md}@${Size.Medium}`]]:
      (rowSpan as GridSpanBreakpoint)?.md,
    [styles[`col-span-${(colSpan as GridSpanBreakpoint)?.md}@${Size.Medium}`]]:
      (colSpan as GridSpanBreakpoint)?.md,
    // lg
    [styles[`row-span-${(rowSpan as GridSpanBreakpoint)?.lg}@${Size.Large}`]]: (
      rowSpan as GridSpanBreakpoint
    )?.lg,
    [styles[`col-span-${(colSpan as GridSpanBreakpoint)?.lg}@${Size.Large}`]]: (
      colSpan as GridSpanBreakpoint
    )?.lg,
    // xl
    [styles[
      `row-span-${(rowSpan as GridSpanBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowSpan as GridSpanBreakpoint)?.xl,
    [styles[
      `col-span-${(colSpan as GridSpanBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colSpan as GridSpanBreakpoint)?.xl,
    /* * Responsive Positions (Start - End) * */
    // xs
    [styles[
      `row-start-${(rowStart as GridPositionBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowStart as GridPositionBreakpoint)?.xs,
    [styles[
      `row-end-${(rowEnd as GridPositionBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowEnd as GridPositionBreakpoint)?.xs,
    [styles[
      `col-start-${(colStart as GridPositionBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (colStart as GridPositionBreakpoint)?.xs,
    [styles[
      `col-end-${(colEnd as GridPositionBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (colEnd as GridPositionBreakpoint)?.xs,
    // sm
    [styles[
      `row-start-${(rowStart as GridPositionBreakpoint)?.sm}@${Size.Small}`
    ]]: (rowStart as GridPositionBreakpoint)?.sm,
    [styles[`row-end-${(rowEnd as GridPositionBreakpoint)?.sm}@${Size.Small}`]]:
      (rowEnd as GridPositionBreakpoint)?.sm,
    [styles[
      `col-start-${(colStart as GridPositionBreakpoint)?.sm}@${Size.Small}`
    ]]: (colStart as GridPositionBreakpoint)?.sm,
    [styles[`col-end-${(colEnd as GridPositionBreakpoint)?.sm}@${Size.Small}`]]:
      (colEnd as GridPositionBreakpoint)?.sm,
    // md
    [styles[
      `row-start-${(rowStart as GridPositionBreakpoint)?.md}@${Size.Medium}`
    ]]: (rowStart as GridPositionBreakpoint)?.md,
    [styles[
      `row-end-${(rowEnd as GridPositionBreakpoint)?.md}@${Size.Medium}`
    ]]: (rowEnd as GridPositionBreakpoint)?.md,
    [styles[
      `col-start-${(colStart as GridPositionBreakpoint)?.md}@${Size.Medium}`
    ]]: (colStart as GridPositionBreakpoint)?.md,
    [styles[
      `col-end-${(colEnd as GridPositionBreakpoint)?.md}@${Size.Medium}`
    ]]: (colEnd as GridPositionBreakpoint)?.md,
    // lg
    [styles[
      `row-start-${(rowStart as GridPositionBreakpoint)?.lg}@${Size.Large}`
    ]]: (rowStart as GridPositionBreakpoint)?.lg,
    [styles[`row-end-${(rowEnd as GridPositionBreakpoint)?.lg}@${Size.Large}`]]:
      (rowEnd as GridPositionBreakpoint)?.lg,
    [styles[
      `col-start-${(colStart as GridPositionBreakpoint)?.lg}@${Size.Large}`
    ]]: (colStart as GridPositionBreakpoint)?.lg,
    [styles[`col-end-${(colEnd as GridPositionBreakpoint)?.lg}@${Size.Large}`]]:
      (colEnd as GridPositionBreakpoint)?.lg,
    // xl
    [styles[
      `row-start-${(rowStart as GridPositionBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowStart as GridPositionBreakpoint)?.xl,
    [styles[
      `row-end-${(rowEnd as GridPositionBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowEnd as GridPositionBreakpoint)?.xl,
    [styles[
      `col-start-${(colStart as GridPositionBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colStart as GridPositionBreakpoint)?.xl,
    [styles[
      `col-end-${(colEnd as GridPositionBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colEnd as GridPositionBreakpoint)?.xl,
    // --ALIGN-SELF--
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
    // --JUSTIFY-SELF--
    [styles[
      `justify-self-${(justifySelf as Breakpoint<JustifySelf>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.xs,
    // sm
    [styles[
      `justify-self-${(justifySelf as Breakpoint<JustifySelf>)?.sm}@${
        Size.Small
      }`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.sm,
    // md
    [styles[
      `justify-self-${(justifySelf as Breakpoint<JustifySelf>)?.md}@${
        Size.Medium
      }`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.md,
    // lg
    [styles[
      `justify-self-${(justifySelf as Breakpoint<JustifySelf>)?.lg}@${
        Size.Large
      }`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.lg,
    // xl
    [styles[
      `justify-self-${(justifySelf as Breakpoint<JustifySelf>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.xl,
    // Additional class
    [`${className}`]: className,
  });

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default GridItem;
