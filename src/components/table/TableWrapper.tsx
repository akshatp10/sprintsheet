import { cn } from '@/lib/cn';

import TableHeader from './TableHeader';
import type { TableColumn } from './TableHeader';

interface TableWrapperProps {
  /**
   * Column definitions used to build the table header and determine
   * each column's width and position in the shared grid layout.
   */
  columns: TableColumn[];

  /**
   * Table body content rendered below the header, typically consisting
   * of table rows or other row-level components.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes applied to the outer table wrapper, allowing
   * its dimensions, overflow, border radius, or other container styles
   * to be customized.
   */
  className?: string;

  /**
   * Additional CSS classes applied to the table header container,
   * allowing its layout and visual styling to be customized.
   */
  headerClassName?: string;

  /**
   * Additional CSS classes applied to the individual header cells,
   * allowing their typography, spacing, alignment, or other styles
   * to be customized.
   */
  headerCellClassName?: string;

  /**
   * Controls whether the table header is rendered above the table body.
   * Defaults to `true`.
   */
  showHeader?: boolean;
}

const TableWrapper = ({
  columns,
  children,
  className,
  headerClassName,
  headerCellClassName,
  showHeader = true,
}: TableWrapperProps) => {
  const gridTemplateColumns = columns.map((column) => column.width).join(' ');

  return (
    <div className={cn('w-full h-full overflow-y-auto', className)}>
      {showHeader && (
        <TableHeader
          columns={columns}
          gridTemplateColumns={gridTemplateColumns}
          className={headerClassName}
          cellClassName={headerCellClassName}
        />
      )}

      {children}
    </div>
  );
};

export default TableWrapper;
