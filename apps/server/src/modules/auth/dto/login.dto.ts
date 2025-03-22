import { z } from "zod";
import { loginValidator } from "@packages/validators/auth/login";

export type LoginDto = z.infer<typeof loginValidator>;
