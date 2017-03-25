import fs = require('fs');
import {SignOptions} from "jsonwebtoken";
import {getLogger} from "./logger";
import {Logger} from "log4js";

const LOGGER: Logger = getLogger('JwtConfiguration');

export class JwtConfiguration {
  private devSharedKey: string = 'sdjhwisnd,inres';
  private signSecret: Buffer;
  private verifySecret: Buffer;
  private signOptions: SignOptions = {expiresIn: "1h"};

  constructor(private env: string) {
  }

  public initProd(privateKeyFilename: string, publicKeyFilename: string) {
    if (!fs.existsSync(privateKeyFilename) || !fs.existsSync(publicKeyFilename)) {
      LOGGER.fatal(`in PRODUCTION-MODE, the private (../../ha-key) and public (../../ha-key.pub) key files must exist. `);
      process.exit(0);
    }
    this.signSecret = fs.readFileSync(privateKeyFilename);
    this.verifySecret = fs.readFileSync(publicKeyFilename);
    this.signOptions.algorithm = 'RS384';
  }

  public getSignSecret(): string | Buffer {
    if (this.env === "development") {
      return this.devSharedKey;
    }
    return this.signSecret;
  }

  public getVerifySecret(): string | Buffer {
    if (this.env === "development") {
      return this.devSharedKey;
    }
    return this.verifySecret;
  }

  public getSignOptions(): SignOptions {
    return this.signOptions;
  }
}
