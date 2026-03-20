/**
 * CAIO Website - Frontend Usage Tracking
 * 
 * 追蹤內容：
 * - 頁面瀏覽（page view）
 * - 使用者操作（按鈕點擊、表單提交）
 * - 滾動深度
 * - 停留時間
 * 
 * 資料傳到後端儲存，只有管理員能看
 */

(function() {
  'use strict';

  // Config
  const API_ENDPOINT = window.CAIO_TRACKING_ENDPOINT || '/api/track';
  const SESSION_ID = 'caio_session_' + Math.random().toString(36).substr(2, 9);
  const SESSION_START = Date.now();

  let sessionInfo = {
    sessionId: SESSION_ID,
    sessionStart: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language || 'unknown',
    pageVariant: window.CAIO_PAGE_VARIANT || 'default'
  };

  function sendEvent(eventType, eventData) {
    const payload = {
      timestamp: new Date().toISOString(),
      event_type: eventType,
      session_id: SESSION_ID,
      session_start: sessionInfo.sessionStart,
      page_url: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: sessionInfo.referrer,
      user_agent: navigator.userAgent,
      screen: {
        width: sessionInfo.screenWidth,
        height: sessionInfo.screenHeight,
      },
      language: sessionInfo.language,
      page_variant: sessionInfo.pageVariant,
      event_data: eventData || {},
    };

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(API_ENDPOINT, blob);
    } else {
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function() {});
    }
  }

  function trackPageView() {
    sendEvent('page_view', {
      url: window.location.href,
      path: window.location.pathname,
    });
  }

  function trackButtonClick(e) {
    const target = e.target;
    if (!target.matches('button, a, [role="button"]')) {
      return;
    }

    const eventData = {
      element_tag: target.tagName.toLowerCase(),
      element_id: target.id || null,
      element_class: target.className || null,
      element_text: (target.textContent || target.innerText || '').trim().substring(0, 100),
      href: target.href || null,
    };

    if (target.id) {
      eventData.action = target.id;
    } else if (target.className) {
      eventData.action = target.className;
    }

    sendEvent('click', eventData);
  }

  function trackScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    if (scrollPercent >= 25 && scrollPercent % 25 === 0) {
      sendEvent('scroll', {
        depth_percent: scrollPercent,
        page_path: window.location.pathname,
      });
    }
  }

  function trackTimeOnPage() {
    const timeOnPage = Date.now() - SESSION_START;
    sendEvent('time_on_page', {
      seconds: Math.round(timeOnPage / 1000),
      page_path: window.location.pathname,
    });
  }

  function init() {
    // Track initial page view
    trackPageView();

    // Track button/link clicks
    document.addEventListener('click', trackButtonClick, true);

    // Track scroll (debounced)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScroll, 100);
    }, { passive: true });

    // Track when user leaves
    window.addEventListener('beforeunload', function() {
      trackTimeOnPage();
    });

    // Track URL changes (for SPAs)
    (function() {
      var originalPushState = history.pushState;
      history.pushState = function() {
        originalPushState.apply(this, arguments);
        trackPageView();
      };
      window.addEventListener('popstate', trackPageView);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
