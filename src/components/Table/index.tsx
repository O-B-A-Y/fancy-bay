import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import styles from './Table.module.scss';

const Table: React.FC<{
  header?: {
    value: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: ReactElement;
  }[];
  items?: {
    data: {
      value: string | number | StaticImageData;
      className?: string;
      style?: React.CSSProperties;
      isHyperLink?: boolean;
      isImage?: boolean;
      link?: string;
    }[];
    href: string;
    onClick?: () => void;
  }[];
  rowStyle?: React.CSSProperties;
  tableClassName?: string;
  headerRowStyle?: React.CSSProperties;
  headerRowClassName?: string;
  rowClassName?: string;
  style?: React.CSSProperties;
  onFieldClick?: () => void;
}> = ({
  header,
  rowStyle,
  style,
  items,
  tableClassName,
  rowClassName,
  headerRowStyle,
  headerRowClassName,
  onFieldClick,
}) => (
  <div style={{ overflowX: 'auto' }}>
    <table className={clsx(styles.container, tableClassName)} style={style}>
      <tbody>
        <tr
          style={headerRowStyle}
          className={clsx(styles.container_item, headerRowClassName)}
        >
          {header?.map((d, index) => (
            <th
              key={`header-${index.toString()}`}
              style={d.style}
              className={d.className}
            >
              <p>
                {d.icon || <></>} {d.value}
              </p>
            </th>
          ))}
        </tr>
        {items?.map((d, index) => (
          <Link key={`index-${index.toString()}`} href={d.href} passHref>
            <tr
              onClick={d.onClick}
              style={rowStyle}
              className={clsx(styles.container_item, rowClassName)}
            >
              {d.data.map((e, dataIndex) => (
                <th
                  key={`data-${dataIndex.toString()}`}
                  onClick={onFieldClick}
                  style={e.style}
                  className={e.className}
                >
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
          </Link>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
