export type ActionState<T> = {
    error?: string;
    fieldErrors?: Record<string, string>;
    formData?: T;
    success?: boolean;
  };