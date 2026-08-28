export type OrderFieldErrors = Partial<Record<"fullName" | "phone" | "address" | "variants", string>>;

export type OrderFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: OrderFieldErrors;
};

export const initialOrderFormState: OrderFormState = { success: false };
