export function OptionalFilter(query: string, variable: unknown) {
  return variable ? query : "true";
}
