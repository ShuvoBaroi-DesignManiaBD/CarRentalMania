import { z } from "zod";

const newUserValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name is required" }),

    email: z
      .string({
        invalid_type_error: "Invalid email address",
      })
      .email({ message: "Invalid email address" }),

    role: z.enum(["user", "admin"], {
      invalid_type_error: 'Role must be either "user" or "admin"',
      required_error: "Role is required",
    }),

    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password can not be more than 20 characters" }),

    phone: z
      .string({
        invalid_type_error: "Phone number must be a string",
      })
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, { message: "Phone number can not be more than 15 digits" }),

    address: z
      .string({
        invalid_type_error: "Address must be a string",
      })
      .min(1, { message: "Address is required" }).optional(),

    isBlocked: z
      .boolean({
        invalid_type_error: "isBlocked must be a boolean",
      }),

    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted must be a boolean",
      }),
  }),
});

const userLoginValidation = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: "Invalid email address",
      })
      .email({ message: "Invalid email address" }),

    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password can not be more than 20 characters" }),
  }),
});

export const UserValidation = {
  newUserValidation,
  userLoginValidation,
};
