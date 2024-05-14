import { env } from './env';

export default function getAuthorizationHeader() {
  return {
    Authorization: env.GH_AUTH_TOKEN ? `Bearer ${env.GH_AUTH_TOKEN}` : '',
  };
}
