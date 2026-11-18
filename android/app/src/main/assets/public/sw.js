/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "ecae523285c474c85faa343712e4c870"
  }, {
    "url": "pwa-512x512.png",
    "revision": "93499ea61e99fe2e0196a858c4821a9f"
  }, {
    "url": "pwa-192x192.png",
    "revision": "3bd3b3c24888a0efe87c499373ff1008"
  }, {
    "url": "index.html",
    "revision": "2f6e5c66a836a02e4d69254946e57421"
  }, {
    "url": "icon.svg",
    "revision": "59651fa4efa0e39e8d4d2ec4d6f8b07e"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b39d19c6ac5745e86d6ebaa3af80e31f"
  }, {
    "url": "assets/yamamoto_ryugin_tuna_1794763490178-Bs5g_SSq.jpg",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/viannay_volaille_bresse_1794763489243-CURnD-cb.jpg",
    "revision": null
  }, {
    "url": "assets/smyth_scallop_scotland_1794763489756-BA994FAC.jpg",
    "revision": null
  }, {
    "url": "assets/rosier_merlu_basque_1794763485893-CgLpirv0.jpg",
    "revision": null
  }, {
    "url": "assets/roca_poularde_catalane_1794763488658-a7uOgnDb.jpg",
    "revision": null
  }, {
    "url": "assets/renaut_omble_sapin_1794763485651-D8I7QPda.jpg",
    "revision": null
  }, {
    "url": "assets/pic_berlingots_banon_1794763483845-D3EK_K09.jpg",
    "revision": null
  }, {
    "url": "assets/mazzia_langoustine_cedre_1794763483576-D70wCaSQ.jpg",
    "revision": null
  }, {
    "url": "assets/martinez_central_lima_1794763493524-Bn8LLX9J.jpg",
    "revision": null
  }, {
    "url": "assets/lesquer_spaghetti_truffe_1794763487237-CCMNn_W6.jpg",
    "revision": null
  }, {
    "url": "assets/index-C5Aj9x-r.js",
    "revision": null
  }, {
    "url": "assets/index-BrTwSiip.css",
    "revision": null
  }, {
    "url": "assets/humm_racines_hiver_1794763490497-CsoyK7cu.jpg",
    "revision": null
  }, {
    "url": "assets/hero_gastronomy_atelier_1794762906221-DBiMQkF-.jpg",
    "revision": null
  }, {
    "url": "assets/haeberlin_saumon_souffle_1794763487149-Bi_0xJrG.jpg",
    "revision": null
  }, {
    "url": "assets/gagnaire_grand_dessert_1794763487853-B4WqupxN.jpg",
    "revision": null
  }, {
    "url": "assets/dish_sea_scallop_citrus_1794762905223-DQLPLK5F.jpg",
    "revision": null
  }, {
    "url": "assets/dish_poultry_truffle_1794762906157-B2t0bKSM.jpg",
    "revision": null
  }, {
    "url": "assets/dish_nordic_ferment_1794762907367-_blxWi15.jpg",
    "revision": null
  }, {
    "url": "assets/dish_japanese_kaiseki_1794762907451-CaTYaeDi.jpg",
    "revision": null
  }, {
    "url": "assets/dish_italian_parmigiano_1794762907476-7ujSj0ey.jpg",
    "revision": null
  }, {
    "url": "assets/dish_chocolate_souffle_1794762907635-DYPi7AgN.jpg",
    "revision": null
  }, {
    "url": "assets/dish_botanical_tart_1794762904718-BLhs7kiR.jpg",
    "revision": null
  }, {
    "url": "assets/dining_room_michelin_1794762909547-CVYGDnan.jpg",
    "revision": null
  }, {
    "url": "assets/crenn_scallop_pacific_1794763492180-BYlI3oaJ.jpg",
    "revision": null
  }, {
    "url": "assets/colagreco_betterave_caviar_1794763484870-06z1rok1.jpg",
    "revision": null
  }, {
    "url": "assets/chef_plating_detail_1794762908623-CfBWAjzq.jpg",
    "revision": null
  }, {
    "url": "assets/caminada_pigeonneau_grisons_1794763491479-B7HdTBv1.jpg",
    "revision": null
  }, {
    "url": "assets/bras_coulant_chocolat_1794763487241-BCgl8K5t.jpg",
    "revision": null
  }, {
    "url": "assets/bacquie_aioli_cabillaud_1794763485390-DD3PSXLY.jpg",
    "revision": null
  }, {
    "url": "assets/arzak_langoustine_cacao_1794763490223-D21iXvu8.jpg",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b39d19c6ac5745e86d6ebaa3af80e31f"
  }, {
    "url": "icon.svg",
    "revision": "59651fa4efa0e39e8d4d2ec4d6f8b07e"
  }, {
    "url": "pwa-192x192.png",
    "revision": "3bd3b3c24888a0efe87c499373ff1008"
  }, {
    "url": "pwa-512x512.png",
    "revision": "93499ea61e99fe2e0196a858c4821a9f"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "ecae523285c474c85faa343712e4c870"
  }, {
    "url": "manifest.webmanifest",
    "revision": "2c6f46dad129b56e5b1a5232190b64aa"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
