export function authHeaders(token: string, isImage: boolean = false) {
  let authHeaders = { Authorization: `Bearer ${token!}` };

  return {
    headers: isImage ? authHeaders :
      { ...authHeaders, 'Content-Type': 'application/json' }
  };
}