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
  FileCode2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  externalOpen,
  onExternalClose,
}) => {
  const { isInstalled, isInstallable, isIOS, install } = usePWAInstall();
  const [internalOpen, setInternalOpen] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const showModal = Boolean(externalOpen || internalOpen);

  const closeModal = () => {
    setInternalOpen(false);
    if (onExternalClose) onExternalClose();
  };

  const handleInstallDirect = async () => {
    if (isInstallable) {
      await install();
    }
  };

  // Reliable Blob download helper that works inside iframes and mobile browsers
  const triggerFileDownload = async (urlPath: string, fileName: string) => {
    setDownloadingFile(fileName);
    setDownloadStatus(null);
    try {
      const response = await fetch(urlPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000);
      setDownloadStatus(
        `Téléchargement de « ${fileName} » lancé ! Vérifiez votre dossier Téléchargements (Downloads).`
      );
    } catch {
      // Fallback: direct navigation
      const link = document.createElement('a');
      link.href = urlPath;
      link.setAttribute('download', fileName);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus(
        `Ouverture du fichier « ${fileName} ». Si le téléchargement est bloqué par l'aperçu, copiez le lien direct ci-dessous dans un nouvel onglet.`
      );
    } finally {
      setDownloadingFile(null);
    }
  };

  const handleCopyDirectLink = async (urlPath: string) => {
    const fullUrl = `${window.location.origin}${urlPath}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedUrl(urlPath);
      window.setTimeout(() => setCopiedUrl(null), 3000);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setInternalOpen(true)}
        className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-[#FAF9F6] bg-[#9E1B24] hover:bg-[#141413] border border-[#9E1B24] rounded-sm transition-all duration-300 ease-out whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        title="Obtenir le fichier exécutable pour PC et Android (HTML autonome, ZIP, APK)"
      >
        <Download className="w-4 h-4 text-[#FAF9F6]" strokeWidth={1.5} aria-hidden="true" />
        <span>Télécharger / APK</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-[#141413]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overscroll-contain"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Télécharger le fichier exécutable PC et Android APK"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90dvh] overflow-y-auto overscroll-contain bg-[#FAF9F6] border border-[#E5E2DC] p-5 sm:p-8 shadow-2xl space-y-5"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E2DC] pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#B89758]">
                  Fichiers d’Exécution Directs · PC Windows/Mac & Android APK
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#141413] mt-1">
                  Obtenir le Fichier à Exécuter (Download)
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fermer"
                className="min-w-[48px] min-h-[48px] border border-[#E5E2DC] bg-white hover:bg-[#141413] hover:text-[#FAF9F6] text-[#5C5B57] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.35} aria-hidden="true" />
              </button>
            </div>

            {downloadStatus && (
              <div className="p-4 bg-emerald-950/90 text-[#FAF9F6] border border-emerald-700 text-sm flex items-center gap-3">
                <Check className="w-5 h-5 text-[#B89758] shrink-0" />
                <span>{downloadStatus}</span>
              </div>
            )}

            <div className="space-y-4 text-base text-[#141413] leading-[1.5]">
              {/* OPTION 1: SINGLE-FILE STANDALONE EXECUTABLE (.HTML) — EASIEST! */}
              <div className="p-5 bg-white border-2 border-[#B89758] space-y-3 shadow-xs">
                <div className="flex items-start gap-3.5">
                  <FileCode2
                    className="w-6 h-6 text-[#9E1B24] shrink-0 mt-0.5"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold bg-[#B89758]/20 text-[#141413] mb-1">
                      Recommandé · Exécution Immédiate en 1 Clic
                    </span>
                    <p className="font-semibold text-lg text-[#141413]">
                      1. Fichier Exécutable Unique Autonome (PC & Téléphone)
                    </p>
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Téléchargez ce <strong>fichier unique</strong> (
                      <code className="font-mono text-xs">Atlas_Chefs_Etoiles_Autonome.html</code>)
                      et <strong>double-cliquez dessus</strong> sur votre PC ou ouvrez-le sur votre
                      téléphone Android : toute l’application se lance immédiatement, sans rien
                      installer et sans serveur.
                    </p>
                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            '/downloads/Atlas_Chefs_Etoiles_Autonome.html',
                            'Atlas_Chefs_Etoiles_Autonome.html'
                          )
                        }
                        disabled={downloadingFile !== null}
                        className="min-h-[48px] px-5 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold bg-[#9E1B24] hover:bg-[#141413] text-[#FAF9F6] transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                        <span>
                          {downloadingFile === 'Atlas_Chefs_Etoiles_Autonome.html'
                            ? 'Téléchargement...'
                            : 'Télécharger le Fichier Exécutable (.HTML)'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyDirectLink('/downloads/Atlas_Chefs_Etoiles_Autonome.html')
                        }
                        className="min-h-[48px] px-3.5 py-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] text-[#141413] cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#B89758]" />
                        <span>
                          {copiedUrl === '/downloads/Atlas_Chefs_Etoiles_Autonome.html'
                            ? 'Lien copié !'
                            : 'Copier le lien direct'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTION 2: WINDOWS / MAC EXECUTABLE ZIP PACKAGE (dist/ + LANCER_SUR_PC.bat) */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-3">
                <div className="flex items-start gap-3.5">
                  <Monitor
                    className="w-5 h-5 text-[#B89758] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#141413]">
                      2. Pack Exécutable PC Windows / Mac (`.ZIP` avec `LANCER_SUR_PC.bat`)
                    </p>
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Archive ZIP contenant le dossier compilé{' '}
                      <code className="font-mono text-xs">dist/</code> et le fichier exécutable
                      Windows <code className="font-mono text-xs">LANCER_SUR_PC.bat</code>.
                      Décompressez le ZIP et double-cliquez sur{' '}
                      <strong>LANCER_SUR_PC.bat</strong>.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            '/downloads/atlas-chefs-executable-pc-mobile.zip',
                            'atlas-chefs-executable-pc-mobile.zip'
                          )
                        }
                        disabled={downloadingFile !== null}
                        className="min-h-[48px] px-4 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors cursor-pointer"
                      >
                        <FileArchive className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} />
                        <span>
                          {downloadingFile === 'atlas-chefs-executable-pc-mobile.zip'
                            ? 'Téléchargement...'
                            : 'Télécharger le Pack PC (.ZIP)'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyDirectLink('/downloads/atlas-chefs-executable-pc-mobile.zip')
                        }
                        className="min-h-[48px] px-3.5 py-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] text-[#141413] cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#B89758]" />
                        <span>
                          {copiedUrl === '/downloads/atlas-chefs-executable-pc-mobile.zip'
                            ? 'Lien copié !'
                            : 'Copier le lien'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTION 3: COMPLETE ANDROID APK PROJECT ZIP (with COMPILER_APK_ANDROID.bat) */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-3">
                <div className="flex items-start gap-3.5">
                  <Package
                    className="w-5 h-5 text-[#9E1B24] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#141413]">
                      3. Pack Projet Android `.APK` Complet (`COMPILER_APK_ANDROID.bat`)
                    </p>
                    <p className="text-sm text-[#5C5B57] mt-1 leading-relaxed">
                      Archive ZIP contenant le projet natif Android Capacitor (
                      <code className="font-mono text-xs">android/</code>) et le script{' '}
                      <code className="font-mono text-xs">COMPILER_APK_ANDROID.bat</code> qui
                      génère automatiquement le fichier{' '}
                      <code className="font-mono text-xs">app-debug.apk</code> sur votre PC.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          triggerFileDownload(
                            '/downloads/atlas-chefs-projet-complet-apk.zip',
                            'atlas-chefs-projet-complet-apk.zip'
                          )
                        }
                        disabled={downloadingFile !== null}
                        className="min-h-[48px] px-4 py-2.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#141413] hover:bg-[#9E1B24] text-[#FAF9F6] transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#B89758]" strokeWidth={1.35} />
                        <span>
                          {downloadingFile === 'atlas-chefs-projet-complet-apk.zip'
                            ? 'Téléchargement...'
                            : 'Télécharger le Projet Android APK (.ZIP)'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCopyDirectLink('/downloads/atlas-chefs-projet-complet-apk.zip')
                        }
                        className="min-h-[48px] px-3.5 py-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#B89758] text-[#141413] cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#B89758]" />
                        <span>
                          {copiedUrl === '/downloads/atlas-chefs-projet-complet-apk.zip'
                            ? 'Lien copié !'
                            : 'Copier le lien'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTION 4: INSTALL AS NATIVE PWA ON PHONE/PC WITHOUT FILES */}
              <div className="p-4 sm:p-5 bg-white border border-[#E5E2DC] space-y-2">
                <div className="flex items-start gap-3.5">
                  <Smartphone
                    className="w-5 h-5 text-[#B89758] shrink-0 mt-0.5"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#141413]">
                        4. Installer directement sur l’écran d’accueil Android / PC (PWA)
                      </p>
                      {isInstalled && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#B89758] font-medium">
                          <Check className="w-3.5 h-3.5" /> Installée
                        </span>
                      )}
                    </div>
                    {isInstallable ? (
                      <button
                        type="button"
                        onClick={handleInstallDirect}
                        className="mt-2 min-h-[48px] px-4 py-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium bg-[#9E1B24] text-[#FAF9F6] cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Installer l’icône sur cet appareil</span>
                      </button>
                    ) : isIOS ? (
                      <p className="text-sm text-[#5C5B57] mt-1">
                        Sur iPhone (Safari) : appuyez sur <strong>Partager</strong>{' '}
                        <Share className="inline w-3.5 h-3.5 mx-0.5" /> puis{' '}
                        <strong>« Sur l’écran d’accueil »</strong>.
                      </p>
                    ) : (
                      <p className="text-sm text-[#5C5B57] mt-1">
                        Ouvrez l’application dans un nouvel onglet Chrome puis appuyez sur le menu{' '}
                        <strong>⋮</strong> → <strong>« Installer l’application »</strong>.
                      </p>
                    )}
                    <div className="mt-2">
                      <a
                        href={window.location.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-medium text-[#9E1B24] hover:underline"
                      >
                        <span>Ouvrir l’application dans un onglet externe (plein navigateur)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={closeModal}
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
