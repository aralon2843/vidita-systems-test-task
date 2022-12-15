import { Button, Table, TableRow } from '@mui/material';
import { FC } from 'react';
import { StyledTableCell } from '../Table/Table.styles';
import { StyledTableFooter } from './TableFooter.styles';

interface ITableFooter {
  sumOfVolume: number;
  sumOfQuantity: number;
  handleDialogOpen: () => void;
  isButtonDisabled: boolean;
}

const TableFooter: FC<ITableFooter> = ({
  sumOfVolume,
  sumOfQuantity,
  handleDialogOpen,
  isButtonDisabled,
}) => {
  return (
    <Table>
      <StyledTableFooter>
        <TableRow>
          <StyledTableCell>Общий объем: {sumOfVolume}</StyledTableCell>
          <StyledTableCell>Общее количество: {sumOfQuantity}</StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell>
            <Button
              disabled={isButtonDisabled}
              variant='contained'
              color='error'
              size='medium'
              onClick={handleDialogOpen}
            >
              Аннулировать
            </Button>
          </StyledTableCell>
        </TableRow>
      </StyledTableFooter>
    </Table>
  );
};

export default TableFooter;
