import * as dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_PATH });

const env = (key: string, defaultVal: any = undefined) =>
  process.env[key] || defaultVal;

const config = {
  app: {
    host: env('APP_HOST', `http://localhost:${env('APP_PORT', 3005)}`),
    api: {
      version: env('APP_API_VERSION', 'api/v1'),
    },
    environment: env('NODE_ENV'),
    name: env('APP_NAME', 'Prokip Notification'),
    port: Number(env('APP_PORT', 3005)),
    adminEmail: env('ADMIN_EMAIL_ADDRESS'),
  },

  sendGrid: {
    apiKey: env('SENDGRID_API_KEY'),
    from: {
      name: env('APP_SENDER_NAME'),
      address: env('APP_SENDER_ADDRESS'),
    },
  },
  sentry: {
    dsn: env('SENTRY_DNS'),
    debug: env('SENTRY_DEBUG') === 'true',
    tracesSampleRate: 1.0,
  },
  sms: {
    africastalking: {
      nigeria: {
        username: process.env.SMS_AFRICAS_TALKING_USERNAME,
        apiKey: process.env.SMS_AFRICAS_TALKING_APIKEY,
      },
      ghana: {
        username: '',
        apiKey: '',
      },
      kenya: {
        username: '',
        apiKey: '',
      },
      uganda: {
        username: '',
        apiKey: '',
      },
      rwanda: {
        username: '',
        apiKey: '',
      },
    },
  },
};

export default () => config;
