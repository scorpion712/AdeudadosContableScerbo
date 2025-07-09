import { AdeudadosMonotributistas, Customer } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptMonotributistasData = (data: any[], customers: Customer[]) => {
    const monotributistas = [] as Customer[];
    data.forEach((row, index) => {
        // clientes
        if (index >= 1) {
            // meses adeudados
            let adeudados = [] as AdeudadosMonotributistas[];
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

                // Mes actual
                if (column == 2) {
                    adeudados = [...adeudados,
                        {
                            period: "Cuota de monotributo del mes corriente",
                            total: value
                        }
                    ]
                }

                // Meses adeudados 
                if (column == 3) {
                    adeudados = [...adeudados,
                        {
                            period: "Deuda/diferencias de períodos anteriores al actual",
                            total: value
                        }
                    ]
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