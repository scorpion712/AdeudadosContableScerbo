import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { AdeudadosMonotributistas, PlanDePago } from "../../models";
import { primary } from "../../theme/colors";
import { formatPrice } from "../../utils";

interface Props {
    filteredAdeudados: AdeudadosMonotributistas[],
    honorarios?: string,
    planes: PlanDePago[]
}

export const MonotributistasDetailTable = (props: Props) => {

    const { filteredAdeudados, honorarios, planes } = props;
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
                            <TableRow sx={{ backgroundColor: primary.alpha12 }}>
                                <TableCell>{adeudado.period}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice(Number.parseFloat((adeudado as AdeudadosMonotributistas).total))}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                    {planes?.map((plan, index) => (
                        <Fragment key={index}>
                            <TableRow sx={{ backgroundColor: primary.alpha12 }}>
                                <TableCell>{plan.period}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice(Number.parseFloat(plan.total))}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                    <TableRow sx={{ backgroundColor: primary.alpha12 }}>
                        <TableCell>Honorarios</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice(Number.parseFloat(honorarios ?? "0"))}</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>Total:</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>
                            ${formatPrice(filteredAdeudados.reduce((total, adeudado) => (total
                                + Number.parseFloat((adeudado as AdeudadosMonotributistas).total)), 0)
                                + Number.parseFloat(!honorarios || honorarios == '' ? '0' : honorarios)
                                + planes.reduce((total, plan) => (total + Number.parseFloat(plan.total)), 0))}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}