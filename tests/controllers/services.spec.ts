import { assert, expect } from "chai";
import { AuthService } from "../../server/services/auth.service";

describe("AuthService", () => {
  const AuthSrvc = AuthService;

  it("should return createdHash as a string", () => {
    const result = AuthService.hashPassword('1234567asdfghj');
    assert.isString(result);
  })
})
