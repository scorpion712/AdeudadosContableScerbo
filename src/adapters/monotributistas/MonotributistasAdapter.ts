import { AdeudadosMonotributistas, Customer } from "../../models";
import { excelSerialToDate } from "../../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptMonotributistasData = (data: any[], customers: Customer[]) => {
    const monotributistas = [] as Customer[];
    const mesesAdeudados = [] as Date[];
    data.forEach((row, index) => {
        // columna de meses a liquidar
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
        if (index >= 1) {
            // meses adeudados
            let period = 0;
            const adeudados = [{
                period: mesesAdeudados[period]
            }] as AdeudadosMonotributistas[];
            let customer: Customer | null = null;
            Object.keys(row).forEach((key, column) => {
                const value = row[key];
                // nombre del cliente
                if (column == 0) {
                    return;
                }
                // cuit
                if (column == 1) {
                    customer = customers.find(customer => customer.cuit === value) ?? null;
                }

                if (column >= 2) {
                    if (!adeudados[period]) return;
                    adeudados[period] = {
                        ...adeudados[period],
                        total: value
                    } as AdeudadosMonotributistas;
                    period += 1;
                    if (mesesAdeudados[period]) {
                        adeudados.push({ 
                            period: mesesAdeudados[period]
                        } as AdeudadosMonotributistas);
                    }
                }
            });
            if (customer != null) {
                monotributistas.push({
                    ...customer as Customer,
                    adeudados: adeudados
                });
            }
        }
    })
    return monotributistas;
}