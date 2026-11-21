'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real exception in the browser console as well.
    console.error(error);
  }, [error]);

  return (
    <main
      role="alert"
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: '#f5f2ec',
        color: '#171614',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <p style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#9b8154' }}>
          RICQ · SOMETHING WENT WRONG
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>We’ll be right back.</h1>
        <p style={{ maxWidth: 420, lineHeight: 1.7, margin: '0 auto' }}>
          This page couldn’t be loaded just now. Please try again.
        </p>
        <pre
          style={{
            margin: '18px auto 0',
            padding: '12px 14px',
            maxWidth: '100%',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            textAlign: 'left',
            fontSize: 12,
            lineHeight: 1.6,
            background: '#ebe7df',
            border: '1px solid #d5d0c7',
            color: '#171614',
          }}
        >
          {error?.message || 'Unknown error'}
        </pre>
        {error?.digest ? <p style={{ fontSize: 11, color: '#817c73' }}>Reference: {error.digest}</p> : null}
        <button
          type="button"
          onClick={reset}
          style={{ marginTop: 16, padding: '13px 20px', border: 0, background: '#171614', color: '#fff', cursor: 'pointer', letterSpacing: '.1em', textTransform: 'uppercase' }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}