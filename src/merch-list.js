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
  const search = window.location.search.split('=');
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

  categoryTitle.style.display = 'none';
  merchFilterWrap.innerHTML = `
    <h2 class="heading__list">${categoryTitle.textContent}</h2>
  `;
  filterColumn.after(merchFilterWrap);

  // REPLACE MBS's NO IMAGE AVAILABLE GIF
}

// document.addEventListener('DOMContentLoaded', () => {
//   const mItems = document.querySelectorAll('div.merchItem');
//   let categoryTitle =
//     document.querySelector('h1.page_header')?.textContent || '';
//   const itemImages = document.querySelectorAll('.merchImage');

//   const hideSelectors = [
//     'ul.breadcrumb',
//     '.searchCatWrap',
//     '.sortCatWrap',
//     '.pageHelp',
//     'h1.page_header',
//   ];
//   hideSelectors.forEach((sel) => {
//     document.querySelectorAll(sel).forEach((el) => (el.style.display = 'none'));
//   });

//   const paginationParent = document.querySelector('.pagination')?.parentElement;
//   if (paginationParent) paginationParent.style.display = 'none';

//   if (categoryTitle.toLowerCase() === 'search all') {
//     const searched = window.location.search.split('=');
//     const searchTerm = decodeURIComponent(searched[2] || '').replace(
//       /\+/g,
//       ' '
//     );

//     if (document.querySelectorAll('.noListItems')) {
//       document.querySelector('.noListItems').style.display = 'none';

//       const div = document.createElement('div');
//       div.className = 'empty-results';
//       div.innerHTML = `
//         <h1>Sorry, we couldn't find any products.</h1>
//         <p>We were unable to find results for <strong>${searchTerm}</strong>.
//         Please check your spelling or try searching for similar terms.</p>
//       `;
//       const target = document.querySelector('.searchCatWrap');
//       if (target) target.insertAdjacentElement('afterend', div);
//     }

//     categoryTitle = `Search Results For: ${searchTerm}`;
//   }

//   // Handle missing images
//   itemImages.forEach((img) => {
//     if (img.getAttribute('src') === '/images/notavail.gif') {
//       img.setAttribute(
//         'src',
//         'https://i.univbkstr.com/uwbookstore/img/no-image-sm.jpg'
//       );
//       img.setAttribute('alt', 'Image not available');
//       img.setAttribute('loading', 'Lazy');
//     }
//   });

//   ['.viewfiltersDiv', '.filterSelections'].forEach((sel) => {
//     document.querySelectorAll(sel).forEach((el) => (el.style.display = 'none'));
//   });

//   document.querySelectorAll('.merchDetailWrapper').forEach((el) => {
//     el.classList.remove('col-xs-12');
//   });

//   mItems.forEach((item) => {
//     item.classList.remove(
//       'padding0',
//       'bottom10',
//       'col-md-3',
//       'col-sm-6',
//       'col-xs-12',
//       'merchListClear4',
//       'merchListClearTwo'
//     );
//     item.classList.add('merch__card-item');
//   });

//   document
//     .querySelectorAll(
//       '.merchResultsText, .merchResultsSelect, .merchResultsPer'
//     )
//     .forEach((el) => {
//       el.classList.remove('displayib');
//     });

//   const filterColumn = document.querySelector('.filterColumn');
//   if (filterColumn) {
//     const newDiv = document.createElement('div');
//     newDiv.id = 'merch__card';
//     newDiv.innerHTML = `<div id="pagination-btm" class="text-center"></div>`;
//     filterColumn.insertAdjacentElement('afterend', newDiv);

//     const merchColumn = document.querySelector('.merchColumn');
//     if (merchColumn) {
//       merchColumn.classList.add('merch__card');
//       newDiv.prepend(merchColumn);
//     }
//   }

//   const pageItems = document.querySelectorAll('.pagination li');
//   if (pageItems.length === 1) {
//     const pagination = document.querySelector('ul.pagination');
//     const merchResultsSelect = document.querySelector(
//       'select.merchResultsSelect'
//     );
//     if (pagination) pagination.style.display = 'none';
//     if (merchResultsSelect) merchResultsSelect.style.display = 'none';
//   }

