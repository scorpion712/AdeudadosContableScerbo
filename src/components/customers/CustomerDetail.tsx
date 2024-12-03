import { Button, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { AdeudadosMonotributistas, AdeudadosResponsableInscripto, Customer } from "../../models";
import { Fragment } from "react/jsx-runtime";
import { primary } from "../../theme/colors";

interface CustomerDetailProps {
    customer: Customer;
}

export const CustomerDetail = (props: CustomerDetailProps) => {

    const { customer } = props;

    // adeudados where total > 0 | honorarios > 0
    const filteredAdeudados = customer.adeudados.filter(adeudado => adeudado.honorarios && adeudado.honorarios.length > 0 ||

        customer.category === "Monotributista"
        ? (adeudado as AdeudadosMonotributistas).total && Number.parseFloat((adeudado as AdeudadosMonotributistas).total) > 0
        || (adeudado as AdeudadosMonotributistas).honorarios && ((adeudado as AdeudadosMonotributistas).honorarios as string).length > 0
        : (adeudado as AdeudadosResponsableInscripto).total_iibb && ((adeudado as AdeudadosResponsableInscripto).total_iibb as string).length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_autonomos && ((adeudado as AdeudadosResponsableInscripto).total_autonomos as string)?.length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_ganancias && ((adeudado as AdeudadosResponsableInscripto).total_ganancias as string)?.length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_iva && ((adeudado as AdeudadosResponsableInscripto).total_iva as string)?.length > 0
    );

    console.log(JSON.stringify(customer.adeudados), filteredAdeudados)

    const PeriodosAdeudados = () => {
        if (customer.category === "Monotributista")
            return (
                <TableContainer sx={{borderRadius: "10px", backgroundColor: primary.alpha4 }}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }}>Detalle</TableCell>
                                <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }} align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAdeudados.map((adeudado, index) => (
                                <Fragment key={index}>
                                    <TableRow>
                                        <TableCell>Período {adeudado.period.toLocaleDateString()}</TableCell>
                                        <TableCell align="right" sx={{fontWeight: 'bold'}}>${Number.parseFloat((adeudado as AdeudadosMonotributistas).total)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Honorarios</TableCell>
                                        <TableCell align="right" sx={{fontWeight: 'bold'}}>${Number.parseFloat((adeudado as AdeudadosMonotributistas).honorarios ?? "0")}</TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>Total:</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>${filteredAdeudados.reduce((total, adeudado) => (total + Number.parseFloat((adeudado as AdeudadosMonotributistas).total) + Number.parseFloat(adeudado.honorarios)) as number, 0)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            );
        else return (
            <Typography variant="body1">Adeudados: {JSON.stringify(customer.adeudados)}</Typography>
        );
    }

    return (
        <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>Categoría:{customer.category}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>CUIT:{customer.cuit}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">TELÉFONO: {customer.phone}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">Periodos adeudados: {filteredAdeudados.length}</Typography>
            </Grid2>
            <PeriodosAdeudados />
            <Grid2 size={{ xs: 12}} display="flex" justifyContent="flex-end">
                <Button variant="contained" sx={{backgroundColor: primary.main}} onClick={() => console.log("send pdf via whatsapp")}>Enviar</Button>
            </Grid2>
        </Grid2>
    )
}
