console.clear();
(function WAAKit() {
  ('use strict');

  /* ======================================================================
       UTILITIES
       ====================================================================== */

  function emit(el, name, detail) {
    el.dispatchEvent(
      new CustomEvent('waa:' + name, { bubbles: true, detail: detail || {} }),
    );
  }

  function getFocusable(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), ' +
          'select:not([disabled]), textarea:not([disabled]) ' +
          '[tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  function trapFocus(container, evt) {
    let focusable = getFocusable(container);
    if (!focusable.length) return;
    let first = focusable[0];
    let last = focusable[focusable.length - 1];
    if (evt.key === 'Tab') {
      if (evt.shiftKey && document.activeElement === first) {
        evt.preventDefault();
        last.focus();
      } else if (!evt.shiftKey && document.activeElement === last) {
        evt.preventDefault();
        first.focus();
      }
    }
  }

  /* ======================================================================
      TOAST
      ====================================================================== */
  const Toast = {
    ICONS: { success: '✔', error: '✕', warning: '⚠', info: 'ℹ' },
    LABELS: {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
    },

    show: function (type, title, desc, duration) {
      const region = document.getElementById('toast-region');
      if (!region) return;

      const toast = document.createElement('div');
      toast.className = `ubs-toast ubs-toast--${type}`;
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.innerHTML =
        '<span class="ubs-toast__icon" aria-hidden="true">' +
        (this.ICONS[type] || 'ℹ') +
        '</span>' +
        '<div class="ubs-toast__body">' +
        '<div class="ubs-toast__title">' +
        (title || this.LABELS[type]) +
        '</div>' +
        (desc ? '<div class="ubs-toast__desc">' + desc + '</div>' : '') +
        '</div>' +
        '<span class="ubs-toast__close" aria-label="Dismiss">✕</span>';

      region.appendChild(toast);
      emit(region, 'toast:show', { type: type, title: title });

      let dismiss = function () {
        toast.classList.add('is-exiting');
        toast.addEventListener(
          'animationend',
          function () {
            toast.remove();
          },
          { once: true },
        );
      };

      toast
        .querySelector('.ubs-toast__close')
        .addEventListener('click', dismiss);
      toast.addEventListener('click', dismiss);
      if (duration !== 0) setTimeout(dismiss, duration || 2500);
    },

    init: function () {
      document.addEventListener('click', function (evt) {
        const btn = evt.target.closest('[data-toast]');
        if (!btn) return;
        Toast.show(
          btn.dataset.toast,
          btn.dataset.toastTitle,
          btn.dataset.toastDesc,
        );
      });
    },
  };

  /* ======================================================================
      Accordion
      ====================================================================== */
  function WaaAccordion(containerEl) {
    this.container = containerEl;
    this._bind();
  }

  WaaAccordion.prototype._bind = function () {
    var self = this;
    this.container
      .querySelectorAll('.waa-accordion-trigger')
      .forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
          // console.log(e.target);
        });
      });
  };

  WaaAccordion.init = function () {
    document.querySelectorAll('.waa-accordion').forEach(function (el) {
      new WaaAccordion(el);
    });
  };

  /* ======================================================================
       WaaModal
       ====================================================================== */
  function WaaModal(backdropEl) {
    this.backdrop = backdropEl;
    this.modal = backdropEl.querySelector('.waa-modal');
    this._onKey = this._handleKey.bind(this);
    this._bindTriggers();
  }

  WaaModal.prototype._bindTriggers = function () {
    let self = this;

    /* Open triggers - any [data-modal-open] or #modal-open */
    document
      .querySelectorAll('[data-modal-open], #modal-open')
      .forEach(function (el) {
        el.addEventListener('click', function () {
          self.open();
        });
      });

    /* Close triggers */
    this.backdrop
      .querySelectorAll(
        '[id^="modal-close"], [id^="modal-confirm"], [id^="modal-cancel"]',
      )
      .forEach(function (el) {
        el.addEventListener('click', function () {
          self.close();
        });
      });

    /* Backdrop click */
    this.backdrop.addEventListener('click', function (evt) {
      if (evt.target === self.backdrop) self.close();
    });
  };

  WaaModal.prototype.open = function () {
    this._lastFocus = document.activeElement;
    this.backdrop.removeAttribute('inert');
    this.backdrop.classList.add('is-open');
    document.addEventListener('keydown', this._onKey);

    /* Focus first focusable after animation */
    let self = this;
    setTimeout(function () {
      let focusable = getFocusable(self.modal);
      if (focusable.length) focusable[0].focus();
    }, 50);

    emit(this.backdrop, 'modal:open');
  };

  WaaModal.prototype.close = function () {
    this.backdrop.classList.remove('is-open');
    this.backdrop.setAttribute('inert', '');
    document.removeEventListener('keydown', this._onKey);
    if (this._lastFocus) this._lastFocus.focus();
    emit(this.backdrop, 'modal:close');
  };

  WaaModal.prototype._handleKey = function (evt) {
    if (evt.key === 'Escape') {
      this.close();
      return;
    }
    trapFocus(this.modal, evt);
  };

  /* Automatically open sales popup only if it hasn't been shown */
  WaaModal.prototype.openIfNotShown = function () {
    const storageKey = 'salesPopupShown';
    if (!sessionStorage.getItem(storageKey)) {
      this.open();
      sessionStorage.setItem(storageKey, 'true');
    }
  };

  WaaModal.init = function () {
    let backdrop = document.getElementById('modal-backdrop');

    if (backdrop) {
      let modal = new WaaModal(backdrop);

      /* Check whether salesPop exists inside modal-backdrop */
      if (backdrop.querySelector('#salesPop')) {
        modal.openIfNotShown();
      }
    }
  };

  function boot() {
    Toast.init();
    WaaAccordion.init();
    WaaModal.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Simple accordion pattern example
 */

Array.prototype.slice
  .call(document.querySelectorAll('.accordion'))
  .forEach((accordion) => {
    // Allow for multiple accordion sections to be expanded at the same time
    const allowMultiple = accordion.hasAttribute('data-allow-multiple');
    // Allow for each toggle to both open and close individually
    const allowToggle = allowMultiple
      ? allowMultiple
      : accordion.hasAttribute('data-allow-toggle');

    // Create the array of toggle elements for the accordion group
    const triggers = Array.prototype.slice.call(
      accordion.querySelectorAll('.accordion-trigger'),
    );
    const panels = Array.prototype.slice.call(
      accordion.querySelectorAll('.accordion-panel'),
    );

    accordion.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('accordion-trigger')) {
        // Check if the current toggle is expanded.
        const isExpanded = target.getAttribute('aria-expanded') === 'true';
        const active = accordion.querySelector('[aria-expanded="true"]');

        // without allowMultiple, close the open accordion
        if (!allowMultiple && active && active !== target) {
          // Set the expanded state on the triggering element
          active.setAttribute('aria-expanded', 'false');
          // Hide the accordion sections, using aria-controls to specify the desired section
          document
            .getElementById(active.getAttribute('aria-controls'))
            .setAttribute('hidden', '');

          // When toggling is not allowed, clean up disabled state
          if (!allowToggle) {
            active.removeAttribute('aria-disabled');
          }
        }

        if (!isExpanded) {
          // Set the expanded state on the triggering element
          target.setAttribute('aria-expanded', 'true');
          // Hide the accordion sections, using aria-controls to specify the desired section
          document
            .getElementById(target.getAttribute('aria-controls'))
            .removeAttribute('hidden');

          // If toggling is not allowed, set disabled state on trigger
          if (!allowToggle) {
            target.setAttribute('aria-disabled', 'true');
          }
        } else if (allowToggle && isExpanded) {
          // Set the expanded state on the triggering element
          target.setAttribute('aria-expanded', 'false');
          // Hide the accordion sections, using aria-controls to specify the desired section
          document
            .getElementById(target.getAttribute('aria-controls'))
            .setAttribute('hidden', '');
        }

        event.preventDefault();
      }
    });

    // Bind keyboard behaviors on the main accordion container
    accordion.addEventListener('keydown', (event) => {
      const { target } = event;
      const key = event.which.toString();

      const isExpanded = target.getAttribute('aria-expanded') === 'true';
      let allowToggle = allowMultiple
        ? allowMultiple
        : accordion.hasAttribute('data-allow-toggle');

      // 33 = Page Up, 34 = Page Down
      const ctrlModifier = event.ctrlKey && key.match(/33|34/);

      // Is this coming from an accordion header?
      if (target.classList.contains('accordion-trigger')) {
        // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
        // 38 = Up, 40 = Down
        if (key.match(/38|40/) || ctrlModifier) {
          const index = triggers.indexOf(target);
          const direction = key.match(/34|40/) ? 1 : -1;
          const { length } = triggers;
          const newIndex = (index + length + direction) % length;

          triggers[newIndex].focus(0);

          event.preventDefault();
        } else if (key.match(/35|36/)) {
          // 35 = End, 36 = Home keyboard operations
          switch (key) {
            // Go to first accordion
            case '36':
              triggers[0].focus();
              break;
            // Go to last accordion
            case '35':
              triggers[triggers.length - 1].focus();
              break;
            default:
              break;
          }
          event.preventDefault();
        }
      }
    });

    // These are used to style the accordion when one of the buttons has focus
    accordion.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('focus', () => {
        accordion.classList.add('focus');
      });

      trigger.addEventListener('blur', () => {
        accordion.classList.remove('focus');
      });
    });

    // Minor setup: will set disabled state, via aria-disabled, to an
    // expanded/ active accordion which is not allowed to be toggled close
    if (!allowToggle) {
      // Get the first expanded/ active accordion
      const expanded = accordion.querySelector('[aria-expanded="true"]');

      // If an expanded/ active accordion is found, disable
      if (expanded) {
        expanded.setAttribute('aria-disabled', 'true');
      }
    }
  });

