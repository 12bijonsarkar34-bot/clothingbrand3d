'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <div>
        <p style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: '#9b8154' }}>
          RICQ · SOMETHING WENT WRONG
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>We’ll be right back.</h1>
        <p style={{ maxWidth: 420, lineHeight: 1.7 }}>
          This page couldn’t be loaded just now. Please try again.
        </p>
        {error.digest ? <p style={{ fontSize: 11, color: '#817c73' }}>Reference: {error.digest}</p> : null}
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
