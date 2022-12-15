import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC } from 'react';
import { Order } from '../../types/order';
import { TableDocument } from '../../types/document';
import { StyledHeaderTableCell } from './TableHeader.styles';

interface HeadCell {
  name: keyof TableDocument;
  label: string;
}

const columns: HeadCell[] = [
  {
    name: 'name',
    label: 'Название',
  },
  {
    name: 'status',
    label: 'Статус',
  },
  {
    name: 'sum',
    label: 'Сумма',
  },
  {
    name: 'qty',
    label: 'Количество',
  },
  {
    name: 'volume',
    label: 'Объем',
  },
  {
    name: 'delivery_date',
    label: 'Дата доставки',
  },
  {
    name: 'currency',
    label: 'Валюта',
  },
  {
    name: 'all',
    label: 'Всего',
  },
];

interface ITableHeader {
  order: Order;
  orderBy: string;
  setOrder: (order: Order) => void;
  setOrderBy: (property: string) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabledCheckbox: boolean;
  checkedCheckbox: boolean;
}

const TableHeader: FC<ITableHeader> = ({
  order,
  orderBy,
  setOrder,
  setOrderBy,
  handleSelectAllClick,
  disabledCheckbox,
  checkedCheckbox,
}) => {
  const handleRequestSort = (property: keyof TableDocument) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property: keyof TableDocument) => () => {
    handleRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>
          <Checkbox
            onChange={handleSelectAllClick}
            disabled={disabledCheckbox}
            checked={checkedCheckbox}
          />
        </TableCell>

        {columns.map((col, index) =>
          col.name === 'delivery_date' ? (
            <StyledHeaderTableCell key={col.name + index} align='right'>
              <TableSortLabel
                active={orderBy === col.name}
                direction={orderBy === col.name ? order : 'asc'}
                onClick={createSortHandler(col.name)}
              >
                {col.label}
              </TableSortLabel>
            </StyledHeaderTableCell>
          ) : (
            <TableCell key={col.name + index} align={index === 0 ? 'left' : 'right'}>
              {col.label}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
