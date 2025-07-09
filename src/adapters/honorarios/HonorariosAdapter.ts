import { Customer } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptHonorariosData = (data: any[], customers: Customer[]) => {
    const customersWithHonorarios = [] as Customer[];
    if (!data) return customersWithHonorarios;
    data.forEach((row, index) => {
        // clientes
        if (index >= 1) {
            let customer: Customer | null = null;
            Object.keys(row).forEach((key, column) => {
                const value = row[key];
                // cuit
                if (column == 1) {
                    customer = customers.find(customer => customer.cuit === value) ?? null;
                }

                if (!customer) return;  

                if (column == 2) { 
                    customersWithHonorarios.push({
                        ...customer,
                        honorarios: value ?? "0"
                    }); 
                }
            });
        }
    })  
    
    return [ ...customersWithHonorarios ];
}