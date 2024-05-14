import type { MetaFunction } from '@remix-run/node';
import { env } from '~/utils/env';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

export default function Index() {
  return <div>{env.GH_AUTH_TOKEN}</div>;
}
