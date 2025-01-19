'use client';

import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function MixpanelInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !mixpanel.__loaded) {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: true,
        persistence: "localStorage",
      });
    }
  }, []);

  return null;
}