import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
} from 'unique-names-generator';

const CUSTOM_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

@Injectable()
export class AppUtilities {
  constructor(private configService: ConfigService) {}

  public static generateRandomNames() {
    let username: string = uniqueNamesGenerator({
      dictionaries: [
        adjectives,
        animals,
        colors,
        countries,
        languages,
        names,
        starWars,
      ],
      length: 2,
    });

    let name: string = uniqueNamesGenerator({ dictionaries: [starWars] });

    username = username.replace('_', '-');

    return { name, username };
  }

  public static generateOtp(length = 4): string {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0');
  }

  public static generateShortCode(length = 10): string {
    const nanoid = customAlphabet(CUSTOM_CHARS, length);
    return nanoid();
  }

  public static generateUniqueKey(): string {
    return uuidv4();
  }

  public static signMessage(message: string): string {
    return Base64.stringify(sha256(message));
  }

  public static getSystemDate(): Date {
    return new Date();
  }

  public static encode(
    data: string,
    encoding: BufferEncoding = 'base64',
  ): string {
    return Buffer.from(data).toString(encoding);
  }

  public static decode(
    data: string,
    encoding: BufferEncoding = 'base64',
  ): string {
    return Buffer.from(data, encoding).toString();
  }

  static async hashPassword(password: string, rounds = 10): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  public getAssetUrl(asset: string): string {
    return `${this.configService.get('app.host')}/assets/${asset}`;
  }

  public getApiUrl(uri = ''): string {
    return [
      this.configService.get('app.host'),
      this.configService.get('app.api.version'),
      uri,
    ].join('/');
  }
}
