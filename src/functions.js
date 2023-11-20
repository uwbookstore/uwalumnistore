const baseUrl = "https://www.uwalumnistore.com/";
const subUrl = "www.uwalumnistore.com";

$(document).ready(function () {
  // $('link[href*=MasterCSS]').remove();

  $(
    "#degreesGoalSelect,#custAdditionalDegreeGoalR,#custAdditionalDegreeGoalL,#custAddInfoStudentL,#custAddInfoColR"
  ).hide();
  // $("#studentIDText").parent().hide();

  $("#addCusotmerType").removeClass("col-sm-6 col-md-6 col-lg-6 col-xs-12");
  $("#customerTypeSelect").removeClass("wauto displayib").attr("style", "width: 100%;");

  // Add Copyright date to footer
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var year = d.getFullYear();
  var pageCopy = d.getFullYear();
  $(".footer__copy-date").text("Copyright " + pageCopy);
  $(".home-hero-img").attr("src", $(".home-hero-img").attr("src") + "?v=" + month + day + year);
  $(".home-hero-img-sm").attr("src", $(".home-hero-img-sm").attr("src") + "?v=" + month + day + year);
  $(".home-hero-img-sm2").attr("src", $(".home-hero-img-sm2").attr("src") + "?v=" + month + day + year);

  $.urlParam = function (name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
    return results[1] || 0;
  };

  $(".merchButtons a").click(function () {
    localStorage.removeItem("MaintainScrollPosition");
  });

  if (window.location.href.search(/SiteText/)) {
    $("#contentSection").addClass("padding0");
  }

  $(
    '<div class="modal fade" id="content-modal" tabindex="-1" role="dialog" aria-labelledby="content-modal" aria-hidden="true"><div class="vertical-alignment-helper"><div class="modal-dialog vertical-align-center"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="content-modal-title" style="display: inline-block;"></h4></div><div id="content-modal-body" class="modal-body"></div></div></div></div></div>'
  ).appendTo("body");

  // Footer Navigation Functions
  if ($(window).width() <= 800) {
    $(function () {
      var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find(".footer__info--header");
        links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
      };

      Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        ($this = $(this)), ($next = $this.next());

        $next.slideToggle();
        $this.parent().toggleClass("open");

        if (!e.data.multiple) {
          $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
        }
      };

      var accordion = new Accordion($(".footer__accordion"), false);
    });
  }
  // END Footer Navigation Functions

  // FAQ Accordion
  $(".accordion")
    .find("h3")
    .click(function () {
      $(this).siblings("h3").next().slideUp(); // closes siblings
      $(this).next().slideToggle(500);
      if ($(this).next().is(":visible")) {
        $(this).toggleClass("active");
        $(this).siblings("h3").removeClass("active");
      }
    })
    .next()
    .hide();

  // Menu Cloning
  $.fn.sortList = function () {
    var mylist = $(this);
    var listitems = $("a", mylist).get();
    listitems.sort(function (a, b) {
      var compA = $(a).text().toUpperCase();
      var compB = $(b).text().toUpperCase();
      return compA < compB ? -1 : 1;
    });
    $.each(listitems, function (i, itm) {
      mylist.append(itm);
    });
  };

  // Main Category Landing Pages
  $("#women ul.featured li a").clone().addClass("menu__grid--item").appendTo("#womens-main");
  $("#women ul.tops li a").clone().addClass("menu__grid--item").appendTo("#womens-main");
  $("#women ul.bottoms li a").clone().addClass("menu__grid--item").appendTo("#womens-main");
  $("#women ul.accessories li a").clone().addClass("menu__grid--item").appendTo("#womens-main");
  //$('#womens-main li a.main-cat').hide();

  $("#men ul.featured li a").clone().addClass("menu__grid--item").appendTo("#mens-main");
  $("#men ul.tops li a").clone().addClass("menu__grid--item").appendTo("#mens-main");
  $("#men ul.bottoms li a").clone().addClass("menu__grid--item").appendTo("#mens-main");
  $("#men ul.accessories li a").clone().addClass("menu__grid--item").appendTo("#mens-main");
  // $('#mens-main li.main-cat a').hide();

  $("#kids ul.infant li a").clone().addClass("menu__grid--item").appendTo("#kids-main");
  $("#kids ul.toddler li a").clone().addClass("menu__grid--item").appendTo("#kids-main");
  $("#kids ul.youth li a").clone().addClass("menu__grid--item").appendTo("#kids-main");
  $("<span>Infant </span>").prependTo("#kids-main a.infant");
  $("<span>Toddler </span>").prependTo("#kids-main a.toddler");
  $("<span>Youth </span>").prependTo("#kids-main a.youth");
  // $('#kids-main li.main-cat a').hide();

  $("#gifts-acc ul.featured li a").clone().addClass("menu__grid--item").appendTo("#gift-main");
  $("#gifts-acc ul.for-the-home li a").clone().addClass("menu__grid--item").appendTo("#gift-main");
  $("#gifts-acc ul.miscellaneous li a").clone().addClass("menu__grid--item").appendTo("#gift-main");

  // $("#gifts-acc ul.tech li a")
  // .clone()
  // .addClass("menu__grid--item")
  // .appendTo("#tech-main");
  //$('#gift-main li.main-cat').hide();

  $("#womens-main").sortList();
  $("#mens-main").sortList();
  $("#kids-main").sortList();
  $("#gift-main").sortList();
  $("#tech-main").sortList();

  // Sub Category Landing Pages
  // Womens
  $("#women ul.featured li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#womens-featured");
  $("#women ul.tops li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#womens-tops");
  $("#women ul.accessories li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#womens-accessories");

  // Mens
  $("#men ul.featured li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#mens-featured");
  $("#men ul.tops li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#mens-tops");
  $("#men ul.accessories li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#mens-accessories");

  // Kids
  $("#kids ul.featured li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#kids-featured");
  $("#kids ul.infant li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#kids-infant");
  $("#kids ul.toddler li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#kids-toddler");
  $("#kids ul.youth li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#kids-youth");

  // Kids Accessories
  $("#kids ul.infant li.infant.kds-acc a")
    .clone()
    .addClass("menu__grid--item cat-link mx-0")
    .appendTo("#accessories-kids");
  $("#kids ul.toddler li.toddler.kds-acc a").clone().appendTo("#accessories-kids");
  $("#kids ul.youth li.youth.kds-acc a").clone().appendTo("#accessories-kids");
  $("<span>Infant Gifts &amp; </span>").prependTo("#accessories-kids li.infant.kds-acc a");
  $("<span>Toddler Gifts &amp; </span>").prependTo("#accessories-kids li.toddler.kds-acc a");
  $("<span>Youth Gifts &amp; </span>").prependTo("#accessories-kids li.youth.kds-acc a");

  // Gifts & Accessories
  $("#gifts-acc ul.featured li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#gift-featured");
  $("#gifts-acc ul.for-the-home li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#gift-home");
  $("#gifts-acc ul.miscellaneous li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#gift-misc");
  $("#gifts-acc ul.tech li a").clone().addClass("menu__grid--item cat-link mx-0").appendTo("#tech-main");

  $('<em class="fa fa-chevron-right"></em>').appendTo("a.cat-link");
  // $('div[id^=kids-] li.main-cat').hide();
  // $('div[id^=kids-] li.kds-acc a').text('Gifts & Accessories')
  // $('.menu-clone li.main-cat').hide();
  $(".menu__grid").sortList();

  $(".category__grid a.alumni").text("Alumni");
  // $('.menu-clone li.alumni.cat-link a').text('Alumni');
  // $('<em class="fa fa-chevron-right"></em>').appendTo('li.alumni.cat-link a');
  // $('<em class="fa fa-chevron-right"></em>').appendTo('li.kds-acc.cat-link a');

  $(".nav__secondary--search-submit").val("\uf002");

  // Miscelaneous functions...

  $("#viewCart").attr("class", "btn btn-text col-xs-3");
  // Convert Phone divs to phone links
  if ($.browser.mobile) {
    $(".phone").each(function () {
      var phone = $(this).text();
      //$(this).replaceWith(`<a href="tel:+1 ${phone}">${phone}</a>`);
      $(this).replaceWith('<a href="tel:+1 ' + phone + '">' + phone + "</a>");
    });
  }

  /* Account Options */
  if ($('#h_nav a:contains("Log Out")').length || $('#v_nav a:contains("Log Out")').length) {
    $("#login").html(
      [
        '<li><a href="https://secure2.mbsbooks.com/CustomerProfile?s=' + subUrl + '">Update Your Profile</a></li>',
        '<li><a href="https://secure2.mbsbooks.com/AddressBook?s=' +
          subUrl +
          '">Maintain Shipping Address Book</a></li>',
        '<li><a href="https://secure2.mbsbooks.com/Orders?s=' + subUrl + '">Track Orders</a></li>',
        // '<li><a href="' + baseUrl + 'RegistryList">View Wish List</a></li>',
        '<li><a href="https://secure2.mbsbooks.com/CustomerBalanceInquiry?s=' +
          subUrl +
          '">Gift Card Balance Inquiry</a></li>',
        '<li><a href="' + baseUrl + 'logout">Log Out</a></li>',
      ].join("\n")
    );
  } else {
    $("#login").html(
      [
        '<li><a href="https://secure2.mbsbooks.com//CustomerRegister?s=' + subUrl + '">Register</a></li>',
        '<li><a href="' + baseUrl + 'login">Login</a></a>',
      ].join("\n")
    );
  }

  function search() {
    //var search_type = $('.search-type option:selected').text();
    var search_input = $(".search-field").val();
    search_input = search_input.replace(/[^a-zA-Z 0-9]+/g, "");
    if (isNaN(search_input) == true) {
      document.location.href = baseUrl + "merchlist?searchtype=all&txtSearch=" + search_input;
    } else {
      document.location.href = baseUrl + "merchlist?searchtype=all&txtSearch=" + search_input;
    }
  }

  $(function () {
    $(".search-field").bind("keyup", function (e) {
      var search_input = $(this).val();

      if ($(this).val() !== "" && e.keyCode == 13) {
        search();
        return false;
      }
    });
    $(".search-submit").on("click", function () {
      if ($(".search-field").val() != "") {
        search();
        return false;
      }
    });
  });

  function search_dt() {
    //var search_type = $('.search-type option:selected').text();
    var search_input_dt = $(".search-field-dt").val();
    search_input_dt = search_input_dt.replace(/[^a-zA-Z 0-9]+/g, "");
    if (isNaN(search_input_dt) == true) {
      document.location.href = baseUrl + "merchlist?searchtype=all&txtSearch=" + search_input_dt;
    } else {
      document.location.href = baseUrl + "merchlist?searchtype=all&txtSearch=" + search_input_dt;
    }
  }

  $(function () {
    $(".search-field-dt").bind("keyup", function (e) {
      var search_input = $(this).val();

      if ($(this).val() !== "" && e.keyCode == 13) {
        search_dt();
        return false;
      }
    });
    $(".search-submit-dt").on("click", function () {
      if ($(".search-field-dt").val() != "") {
        search_dt();
        return false;
      }
    });
  });

  /* Back to Top Button */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".backtotop").fadeIn(200);
    } else {
      $(".backtotop").fadeOut(200);
    }
  });

  $(".backtotop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
});
