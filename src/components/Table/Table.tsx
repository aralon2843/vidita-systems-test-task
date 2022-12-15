import { FC, useState, ChangeEvent } from 'react';
import { Document, TableDocument } from '../../types/document';
import { Table, TableBody, TableCell, TableContainer, TableRow, Checkbox } from '@mui/material';
import AlertDialog from '../Dialog/Dialog';
import TableHeader from '../TableHeader/TableHeader';
import TableSearch from '../TableSearch/TableSearch';
import TableFooter from '../TableFooter/TableFooter';
import { EmptyTableTitle, StyledPaper } from './Table.styles';
import { cancelDocuments } from '../../service/api';
import { Order } from '../../types/order';
import { sortByDeliveryDate } from '../../utils/sortByDeliveryDate';

interface ITable {
  rows: TableDocument[];
}

const DataTable: FC<ITable> = ({ rows }) => {
  const [selected, setSelected] = useState<Pick<Document, 'name' | 'id'>[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<string>('delivery_date');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterData = (query: string, data: TableDocument[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter((object) => {
        const matches = Object.entries(object).filter((key) =>
          key[1].toString().toLowerCase().includes(query)
        );

        return matches.length > 0;
      });
    }
  };
  // ряд сортировок для фильтраций и упрощения вывода таблицы
  const rowsWithAllColumn = rows.map((row) => ({ ...row, all: row.qty * row.sum })); // примешиваем к документу поле all для поиска по этому столбцу
  const translatedStatusRows = rowsWithAllColumn.map((row) =>
    row.status === 'active' ? { ...row, status: 'активный' } : { ...row, status: 'архив' }
  ); // переводим на русский язык поле status, чтобы работал поиск по статусу на русском языке
  const sortedByDeliveryDate = sortByDeliveryDate(translatedStatusRows, order); // сортировка по умолчанию по дате доставки
  const filteredData = filterData(searchQuery, sortedByDeliveryDate); // сортировка по поисковому запросу

  const sumOfVolume = filteredData.reduce((sum, curr) => sum + curr.volume, 0);
  const sumOfQuantity = filteredData.reduce((sum, curr) => sum + curr.qty, 0);

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((document) => ({
        name: document.name,
        id: document.id,
      }));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: string) => selected.map((document) => document.id).indexOf(id) !== -1;

  const handleSelect = (id: string, name: string): void => {
    const isDocumentSelected = isSelected(id);
    let newSelected: Pick<Document, 'id' | 'name'>[] = [];

    if (isDocumentSelected) {
      newSelected = selected.filter((document) => document.id !== id);
    } else {
      newSelected = newSelected.concat(selected, { name, id });
    }

    setSelected(newSelected);
  };

  const handleConfirmDialog = (documentsId: string[]) => {
    cancelDocuments(documentsId);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <TableContainer component={StyledPaper} sx={{ minHeight: '610px' }}>
        <TableSearch setSearchQuery={setSearchQuery} />

        <Table aria-label='Data table' sx={{ position: 'relative' }}>
          <TableHeader
            order={order}
            orderBy={orderBy}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
            handleSelectAllClick={handleSelectAllClick}
            disabledCheckbox={filteredData.length === 0}
            checkedCheckbox={selected.length === filteredData.length && selected.length !== 0}
          />

          {filteredData.length > 0 ? (
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='left'>
                    <Checkbox
                      checked={isSelected(row.id)}
                      onChange={() => handleSelect(row.id, row.name)}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.status}</TableCell>
                  <TableCell align='right'>{row.sum}</TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.volume}</TableCell>
                  <TableCell align='right'>{row.delivery_date}</TableCell>
                  <TableCell align='right'>{row.currency}</TableCell>
                  <TableCell align='right'>
                    {row.all} {row.currency}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <EmptyTableTitle>Ничего не найдено</EmptyTableTitle>
              </TableRow>
            </TableBody>
          )}
        </Table>
        {filteredData.length > 0 && (
          <TableFooter
            sumOfVolume={sumOfVolume}
            sumOfQuantity={sumOfQuantity}
            handleDialogOpen={handleDialogOpen}
            isButtonDisabled={selected.length === 0}
          />
        )}
      </TableContainer>

      <AlertDialog
        open={dialogOpen}
        title={`Вы уверены, что хотите аннулировать ${selected.length === 1 ? 'товар' : 'товары'}?`}
        selected={selected}
        handleClose={handleDialogClose}
        handleConfirm={handleConfirmDialog}
      />
    </>
  );
};

export default DataTable;
