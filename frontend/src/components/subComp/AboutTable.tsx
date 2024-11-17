import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));
type detailProp=string | number

function createData(
  name: string,
  detail: detailProp,
) {
  return { name, detail };
}


interface aboutProp{
    id?:string,
    phone?:string,
    email?:string,
    logo?:string,
    companyName?:string,
    companyAdress?:string,
    companyTagline?:string,
    companyDescription?:string
}
export default function AboutTables({about}:{about:aboutProp}) {
    // console.log(about)
    const rows = [
        createData('Company Name', about.companyName ? about.companyName : 'N/A'),
        createData('Phone', about.phone?about.phone:'N/A'),
        createData('Email', about.email?about.email:'N/A'),
        createData('Company Adress', about.companyAdress?about.companyAdress:'N/A'),
        createData('Company Tagline', about.companyTagline?about.companyTagline:'N/A'),
        createData('Company Description', about.companyDescription?about.companyDescription:'N/A'),
    ];
  return (
    <TableContainer className='border shadow-lg shadow-black' >
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Detail</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <StyledTableRow key={row.name} >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.detail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}