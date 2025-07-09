import axios from "axios";

const sendMessage = async (whatsAppMessage: { number: string, message: string, pdf: string }) => await axios.post('http://localhost:3000/api/whatsapp/sendMessage', whatsAppMessage);

const getQRCode = async () => {
    const response = await axios.get('http://localhost:3000/api/whatsapp/validate');
    
    return response.data?.qrCode as string ?? null;
}

const isLoggedIn = async () => {
    const response = await axios.get('http://localhost:3000/api/whatsapp/isReady');

    return response.data?.isReady ?? false;
}

export const whatsAppService = {
    sendMessage,
    getQRCode,
    isLoggedIn
}