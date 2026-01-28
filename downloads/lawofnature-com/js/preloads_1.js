
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Ds1KrAnN.js","/cdn/shopifycloud/checkout-web/assets/c1/app.BY6rJvEd.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.BUXCd_--.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.5lu6dP06.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.ukNiVRqZ.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.DlXAth-1.js","/cdn/shopifycloud/checkout-web/assets/c1/NumberField.BuL3qmcX.js","/cdn/shopifycloud/checkout-web/assets/c1/useShowShopPayOptin.DcjoCxQr.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.DL1iMd92.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.BQ_eP68_.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.Dv8hwpIH.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.Cl-zhPOE.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.dI7QHaaa.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.Bue4QnMa.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.CPuikIWT.js","/cdn/shopifycloud/checkout-web/assets/c1/useAddressManager.BsZ02oW5.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayPaymentRequiredMethod.D4kEUuvB.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection.DEuC5qlo.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BQBuWQ7R.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.CiIM-LrB.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.DwVnRO0n.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.CIYBtP3i.js","/cdn/shopifycloud/checkout-web/assets/c1/useSuppressShopPayModalOnLoad.C9RKCz5L.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.BIFR1iAu.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.Cwxlewun.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.BAWFP4s2.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.BXNYeNls.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.-hSWkhVE.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.BJ-l_7l0.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.BOLp72rS.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.BeX9a-AN.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.C1g9xDKB.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.Ca9titpM.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.Br8sZ79N.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NumberField.CRpcZnVJ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.qS-Nk9US.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.DLN3k-fn.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0579/9061/0988/files/Group_5_1_x320.png?v=1676982094"];

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
  