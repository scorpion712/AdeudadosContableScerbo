import { AdeudadosResponsableInscripto, Customer } from "../../models";
import { excelSerialToDate } from "../../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptResponsablesInscriptosData = (data: any[], customers: Customer[]) => {
    const responsablesInscriptos = [] as Customer[];
    const mesesAdeudados = [] as Date[]; 
    if (!data) return responsablesInscriptos;
    data.forEach((row, index) => {
        // fila de meses a liquidar
        if (index == 0) {
            Object.keys(row).forEach(key => {
                const value = row[key];
                parseInt(value);
                const dateValue = excelSerialToDate(value);
                if (dateValue != null) {
                    mesesAdeudados.push(dateValue);
                }
            });
        }

        // clientes
        if (index >= 2) {
            // meses adeudados
            let monthColumnCount = 0;
            const adeudados = [{
                period: mesesAdeudados[monthColumnCount / 4]
            }] as AdeudadosResponsableInscripto[];
            let customer: Customer | null = null;
            Object.keys(row).forEach((key, column) => {
                const value = row[key];
                // nombre del cliente
                if (column == 0) {
                    // responsableInscripto = {
                    //     ...responsableInscripto,
                    //     name: value,
                    // }
                    return;
                }
                // cuit
                if (column == 1) {
                    customer = customers.find(customer => customer.cuit === value) ?? null;
                }

                if (column - monthColumnCount == 2) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_iva: value
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 3) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_iibb: value
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 4) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_autonomos: value
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 5) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_ganancias: value
                    } as AdeudadosResponsableInscripto;
                    monthColumnCount += 4;
                    if (mesesAdeudados[monthColumnCount / 4]) {
                        adeudados.push({
                            period: mesesAdeudados[monthColumnCount / 4]
                        })
                    }
                }
            });
            if (customer != null) {
                responsablesInscriptos.push({
                    ...customer as Customer,
                    adeudados: adeudados 
                });
            }
        }
    })
    return responsablesInscriptos;
}