import { useEffect, useState } from 'react';
export default function ContentStatus() {
  const [error, setError] = useState('');
  useEffect(() => {
    const handle = (event: Event) => setError((event as CustomEvent<string>).detail);
    window.addEventListener('content-load-error', handle);
    return () => window.removeEventListener('content-load-error', handle);
  }, []);
  return error ? <div role="alert" className="sticky top-0 z-[100] bg-red-50 border-b border-red-200 text-red-800 px-6 py-3 text-sm flex items-center gap-4"><p className="flex-1">{error}</p><button onClick={() => window.location.reload()} className="underline">Retry</button><button onClick={() => setError('')} aria-label="Dismiss error">×</button></div> : null;
}
