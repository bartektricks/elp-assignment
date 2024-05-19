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
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
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

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="font-medium font-roboto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { queryValue } = useLoaderData<typeof loader>();

  return (
    <>
      <Header>
        <SearchInput value={queryValue} />
      </Header>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const err = useRouteError();
  const isRouteErr = isRouteErrorResponse(err);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-md px-4 py-12">
        <h1 className="typography-xl mb-2">
          {isRouteErr ? err.status : 'Error'}
        </h1>
        <p className="typography-m">
          {isRouteErr
            ? err.statusText
            : 'Something went wrong, try refreshing the page or call Lepryko.'}
        </p>
      </main>
    </>
  );
}
