import { Typography, TextField, Button, Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import html2pdf from 'html2pdf.js';

import { Customer } from "../../models";
import { whatsAppService } from "../../services";
import { SnackBarUtilities } from "../../utils";
import PrintableInvoice from "../PrintableInvoice";
import { primary } from "../../theme/colors";

export const SendMessagePopUp = (props: { customer: Customer }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isReady, setIsReady] = useState<boolean>(false);

    const contentRef = useRef(null);

    const { customer } = props;

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
        if (!isReady) {
            SnackBarUtilities.error("Inicia sesión en WhatsApp para enviar mensajes");
            return;
        }
        try {
            handleGeneratePDF();
        } catch (error) {
            console.error('Error fetching QR code:', error);
            SnackBarUtilities.error("Ha ocurrido un error al enviar el mensaje");
        }
    }

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
    }, []);

    const handleGeneratePDF = () => {
        if (!contentRef.current) return;
        setLoading(true);
        // Use html2pdf.js to generate the PDF from the HTML content
        html2pdf()
            .from(contentRef.current) // Capture the content inside the ref
            .toPdf()
            .get('pdf')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then(async (pdf: any) => {
                const pdfBase64 = pdf.output('datauristring'); // Convert PDF to Base64
                const response = await whatsAppService.sendMessage({ number: customer.phone, pdf: pdfBase64, message: message });
                setLoading(false);
                if (response.status === 200) {
                    SnackBarUtilities.success("Mensaje enviado con éxito");
                }
            });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress sx={{ m: 5, color: primary.main  }} />
            </Box>
        )
    }

    if (!isReady) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h6">
                    Inicia sesión en WhatsApp para enviar mensajes
                </Typography>
                <img
                    style={{ marginLeft: "10px" }}
                    src={qrCode ?? undefined}
                    alt="No se puede visualizar el código QR"
                />
            </Box>
        )
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">
                Escribe un mensaje para {customer.name}
            </Typography>

            <TextField sx={{ width: "100%" }}
                variant="outlined"
                label="Mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <Button sx={{ width: "100%" }}
                variant="contained"
                onClick={sendMessage} >Enviar</Button>

            <div style={{ display: 'none' }}>
                <PrintableInvoice innerRef={contentRef} customer={customer} />
            </div>
        </Stack>
    )
}