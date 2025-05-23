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

// SETUP SEARCHBAR FUNCTIONALITY
// Call custom search - Not MBS search
function search() {
  let searchInput = document.getElementById('searchinput').value;
  document.location.href = `https://www.uwalumnistore.com/merchlist?searchtype=all&txtSearch=${searchInput}`;
}

/**
 * Check if search button exists
 * if so, toggle search form opened/closed
 *
 * Check if search submit button exists
 * if so, run custom search function
 */
// Search bar variables
const searchField = document.querySelector('.search-field');
const searchSubmit = document.querySelector('.search-submit');

if (searchSubmit && searchField) {
  searchField.addEventListener('keyup', (e) => {
    if (searchField.value !== '' && e.keyCode === 13) {
      e.preventDefault();
      search();
    }
  });

  searchSubmit.addEventListener('click', () => {
    searchField.value !== '' ? search() : false;
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

// THINGS THAT SHOULD BE IN THE FOOTER OF THE PAGE
// Add Copyright date to footer
const d = new Date();
const copyYear = d.getFullYear();
const footerCopyright = document.querySelector('.footer__copy-date');

footerCopyright ? (footerCopyright.innerHTML = `Copyright ${copyYear}`) : null;

// Remove contentSection padding on SiteText pages
if (window.location.href.toLowerCase().search('/sitetext/') !== -1) {
  document.getElementById('contentSection').classList.add('p-0');
}

// ACCOUNT OPTIONS
const loginContainer = document.getElementById('login');
const hNav = document.querySelector('#h_nav a');
const vNav = document.querySelector('#v_nav a');

if (
  hNav?.textContent.toLowerCase().includes('logout') ||
  vNav?.textContent.toLowerCase().includes('logout')
) {
  loginContainer.innerHTML = `
    <li>
      <a href="https://secure2.mbsbooks.com/CustomerProfile?s=www.uwalumnistore.com">
        Update Your Profile
      </a>
    </li>
    <li>
      <a href="https://secure2.mbsbooks.com/AddressBook?s=www.uwalumnistore.com">
        Maintain Shipping Address Book
      </a>
    </li>
    <li>
      <a href="https://secure2.mbsbooks.com/Orders?s=www.uwalumnistore.com">
        Track Orders
      </a>
    </li>
    <li>
      <a href="https://secure2.mbsbooks.com/CustomerBalanceInquiry?s=www.uwalumnistore.com">
        Gift Card Balance Inquiry
      </a>
    </li>
    <li>
      <a href="https://www.uwalumnistore.com/logout">
        Log Out
      </a>
    </li>
  `;
} else {
  loginContainer.innerHTML = `
    <li>
      <a href="https://secure2.mbsbooks.com//CustomerRegister?s=www.uwalumnistore.com">
        Register
      </a>
    </li>
    <li>
      <a href="https://www.uwalumnistore.com/login">
        Login
      </a>
    </li>
  `;
}

// MENU CLONING
function sortList(selector) {
  const list = document.querySelector(selector);
  if (!list) return;

  const items = Array.from(list.querySelectorAll('a'));

  items.sort((a, b) => {
    const compA = a.textContent.toUpperCase();
    const compB = b.textContent.toUpperCase();
    return compA < compB ? -1 : 1;
  });

  items.forEach((item) => {
    list.appendChild(item);
  });
}

const cloneAndAppendLinks = (
  parentId,
  subElementClass,
  targetSelector,
  newClasses
) => {
  const parent = document.getElementById(parentId);
  const target = document.querySelector(targetSelector);

  if (!parent || !target) return;

  let links = parent.querySelectorAll(`${subElementClass} li a`);

  links.forEach((link) => {
    const clone = link.cloneNode(true);

    if (typeof newClasses === 'string') {
      clone.classList.add(newClasses);
    } else if (Array.isArray(newClasses)) {
      clone.classList.add(...newClasses);
    }
    target.appendChild(clone);
  });
};

// CLONE MENU SECTIONS TO MAIN CATEGORY LANDING PAGES
// Women
cloneAndAppendLinks('women', 'ul.featured', '#womens-main', 'menu__grid--item');
cloneAndAppendLinks('women', 'ul.tops', '#womens-main', 'menu__grid--item');
cloneAndAppendLinks('women', 'ul.bottoms', '#womens-main', 'menu__grid--item');
cloneAndAppendLinks(
  'women',
  'ul.accessories',
  '#womens-main',
  'menu__grid--item'
);

// Men
cloneAndAppendLinks('men', 'ul.featured', '#mens-main', 'menu__grid--item');
cloneAndAppendLinks('men', 'ul.tops', '#mens-main', 'menu__grid--item');
cloneAndAppendLinks('men', 'ul.bottoms', '#mens-main', 'menu__grid--item');
cloneAndAppendLinks('men', 'ul.accessories', '#mens-main', 'menu__grid--item');

// Append appropriate prefix to kids menus
const prependTextToElement = (selector, text, tag = 'span') => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const newElem = document.createElement(tag);
    newElem.textContent = text;
    element.insertBefore(newElem, element.firstChild);
  });
};

