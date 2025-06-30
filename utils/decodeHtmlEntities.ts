export default function decodeHtmlEntities(text: string) {
  if (typeof window === 'undefined') {
    // Server-side rendering - use a simple approach
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
  }
  
  // Client-side - use DOM approach
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}