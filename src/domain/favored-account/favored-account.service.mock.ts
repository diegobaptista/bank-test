import { Connection, Repository } from "typeorm";
import { FavoredAccountEntity } from "../../infrastructure/database/entity/favored-account.entity";
import { FavoredAccountService } from "./favored-account.service";

export class FavoredAccountServiceMock extends FavoredAccountService {
  getFavoredAccountRepository(): any {
    return {
      findOne: jest.fn(),
    };
  }

  getAgencyRepository(): any {
    return {
      findOne: jest.fn(),
    };
  }

  getFavoredRepository(): any {
    return {
      findOne: jest.fn(),
    };
  }

  getBankRepository(): any {
    return {
      findOne: jest.fn(),
    };
  }
}
