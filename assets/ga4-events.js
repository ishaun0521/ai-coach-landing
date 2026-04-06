/**
 * CAIO Website - GA4 Enhanced Event Tracking
 * Tracks form behavior, CTA clicks, scroll depth, mailto clicks, and outbound links
 * GA4 Measurement ID: G-TJH2ZZ79SH
 */

(function() {
  'use strict';

  // ============================================================
  // UTILITY
  // ============================================================

  function getPagePath() {
    return window.location.pathname;
  }

  function getPageTitle() {
    return document.title || '';
  }

  // ============================================================
  // SCROLL DEPTH (25 / 50 / 75 / 100%)
  // ============================================================

  var scrollMilestones = [25, 50, 75, 100];
  var triggeredMilestones = {};

  function trackScrollDepth() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    var scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

    scrollMilestones.forEach(function(milestone) {
      var key = milestone;
      if (scrollPercent >= milestone && !triggeredMilestones[key]) {
        triggeredMilestones[key] = true;
        gtag('event', 'scroll_depth', {
          'depth_percent': milestone,
          'page_path': getPagePath(),
          'page_title': getPageTitle()
        });
      }
    });
  }

  // ============================================================
  // FORM TRACKING (ai-diagnosis form)
  // ============================================================

  function trackFormStart(e) {
    var form = e.target.closest('form');
    if (!form) return;
    gtag('event', 'form_start', {
      'form_id': form.id || 'unknown',
      'form_name': form.name || form.id || 'diagnosisForm',
      'page_path': getPagePath()
    });
  }

  function trackFormSubmit(e) {
    var form = e.target.closest('form');
    if (!form) return;

    var formData = {};
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.name && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
        // Only send non-empty, non-sensitivity fields
        if (el.value && el.type !== 'password' && el.type !== 'hidden') {
          formData[el.name] = el.value.substring(0, 100);
        }
      }
    }

    gtag('event', 'form_submit', {
      'form_id': form.id || 'unknown',
      'form_name': form.name || form.id || 'diagnosisForm',
      'page_path': getPagePath(),
      'form_data': formData
    });
  }

  // ============================================================
  // CTA / BUTTON / LINK CLICK TRACKING
  // ============================================================

  function isMailtoLink(el) {
    return el.tagName === 'A' && el.href && el.href.startsWith('mailto:');
  }

  function isOutboundLink(el) {
    if (el.tagName !== 'A' || !el.href) return false;
    try {
      var dest = new URL(el.href);
      return dest.hostname !== window.location.hostname && dest.protocol !== 'tel:';
    } catch (e) {
      return false;
    }
  }

  function isCtaLink(el) {
    if (el.tagName !== 'A') return false;
    var href = el.href || '';
    var text = (el.textContent || '').trim().toLowerCase();
    return href.includes('diagnosis') || href.includes('demo') || href.includes('預約') ||
           href.includes('consult') || text.includes('預約') || text.includes('demo') ||
           text.includes('申請') || text.includes('立即');
  }

  function trackClick(e) {
    var el = e.target.closest('a, button, [role="button"]');
    if (!el) return;

    // Mailto click
    if (isMailtoLink(el)) {
      try {
        var mailtoUrl = new URL(el.href);
        gtag('event', 'mailto_click', {
          'mailto_address': mailtoUrl.toString().split('?')[0].replace('mailto:', ''),
          'mailto_subject': mailtoUrl.searchParams.get('subject') || '',
          'page_path': getPagePath()
        });
      } catch (err) {
        gtag('event', 'mailto_click', {
          'mailto_address': el.href.replace('mailto:', '').split('?')[0],
          'page_path': getPagePath()
        });
      }
      return;
    }

    // Outbound click
    if (isOutboundLink(el)) {
      try {
        var outUrl = new URL(el.href);
        gtag('event', 'outbound_click', {
          'outbound_url': el.href,
          'outbound_domain': outUrl.hostname,
          'page_path': getPagePath()
        });
      } catch (err) {
        gtag('event', 'outbound_click', {
          'outbound_url': el.href,
          'page_path': getPagePath()
        });
      }
      return;
    }

    // CTA diagnosis link click
    if (isCtaLink(el)) {
      var label = (el.textContent || el.innerText || '').trim().substring(0, 100);
      gtag('event', 'cta_click_diagnosis', {
        'cta_label': label,
        'cta_section': getPagePath(),
        'page_path': getPagePath()
      });
    }
  }

  // ============================================================
  // INITIALIZE
  // ============================================================

  function init() {
    // Scroll depth (debounced)
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 200);
    }, { passive: true });

    // Click tracking (delegated to document)
    document.addEventListener('click', trackClick, true);

    // Form field focus → form_start
    document.addEventListener('focusin', function(e) {
      var el = e.target;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
        var form = el.closest('form');
        if (form && form.id === 'diagnosisForm') {
          // Only fire once per page load
          if (!form._ga4_form_start_fired) {
            form._ga4_form_start_fired = true;
            trackFormStart(e);
          }
        }
      }
    }, true);

    // Form submit → form_submit
    document.addEventListener('submit', function(e) {
      var form = e.target.closest('form');
      if (form && form.id === 'diagnosisForm') {
        trackFormSubmit(e);
      }
    }, true);
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
