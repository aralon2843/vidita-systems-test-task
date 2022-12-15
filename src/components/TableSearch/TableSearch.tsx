import { FC, ChangeEvent } from 'react';
import { InputAdornment, Table, TableBody, TableRow } from '@mui/material';
import { Search } from '@mui/icons-material';
import { StyledTableCell } from '../Table/Table.styles';
import { StyledTextField } from './TableSearch.styles';

interface ITableSearch {
  setSearchQuery: (query: string) => void;
}

const TableSearch: FC<ITableSearch> = ({ setSearchQuery }) => {
  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <StyledTableCell align='left'>
            <StyledTextField
              placeholder='Поиск по таблице'
              type={'search'}
              variant='standard'
              margin='normal'
              onInput={handleInputSearch}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </StyledTableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableSearch;
