export function safeUrl(value, { local = true, hosts } = {}) {
  if (typeof value !== 'string' || /[\u0000-\u0020\u007f\\]/.test(value)) return null;
  if (local && /^\/(?!\/)/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && (!hosts || hosts.includes(url.hostname)) ? url.href : null; } catch { return null; }
}
export function safeImage(value) {
  if (typeof value === 'string' && value.length < 300000 && /^data:image\/(png|jpeg|webp|gif);base64,[a-zA-Z0-9+/]+=*$/.test(value)) return value;
  return safeUrl(value);
}
export const date = value => { if (!value) return null; const d = new Date(value+'T12:00:00'); return Number.isNaN(d.getTime()) ? null : new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric'}).format(d); };
export const emailAddress = value => typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) ? value : null;
export const xUrl = value => safeUrl(value,{local:false,hosts:['x.com','www.x.com','twitter.com','www.twitter.com']});
export const playlistId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{10,100}$/.test(value) ? value : null;
export const isPublicBlog = post => post.type === 'blog' && !post.sample && !post.draft && post.status !== 'draft';
