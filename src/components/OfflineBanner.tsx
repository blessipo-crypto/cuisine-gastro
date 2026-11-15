import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-stone-900 text-[#FBF9F5] border border-stone-700 rounded-md shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
      <span>Mode hors ligne — Atlas consultable depuis le cache local.</span>
    </div>
  );
};
