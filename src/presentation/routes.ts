import { agencyController } from "./agency/agency.controller";
import { authController } from "./auth/auth.controller";
import { bankController } from "./bank/bank.controller";
import { favoredAccountController } from "./favored-account/favored-account.controller";
import { favoredController } from "./favored/favored.controller";

export const controllers = [
  authController,
  favoredController,
  agencyController,
  bankController,
  favoredAccountController,
];
