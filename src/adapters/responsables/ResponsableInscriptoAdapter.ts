import { AdeudadosResponsableInscripto, Customer } from "../../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adaptResponsablesInscriptosData = (data: any[], customers: Customer[]) => {
    const responsablesInscriptos = [] as Customer[];
    if (!data) return responsablesInscriptos;
    data.forEach((row, index) => {

        // clientes
        if (index >= 2) {
            // meses adeudados
            let monthColumnCount = 0;
            const adeudados = [{
                period: "Cuota de Autónomos del mes corriente"
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
                if (customer == null) return; 

                if (column - monthColumnCount == 2) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_iva: value && value != '' ? Number.parseFloat(value) : 0
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 3) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_iibb: value && value != '' ? Number.parseFloat(value) : 0
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 4) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_autonomos:value && value != '' ? Number.parseFloat(value) : 0
                    } as AdeudadosResponsableInscripto;
                }
                if (column - monthColumnCount == 5) {
                    adeudados[monthColumnCount / 4] = {
                        ...adeudados[monthColumnCount / 4],
                        total_ganancias:value && value != '' ? Number.parseFloat(value) : 0
                    } as AdeudadosResponsableInscripto;
                    monthColumnCount += 4;
                
                    adeudados.push({
                        period: column < 5 ? "Cuota de Autónomos del mes corriente" : "Deuda/diferencias de períodos anteriores autónomos"
                    } as AdeudadosResponsableInscripto)
                }
            });
            if (customer != null) {
                responsablesInscriptos.push({
                    ...customer as Customer,
                    adeudados: adeudados.filter(a => a.total_iva || a.total_iibb || a.total_autonomos || a.total_ganancias)
                });
            }
        }
    })
    return responsablesInscriptos;
}