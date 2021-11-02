import clsx from 'clsx';
import React from 'react';
import Size from '../../constants/size';
import styles from './GridItem.module.scss';

// type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type GridItemBreakpoint = {
  [key in Size]?: GridSpans | GridPosition;
};

type GridSpans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type JustifySelf = 'start' | 'end' | 'center' | 'stretch';
type AlignSelf = 'start' | 'end' | 'center' | 'stretch';

interface GridItemProps {
  rowSpan?: GridItemBreakpoint | GridSpans;
  colSpan?: GridItemBreakpoint | GridSpans;
  rowStart?: GridItemBreakpoint | GridPosition;
  rowEnd?: GridItemBreakpoint | GridPosition;
  colStart?: GridItemBreakpoint | GridPosition;
  colEnd?: GridItemBreakpoint | GridPosition;
  justifySelf?: JustifySelf;
  alignSelf?: AlignSelf;
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
  style,
}) => {
  const classNames = clsx({
    // Default Spans & Positions
    [styles[`row-span-${rowSpan}@${Size.ExtraSmall}`]]: rowSpan,
    [styles[`col-span-${colSpan}@${Size.ExtraSmall}`]]: colSpan,
    [styles[`row-start-${rowStart}@${Size.ExtraSmall}`]]: rowStart,
    [styles[`row-end-${rowEnd}@${Size.ExtraSmall}`]]: rowEnd,
    [styles[`col-start-${colStart}@${Size.ExtraSmall}`]]: colStart,
    [styles[`col-end-${colEnd}@${Size.ExtraSmall}`]]: colEnd,
    /* * Responsive Spans * */
    // xs
    [styles[
      `row-span-${(rowSpan as GridItemBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowSpan as GridItemBreakpoint)?.xs,
    [styles[`col-span-${colSpan}@${Size.ExtraSmall}`]]: (
      colSpan as GridItemBreakpoint
    )?.xs,
    // sm
    [styles[`row-span-${(rowSpan as GridItemBreakpoint)?.sm}@${Size.Small}`]]: (
      rowSpan as GridItemBreakpoint
    )?.sm,
    [styles[`col-span-${(colSpan as GridItemBreakpoint)?.sm}@${Size.Small}`]]: (
      colSpan as GridItemBreakpoint
    )?.sm,
    // md
    [styles[`row-span-${(rowSpan as GridItemBreakpoint)?.md}@${Size.Medium}`]]:
      (rowSpan as GridItemBreakpoint)?.md,
    [styles[`col-span-${(colSpan as GridItemBreakpoint)?.md}@${Size.Medium}`]]:
      (colSpan as GridItemBreakpoint)?.md,
    // lg
    [styles[`row-span-${(rowSpan as GridItemBreakpoint)?.lg}@${Size.Large}`]]: (
      rowSpan as GridItemBreakpoint
    )?.lg,
    [styles[`col-span-${(colSpan as GridItemBreakpoint)?.lg}@${Size.Large}`]]: (
      colSpan as GridItemBreakpoint
    )?.lg,
    // xl
    [styles[
      `row-span-${(rowSpan as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowSpan as GridItemBreakpoint)?.xl,
    [styles[
      `col-span-${(colSpan as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colSpan as GridItemBreakpoint)?.xl,
    /* * Responsive Positions (Start - End) * */
    // xs
    [styles[
      `row-start-${(rowStart as GridItemBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowStart as GridItemBreakpoint)?.xs,
    [styles[
      `row-end-${(rowEnd as GridItemBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (rowEnd as GridItemBreakpoint)?.xs,
    [styles[
      `col-start-${(colStart as GridItemBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (colStart as GridItemBreakpoint)?.xs,
    [styles[
      `col-end-${(colEnd as GridItemBreakpoint)?.xs}@${Size.ExtraSmall}`
    ]]: (colEnd as GridItemBreakpoint)?.xs,
    // sm
    [styles[`row-start-${(rowStart as GridItemBreakpoint)?.sm}@${Size.Small}`]]:
      (rowStart as GridItemBreakpoint)?.sm,
    [styles[`row-end-${(rowEnd as GridItemBreakpoint)?.sm}@${Size.Small}`]]: (
      rowEnd as GridItemBreakpoint
    )?.sm,
    [styles[`col-start-${(colStart as GridItemBreakpoint)?.sm}@${Size.Small}`]]:
      (colStart as GridItemBreakpoint)?.sm,
    [styles[`col-end-${(colEnd as GridItemBreakpoint)?.sm}@${Size.Small}`]]: (
      colEnd as GridItemBreakpoint
    )?.sm,
    // md
    [styles[
      `row-start-${(rowStart as GridItemBreakpoint)?.md}@${Size.Medium}`
    ]]: (rowStart as GridItemBreakpoint)?.md,
    [styles[`row-end-${(rowEnd as GridItemBreakpoint)?.md}@${Size.Medium}`]]: (
      rowEnd as GridItemBreakpoint
    )?.md,
    [styles[
      `col-start-${(colStart as GridItemBreakpoint)?.md}@${Size.Medium}`
    ]]: (colStart as GridItemBreakpoint)?.md,
    [styles[`col-end-${(colEnd as GridItemBreakpoint)?.md}@${Size.Medium}`]]: (
      colEnd as GridItemBreakpoint
    )?.md,
    // lg
    [styles[`row-start-${(rowStart as GridItemBreakpoint)?.lg}@${Size.Large}`]]:
      (rowStart as GridItemBreakpoint)?.lg,
    [styles[`row-end-${(rowEnd as GridItemBreakpoint)?.lg}@${Size.Large}`]]: (
      rowEnd as GridItemBreakpoint
    )?.lg,
    [styles[`col-start-${(colStart as GridItemBreakpoint)?.lg}@${Size.Large}`]]:
      (colStart as GridItemBreakpoint)?.lg,
    [styles[`col-end-${(colEnd as GridItemBreakpoint)?.lg}@${Size.Large}`]]: (
      colEnd as GridItemBreakpoint
    )?.lg,
    // xl
    [styles[
      `row-start-${(rowStart as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowStart as GridItemBreakpoint)?.xl,
    [styles[
      `row-end-${(rowEnd as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (rowEnd as GridItemBreakpoint)?.xl,
    [styles[
      `col-start-${(colStart as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colStart as GridItemBreakpoint)?.xl,
    [styles[
      `col-end-${(colEnd as GridItemBreakpoint)?.xl}@${Size.ExtraLarge}`
    ]]: (colEnd as GridItemBreakpoint)?.xl,
    // Justify Self
    [styles[`justify-self-${justifySelf}`]]: justifySelf,
    // Align Self
    [styles[`align-self-${alignSelf}`]]: alignSelf,
  });
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default GridItem;
