export function mapObjectToArray<T, U>(obj: Record<string, T>, mapping: (value: T, key: string) => U): U[] {
  return Object.entries(obj).map(([key, value]) => mapping(value, key));
}
