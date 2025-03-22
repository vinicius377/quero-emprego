import { Role } from "@packages/types/enums";

export interface TokenData {
  name: string;
  phoneNumber: number;
  role: Role;
  id: string;
}
