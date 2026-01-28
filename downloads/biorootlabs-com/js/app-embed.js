const COOKIE_KEY_EVENT_ID = '_axeid';
const COOKIE_KEY_WRT_SCRIPT_SET = '_axwrt';
const COOKIE_KEY_WRT_HTTP_SET = 'axwrt';
const QUERY_PARAM_ALEID = 'aleid';

// Pixel log endpoint configuration
const PIXEL_LOG_ENDPOINT = 'https://b.applovin.com/v1/log';
const PIXEL_TYPE = 'shopify';

async function _sendPixelLog(level, message) {
  const logData = {
    pixel_type: PIXEL_TYPE,
    logs: [
      {
        level: level,
        timestamp: Date.now(),
        message: message + ' url: ' + (window?.location?.href || 'unknown'),
      },
    ],
  };

  await fetch(PIXEL_LOG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  });
}

async function _axGetCurrentCartAleId() {
  try {
    const cartResponse = await fetch((window?.Shopify?.routes?.root || '/') + 'cart.js');
    const cartData = await cartResponse.json();
    return cartData.attributes?._axon_event_id || null;
  } catch (error) {
    console.error('Error retrieving cart event ID:', error);
    return null;
  }
}

async function _axValidateAleId(expectedEventId) {
  if (!expectedEventId) {
    return; // No expected event ID to validate against
  }

  const currentCartEventId = await _axGetCurrentCartAleId();

  if (currentCartEventId && currentCartEventId !== expectedEventId) {
    throw new Error(`Event ID mismatch v2: expected ${expectedEventId}, got ${currentCartEventId}`);
  }
}

async function _axUpdateCartAttributes(wrt, aleid, maxRetries = 3, delay = 1000, attempt = 1) {
  try {
    let attributes = {};

    if (wrt) {
      attributes._axon_client_id = wrt;
    }

    if (aleid) {
      attributes._axon_event_id = aleid;
    }

    const response = await fetch((window?.Shopify?.routes?.root || '/') + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        attributes,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText + ' ' + response.status);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors);
    }

    // Validate that the event ID was set correctly
    if (aleid) {
      await _axValidateAleId(aleid);
    }

    return result;
  } catch (error) {
    if (attempt < maxRetries) {
      setTimeout(
        async () => await _axUpdateCartAttributes(wrt, aleid, maxRetries, delay, attempt + 1),
        delay * attempt
      );
    } else {
      await _sendPixelLog('error', error.message);
      throw error;
    }
  }
}

function _axGetCookie(name) {
  try {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  } catch (error) {
    return null;
  }
}

function _axGetLocalStorage(name) {
  try {
    return window.localStorage.getItem(name);
  } catch (error) {
    return null;
  }
}

function _axGetUrlParameter(name) {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  } catch (error) {
    return null;
  }
}

function _axGetWrt() {
  return (
    _axGetCookie(COOKIE_KEY_WRT_SCRIPT_SET) ||
    _axGetCookie(COOKIE_KEY_WRT_HTTP_SET) ||
    _axGetLocalStorage(COOKIE_KEY_WRT_SCRIPT_SET) ||
    _axGetLocalStorage(COOKIE_KEY_WRT_HTTP_SET)
  );
}

function _axGetAleid() {
  return (
    _axGetUrlParameter(QUERY_PARAM_ALEID) ||
    _axGetCookie(COOKIE_KEY_EVENT_ID) ||
    _axGetLocalStorage(COOKIE_KEY_EVENT_ID)
  );
}

const aleid = _axGetAleid();
const wrt = _axGetWrt();

if (aleid || wrt) {
  _axUpdateCartAttributes(wrt, aleid);
}

setTimeout(function () {
  const aleid = _axGetAleid();
  try {
    _axValidateAleId(aleid);
  } catch (error) {
    _sendPixelLog('error', 'Event ID check failed: ' + error.message);
  }
}, 10000);
