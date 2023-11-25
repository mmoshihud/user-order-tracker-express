import { z, ZodError } from "zod";

const orderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name must be at least 1 character long" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0.01" }),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be an integer greater than 0" }),
});

export const validateOrder = (data: unknown) =>
  orderValidationSchema.parse(data);
