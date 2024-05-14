import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

export default function Index() {
  return <div>Hello world</div>;
}
