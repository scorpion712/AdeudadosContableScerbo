import { AdeudadosResponsableInscripto } from "./AdeudadoResponsableInscripto";
import { AdeudadosMonotributistas } from "./AdeudadosMonotributo";

export type Customer = {
    cuit: string;
    name: string;
    category: AFIPCategory;
    phone: string;
    adeudados: AdeudadosResponsableInscripto[] | AdeudadosMonotributistas[]
}

type AFIPCategory = "Responsable Inscripto" | "Monotributista";