'use client';
import { Component } from 'react';
import type { ReactNode } from 'react';

// A failure inside the 3D canvas (WebGL unavailable, model or asset fetch failing, etc.)
// must never take the whole product page down to error.tsx. Show a quiet fallback instead.
export default class ViewerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('3D viewer failed to load:', error);
  }

  render() {
    if (this.state.failed) {
      return <div className="model-viewer model-loading">The 3D view is unavailable right now.</div>;
    }
    return this.props.children;
  }
}