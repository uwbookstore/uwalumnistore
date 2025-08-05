$(document).ready(function () {
  var mItem = $('div.merchItem');
  var categoryTitle = $('h1.page_header').text();
  var itemImage = $('.merchImage');

  $(
    'ul.breadcrumb, .searchCatWrap, .sortCatWrap, .merchTop.Buttons, .pageHelp, h1.page_header, .bottomButtons'
  ).hide();
  $('.pagination').parent().hide();

  if (categoryTitle.toLowerCase() === 'search all') {
    var searched = window.location.search.split('=');
    var searchTerm = searched[2].replace(/%20/g, ' ');

    // HANDLE NO SEARCH RESULTS RETURNED
    if ($('.noListItems').length) {
      $('.noListItems').hide();
      $(
        '<div class="empty-results"><h1>Sorry, we couldn\'t find any products.</h1><p>We were unable to find results for <strong>' +
          searchTerm +
          '</strong>. Please check your spelling or try searching for similar terms.</p></div>'
      ).insertAfter('.searchCatWrap');
    }

    categoryTitle = 'Search Results For: ' + searchTerm;
  }

  //   $.each(mItem, function (i) {
  //     if ($(this).has("span.salePriceTitle").length) {
  //       $('<div class="merch__card-special">SALE!</div>').appendTo($(this));
  //     }
  //   });

  $.each(itemImage, function () {
    if ($(this).attr('src') === '/images/notavail.gif') {
      $(this)
        .attr('src', 'https://i.univbkstr.com/uwbookstore/img/no-image-sm.jpg')
        .attr('data-src', 'holder.js/200x200?auto=yes&text=Image not available')
        .attr('alt', 'Image not available');
    }
  });

  $('.merchButtons').first().hide();
  $('.viewfiltersDiv,.filterSelections').hide();
  $('.merchButtons a').removeClass('btn-xs top5');
  $('.merchDetailWrapper').removeClass(' col-xs-12');
  $('.merchItem')
    .removeClass(
      'padding0 bottom10 col-md-3 col-sm-6 col-xs-12 merchListClear4 merchListClearTwo'
    )
    .addClass('merch__card-item');
  $('a.prevBackward,a.nextForward')
    .removeClass('btn-primary')
    .addClass('btn-secondary btn-rnd');
  $('a.prevBackward').html('<i class="fa fa-angle-left"></i>');
  $('a.nextForward').html('<i class="fa fa-angle-right">');
  $('.merchResultsText, .merchResultsSelect, .merchResultsPer').removeClass(
    'displayib'
  );

  $(
    '</div><div id="merch__card" class="group"><div id="pagination-btm" class="text-center"></div>'
  ).insertAfter('.filterColumn');
  $('.merchColumn').addClass('grid merch__card').prependTo('#merch__card');

  const pageItems = $('.pagination li');

  if (pageItems.length === 1) {
    $('ul.pagination, select.merchResultsSelect').hide();
  }
  $('ul.pagination').appendTo('#pagination-btm');
  $('select.merchResultsSelect')
    .removeClass('wauto displayib right5 bottom10')
    .addClass('mx-auto')
    .insertAfter('#pagination-btm');

  $('.logoOption').removeClass('btn-default').addClass('btn-primary');

  if (
    categoryTitle.indexOf('Laptop') > -1 ||
    categoryTitle.toLowerCase().substring(0, 4) === 'ipad'
  ) {
    $(
      '<div class="center"><p><strong>The price displayed is our special educational price available to UW Students, Faculty, Staff, &amp; Alumni.</strong></p></div><div><h2 class="heading__line"><span>' +
        categoryTitle +
        '</span></h2></div>'
    ).insertBefore('#merch__card');
  } else if (
    categoryTitle.toLowerCase().substring(0, 13) === 'the red shirt' ||
    categoryTitle.toLowerCase().substring(0, 13) === "men's the red" ||
    categoryTitle.toLowerCase().substring(0, 6) === 'shirts'
  ) {
    $(
      '<div class="center"><p>Show your UW pride with this comfy shirt inspired by vintage travel posters and the Camp Randall arch! With 25% of proceeds from this limited-edition shirt going to the Wisconsin Alumni Association Scholarship Fund, this exclusive collectible provides a spirited way to give back and help students earn a UW education. It’s a fun shirt with a serious mission — and a must-have for every Badger.<br><a href="https://www.uwalumni.com/shop/theredshirt/" target="_blank">Learn more</a> about The Red Shirt&rsquo;s design and positive impact.</p><p><strong>Live Red. Give Back.</strong></p></div><div><h2 class="heading__line"><span>' +
        categoryTitle +
        '</span></h2></div>'
    ).insertBefore('#merch__card');
  } else {
    $(
      '<div><h2 class="heading__line"><span>' +
        categoryTitle +
        '</span></h2></div>'
    ).insertBefore('#merch__card');
  }
});
