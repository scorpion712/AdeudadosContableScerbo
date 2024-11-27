/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, Grid2, InputAdornment, OutlinedInput, Paper, Stack, SvgIcon, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SearchIcon from '@mui/icons-material/Search';

import { SnackBarUtilities } from "../../utils";
import { Customer } from "../../models";
import { adaptCustomersData } from "../../adapters/customers/CustomersAdapter";
import { adaptResponsablesInscriptosData } from "../../adapters/responsables/ResponsableInscriptoAdapter";
import { adaptMonotributistasData } from "../../adapters/monotributistas/MonotributistasAdapter";
import { adaptHonorariosData } from "../../adapters/honorarios/HonorariosAdapter";
import { CustomersTableContainer } from "../customers/CustomersTableContainer";


interface SheetData {
    sheetName: string;
    data: any[];
}

export const HomePageContent = () => {
    const [sheetsData, setSheetsData] = useState<SheetData[]>([]); // Store the parsed data from all sheets

    const [reading, setReading] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length >= 3) {
            setSearch(e.target.value)
        }
        if (e.target.value.length == 0) setSearch("");
    }


    // Function to handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReading(true);
        try {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const binaryString = event.target?.result;
                    if (typeof binaryString === "string") {
                        // Parse the Excel file using SheetJS (XLSX)
                        const wb = XLSX.read(binaryString, { type: "binary" });

                        const allSheetsData: SheetData[] = [];

                        // Iterate over each sheet in the workbook
                        wb.SheetNames.forEach((sheetName) => {
                            const ws = wb.Sheets[sheetName];
                            const jsonData = XLSX.utils.sheet_to_json(ws, { defval: "" }); // `defval: ""` ensures empty cells are filled with an empty string

                            allSheetsData.push({
                                sheetName,
                                data: jsonData,
                            });
                        });
                        // Set the data for all sheets into state
                        setSheetsData(allSheetsData);
                    }
                };

                // Read the file as a binary string
                reader.readAsBinaryString(file);
            }
        } catch (error) {
            console.log((error as Error).message)
            SnackBarUtilities.error("Error al leer el archivo");
        } finally {
            setReading(false);
        }
    };


    useEffect(() => {
        if (sheetsData.length > 0)
            handleSheetsData(sheetsData);
    }, [sheetsData]);

    if (reading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleSheetsData = (sheetsData: SheetData[]) => {
        // Leer hoja de clientes
        const adaptedCustomers = adaptCustomersData(sheetsData.find((sheet) => sheet.sheetName === "Clientes")?.data as any[]);

        // Leer hoja de responsables inscriptos
        const responsablesInscriptos = adaptResponsablesInscriptosData(sheetsData.find((sheet) => sheet.sheetName === "Responsables Inscriptos")?.data as any[], adaptedCustomers);

        // Leer hoja de monotributistas
        const monotributistas = adaptMonotributistasData(sheetsData.find((sheet) => sheet.sheetName === "Monotributistas")?.data as any[], [...adaptedCustomers, ...responsablesInscriptos]);

        setCustomers(adaptHonorariosData(sheetsData.find((sheet) => sheet.sheetName === "Honorarios")?.data as any[], [...responsablesInscriptos, ...monotributistas]))
    }


    return (
        <Paper sx={{ width: '100%', p: 2, minHeight: 400 }}>
            {
                sheetsData.length > 0 &&
                <Typography variant="h5" gutterBottom>
                    Deudas y Vencimientos
                </Typography>
            }
            <Grid2 container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid2 size={{ xs: 12 }}>
                    <Button variant="contained"
                        component='label'>
                        Cargar Excel
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>
                </Grid2>
                {
                    sheetsData.length > 0 &&
                    <Grid2 size={{ xs: 12 }}>
                        <Stack direction="row"
                            spacing={2}
                            sx={{ mt: 2, mb: 3 }}>
                            <OutlinedInput
                                placeholder="Buscar clientes"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SvgIcon>
                                            <SearchIcon />
                                        </SvgIcon>
                                    </InputAdornment>
                                }
                                onChange={handleSearchChange}
                                sx={{ flexGrow: 1 }}
                            />
                        </Stack>
                        <CustomersTableContainer customers={customers} search={search} />
                    </Grid2>
                }
            </Grid2>
        </Paper>
    );
};
