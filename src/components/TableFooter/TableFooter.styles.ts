import { styled } from '@mui/material/styles';
import { TableFooter } from '@mui/material';

export const StyledTableFooter = styled(TableFooter)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
    padding-bottom: 20px;
  }
`;
