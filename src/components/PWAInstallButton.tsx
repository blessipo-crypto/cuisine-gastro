import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Monitor,
  Check,
  X,
  Share,
  Package,
  FileArchive,
  Terminal,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstalled, isInstallable, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleInstallDirect = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3 sm:px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#141413] bg-white hover:bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer"
        title="Télécharger le pack d'exécution PC / APK Android ou installer l'application"
      >
        <Download className="w-4 h-4 text-[#9E1B24]" strokeWidth={1.35} aria-hidden="true" />
        <span className="hidden sm:inline">
          {isInstalled ? 'Pack & APK' : 'Installer / APK'}
        </span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-[#141413]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overscroll-contain"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Centre d'Exécution et Packaging PC et Android APK"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90dvh] overflow-y-auto overscroll-contain bg-[#FAF9F6] border border-[#E5E2DC] p-5 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E2DC] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                  Exécution & Packaging · Smartphone Android & PC
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] mt-1">
                  Installer ou Télécharger les Packs d’Exécution
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Fermer"
                className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-white hover:bg-[#141413] hover:text-[#FAF9F6] text-[#5C5B57] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 text-base text-[#141413] leading-[1.5]">
              {/* STEP 1: Direct 1-Click PWA Installation on Android / PC */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-3">
                <div className="flex items-start gap-3.5">
                  <Smartphone
                    className="w-5 h-5 text-[#9E1B24] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#141413]">
                        1. Installation Directe sans Câble (Android, iPhone & PC)
                      </p>
                      {isInstalled && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#B89758] font-medium">
                          <Check className="w-3.5 h-3.5" /> Déjà installée
                        </span>
                      )}
                    </div>

                    {isInstallable ? (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={handleInstallDirect}
                          className="min-h-[48px] px-5 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium bg-[#9E1B24] hover:bg-[#141413] text-[#FAF9F6] transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" strokeWidth={1.35} />
                          <span>Installer maintenant sur cet appareil</span>
                        </button>
                      </div>
                    ) : isIOS ? (
                      <p className="text-sm text-[#5C5B57] mt-1.5 leading-relaxed">
                        Dans Safari, appuyez sur{' '}
                        <strong className="font-medium text-[#141413]">Partager</strong>{' '}
                        <Share className="inline w-3.5 h-3.5 mx-0.5" strokeWidth={1.35} /> puis
                        sélectionnez{' '}
                        <strong className="font-medium text-[#141413]">
                          « Sur l’écran d’accueil »
                        </strong>
                        .
                      </p>
                    ) : (
                      <p className="text-sm text-[#5C5B57] mt-1.5 leading-relaxed">
                        Sur <strong className="font-medium text-[#141413]">Chrome Android</strong> :
                        ouvrez le menu <strong className="font-medium text-[#141413]">⋮</strong> en
                        haut à droite puis appuyez sur{' '}
                        <strong className="font-medium text-[#141413]">
                          « Installer l’application »
                        </strong>{' '}
                        ou{' '}
                        <strong className="font-medium text-[#141413]">
                          « Ajouter à l’écran d’accueil »
                        </strong>
                        . L’application s’installe avec son icône et fonctionne hors-ligne comme un
                        APK natif.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* STEP 2: Download Ready-to-Run PC & Mobile Standalone Bundle (.zip) */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-3">
                <div className="flex items-start gap-3.5">
                  <Monitor
                    className="w-5 h-5 text-[#B89758] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#141413]">
                      2. Pack Exécutable PC & Web Autonome (Prêt à lancer)
                    </p>
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Contient le dossier compilé <code className="font-mono text-xs">dist/</code>{' '}
                      ainsi que le lanceur automatique{' '}
                      <code className="font-mono text-xs">LANCER_SUR_PC.bat</code> (Windows) et{' '}
                      <code className="font-mono text-xs">LANCER_SUR_MAC_LINUX.sh</code>.
                      Décompressez le fichier ZIP et double-cliquez sur{' '}
                      <strong className="font-medium text-[#141413]">LANCER_SUR_PC.bat</strong>.
                    </p>
                    <div className="mt-3">
                      <a
                        href="/downloads/atlas-chefs-executable-pc-mobile.zip"
                        download="atlas-chefs-executable-pc-mobile.zip"
                        className="min-h-[48px] px-4 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors cursor-pointer"
                      >
                        <FileArchive className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} />
                        <span>Télécharger le Pack Exécutable PC (.ZIP)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: Download Complete Android Capacitor APK Project (.zip) */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-3">
                <div className="flex items-start gap-3.5">
                  <Package
                    className="w-5 h-5 text-[#9E1B24] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#141413]">
                      3. Pack Projet Android APK Complet (Capacitor + Gradle)
                    </p>
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Contient l’intégralité du code source, le dossier natif{' '}
                      <code className="font-mono text-xs">android/</code> pré-synchronisé et le
                      script automatique{' '}
                      <code className="font-mono text-xs">COMPILER_APK_ANDROID.bat</code> pour
                      générer le fichier{' '}
                      <code className="font-mono text-xs">app-debug.apk</code> sur votre ordinateur.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a
                        href="/downloads/atlas-chefs-projet-complet-apk.zip"
                        download="atlas-chefs-projet-complet-apk.zip"
                        className="min-h-[48px] px-4 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#9E1B24] hover:bg-[#141413] text-[#FAF9F6] transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#FAF9F6]" strokeWidth={1.35} />
                        <span>Télécharger le Projet Android APK (.ZIP)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Command Line Quick Reference */}
              <div className="p-4 bg-[#F3F1EC] border border-[#E5E2DC] flex items-start gap-3">
                <Terminal
                  className="w-4 h-4 text-[#B89758] shrink-0 mt-1"
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
                <div className="text-xs text-[#5C5B57] space-y-1">
                  <p className="font-semibold text-[#141413] uppercase tracking-[0.12em]">
                    Commandes rapides (si vous utilisez un terminal) :
                  </p>
                  <p className="font-mono text-[#141413]">
                    • Lancer sur PC : <span>npm install && npm run build && npx serve -s dist</span>
                  </p>
                  <p className="font-mono text-[#141413]">
                    • Générer l’APK :{' '}
                    <span>npm run android:sync && cd android && ./gradlew assembleDebug</span>
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