// Kids
cloneAndAppendLinks('kids', 'ul.infant', '#kids-main', 'menu__grid--item');
prependTextToElement('#kids-main a.infant', 'Infant ');

cloneAndAppendLinks('kids', 'ul.toddler', '#kids-main', 'menu__grid--item');
prependTextToElement('#kids-main a.toddler', 'Toddler ');

cloneAndAppendLinks('kids', 'ul.youth', '#kids-main', 'menu__grid--item');
prependTextToElement('#kids-main a.youth', 'Youth ');

// Gifts
cloneAndAppendLinks(
  'gifts-acc',
  'ul.featured',
  '#gift-main',
  'menu__grid--item'
);
cloneAndAppendLinks(
  'gifts-acc',
  'ul.for-the-home',
  '#gift-main',
  'menu__grid--item'
);
cloneAndAppendLinks(
  'gifts-acc',
  'ul.miscellaneous',
  '#gift-main',
  'menu__grid--item'
);

// Remove "for" from mens/womens alumni title
document.querySelectorAll('.category__grid a.alumni').forEach((link) => {
  link.textContent = 'Alumni';
});

// CLONE MENU SECTIONS TO MAIN SUB-CATEGORY LANDING PAGES
// Women's pages
cloneAndAppendLinks('women', 'ul.featured', '#womens-featured', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('women', 'ul.tops', '#womens-tops', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('women', 'ul.accessories', '#womens-accessories', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);

// men's pages
cloneAndAppendLinks('men', 'ul.featured', '#mens-featured', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('men', 'ul.tops', '#mens-tops', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('men', 'ul.accessories', '#mens-accessories', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);

// kid's pages
cloneAndAppendLinks('kids', 'ul.featured', '#kids-featured', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('kids', 'ul.infant', '#kids-infant', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('kids', 'ul.toddler', '#kids-toddler', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('kids', 'ul.youth', '#kids-youth', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);

// gift pages
cloneAndAppendLinks('gifts-acc', 'ul.featured', '#gift-featured', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('gifts-acc', 'ul.for-the-home', '#gift-home', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('gifts-acc', 'ul.miscellaneous', '#gift-misc', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);
cloneAndAppendLinks('gifts-acc', 'ul.tech', '#tech-main', [
  'menu__grid--item',
  'cat-link',
  'mx-0',
]);

// Add chevron icon to submenu
document.querySelectorAll('a.cat-link').forEach((el) => {
  const icon = document.createElement('em');
  icon.classList.add('fa', 'fa-chevron-right');
  el.appendChild(icon);
});

// SORT MENUS ALPHABETICALLY
sortList('#womens-main');
sortList('#mens-main');
sortList('#kids-main');
sortList('#gift-main');
sortList('#tech-main');
sortList('.menu__grid');
