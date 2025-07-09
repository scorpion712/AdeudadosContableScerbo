import { WhatsApp } from "@mui/icons-material";
import { Checkbox, FormControlLabel, FormGroup, IconButton, Paper, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material"
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';

import { primary } from "../../theme/colors";
import { Customer } from "../../models";
import { usePopUp } from "../../hooks";
import { CustomerDetail } from "./CustomerDetail";
import { SendMessagePopUp } from "./SendMessagePopUp";

interface CustomersTableContainerProps {
    customers: Customer[];
    search: string;
    selectedCustomers: Customer[];
    setSelectedCustomers: (customers: Customer[]) => void;
}

export const CustomersTableContainer = (props: CustomersTableContainerProps) => {

    const { customers, search, selectedCustomers, setSelectedCustomers } = props;

    const { showPopUp } = usePopUp();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showCustomerDetail = (customer: Customer) => {
        showPopUp(customer.name, <CustomerDetail customer={customer} />, "md");
    }

    const sendWhatsApp = (customer: Customer) => {
        showPopUp(`Enviar informe a ${customer.name}`, <SendMessagePopUp customer={customer} />, "md");
    }


    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedCustomers([...customers]);
        } else {
            setSelectedCustomers([]);
        }
    }

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomers(selectedCustomers.find(c => c.cuit.toString().includes(customer.cuit))
            ? selectedCustomers.filter(c => !c.cuit.toString().includes(customer.cuit))
            : [...selectedCustomers, customer]);
    }

    useEffect(() => {
    }, [selectedCustomers, search])

    return (
        <Paper sx={{ width: '100%', p: 2, minHeight: 400 }}>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: primary.alpha30, color: primary.darkest }}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleSelectAll} checked={selectedCustomers.length == customers.length} defaultValue={undefined} />} label="Todos" />
                                </FormGroup>
                            </TableCell>
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
                                    <TableCell>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox onChange={() => handleSelectCustomer(customer)}
                                                checked={selectedCustomers.find(c => c.cuit.toString().includes(customer.cuit)) ? true : false} />} label='' />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.cuit}</TableCell>
                                    <TableCell>{customer.category}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Ver detalle">
                                            <IconButton onClick={() => showCustomerDetail(customer)}>
                                                <SvgIcon>
                                                    <PreviewIcon color="secondary" />
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Envíar pdf por WhatsApp">
                                            <IconButton onClick={() => sendWhatsApp(customer)}>
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

        </Paper >
    );
};