import React, { useState } from 'react';
import { Download, Smartphone, Monitor, Check, X, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstalled, isInstallable, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) {
    return (
      <span
        title="Application installée sur cet appareil"
        className="hidden lg:inline-flex min-h-[48px] items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.16em] font-medium text-[#5C5B57] bg-white border border-[#E5E2DC] rounded-sm whitespace-nowrap shrink-0"
      >
        <Check className="w-3.5 h-3.5 text-[#B89758]" strokeWidth={1.5} aria-hidden="true" />
        <span>App installée</span>
      </span>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#141413] bg-white hover:bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer"
        title="Installer l’application sur téléphone ou ordinateur"
      >
        <Download className="w-4 h-4 text-[#9E1B24]" strokeWidth={1.35} aria-hidden="true" />
        <span className="hidden sm:inline">Installer</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-[#141413]/65 backdrop-blur-xs flex items-center justify-center p-4 overscroll-contain"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Installer l’application sur téléphone et PC"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FAF9F6] border border-[#E5E2DC] p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E2DC] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                  Application Mobile & Bureau
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#141413] mt-1">
                  Installer l’Atlas des Chefs
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Fermer"
                className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-white hover:bg-[#141413] hover:text-[#FAF9F6] text-[#5C5B57] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 text-base text-[#141413] leading-[1.5]">
              <div className="p-4 bg-white border border-[#E5E2DC] flex items-start gap-3.5">
                <Smartphone
                  className="w-5 h-5 text-[#9E1B24] shrink-0 mt-0.5"
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#141413]">Sur Téléphone (Android & iPhone)</p>
                  {isIOS ? (
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Dans Safari, appuyez sur le bouton{' '}
                      <strong className="font-medium text-[#141413]">Partager</strong>{' '}
                      <Share className="inline w-3.5 h-3.5 mx-0.5" strokeWidth={1.35} /> puis
                      sélectionnez{' '}
                      <strong className="font-medium text-[#141413]">
                        « Sur l’écran d’accueil »
                      </strong>
                      .
                    </p>
                  ) : (
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Ouvrez le menu du navigateur (⋮) puis appuyez sur{' '}
                      <strong className="font-medium text-[#141413]">
                        « Installer l’application »
                      </strong>{' '}
                      ou{' '}
                      <strong className="font-medium text-[#141413]">
                        « Ajouter à l’écran d’accueil »
                      </strong>
                      .
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E5E2DC] flex items-start gap-3.5">
                <Monitor
                  className="w-5 h-5 text-[#B89758] shrink-0 mt-0.5"
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#141413]">Sur Ordinateur (PC & Mac)</p>
                  <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                    Cliquez sur l’icône{' '}
                    <strong className="font-medium text-[#141413]">Installer</strong> située à
                    droite de la barre d’adresse de Chrome ou Edge pour l’ouvrir en fenêtre dédiée
                    (compatible hors ligne).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="min-h-[48px] px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
