export function mapObjectToArray<T, U>(obj: Record<string, T>, mapping: (value: T, key: string) => U): U[] {
  return Object.entries(obj).map(([key, value]) => mapping(value, key));
}

export const stringSizeLimiter = (inputString: string, maxLength: number): string => {
  if (inputString.length <= maxLength) {
    return inputString;
  }

  return inputString.substring(0, maxLength) + '...';
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
