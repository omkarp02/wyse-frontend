import { ADDRESS_TYPE } from "@/constants/api";
import { mobileSchema, pinCodeSchema } from "@/lib/validation/commonSchema";
import { z } from "zod";

// Define the TAddress schema
const addressSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  pincode: pinCodeSchema,
  mobileNo: mobileSchema,
  alternateMobileNo: mobileSchema.optional(),
});

// Define the TCreateAddress schema
export const addressFormSchema = z.object({
  address: addressSchema, // Nested TAddress schema
  isPrimary: z.boolean().refine((val) => val === true || val === false, {
    message: "IsPrimary must be a boolean value",
  }),
  type: z.enum([ADDRESS_TYPE.HOME, ADDRESS_TYPE.WORK]),
});

export type IAddressFormFields = z.infer<typeof addressFormSchema>;
