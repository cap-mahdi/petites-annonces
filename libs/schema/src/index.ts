export const userSchema = {
  id: { type: "string", required: true },
  name: { type: "string", required: true },
  email: { type: "string", required: true, format: "email" },
};

export const validateUser = (data: any): boolean => {
  return !!(data?.id && data?.name && data?.email);
};
