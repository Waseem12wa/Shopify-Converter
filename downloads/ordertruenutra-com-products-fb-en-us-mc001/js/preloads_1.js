
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Ds1KrAnN.js","/cdn/shopifycloud/checkout-web/assets/c1/app.B7qIAKX2.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.NMyU2AD8.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.B_MKqCKN.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.BwEjq_t3.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.uIAfmTLf.js","/cdn/shopifycloud/checkout-web/assets/c1/NumberField.Cr5Nj1Xz.js","/cdn/shopifycloud/checkout-web/assets/c1/useShowShopPayOptin.DN-bZcw_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.Dr9Rnc8p.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.GGBhlK3j.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.CRxrmqqU.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.CoVpZliG.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.L2d1MMJ9.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.Dmyt5mGF.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.CDQQlV6h.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.DlIpaou_.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.eLxqmCdt.js","/cdn/shopifycloud/checkout-web/assets/c1/useAddressManager.C8hv5zQF.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayPaymentRequiredMethod.C340zX9N.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.e5JypT_p.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.DnaSscHG.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.D4ixT63D.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection.Ck6bD-V3.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BvSdQ4CE.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.CrnR0QBI.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.DVvJpf1D.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.bpFjqXLo.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.CeKCx7Gf.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.CoJ0R6Lh.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.FonN7Biz.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.CONeEV-o.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.Ctv2Wf8T.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DYH7B_vD.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.Ca9titpM.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.Br8sZ79N.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NumberField.CRpcZnVJ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.Wnsmz3OS.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.DLN3k-fn.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0413/9352/0802/files/Frame_2087326730_2_x320.webp?v=1748549908"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [cdnOrigin].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  