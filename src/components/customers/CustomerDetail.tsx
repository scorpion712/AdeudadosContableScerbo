import { Box, Button, CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import html2pdf from 'html2pdf.js';


import { AdeudadosMonotributistas, AdeudadosResponsableInscripto, Customer } from "../../models";
import { primary } from "../../theme/colors";
import { ResponsableInscriptoDetailTable } from "./ResponsableInscriptoDetailTable";
import { MonotributistasDetailTable } from "./MonotributistasDetailTable";
import PrintableInvoice from "../PrintableInvoice";
import { SnackBarUtilities } from "../../utils";
import { whatsAppService } from "../../services";

interface CustomerDetailProps {
    customer: Customer;
}

export const CustomerDetail = (props: CustomerDetailProps) => {

    const { customer } = props;
    const contentRef = useRef(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [qrCode, setQrCode] = useState<string | null>(null);

    // adeudados where total > 0 | honorarios > 0
    const filteredAdeudados = customer.adeudados.filter(adeudado =>

        customer.category === "Monotributista"
            ? (adeudado as AdeudadosMonotributistas).total && Number.parseFloat((adeudado as AdeudadosMonotributistas).total) > 0


            : (adeudado as AdeudadosResponsableInscripto).total_iibb// && ((adeudado as AdeudadosResponsableInscripto).total_iibb as string).length > 0
            || (adeudado as AdeudadosResponsableInscripto).total_autonomos// && ((adeudado as AdeudadosResponsableInscripto).total_autonomos as string)?.length > 0
            || (adeudado as AdeudadosResponsableInscripto).total_ganancias// && ((adeudado as AdeudadosResponsableInscripto).total_ganancias as string)?.length > 0
            || (adeudado as AdeudadosResponsableInscripto).total_iva //&& ((adeudado as AdeudadosResponsableInscripto).total_iva as string)?.length > 0
    );

    const PeriodosAdeudados = () => {
        console.log(customer,customer.honorarios)
        if (customer.category === "Monotributista")
            return (
                <MonotributistasDetailTable filteredAdeudados={filteredAdeudados as AdeudadosMonotributistas[]}
                    honorarios={customer.honorarios ?? ""}
                    planes={customer.planes ?? []} />
            );
        else return (
            <ResponsableInscriptoDetailTable filteredAdeudados={filteredAdeudados as AdeudadosResponsableInscripto[]} honorarios={customer.honorarios ?? ""} planes={customer.planes ?? []} />
        );
    }

    const getQRCode = async () => {
        try {
            setLoading(true);
            const qrCode = await whatsAppService.getQRCode();
            setQrCode(qrCode);
        } catch (error) {
            console.log("Error al obtener el código QR", error);
            SnackBarUtilities.error("Error al obtener el código QR");
        } finally {
            setLoading(false);
        }
    }

    const sendMessage = async () => {
        if (isReady) {
            setLoading(true);
            handleGeneratePDF();
            return;
        }
        try {
            setLoading(true);
            const ready = await whatsAppService.isLoggedIn();
            setIsReady(ready);
            if (!ready)
                getQRCode();

        } catch (error) {
            console.error('Error fetching QR code:', error);
            SnackBarUtilities.error("Ha ocurrido un error al enviar el mensaje");
        } finally {
            setLoading(false);
            if (isReady)
                handleGeneratePDF();
        }
    }

    const handleGeneratePDF = async () => {
        if (!contentRef.current) return;
        // Use html2pdf.js to generate the PDF from the HTML content

        html2pdf()
            .from(contentRef.current) // Capture the content inside the ref
            .toPdf()
            .get('pdf')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then(async (pdf: any) => {
                const pdfBase64 = pdf.output('datauristring'); // Convert PDF to Base64
                const response = await whatsAppService.sendMessage({ number: customer.phone, pdf: pdfBase64, message: "" });
                if (response.status === 200) {
                    SnackBarUtilities.success("PDF enviado con éxito");
                }
                setLoading(false);
            });
    };

    const isClientReady = async () => {
        if (isReady) return;
        try {
            setLoading(true);
            const isReady = await whatsAppService.isLoggedIn();
            setIsReady(isReady);
            if (!isReady)
                getQRCode();
        } catch (error) {
            console.log("Error al validar sesión", error);
            SnackBarUtilities.error("Ha ocurrido un error al validar la sesión");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isReady) return;
        isClientReady();
        const intervalId = setInterval(isClientReady, 20000);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [isReady, qrCode]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress sx={{ m: 5, color: primary.main }} />
            </Box>
        )
    }

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline" }}>Categoría:</span> {customer.category}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1" gutterBottom>
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline" }}>CUIT:</span> {customer.cuit}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline" }}>Teléfono:</span> {customer.phone}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="body1">
                    <span style={{ color: primary.darkest, fontWeight: "bold", textDecoration: "underline" }}>Periodos adeudados:</span> {filteredAdeudados.length}</Typography>
            </Grid2>
            <PeriodosAdeudados />
            <Grid2 size={{ xs: 12 }} display="flex" justifyContent="flex-end" sx={{ visibility: isReady ? "visible" : "hidden" }}>
                <Button variant="contained"
                    sx={{ backgroundColor: primary.main }}
                    onClick={sendMessage}>
                    Enviar PDF
                </Button>
            </Grid2>
            {
                !isReady &&
                <Grid2 display='flex' justifyContent='center' size={12}>
                    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h6" >
                            Inicia sesión en WhatsApp para enviar mensajes
                        </Typography>
                        <img
                            style={{ marginLeft: "10px" }}
                            src={qrCode ?? undefined}
                            alt="No se puede visualizar el código QR"
                        />
                    </Stack>
                </Grid2>
            }
            <div hidden>
                <PrintableInvoice innerRef={contentRef} customer={customer} />
            </div>
        </Grid2>
    )
}
