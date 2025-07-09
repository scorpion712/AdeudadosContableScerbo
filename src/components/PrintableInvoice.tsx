import { Grid2, Stack, SvgIcon, Typography } from '@mui/material';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { Logo } from './Logo';
import { AdeudadosMonotributistas, AdeudadosResponsableInscripto, Customer } from '../models';
import { MonotributistasDetailTable } from './customers/MonotributistasDetailTable';
import { ResponsableInscriptoDetailTable } from './customers/ResponsableInscriptoDetailTable';
import { primary } from '../theme/colors';


const PrintableInvoice = (props: { customer: Customer, innerRef: React.LegacyRef<HTMLDivElement> | undefined }) => {
    const { customer } = props;

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
        if (customer.category === "Monotributista")
            return (
                <MonotributistasDetailTable filteredAdeudados={filteredAdeudados as AdeudadosMonotributistas[]} honorarios={customer.honorarios} planes={customer.planes ?? []} />
            );
        else return (
            <ResponsableInscriptoDetailTable filteredAdeudados={filteredAdeudados as AdeudadosResponsableInscripto[]} honorarios={customer.honorarios}  planes={customer.planes ?? []} />
        );
    }

    const date = new Date(); // Your date here
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const formatter = new Intl.DateTimeFormat('es-ES', options);

    return (
        <div ref={props.innerRef} style={{
            display: 'flex',
            margin: '2rem',
        }}>
            <Grid2 container spacing={2}>
                <Grid2 size={12} container>
                    <Grid2 size={4} sx={{ pl: 10, pr: 10 }}>
                        <Logo height={170} width={170}/>
                    </Grid2>
                    <Grid2 size={8}>
                        <Typography variant="body1"
                            align="right"
                            sx={{ fontSize: '18px', fontWeight: '500' }}
                        >
                            Fecha: {new Date().toLocaleDateString()}
                        </Typography>
                        <Stack spacing={1} display='flex' justifyContent='flex-end' alignItems='end' mt={4}>
                            <Typography variant="h6"
                            >
                                Informe de Gestión Mensual
                            </Typography>
                            <Typography variant="h6"
                            >
                                {formatter.format(date)}
                            </Typography>
                        </Stack>
                    </Grid2>
                </Grid2>
                <Grid2 size={12}>
                    <Stack>
                        <Stack direction='row' display='flex' alignItems='center' spacing={1}>
                            <SvgIcon component={LocationOnIcon} sx={{ fontSize: '16px', color: primary.main }} />
                            <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: '500' }}>
                                Leandro N. Alem y Juan Bautista Alberdi, 1er piso. Gral. Pirán Buenos Aires - Argentina
                            </Typography>
                        </Stack>
                        <Stack direction='row' display='flex' alignItems='center' spacing={1}>
                            <SvgIcon component={WhatsAppIcon} sx={{ fontSize: '16px', color: primary.main }} />
                            <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: '500' }} >
                                2265418548
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={8} >
                    <Stack spacing={1}>
                        <Typography variant="h6" sx={{ p: 1, border: "1px solid black", borderRadius: 1, fontSize: '18px' }}>
                            Señor/es: <span style={{ fontWeight: "none" }}>{customer.name ?? ""}</span>
                        </Typography>
                        <Stack spacing={2} sx={{ p: 1, border: "1px solid black", borderRadius: 1, display: "flex", alignItems: "center" }} direction={'row'}>
                            <Typography variant="h6" fontSize={18}>{customer.category}</Typography>
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={4} >
                    <Stack spacing={1}>
                        <Typography variant="h6" sx={{ p: 1, border: "1px solid black", borderRadius: 1 }} fontSize={18}>
                            Tel: <span style={{ fontWeight: "none" }}>{customer.phone ?? ""}</span>
                        </Typography>
                        <Typography variant="h6" sx={{ p: 1, border: "1px solid black", borderRadius: 1 }} fontSize={18}>
                            CUIT: <span style={{ fontWeight: "none" }}>{customer.cuit ?? ""}</span>
                        </Typography>
                    </Stack>
                </Grid2>
                <Grid2 size={12}>
                    <PeriodosAdeudados />
                </Grid2>
                <Grid2 size={12} display='flex' justifyContent='center' alignItems='center' >
                    <Stack spacing={1} display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant="h6">
                            Te enviamos tu informe de gestión mensual.
                        </Typography>
                        <Typography variant="body1" align='left' sx={{ fontSize: '16px', }}>
                            Solicítanos la generación de los VEPs correspondientes que desees abonar,
                            o la generación de planes de pagos para estar al día con tus obligaciones.
                        </Typography>
                        <Stack display='flex' justifyContent='center' alignItems='center'>
                            <Typography variant="h5" gutterBottom fontSize={18}>
                                Gracias por elegirnos.
                            </Typography>
                            <Typography variant="h5" fontSize={18}>
                                ¡Nuestra prioridad sos vos!
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={12}>
                    <Stack sx={{ p: 1, border: "1px solid #757575", borderRadius: 1, pl: 2, pt: 1 }} spacing={.5}>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: '17px' }}>
                            Datos bancarios en caso de transferencia de honorarios:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '600', color: '#212121' }}>
                            ESTUDIO CONTABLE PAULA SCERBO
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            CBU: <span style={{ color: primary.dark, fontWeight: '600' }}>0140364803614851179254</span>
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            Alias: <span style={{ color: primary.dark, fontWeight: '600' }}>Paula.Scerbo</span>
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            CUIT: <span style={{ color: primary.dark, fontWeight: '600' }}>27378389696</span>
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            DNI: <span style={{ color: primary.dark, fontWeight: '600' }}>37838969</span>
                        </Typography>
                    </Stack>
                </Grid2>
            </Grid2>
        </div >
    )
}

export default PrintableInvoice;
