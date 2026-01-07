import { TableProps } from './types';

import { captionStyle, cellStyle, tableStyle } from './Table.css';

export type { TableColumn, TableProps, TableRow } from './types';

export const Table = ({ columns, data, caption }: TableProps) => {
  return (
    <table className={tableStyle}>
      {caption && <caption className={captionStyle}>{caption}</caption>}
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => {
              const value = row[column.key];
              const cellContent = column.render
                ? column.render(value, row)
                : String(value ?? '');

              return (
                <td
                  key={colIndex}
                  className={cellStyle({
                    bgColor: column.bgColor,
                    align: column.align,
                  })}
                  style={{
                    width: column.width,
                  }}
                >
                  {cellContent}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
