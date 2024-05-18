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
import Header from './components/header/Header';
import styles from './index.css?url';
import { SEARCH_QUERY_PARAM } from './utils/constants';
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
  const url = new URL(request.url);
  const queryValue = url.searchParams.get(SEARCH_QUERY_PARAM) ?? '';

  return json({ queryValue }, { status: statusCodes.HTTP_STATUS_OK });
};

export default function App() {
  const { queryValue } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="font-medium font-roboto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header queryValue={queryValue} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