/**
 * Check that Cart element exists
 * if so append cart info to custom cart
 */
// header cart variables
const cart = document.getElementById('Cart');
const itemCount = document.getElementById('ItemCount');
const cartCount = document.getElementById('cart-count');

if (cart) {
  if (Number(itemCount.textContent) !== 0) {
    cartCount.appendChild(itemCount);
  }
}
// End of shopping cart button

// SETUP BACK TO TOP BTN/FUNCTION
const backToTopBtn = document.querySelector('.backtotop');

// Smooth scroll back to top
function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Show/Hide Scroll to Top button
window.onscroll = function () {
  if (scrollY >= 200) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
};

/**
 * Check if back to top button exists
 * if so, run scrollToTop function
 */
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', scrollToTop);
}
// END BACK TO TOP BTN/FUNCTION

// SEARCH FUNCTION
const searchInput = document.getElementById('searchinput');
const searchSubmit = document.querySelector('.search-submit');
function search() {
  document.location.href = `https://www.uwalumnistore.com/merchlist?searchtype=all&txtSearch=${searchInput.value}`;
}

/**
 * Check if search button exists
 * if so, run custom search function
 */
if (searchSubmit && searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    if (searchInput.value !== '' && e.keyCode === 13) {
      e.preventDefault();
      search();
    }
  });

  searchSubmit.addEventListener('click', () => {
    searchInput.value !== '' ? search() : false;
  });
}

