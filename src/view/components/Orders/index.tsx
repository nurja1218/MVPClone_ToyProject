import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useStyles } from './style';
import { singleTransport, TableRowData, TableData, TableColumn } from '../../../types/interface'
import moment from 'moment';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

function TableContentsCell({ columns, rowData }: any) {
    return (
        columns.map((column: TableColumn, idx: number) => (
            <TableCell key={`c${idx}`}>{rowData[column.dataIndex]}</TableCell>
        ))
    );
}


export default function Orders(props: any) {
    const currentPage = window.location.href.split('/').reverse()[0];
    const { columns, data, getValue, initPage }: any = props;
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(initPage);

    const classes = useStyles();

    const handleCellClick = (e: any) => {
        if (currentPage === 'main') {
            getValue(e.currentTarget.getAttribute("data-rowid"))
        }
        getValue(e.currentTarget.getAttribute("data-rowid"))
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((column: TableColumn) => (
                            <TableCell key={column.title}>{column.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length !== 0 && (
                        data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: TableRowData) => {
                                return (
                                    <TableRow hover className={classes.tableRow} key={row.key} data-rowid={row.key} onClick={handleCellClick} >
                                        <TableContentsCell columns={columns} rowData={row} />
                                    </TableRow>
                                );
                            }))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment >
    );
}

