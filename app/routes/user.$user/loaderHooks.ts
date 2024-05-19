import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import type userLoader from './loader.server';

/**
 * Retrieves the loader data from the User route loader.
 * @returns The loader data of type `typeof loader`.
 */
export function useUserLoaderData() {
  return useLoaderData<typeof userLoader>();
}

/**
 * Retrieves the loader data from the User route loader when loader exists.
 *
 * This function is useful when you want to ensure that the loader exists before
 * trying to access its data.
 *
 * @returns The loader data of type `typeof loader`.
 */
export function useRouteUserLoaderData() {
  return useRouteLoaderData<typeof userLoader>('user.$user');
}
