import { agencyConstroller } from "./agency/agency.controller";
import { bankConstroller } from "./bank/bank.controller";
import { favoredConstroller } from "./favored/favored.controller";

export const constrollers = [
  favoredConstroller,
  agencyConstroller,
  bankConstroller,
];
