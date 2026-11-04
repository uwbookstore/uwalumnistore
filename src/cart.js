// Shopping cart page
// Rewrite DOM - MBS default is ugly
if (window.location.href.toLowerCase().search('/shoppingcart') !== -1) {
  const cartHeader =
    document.querySelector('.scHeader').parentElement.parentElement;
  const cartCardLeft = document.getElementById('cart-leftCard');

  if (document.querySelector('.validation-summary-errors')) {
    document.querySelector('.validation-summary-errors').style.display = 'none';
  }

  // Replace MBS default Image Not Available gif
  const merchWrapperImage = document.querySelectorAll('.merch-wrapper img');

  if (merchWrapperImage) {
    merchWrapperImage.forEach((image) => {
      if (image.getAttribute('src').includes('/images/notavail.gif')) {
        image.setAttribute(
          'src',
          'https://i.univbkstr.com/img/misc/no-image-thumb.jpg',
        );
        image.setAttribute('alt', 'Image not available');
      }
    });
  }

  // Show alerts to show user Promo information
  // const promoAlert = document.createElement('div');

  // promoAlert.classList.add('row');
  // promoAlert.innerHTML = `
  //   <!-- <div class="col-md-6">
  //     <div class="callout callout-info">
  //       <div class="text-center bold"><em>NOTE:</em></div>
  //       <div class="text-center">Promotional Discounts applied to items on your cart will not be viewable until
  //         the end of
  //         the
  //         checkout process.</div>
  //     </div>
  //   </div> -->
  //   <div class="col-md-6">
  //     <div class="callout callout-success">
  //       <div class="text-center bold"><em>Do you have a Promo Code?</em></div>
  //       <div class="text-center">You will be prompted for your Promo Code at checkout before entering your credit card
  //         information.</div>
  //     </div>
  //   </div>
  // `;

  itemCount.textContent === '0' ? (cartHeader.style.display = 'none') : null;
  // itemCount.textContent >= '1'
  //   ? cartCardLeft.parentElement.after(promoAlert)
  //   : null;

  // Make the cart look a bit prettier when empty
  if (itemCount.textContent === '0') {
    cartCardLeft.innerHTML = `
      <div class="cart__container">
        <i class="cart__icon fa fa-shopping-cart" aria-hidden="true"></i>
        <p class="cart__p">Your shopping cart is empty.</p>
        <a class="btn btn-primary cart__btn" href="https://www.uwalumnistore.com/home">
          Return to Homepage
        </a>
        <div class="cart__account">
          <p>
            <a class="btn btn-text" href="https://www.uwalumnistore.com/Customer-Help">
              Customer Help
            </a>
          </p>
            <a href="tel:+16082573784">(608) 257-3784</a> or <a href="tel:+18009932665">(800) 993-2665</a>
        </div>
      </div>
    `;
  }
}
