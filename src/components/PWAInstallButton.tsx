import React, { useState } from 'react';
import { Download, Smartphone, X, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // Suppress button when already running in standalone installed mode
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / PC Desktop native install prompt
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#991B1B] bg-[#F3EFE7] hover:bg-[#991B1B] hover:text-[#FBF9F5] border border-stone-300 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
        title="Installer l’application sur Téléphone ou PC"
      >
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Installer l’App</span>
        <span className="sm:hidden">Installer</span>
      </button>
    );
  }

  // iOS Safari guided installation modal (WebKit does not support beforeinstallprompt)
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#991B1B] bg-[#F3EFE7] hover:bg-stone-200 border border-stone-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Sur iPhone</span>
        </button>

        {showGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Installer sur iPhone ou iPad"
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4"
          >
            <div className="w-full max-w-sm rounded-lg bg-[#FBF9F5] border border-stone-300 p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold text-stone-900">
                  Installer sur iPhone / iPad
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  aria-label="Fermer"
                  className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <ol className="mt-4 space-y-2.5 text-sm text-stone-700 list-decimal list-inside">
                <li>
                  Touchez le bouton{' '}
                  <span className="inline-flex items-center gap-1 font-medium text-stone-900">
                    <Share className="w-3.5 h-3.5" aria-hidden="true" /> Partager
                  </span>{' '}
                  dans Safari.
                </li>
                <li>
                  Faites défiler et touchez{' '}
                  <strong className="text-stone-900">Sur l’écran d’accueil</strong>.
                </li>
                <li>
                  Validez pour lancer l’Atlas comme une application native, même hors ligne.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="mt-5 w-full py-2 text-xs font-semibold bg-stone-900 text-[#FBF9F5] rounded-md cursor-pointer"
              >
                Compris
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
