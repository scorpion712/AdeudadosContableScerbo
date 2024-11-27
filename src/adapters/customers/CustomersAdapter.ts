import { AdeudadosMonotributistas, AdeudadosResponsableInscripto, Customer } from "../../models";

interface CustomerExcel {
    CUIT: string;
    CLIENTE: string;
    CATEGORÍA: string;
    TELÉFONO: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptCustomersData = (data: any[]) => {
    const customersData: Customer[] = [];
    data.forEach((row: CustomerExcel) => {
        const customer = {
            cuit: row.CUIT as string,
            name: row.CLIENTE,
            category: row.CATEGORÍA,
            phone: row.TELÉFONO,
            adeudados: [] as AdeudadosResponsableInscripto[] | AdeudadosMonotributistas[]  
        } as Customer;
        customersData.push(customer);
    });
    return customersData;
}