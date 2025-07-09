import { type Customer, type PlanDePago } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptPlanesPagoData = (data: any[], customers: Customer[]) => {
    const copiedCustomers = [...customers]
    data.forEach((row, index) => {
        // clientes
        if (index >= 1) {
            // planes de pago
            let planes = [] as PlanDePago[];
            let customer: Customer | null = null;
            Object.keys(row).forEach((key, column) => {
                const value = row[key];
                if (!value) return;
                // nombre del cliente
                if (column == 0) return;
                
                // cuit
                if (column == 1) {
                    customer = copiedCustomers.find(customer => customer.cuit === value) ?? null;
                }

                if (!customer) return;

                // Mes actual
                if (column == 2) {
                    planes = [...planes,
                    {
                        period: "Cuota del mes corriente - Plan de Pago Vigente",
                        total: value
                    }
                    ]
                }

                // Meses adeudados 
                if (column == 3) {
                    planes = [...planes,
                    {
                        period: "Deuda/diferencias - Plan de Pago Vigente",
                        total: value
                    }
                    ]
                }
                customer.planes = [ ...planes]; 
            });
        }
    })
    return copiedCustomers;
}