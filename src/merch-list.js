// Rewrite MBS default Merch List page
// Define page variables
let categoryTitle = document.querySelector('h1.page_header');
const itemImage = document.querySelectorAll('.merchImage');
const productName = document.querySelectorAll('p.merchTitle');
const searchCatWrapRow = document.querySelector('.searchCatWrap').parentElement;
const noListItems = document.querySelector('.noListItems');
const filterColumn = document.querySelector('.filterColumn');
const merchColumn = document.querySelector('.merchColumn');
const pagination = document.querySelector('ul.pagination');

// Create new div for no items found
const noResults = document.createElement('div');
noResults.classList.add('empty-results');

if (categoryTitle.textContent.toLowerCase() === 'search all') {
  const searched = window.location.search.split('=');
  const searchTerm = searched[2].replace(/%20/g, ' ');

  // NO RESULTS RETURNED
  if (noListItems) {
    noListItems.style.display = 'none'; // Hide MBS div
    categoryTitle.style.display = 'none'; // Hide MBS page title

    noResults.innerHTML = `
      <div class="empty-results">
        <h1>Sorry, we couldn't find any products.</h1>
        <p>We were unable to find results for <strong>${searchTerm}</strong>. Please check your spelling or try searching for similar terms.</p>
      </div>
    `;
    searchCatWrapRow.after(noResults);
  }
} // END OF if (categoryTitle.toLowerCase() === 'search all')
else if (
  categoryTitle.textContent.toLowerCase() === 'new arrivals' &&
  noListItems
) {
  noListItems.style.display = 'none'; // Hide MBS div
  categoryTitle.style.display = 'none'; // Hide MBS page title

  noResults.innerHTML = `
    <section class="empty-results text-center">
      <h1>
        Alumni, stay tuned&mdash;new gear is coming!
      </h1>
      <p class="bold">
        Until then, explore our best-selling favorites and show your Wisconsin pride!
      </p>
    </section>
  `;
  searchCatWrapRow.after(noResults);
}

if (!noListItems) {
  // FIX CATEGORY TITLES SINCE MBS HAS CHARACTER LIMITS
  if (
    categoryTitle.textContent.toLowerCase().substring(0, 18) ===
    'passcases, wallets'
  ) {
    categoryTitle.innerHTML = 'Passcases, Wallets, &amp; Keychains';
    document.title = 'Passcases, Wallets, &amp; Keychains';
  }

  // HIDE SEARCHCATWRAP PARENT
  searchCatWrapRow.style.display = 'none';

  // CREATE HEADER WRAPPER DIV, ADD CLASS & ID
  const merchFilterWrap = document.createElement('div');
  merchFilterWrap.classList.add('merch__filter');
  merchFilterWrap.id = 'merch__filter';

  // FOR THE RED SHIRT
  if (
    categoryTitle.textContent.toLowerCase().substring(0, 13) ===
      'the red shirt' ||
    categoryTitle.textContent.toLowerCase().substring(0, 13) ===
      "men's the red" ||
    categoryTitle.textContent.toLowerCase().substring(0, 6) === 'shirts'
  ) {
    merchFilterWrap.innerHTML = `
      <div>
        <div class="text-center">
          <p>Show your UW pride with this comfy shirt inspired by vintage travel posters and the Camp Randall arch! With 25% of proceeds from this limited-edition shirt going to the Wisconsin Alumni Association Scholarship Fund, this exclusive collectible provides a spirited way to give back and help students earn a UW education. It&rsquo;s a fun shirt with a serious mission &mdash; and a must-have for every Badger.<br><a href="https://www.uwalumni.com/shop/theredshirt/" target="_blank">Learn more</a> about The Red Shirt&rsquo;s design and positive impact.</p>
          <p><strong>Live Red. Give Back.</strong></p>
        </div>
        <h2 class="heading__line">${categoryTitle.textContent}</h2>
      </div>
    `;
  } else {
    merchFilterWrap.innerHTML = `
      <h2 class="heading__line">${categoryTitle.textContent}</h2>
    `;
  }

  // SELECT ELEMENT TO ADD HEADER WRAPPER AFTER
  filterColumn.after(merchFilterWrap);

  // REPLACE MBS's NO IMAGE AVAILABLE GIF
  itemImage.forEach((image) => {
    if (image.getAttribute('src') === '/images/notavail.gif') {
      image.setAttribute(
        'src',
        'https://i.univbkstr.com/img/misc/no-image-sm.jpg',
      );
      image.setAttribute('alt', 'Image not available');
    }
  });

  // RESET MBS MERCHITEM CLASSES AND ADD CUSTOM ONES
  const merchItems = document.querySelectorAll('.merchItem');
  merchItems.forEach((item) => {
    item.className = '';
    item.classList.add('merchItem', 'merch__card-item');
  });

  // CREATE THE PRODUCTS WRAPPER - merch__card
  const merchCard = document.createElement('div');
  merchCard.id = 'merch__card';

  merchFilterWrap.after(merchCard);

  merchColumn.classList.add('flex', 'merch__card');
  merchCard.appendChild(merchColumn);

  // ADD PAGINATION TO BOTTOM OF PAGE
  const paginationBtm = document.createElement('div');
  paginationBtm.id = 'pagination-btm';
  paginationBtm.className = 'text-center';

  merchCard.after(paginationBtm);

  const filterSelectionsRow =
    document.querySelector('.filterSelections').parentElement;

  filterSelectionsRow ? (filterSelectionsRow.style.display = 'none') : null;

  // ADD BACK IN STOCK BADGE TO ITEMS WITH ^ IN PRODUCT NAME
  // productName.forEach((item) => {
  //   const name = item.textContent.toLowerCase();
  //   const merchLink = item.closest('.merchDetailWrapper');

  //   if (name.includes('^')) {
  //     const restockBadge = document.createElement('div');
  //     restockBadge.className = 'restockBadge';
  //     restockBadge.innerHTML = 'Back in Stock!';

  //     merchLink.prepend(restockBadge);
  //   }
  // });
} // END OF MERCHLIST IF STATEMENT

// USE JQUERY TO CHECK PAGE ITEMS LENGTH
// IF ONLY ONE PAGE OF RESULTS, HIDE PAGINATION
// AND MERCHRESULTSSELECT BOX
$(document).ready(() => {
  const pageItems = $('.pagination li');
  const merchItems = $('.merchItem');
  $('ul.pagination').appendTo('#pagination-btm');

  $('select.merchResultsSelect')
    .removeClass('wauto displayib right5 bottom10')
    .addClass('mx-auto')
    .appendTo('#pagination-btm');

  if (merchItems.length <= 12 && pageItems.length === 1) {
    $('ul.pagination, select.merchResultsSelect').hide();
  }
});
