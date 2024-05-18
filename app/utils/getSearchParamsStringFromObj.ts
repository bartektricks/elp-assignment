/**
 * Converts an object into a search parameter string.
 *
 * @param obj - The object containing key-value pairs to be converted.
 * @returns The search parameter string beginning with ?.
 */
export default function getSearchParamsStringFromObj(
  obj: Record<string, string | number | undefined | null>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      searchParams.append(key, String(value));
    }
  }

  return `?${searchParams.toString()}`;
}
