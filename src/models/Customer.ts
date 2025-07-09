import { AdeudadosResponsableInscripto } from "./AdeudadoResponsableInscripto";
import { AdeudadosMonotributistas } from "./AdeudadosMonotributo";
import { PlanDePago } from "./PlanDePago";

export type Customer = {
    cuit: string;
    name: string;
    category: AFIPCategory;
    phone: string;
    adeudados: AdeudadosResponsableInscripto[] | AdeudadosMonotributistas[];
    honorarios?: string;
    planes?: PlanDePago[];
}

type AFIPCategory = "Responsable Inscripto" | "Monotributista";