// Rewrite MBS default Merch List page
// Define page variables
let categoryTitle = document.querySelector('h1.page_header');
const itemImage = document.querySelectorAll('.merchImage');
const productName = document.querySelectorAll('p.merchTitle');
const searchCatWrapRow = document.querySelector('.searchCatWrap').parentElement;
const noListItems = document.querySelector('.noListItems');
const merchSortBy = document.querySelector('select.merchSortBy');
const filterColumn = document.querySelector('.filterColumn');
const merchColumn = document.querySelector('.merchColumn');
const merchResultsSelect = document.querySelector('select.merchResultsSelect');
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
    categoryTitle.style.display = 'none'; //Hide MBS page title;

    noResults.innerHTML = `
    <div class="empty-results">
    <h1>Sorry, we couldn't find any products.</h1>
    <p>We were unable to find results for <strong>${searchTerm}</strong>. Please check your spelling or try searching for similar terms.</p>
    </div>
    `;

    searchCatWrapRow.after(noResults);

    categoryTitle.textContent = `Search Results For: ${searchTerm}`;
  }
} // END OF if (categoryTitle.textContent.toLowerCase() === 'search all')
else if (
  categoryTitle.textContent.toLowerCase() === 'new arrivals' &&
  noListItems
) {
  noListItems.style.display = 'none'; // Hide MBS div
  categoryTitle.style.display = 'none'; //Hide MBS page title;

  noResults.innerHTML = `
    <section class="empty-results text-center">
      <h1>
        Badger fans, stay tuned&mdash;new gear is coming!
      </h1>
      <p class="bold">
        Until then, explore our best-selling favorites and show your Wisconsin pride!
      </p>
      <div class="row">
        <div class="col-sm-12 col-md-6 mb-2">
          <a href="http://www.uwbookstore.com/Wisconsin-Badgers/Mens/Best-Sellers">
            <img src="https://i.univbkstr.com/v3/img/pages/newArrivals/letsGo.jpg" alt=""
              class="img-fluid d-block mb-2">
          </a>
          <div class="text-center">
            <a href="http://www.uwbookstore.com/Wisconsin-Badgers/Mens/Best-Sellers" class="btn btn-primary">Shop Men's
              Best
              Sellers</a>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 mb-2">
          <a href="http://www.uwbookstore.com/Wisconsin-Badgers/Womens/Best-Sellers">
            <img src="https://i.univbkstr.com/v3/img/pages/newArrivals/badgers.jpg" alt=""
              class="img-fluid d-block mb-2">
          </a>
          <div class="text-center">
            <a href="http://www.uwbookstore.com/Wisconsin-Badgers/Womens/Best-Sellers" class="btn btn-primary">Shop
              Women's
              Best Sellers</a>
          </div>
        </div>
      </div>
    </section>
   `;

  searchCatWrapRow.after(noResults);
}

if (!noListItems) {
  // HIDE SEARCHCATWRAP PARENT
  searchCatWrapRow.style.display = 'none';

  // CREATE HEADER WRAPPER DIV, ADD CLASS & ID
  const merchFilterWrap = document.createElement('div');
  merchFilterWrap.classList.add('merch__filter');
  merchFilterWrap.id = 'merch__filter';

  categoryTitle.style.display = 'none';

  merchFilterWrap.innerHTML = `
    <h2 class="heading__line">${categoryTitle.textContent}</h2>
  `;

  // ADD SORT BY SELECT AND CART BUTTON
  // const sortBy = document.createElement('div');
  // sortBy.id = 'sort-by';
  // sortBy.className = 'merch__filter--item';
  // sortBy.innerHTML = `
  //   <label style="display: block;">Sort By</label>
  // `;

  // merchSortBy ? sortBy.appendChild(merchSortBy) : null;
  // merchSortBy ? merchFilterWrap.appendChild(sortBy) : null;

  // const shoppingCartBtn = document.createElement('div');
  // shoppingCartBtn.className = 'merch__filter--item';
  // shoppingCartBtn.innerHTML = `
  //   <a class="btn btn-primary" href="https://www.uwbookstore.com/ShoppingCart">
  //     Shopping Cart
  //   </a>
  // `;
  // merchFilterWrap.appendChild(shoppingCartBtn);

  // SELECT ELEMENT TO ADD HEADER WRAPPER AFTER
  filterColumn.after(merchFilterWrap);

  // REPLACE MBS's NO IMAGE AVAILABLE GIF
  itemImage.forEach((image) => {
    if (image.getAttribute('src') === '/images/notavail.gif') {
      image.setAttribute(
        'src',
        'https://i.univbkstr.com/v3/img/misc/no-image-sm.jpg'
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

  merchResultsSelect.classList.remove(
    'wauto',
    'displayib',
    'right5',
    'bottom10'
  );
  merchResultsSelect.classList.add('mx-auto');

  const paginationBtm = document.createElement('div');
  paginationBtm.id = 'pagination-btm';
  paginationBtm.className = 'text-center';

  merchCard.after(paginationBtm);
  paginationBtm.appendChild(pagination);
  paginationBtm.appendChild(merchResultsSelect);
  const filterSelectionsRow =
    document.querySelector('.filterSelections').parentElement;

  filterSelectionsRow ? (filterSelectionsRow.style.display = 'none') : null;

  // ADD BANNERS/MESSAGES TO CERTAIN PAGES
  // create container for banner/message
  const pageBanner = document.createElement('div');

  // FOR THE RED SHIRT
  if (categoryTitle.textContent.toLowerCase() === 'the red shirt™') {
    pageBanner.classList.add('text-center');
    pageBanner.innerHTML = `
      <div class="center">
        <p>Show your UW pride with this comfy shirt featuring the university&rsquo;s fight song slogan &mdash; and everyone&rsquo;s favorite badger! With 25 percent of proceeds from this limited-edition shirt going to need-based student scholarships, courtesy of the Wisconsin Alumni Association, this unique and comfy collectible provides a spirited way to give back and help students earn a UW education. It's a fun shirt with a serious mission &ndash; and a must-have for every Badger.<br>
        <a href="https://www.uwalumni.com/shop/theredshirt/" target="_blank">Learn more</a> about The Red Shirt&rsquo;s design and positive impact.</p>
        
        <p><strong>Live Red. Give Back.</strong></p>
      </div>
      <div>
        <h2 class="heading__line"><span>${categoryTitle}</span></h2>
      </div>
  `;
  }
}
