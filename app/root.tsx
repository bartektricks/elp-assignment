import robotoFont from '@fontsource/roboto/500.css?url';
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';
import Header from './components/Header';
import styles from './index.css?url';
import getSearchQueryParam from './utils/getSearchQueryParam.server';
import statusCodes from './utils/statusCodes.server';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
    type: 'image/png',
  },
  { rel: 'stylesheet', href: robotoFont },
  { rel: 'stylesheet', href: styles },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'EL Hub' },
    { name: 'description', content: 'Github clone assignment in Remix' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const q = getSearchQueryParam(request);

  return json({ q }, { status: statusCodes.HTTP_STATUS_OK });
};

export default function App() {
  const { q } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="font-medium font-roboto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header queryValue={q} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
