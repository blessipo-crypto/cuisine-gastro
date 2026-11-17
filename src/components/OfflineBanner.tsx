import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 left-5 right-5 sm:right-auto z-50 inline-flex items-center gap-2.5 px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] font-medium bg-[#141413] text-[#FAF9F6] border border-[#B89758]/40 shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#B89758] shrink-0" strokeWidth={1.35} aria-hidden="true" />
      <span>Mode hors ligne — Collection consultable depuis la mémoire locale</span>
    </div>
  );
};
