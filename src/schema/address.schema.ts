import * as z from "zod";

enum paymentMethod{
CASH="cash",
CARD="card"
}
export const defaultValues = {
  details: "",
  city: "",
  postalCode: "", 
  phone: "",
  paymentMethod:paymentMethod.CASH
};

export const addressSchema = z.object({
  details: z.string().min(3, "Details must be at least 3 chars").max(15),
  city: z.string().min(3, "City must be at least 3 chars").max(15),
  postalCode: z.string().min(3, "Invalid Postal Code").max(15), 
  phone: z.string().min(10, "Invalid Phone Number").max(15),
  paymentMethod:z.enum(["cash","card"],{error:"payment Method is required"})
});

export type AddressPayloadType = z.infer<typeof addressSchema>;