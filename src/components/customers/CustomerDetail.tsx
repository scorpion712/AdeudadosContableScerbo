import { Button, Grid2, Typography } from "@mui/material";
import { AdeudadosMonotributistas, AdeudadosResponsableInscripto, Customer } from "../../models";
import { primary } from "../../theme/colors";
import { ResponsableInscriptoDetailTable } from "./ResponsableInscriptoDetailTable";
import { MonotributistasDetailTable } from "./MonotributistasDetailTable";

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

        : (adeudado as AdeudadosResponsableInscripto).total_iibb// && ((adeudado as AdeudadosResponsableInscripto).total_iibb as string).length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_autonomos// && ((adeudado as AdeudadosResponsableInscripto).total_autonomos as string)?.length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_ganancias// && ((adeudado as AdeudadosResponsableInscripto).total_ganancias as string)?.length > 0
        || (adeudado as AdeudadosResponsableInscripto).total_iva //&& ((adeudado as AdeudadosResponsableInscripto).total_iva as string)?.length > 0
    );

    const PeriodosAdeudados = () => {
        if (customer.category === "Monotributista")
            return (
                <MonotributistasDetailTable filteredAdeudados={filteredAdeudados as AdeudadosMonotributistas[]} />
            );
        else return (
            <ResponsableInscriptoDetailTable filteredAdeudados={filteredAdeudados as AdeudadosResponsableInscripto[]} />
        );
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline" }}>Categoría:</span> {customer.category}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline"  }}>CUIT:</span> {customer.cuit}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline"  }}>Teléfono:</span> {customer.phone}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline"  }}>Periodos adeudados:</span> {filteredAdeudados.length}</Typography>
            </Grid2>
            <PeriodosAdeudados />
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="flex-end">
                <Button variant="contained" sx={{ backgroundColor: primary.main }} onClick={() => console.log("send pdf via whatsapp")}>Enviar</Button>
            </Grid2>
        </Grid2>
    )
}
