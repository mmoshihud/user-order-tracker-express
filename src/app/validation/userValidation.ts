import { object, string, number, array, boolean } from "zod";

export const userValidationSchema = object({
  userId: number().int().positive("User ID must be a positive integer"),
  username: string().min(3, "Username must be at least 3 characters"),
  password: string().min(6, "Password must be at least 6 characters"),
  fullName: object({
    firstName: string().min(1, "First name is required"),
    lastName: string().min(1, "Last name is required"),
  }),
  age: number().int().positive("Age must be a positive integer"),
  email: string().email("Invalid email format"),
  isActive: boolean(),
  hobbies: array(string().min(1, "Hobby must be at least 1 character")),
  address: object({
    street: string().min(1, "Street is required"),
    city: string().min(1, "City is required"),
    country: string().min(1, "Country is required"),
  }),
  orders: array(
    object({
      productName: string().min(1, "Product name is required"),
      price: number().positive("Price must be a positive number"),
      quantity: number().int().positive("Quantity must be a positive integer"),
    }),
  ).optional(),
});
export const validateUser = (data: unknown) => userValidationSchema.parse(data);
