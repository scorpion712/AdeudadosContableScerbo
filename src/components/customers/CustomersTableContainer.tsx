import { WhatsApp } from "@mui/icons-material";
import { IconButton, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material"
import { useState } from "react";

import { primary } from "../../theme/colors";
import { Customer } from "../../models";

interface CustomersTableContainerProps {
    customers: Customer[];
    search: string;
}

export const CustomersTableContainer = (props: CustomersTableContainerProps) => {

    const { customers, search } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', p: 2, minHeight: 400 }}>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>Cliente</TableCell>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>CUIT</TableCell>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>Categoría</TableCell>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>Teléfono</TableCell>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.filter((customer) => customer.cuit.toString().includes(search) || customer.name.toString().toLowerCase().includes(search.toLowerCase()))
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.cuit}</TableCell>
                                    <TableCell>{customer.category}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Envíar pdf por WhatsApp">
                                            <IconButton onClick={() => console.log("Enviar pdf por WhatsApp")}>
                                                <SvgIcon>
                                                    <WhatsApp color="success" />
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Clientes por página"
                labelDisplayedRows={({ from, to }) => `${from}-${to} de ${customers.length}`}
            />

        </Paper>
    );
};