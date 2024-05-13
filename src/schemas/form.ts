import { z } from "zod";

export const UserFormSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email incorect.",
  }),
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});
