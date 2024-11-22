import { ProviderContext, VariantType, useSnackbar } from "notistack";

let useSnackbarRef: ProviderContext;

export const SnackBarUtilitiesConfigurator = () => {
   useSnackbarRef = useSnackbar();
   return null;
};

export const SnackBarUtilities = {
   toast(message: string, variant: VariantType = "default", duration: number = 2000) {
      if (message)
         useSnackbarRef.enqueueSnackbar(message, { variant, autoHideDuration: duration, preventDuplicate: true });
   },
   success(message: string, duration?: number) {
      this.toast(message, "success", duration);
   },
   error(message: string, duration?: number) {
      this.toast(message, "error", duration);
   },
   info(message: string, duration?: number) {
      this.toast(message, "info", duration);
   },
   warning(message: string, duration?: number) {
      this.toast(message, "warning", duration);
   }
};
