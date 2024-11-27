import { Customer } from "../../models";
import { excelSerialToDate } from "../../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptHonorariosData = (data: any[], customers: Customer[]) => {
    const mesesAdeudados = [] as Date[];
    const copiedCustomers = [...customers];
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
            let customer: Customer | null = null;
            Object.keys(row).forEach((key, column) => {
                const value = row[key];
                // cuit
                if (column == 1) {
                    customer = copiedCustomers.find(customer => customer.cuit === value) ?? null;
                }

                if (column >= 2) {
                    if (customer) {
                        period += 1;
                        if (mesesAdeudados[period]) {
                            const customerDeubt = customer.adeudados.find(a => a.period.getTime() === mesesAdeudados[period].getTime())
                            if (customerDeubt)
                                customerDeubt.honorarios = value;
                        }
                    }
                }
            });
        }
    })
    return copiedCustomers;
}