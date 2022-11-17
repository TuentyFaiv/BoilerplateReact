export interface ModalPaymentState {
  title: string;
  subtitle?: string;
  text?: string;
  link?: string;
  action?: "forestpayment" | "MIT" | "openpay";
}
