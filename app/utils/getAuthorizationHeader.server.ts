import { env } from './env';

/**
 * Returns the authorization header object for making authenticated requests.
 * If the GH_AUTH_TOKEN environment variable is set, it will be included in the header.
 * @returns The authorization header object.
 */
export default function getAuthorizationHeader() {
  return {
    Authorization: env.GH_AUTH_TOKEN ? `Bearer ${env.GH_AUTH_TOKEN}` : '',
  };
}
