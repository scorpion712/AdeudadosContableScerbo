import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { AdeudadosMonotributistas } from "../../models";
import { primary } from "../../theme/colors";

export const MonotributistasDetailTable = ({filteredAdeudados} : {filteredAdeudados: AdeudadosMonotributistas[]}) => {
    return (
        <TableContainer sx={{ borderRadius: "10px", backgroundColor: primary.alpha4 }}>
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
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${Number.parseFloat((adeudado as AdeudadosMonotributistas).total)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Honorarios</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${Number.parseFloat((adeudado as AdeudadosMonotributistas).honorarios ?? "0")}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>Total:</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>${filteredAdeudados.reduce((total, adeudado) => (total + Number.parseFloat((adeudado as AdeudadosMonotributistas).total) + Number.parseFloat(adeudado.honorarios ?? "0")) as number, 0)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}