// HIDE UNUSED REGISTRATION COMPONENTS
[
  '#degreesGoalSelect',
  '#custAddInfoWrap',
  '#custAdditionalDegreeGoalR',
  '#custAdditionalDegreeGoalL',
  '#custAddInfoStudentL',
  '#custAddInfoColR',
].forEach(function (selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.style.display = 'none';
  }
});

// REMOVE MBS CLASSES THAT MESS WITH LAYOUT
const addCustomerType = document.getElementById('addCusotmerType');
addCustomerType
  ? addCustomerType.classList.remove('col-sm-6', 'col-12', 'padding-sm-left0')
  : null;

// MODIFY CUSTOMERTYPESELECT
const customerTypeSelect = document.getElementById('customerTypeSelect');
if (customerTypeSelect) {
  customerTypeSelect.classList.remove('wauto', 'displayib');
  customerTypeSelect.style.width = '100%';
}

// Copy text to clipboard
function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(
    () => {
      console.log(`"${newClip}" copied to clipboard`);
    },
    () => {
      console.error('Failed to copy text');
    },
  );
}

// Copy text button
const promoCodeBtn = document.querySelectorAll('.btn-copy');
promoCodeBtn.forEach((btn) => {
  const promoCodeText = btn.querySelector('span').textContent;

  btn.addEventListener('click', () => {
    updateClipboard(promoCodeText);
  });
});

