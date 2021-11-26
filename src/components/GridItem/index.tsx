import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import { Breakpoint } from '../../types/style';
import styles from './GridItem.module.scss';

type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type JustifySelf = 'start' | 'end' | 'center' | 'stretch';
type AlignSelf = 'start' | 'end' | 'center' | 'stretch';

interface GridItemProps {
  rowSpan?: Breakpoint<GridSpan> | GridSpan;
  colSpan?: Breakpoint<GridSpan> | GridSpan;
  rowStart?: Breakpoint<GridPosition> | GridPosition;
  rowEnd?: Breakpoint<GridPosition> | GridPosition;
  colStart?: Breakpoint<GridPosition> | GridPosition;
  colEnd?: Breakpoint<GridPosition> | GridPosition;
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
    // Default Spans & Positions (NA: 0px)
    [styles[
      `row-span-${(rowSpan as Breakpoint<GridSpan>)?.na ?? rowSpan}@${
        Size.NotAvailable
      }`
    ]]: (rowSpan as Breakpoint<GridSpan>)?.na ?? rowSpan,
    [styles[
      `col-span-${(colSpan as Breakpoint<GridSpan>)?.na ?? colSpan}@${
        Size.NotAvailable
      }`
    ]]: (colSpan as Breakpoint<GridSpan>)?.na ?? colSpan,
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.na ?? rowStart}@${
        Size.NotAvailable
      }`
    ]]: (rowStart as Breakpoint<GridPosition>)?.na ?? rowStart,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.na ?? rowEnd}@${
        Size.NotAvailable
      }`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.na ?? rowEnd,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.na ?? colStart}@${
        Size.NotAvailable
      }`
    ]]: (colStart as Breakpoint<GridPosition>)?.na ?? colStart,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.na ?? colEnd}@${
        Size.NotAvailable
      }`
    ]]: (colEnd as Breakpoint<GridPosition>)?.na ?? colEnd,
    [styles[
      `justify-self-${
        (justifySelf as Breakpoint<JustifySelf>)?.na ?? justifySelf
      }@${Size.NotAvailable}`
    ]]: (justifySelf as Breakpoint<JustifySelf>)?.na ?? justifySelf,
    [styles[
      `align-self-${(alignSelf as Breakpoint<AlignSelf>)?.na ?? alignSelf}@${
        Size.NotAvailable
      }`
    ]]: (alignSelf as Breakpoint<AlignSelf>)?.na ?? alignSelf,
    /* * Responsive Spans * */
    // xs
    [styles[
      `row-span-${(rowSpan as Breakpoint<GridSpan>)?.xs}@${Size.ExtraSmall}`
    ]]: (rowSpan as Breakpoint<GridSpan>)?.xs,
    [styles[`col-span-${colSpan}@${Size.ExtraSmall}`]]: (
      colSpan as Breakpoint<GridSpan>
    )?.xs,
    // sm
    [styles[`row-span-${(rowSpan as Breakpoint<GridSpan>)?.sm}@${Size.Small}`]]:
      (rowSpan as Breakpoint<GridSpan>)?.sm,
    [styles[`col-span-${(colSpan as Breakpoint<GridSpan>)?.sm}@${Size.Small}`]]:
      (colSpan as Breakpoint<GridSpan>)?.sm,
    // md
    [styles[
      `row-span-${(rowSpan as Breakpoint<GridSpan>)?.md}@${Size.Medium}`
    ]]: (rowSpan as Breakpoint<GridSpan>)?.md,
    [styles[
      `col-span-${(colSpan as Breakpoint<GridSpan>)?.md}@${Size.Medium}`
    ]]: (colSpan as Breakpoint<GridSpan>)?.md,
    // lg
    [styles[`row-span-${(rowSpan as Breakpoint<GridSpan>)?.lg}@${Size.Large}`]]:
      (rowSpan as Breakpoint<GridSpan>)?.lg,
    [styles[`col-span-${(colSpan as Breakpoint<GridSpan>)?.lg}@${Size.Large}`]]:
      (colSpan as Breakpoint<GridSpan>)?.lg,
    // xl
    [styles[
      `row-span-${(rowSpan as Breakpoint<GridSpan>)?.xl}@${Size.ExtraLarge}`
    ]]: (rowSpan as Breakpoint<GridSpan>)?.xl,
    [styles[
      `col-span-${(colSpan as Breakpoint<GridSpan>)?.xl}@${Size.ExtraLarge}`
    ]]: (colSpan as Breakpoint<GridSpan>)?.xl,
    /* * Responsive Positions (Start - End) * */
    // xs
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (rowStart as Breakpoint<GridPosition>)?.xs,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.xs}@${Size.ExtraSmall}`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.xs,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.xs}@${
        Size.ExtraSmall
      }`
    ]]: (colStart as Breakpoint<GridPosition>)?.xs,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.xs}@${Size.ExtraSmall}`
    ]]: (colEnd as Breakpoint<GridPosition>)?.xs,
    // sm
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.sm}@${Size.Small}`
    ]]: (rowStart as Breakpoint<GridPosition>)?.sm,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.sm}@${Size.Small}`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.sm,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.sm}@${Size.Small}`
    ]]: (colStart as Breakpoint<GridPosition>)?.sm,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.sm}@${Size.Small}`
    ]]: (colEnd as Breakpoint<GridPosition>)?.sm,
    // md
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.md}@${Size.Medium}`
    ]]: (rowStart as Breakpoint<GridPosition>)?.md,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.md}@${Size.Medium}`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.md,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.md}@${Size.Medium}`
    ]]: (colStart as Breakpoint<GridPosition>)?.md,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.md}@${Size.Medium}`
    ]]: (colEnd as Breakpoint<GridPosition>)?.md,
    // lg
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.lg}@${Size.Large}`
    ]]: (rowStart as Breakpoint<GridPosition>)?.lg,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.lg}@${Size.Large}`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.lg,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.lg}@${Size.Large}`
    ]]: (colStart as Breakpoint<GridPosition>)?.lg,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.lg}@${Size.Large}`
    ]]: (colEnd as Breakpoint<GridPosition>)?.lg,
    // xl
    [styles[
      `row-start-${(rowStart as Breakpoint<GridPosition>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (rowStart as Breakpoint<GridPosition>)?.xl,
    [styles[
      `row-end-${(rowEnd as Breakpoint<GridPosition>)?.xl}@${Size.ExtraLarge}`
    ]]: (rowEnd as Breakpoint<GridPosition>)?.xl,
    [styles[
      `col-start-${(colStart as Breakpoint<GridPosition>)?.xl}@${
        Size.ExtraLarge
      }`
    ]]: (colStart as Breakpoint<GridPosition>)?.xl,
    [styles[
      `col-end-${(colEnd as Breakpoint<GridPosition>)?.xl}@${Size.ExtraLarge}`
    ]]: (colEnd as Breakpoint<GridPosition>)?.xl,
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
