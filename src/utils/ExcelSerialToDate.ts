export const excelSerialToDate = (serial: number): Date | null => {
    if (!serial || isNaN(serial)) return null;
    try {
        const excelEpoch = new Date(1899, 11, 30); // Excel starts from December 30, 1899
        const date = new Date(excelEpoch.getTime());
        date.setDate(date.getDate() + serial); // Add the serial number (days) to the epoch
        return date;
    } catch (error) {
        console.log((error as Error).message)
        return null;
    }
}