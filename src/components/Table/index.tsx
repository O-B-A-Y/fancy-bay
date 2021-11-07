import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import styles from './Table.module.scss';

const Table: React.FC<{
  header?: {
    value: string;
    className?: string;
    style?: React.CSSProperties;
  }[];
  data?: {
    value: string | number | StaticImageData;
    className?: string;
    style?: React.CSSProperties;
    isHyperLink?: boolean;
    isImage?: boolean;
    link?: string;
  }[][];
  rowStyle?: React.CSSProperties;
  headerRowStyle?: React.CSSProperties;
  headerRowClassName?: string;
  rowClassName?: string;
  style?: React.CSSProperties;
  onFieldClick?: () => void;
}> = ({
  header,
  rowStyle,
  style,
  data,
  rowClassName,
  headerRowStyle,
  headerRowClassName,
  onFieldClick,
}) => (
  <>
    <table className={clsx(styles.container)} style={style}>
      <tr
        style={headerRowStyle}
        className={clsx(styles.container_item, headerRowClassName)}
      >
        {header?.map((d) => (
          <th style={d.style} className={d.className}>
            <p>{d.value}</p>
          </th>
        ))}
      </tr>
      {data?.map((d) => (
        <tr
          style={rowStyle}
          className={clsx(styles.container_item, rowClassName)}
        >
          {d.map((e) => (
            <th onClick={onFieldClick} style={e.style} className={e.className}>
              {(e.isHyperLink && <a href={e.link}>{e.value}</a>) ||
                (e.isImage && (
                  <Image
                    src={e.value as StaticImageData}
                    width={40}
                    height={40}
                  />
                )) || <p>{e.value}</p>}
            </th>
          ))}
        </tr>
      ))}
    </table>
  </>
);

export default Table;
