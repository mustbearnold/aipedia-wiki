export async function timeAsync<T>(label: string, fn: () => Promise<T>): Promise<{ value: T; ms: number; label: string }> {
  const start = performance.now();
  const value = await fn();
  return { value, ms: Math.round(performance.now() - start), label };
}
