export function getDeepProperty(obj: any, path: string) {
  // Handle array notation in path (e.g., "users[0].name")
  const parts = path.replace(/\[(\w+)\]/g, ".$1").split(".");

  // Handle empty or invalid input
  if (!obj || !path) {
    return undefined;
  }

  let result = obj;

  for (const part of parts) {
    // Skip empty parts that might come from leading/trailing dots
    if (!part) continue;

    // Return undefined if we hit a null/undefined value mid-path
    if (result == null) {
      return undefined;
    }

    result = result[part];
  }

  return result;
}
