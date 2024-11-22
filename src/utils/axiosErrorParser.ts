export const parseAxiosError = (errorCode: string | undefined) => {
    switch (errorCode) {
        case "ERR_NETWORK":
            return "Ha ocurrido un error de red, inténtalo nuevamente.";
        case "ERR_BAD_RESPONSE":
            return "Ha ocurrido un error en la respuesta del servidor, inténtalo nuevamente.";
        case "ERR_INVALID_URL":
            return "La URL no es válida, inténtalo nuevamente.";
        case "ETIMEDOUT":
            return "El servidor ha tardado demasiado en responder, inténtalo nuevamente.";
        case "ECONNABORTED":
            return "La conexión se ha interrumpido, inténtalo nuevamente.";
        case "ERR_BAD_REQUEST":
            return "Ha ocurrido un error en la petición, inténtalo nuevamente.";
        case "ERR_NOT_SUPPORT":
            return "El navegador no es compatible con la petición, inténtalo nuevamente.";
        default: return "Ha ocurido un error inesperado, inténtalo nuevamente.";
    }
};