//   const pagination = document.querySelector('ul.pagination');
//   if (pagination) {
//     document.querySelector('#pagination-btm')?.append(pagination);
//   }

//   const merchResultsSelect = document.querySelector(
//     'select.merchResultsSelect'
//   );
//   if (merchResultsSelect) {
//     merchResultsSelect.classList.remove(
//       'wauto',
//       'displayib',
//       'right5',
//       'bottom10'
//     );
//     merchResultsSelect.classList.add('mx-auto');
//     document
//       .querySelector('#pagination-btm')
//       ?.insertAdjacentElement('afterend', merchResultsSelect);
//   }

//   document.querySelectorAll('.logoOption').forEach((el) => {
//     el.classList.remove('btn-default');
//     el.classList.add('btn-primary');
//   });

//   const headingInsertHTML = (text) => {
//     const div = document.createElement('div');
//     div.innerHTML = `<h2 class="heading__line">${text}</h2>`;
//     return div;
//   };

//   if (
//     categoryTitle.toLowerCase().includes('laptop') ||
//     categoryTitle.toLowerCase().startsWith('macbook') ||
//     categoryTitle.toLowerCase().startsWith('ipad')
//   ) {
//     const msg = `
//       <div class="center">
//         <p>
//           <strong>The price displayed is our special educational price available to UW Students, Faculty, Staff, & Alumni.</strong>
//         </p>
//       </div>
//     `;
//     const div = document.createElement('div');
//     div.innerHTML = msg;
//     const target = document.querySelector('#merch__card');
//     if (target) {
//       target.insertAdjacentElement('beforebegin', div);
//       target.insertAdjacentElement(
//         'beforebegin',
//         headingInsertHTML(categoryTitle)
//       );
//     }
//   } else if (categoryTitle.toLowerCase().startsWith('the red shirt')) {
//     const redShirtHTML = `
//       <!-- <div class="center">
//         <p>Show your UW pride with this comfy shirt featuring the university&rsquo;s fight song slogan &mdash; and everyone&rsquo;s favorite badger! With 25 percent of proceeds from this limited-edition shirt going to need-based student scholarships, courtesy of the Wisconsin Alumni Association, this unique and comfy collectible provides a spirited way to give back and help students earn a UW education. It's a fun shirt with a serious mission &ndash; and a must-have for every Badger.<br>
//         <a href="https://www.uwalumni.com/shop/theredshirt/" target="_blank">Learn more</a> about The Red Shirt&rsquo;s design and positive impact.</p>

//         <p><strong>Live Red. Give Back.</strong></p>
//       </div>  -->
//       <div class="center">
//         <p>Show your UW pride with this comfy shirt inspired by vintage travel posters and the Camp Randall arch! With 25 percent of proceeds from this limited-edition shirt going to need-based student scholarships, courtesy of the Wisconsin Alumni Association, this exclusive collectible provides a spirited way to give back and help students earn a UW education. It&rsquo;s a fun shirt with a serious mission &mdash; and a must-have for every Badger.<br>
//         <a href="https://www.uwalumni.com/shop/theredshirt/" target="_blank">Learn more</a> about The Red Shirt&rsquo;s design and positive impact.</p>

//         <p><strong>Live Red. Give Back.</strong></p>
//       </div>
//     `;
//     const redDiv = document.createElement('div');
//     redDiv.innerHTML = redShirtHTML;
//     const target = document.querySelector('#merch__card');
//     if (target) {
//       target.insertAdjacentElement('beforebegin', redDiv);
//       target.insertAdjacentElement(
//         'beforebegin',
//         headingInsertHTML(categoryTitle)
//       );
//     }
//   } else {
//     const target = document.querySelector('#merch__card');
//     if (target) {
//       target.insertAdjacentElement(
//         'beforebegin',
//         headingInsertHTML(categoryTitle)
//       );
//     }
//   }
// });
