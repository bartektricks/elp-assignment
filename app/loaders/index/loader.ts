import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import type indexLoader from './loader.server';

/**
 * Retrieves the loader data from the Index route loader.
 * @returns The loader data of type `typeof loader`.
 */
export function useIndexLoaderData() {
  return useLoaderData<typeof indexLoader>();
}

/**
 * Retrieves the loader data from the Index route loader when loader exists.
 *
 * This function is useful when you want to ensure that the loader exists before
 * trying to access its data.
 *
 * @returns The loader data of type `typeof loader`.
 */
export function useRouteIndexLoaderData() {
  return useRouteLoaderData<typeof indexLoader>('index');
}
