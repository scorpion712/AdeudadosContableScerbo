import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from "@mui/material"
import { Fragment } from "react/jsx-runtime"

import { AdeudadosResponsableInscripto, PlanDePago } from "../../models"
import { primary } from "../../theme/colors"
import { formatPrice } from "../../utils"

interface Props {
    filteredAdeudados: AdeudadosResponsableInscripto[],
    honorarios?: string,
    planes: PlanDePago[]
}

export const ResponsableInscriptoDetailTable = (props: Props) => {

    const { filteredAdeudados, honorarios, planes } = props;

    return (
        <TableContainer sx={{ borderRadius: "10px", backgroundColor: primary.alpha4 }}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }}>Detalle</TableCell>
                        <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }} align="right">IVA</TableCell>
                        <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }} align="right">IIBB</TableCell>
                        <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }} align="right">Autónomos</TableCell>
                        <TableCell style={{ backgroundColor: primary.alpha50, color: primary.darkest, fontSize: "16px" }} align="right">Ganancias</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAdeudados.map((adeudado, index) => (
                        <Fragment key={index}>
                            <TableRow>
                                <TableCell>{adeudado.period}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice((adeudado as AdeudadosResponsableInscripto).total_iva ?? "0")}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice((adeudado as AdeudadosResponsableInscripto).total_iibb ?? "0")}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice((adeudado as AdeudadosResponsableInscripto).total_autonomos ?? "0")}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>${formatPrice((adeudado as AdeudadosResponsableInscripto).total_ganancias ?? "0")}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}

                    {planes?.map((plan, index) => (
                        <Fragment key={index}>
                            <TableRow>
                                <TableCell>{plan.period}</TableCell>
                                <TableCell align="right"
                                    colSpan={4}
                                    sx={{ fontWeight: 'bold' }}>${formatPrice(Number.parseFloat(plan.total))}</TableCell>
                            </TableRow>
                        </Fragment>
                    ))}
                    <TableRow>
                        <TableCell>Honorarios</TableCell>
                        <TableCell align="right"
                            colSpan={4}
                            sx={{ fontWeight: 'bold' }}>
                            ${formatPrice(Number.parseFloat(honorarios ?? "0"))}
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }}>Total:</TableCell>
                        <TableCell align="right" sx={{ backgroundColor: primary.alpha30, color: primary.darkest, fontSize: "18px", fontWeight: 'bold' }} colSpan={4}>
                            ${formatPrice(filteredAdeudados.reduce((total, adeudado) => (total
                                + (adeudado as AdeudadosResponsableInscripto).total_iva
                                + (adeudado as AdeudadosResponsableInscripto).total_iibb
                                + (adeudado as AdeudadosResponsableInscripto).total_autonomos
                                + (adeudado as AdeudadosResponsableInscripto).total_ganancias), 0)
                                + Number.parseFloat(!honorarios || honorarios == '' ? '0' : honorarios)
                                + planes.reduce((total, plan) => (total + Number.parseFloat(plan.total)), 0))}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}