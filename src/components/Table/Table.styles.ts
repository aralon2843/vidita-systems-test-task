import { styled } from '@mui/material/styles';
import { Paper, TableCell } from '@mui/material';

export const StyledPaper = styled(Paper)`
  @media (max-width: 768px) {
    border: none;
    box-shadow: none;
  }
`;

export const StyledTableCell = styled(TableCell)`
  border-bottom: none;

  @media (max-width: 768px) {
    display: block;
    padding-bottom: 0px;
  }
`;

export const EmptyTableTitle = styled(StyledTableCell)`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 500;
  font-size: 16px;

  @media (max-width: 768px) {
    left: 25px;
    transform: none;
  }
`;
