
    (function() {
      var cdnOrigin = "https://cdn.shopify.com";
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Ds1KrAnN.js","/cdn/shopifycloud/checkout-web/assets/c1/app.C9IXQ9EE.js","/cdn/shopifycloud/checkout-web/assets/c1/vendor.D61Qd84z.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.5lu6dP06.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.CaAKRbsu.js","/cdn/shopifycloud/checkout-web/assets/c1/AddDiscountButton.BabX_x34.js","/cdn/shopifycloud/checkout-web/assets/c1/NumberField.C1K8OuD_.js","/cdn/shopifycloud/checkout-web/assets/c1/useShowShopPayOptin.YIj0Xazn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.B11XyuX9.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.BzzsYotb.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.XydDb2dI.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblemsLineItemList.BgDplEwp.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalPickup.sz1cvAZW.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.Cn3CmrPf.js","/cdn/shopifycloud/checkout-web/assets/c1/VaultedPayment.3p4-VMWe.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.CapaH2-1.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.CsdHbxzT.js","/cdn/shopifycloud/checkout-web/assets/c1/useAddressManager.zDAQocDs.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayPaymentRequiredMethod.Ddy_iDlq.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection.BVvmGTYP.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BRx-UCTh.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.CUkvFHjg.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.BLI9MqfW.js","/cdn/shopifycloud/checkout-web/assets/c1/component-ShopPayVerificationSwitch.CZhadT-q.js","/cdn/shopifycloud/checkout-web/assets/c1/useSubscribeMessenger.CUjgzMrm.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-js-index.DBEgXeY4.js","/cdn/shopifycloud/checkout-web/assets/c1/v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.D49GffaY.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.BVn9KjQS.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.Y59wxCQd.js","/cdn/shopifycloud/checkout-web/assets/c1/rendering-extension-targets.CsUfldVI.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.C4UVd5EX.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.BIXx5Uv0.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DYH7B_vD.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AddDiscountButton.Ca9titpM.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalPickup.Br8sZ79N.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShopPayVerificationSwitch.WW3cs_z5.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NumberField.CRpcZnVJ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/VaultedPayment.OxMVm7u-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.qS-Nk9US.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.DLN3k-fn.css"];
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
  