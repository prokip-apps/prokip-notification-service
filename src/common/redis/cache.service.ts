import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache, CachingConfig } from 'cache-manager';
import { APIResponse } from '../api/response.net';

@Injectable()
export class RedisService {
  private APP_NAME;
  private APP_ENV;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private configService: ConfigService,
  ) {
    this.APP_ENV = this.configService.get('app.environment');
    this.APP_NAME = this.configService.get('app.name');
  }

  async validateEnv(key) {
    let d = await this.cache.get(key);

    if (!d)
      throw new NotAcceptableException(
        APIResponse.errorResponse({
          code: '-1',
          message: 'invalid token or token expired',
        }),
      );

    if (
      d['env']['name'] !== this.APP_NAME ||
      d['env']['env'] !== this.APP_ENV
    ) {
      throw new ForbiddenException(
        APIResponse.errorResponse({
          code: '-1',
          message: 'invalid app/environment specified',
        }),
      );
    }

    return d['data'];
  }

  async get<T = any>(key: string): Promise<T> {
    // await this.validateEnv(key);
    // return await this.cache.get(key);

    return await this.validateEnv(key);
  }

  async set(key: string, item: any, ttl?: number): Promise<any> {
    return await this.cache.set(
      key,
      { env: { name: this.APP_NAME, env: this.APP_ENV }, data: item },
      ttl && { ttl },
    );
  }

  async remove(key: string): Promise<any | any[]> {
    await this.validateEnv(key);
    return await this.cache.del(key);
  }

  async reset(): Promise<void> {
    return await this.cache.reset();
  }

  async wrap(
    key: string,
    cb: (error: any, result: any) => any,
    config?: CachingConfig,
  ): Promise<any> {
    const data = await this.cache.wrap(key, cb, config);
    if (
      !!data &&
      data.autoRefreshToken &&
      config?.ttl &&
      typeof config.ttl === 'number'
    ) {
      this.set(key, data, config.ttl);
    }

    return data;
  }

  async wrap2(key: string, cb: () => Promise<any>): Promise<any> {
    return await this.cache.wrap(key, cb);
  }
}
