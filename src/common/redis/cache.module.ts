import { Module, CacheModule as Cache } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './cache.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [
    Cache.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        ...config.get('db.redis'),
      }),
    }),
  ],
})
export class RedisModule {}
