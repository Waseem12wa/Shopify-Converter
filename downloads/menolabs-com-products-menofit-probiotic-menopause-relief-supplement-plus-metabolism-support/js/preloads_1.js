
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Ds1KrAnN.js","/cdn/shopifycloud/checkout-web/assets/c1/app.aa9qjHTz.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.BXe-L2nx.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.CuJSoBau.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.Df12wAQ9.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.l-PxXRHT.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.CFv6Lmj1.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.C56yawRI.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.CxYIyjuD.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.DT_pdHz3.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.BnOZV95B.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.D6KFhzSy.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.CrdYMzBw.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.CDJJ5Tyi.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection.qquendm7.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.DlRK5bEi.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentOptions.DeDhDuBm.js","/cdn/shopifycloud/checkout-web/assets/c1/usePreselectSpi.DP_iSczm.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.BLFpS22-.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.BioBmCIQ.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.B0l1I96P.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.zJ0OZeel.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.CiFsqcSd.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.BniKdtL8.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.w4mdCweF.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.DW5NN7KW.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.wqfXhW7E.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.CtJ8kVDo.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.CETwp4yh.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.CqTnsDJP.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DYH7B_vD.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.BD02NT8N.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.Ca9titpM.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.DjnS_Dr1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentOptions.PpwvcyQt.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.V0VYEO4K.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/montserrat/montserrat_n4.81949fa0ac9fd2021e16436151e8eaa539321637.woff2?h1=bWVub2xhYnMuY29t&hmac=8973194225fad37902332e6888adb6ba6bbed2f8d79004a4e3a857112f99d6e1","https://fonts.shopifycdn.com/montserrat/montserrat_n7.3c434e22befd5c18a6b4afadb1e3d77c128c7939.woff2?h1=bWVub2xhYnMuY29t&hmac=1158a403aaafee50f80f6132885e302abb97b4c04bbc82f5e9ce364f0e2783f4"];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0244/9506/3103/files/logo__418_60_x320.png?v=1754026879"];

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
  