// Footer copyright info
const d = new Date();
const copyYear = d.getFullYear();
const footerCopyright = document.getElementById('footer-copyright');
footerCopyright.innerHTML = `&copy; Copyright ${copyYear}`;

// Login/Logout - Account
if (window.location.href.toLowerCase().search('/logout') !== -1) {
  const logoutPanel = document.getElementById('logoutPanel');
  const logoutPanelHeader = document.getElementById('logoutPanelHeader');
  const logoutText = document.querySelector('.logoutText');
  logoutPanelHeader.style.display = 'none';
  logoutText.style.display = 'none';

  const logoutHeading = document.createElement('h2');
  logoutHeading.classList.add('heading__line-center', 'm-0');
  logoutHeading.textContent = `You are now logged out`;

  const logoutBody = document.createElement('div');
  logoutBody.classList = 'login__btns';
  logoutBody.innerHTML = `
    <a href="https://www.uwalumnistore.com/login" class="btn btn-secondary">Log Back In </a>
    <a href="https://www.uwalumnistore.com/home" class="btn btn-primary">UW Alumni Store</a>
  `;

  logoutPanel.append(logoutHeading);
  logoutPanel.append(logoutBody);
}

if (window.location.href.toLowerCase().search('/customeraccount') !== -1) {
  const accountCard = document.querySelector('.card.top10');
  accountCard.classList.add('login-panel-act');
}

const myNavbar = document.querySelector('#myNavbar a');
const loginContainer = document.querySelector('#login ul');

if (myNavbar.textContent.toLowerCase().includes('log out')) {
  loginContainer.innerHTML = `
    <li>
      <a href ="https://secure2.mbsbooks.com/CustomerProfile?s=www.uwalumnistore.com">
        Update Your Profile
      </a>
    </li>
    <li>
      <a href ="https://secure2.mbsbooks.com/AddressBook?s=www.uwalumnistore.com">
        Maintain Shipping Address Book
      </a>
    </li>
    <li>
      <a href ="https://secure2.mbsbooks.com/Orders?s=www.uwalumnistore.com">
        Manage Orders
      </a>
    </li>
    <li>
      <a href ="https://www.uwalumnistore.com/logout">
        Log Out
      </a>
    </li>
  `;
} else {
  loginContainer.innerHTML = `
    <li>
      <a href ="https://secure2.mbsbooks.com//CustomerRegister?s=www.uwalumnistore.com">
        Register
      </a>
    </li>
    <li>
      <a href ="https://www.uwalumnistore.com/login">
        Login
      </a>
    </li>
  `;
}

// Customer account page
const accountUL = document.getElementById('accountUL');
const accountULItems = document.querySelectorAll('#accountUL li.accountLI');

if (accountUL) {
  // Add Bootstrap list-group classes
  accountUL.classList.add('list-group');
  accountULItems.forEach((item) => {
    item.classList.add('list-group-item');

    if (item.textContent.toLowerCase().includes('track orders')) {
      item.querySelector('a').textContent = 'Manage Orders';
    }
    if (
      item.textContent.toLowerCase().includes('bookstore profile number') ||
      item.textContent
        .toLowerCase()
        .includes('view loyalty account information') ||
      item.textContent.toLowerCase().includes('activate and access ebooks') ||
      item.textContent.toLowerCase().includes('gift card balance inquiry') ||
      item.textContent.toLowerCase().includes('reload gift card') ||
      item.textContent.toLowerCase().includes('view my buyback alert list')
    ) {
      item.style.display = 'none';
    }
  });
}
