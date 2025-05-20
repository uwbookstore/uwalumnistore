document.addEventListener('DOMContentLoaded', () => {
  // Hide elements
  const hideSelectors = [
    '#contentSection ul.breadcrumb',
    'a.pageHelp',
    'h1.page_header',
  ];
  hideSelectors.forEach((selector) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => (el.style.display = 'none'));
  });

  // Insert layout structure
  const merchMain = document.createElement('div');
  merchMain.id = 'merch-main';
  merchMain.className = 'merch';
  merchMain.innerHTML = `
    <div class="grid merch__detail">
      <div id="merch-imgs" class="merch__detail-images"></div>
      <div id="merch-info" class="merch__detail-info"></div>
    </div>
  `;
  document.querySelector('div#ContainDiv').prepend(merchMain);

  // Get product info
  const prodName = document.querySelector('h2.merchTitle')?.textContent || '';
  const prodSku = document.querySelector('p.merchItem span')?.textContent || '';
  const description = document.querySelector('div.merchDesc')?.innerHTML || '';
  const itemDisclaimer = document.querySelector('input.merchDisclaimer');
  const noAddCart = document.querySelector('div.hiddenCartText');
  const thumbnails = document.querySelectorAll('a.merchThumbnail');
  const detailImages = document.querySelectorAll('a.merchThumbnail img');

  if (thumbnails.length > 0) {
    // More than one image
    const flexSlider = document.createElement('div');
    flexSlider.className = 'flexslider';
    flexSlider.innerHTML = `<ul class="slides merch__detail-slides"></ul>`;
    document.querySelector('div#merch-imgs').append(flexSlider);

    const slides = flexSlider.querySelector('ul.slides');

    detailImages.forEach((img, i) => {
      const li = document.createElement('li');
      li.id = `thumbnail_${i}`;
      li.setAttribute('data-thumb', img.getAttribute('data-full'));

      const fullImg = document.createElement('img');
      fullImg.id = `fullsize_${i}`;
      fullImg.className = 'merch__detail-img';
      fullImg.src = img.getAttribute('data-high');
      fullImg.alt = '';

      li.appendChild(fullImg);
      slides.appendChild(li);
    });
  } else {
    // Only one image
    const detailImg = document.querySelector('img.merchDetailImage');
    const src = detailImg?.getAttribute('src');
    const highRes = detailImg?.getAttribute('data-high');

    const img = document.createElement('img');
    img.className = 'merch__detail-img';

    if (src === '/images/notavail.gif') {
      img.src = 'https://i.univbkstr.com/uwbookstore/img/no-image.jpg';
      img.setAttribute(
        'data-src',
        'holder.js/600x600?auto=yes&text=Image not available'
      );
      img.alt = 'Image not available';
    } else {
      img.src = highRes || '';
      img.alt = prodName;
    }

    document.querySelector('div#merch-imgs').appendChild(img);
  }

  // Product details
  const title = document.createElement('h2');
  title.className = 'merch__detail-title';
  title.textContent = prodName;
  document.querySelector('div#merch-info').appendChild(title);

  // Price block
  const priceBlock = document.createElement('div');
  priceBlock.id = 'priceBlock';
  priceBlock.className = 'merch__detail-price';
  document.querySelector('div#merch-info').appendChild(priceBlock);

  const prodPrice =
    document.querySelector('span.merchPriceCurrent')?.textContent || '';
  let salePrice = prodPrice;

  const salePriceEl = document.querySelector('p.salePrice');
  if (salePriceEl) {
    const origPriceStr =
      document.querySelector('p.merchRegPrice')?.innerHTML.split('$').pop() ||
      '';
    const origPrice = parseFloat(origPriceStr);
    salePrice = salePrice.replace(/\$/g, '');
    const sale = parseFloat(salePrice);
    let pctOff = Math.round(((origPrice - sale) / origPrice) * 100);

    const origSpan = document.createElement('span');
    origSpan.className = 'original';
    origSpan.textContent = `$${origPrice.toFixed(2)}`;
    priceBlock.appendChild(origSpan);

    const saleSpan = document.createElement('span');
    saleSpan.className = 'sale';
    saleSpan.textContent = `$${sale.toFixed(2)}`;
    priceBlock.appendChild(saleSpan);
  } else {
    const priceSpan = document.createElement('span');
    priceSpan.textContent = prodPrice;
    priceBlock.appendChild(priceSpan);
  }

  // Create and append the description block container
  const descriptionBlock = document.createElement('div');
  descriptionBlock.id = 'description-block';
  descriptionBlock.className = 'merch__detail-description';
  descriptionBlock.innerHTML = `
    <h3 class="merch__detail-title-small">The Details</h3>
  `;
  document.querySelector('div#merch-info').appendChild(descriptionBlock);

  // Append description HTML
  const descContent = document.createElement('div');
  descContent.className = 'merch__detail-description-open';
  descContent.innerHTML = description;
  descriptionBlock.appendChild(descContent);

  // Append noAddCart warning if present
  if (noAddCart) {
    noAddCart.classList.add('alert', 'alert-warning', 'text-center', 'm5');
    descriptionBlock.appendChild(noAddCart);
  }

  // Append SKU
  const skuEl = document.createElement('div');
  skuEl.className = 'merch__detail-sku';
  skuEl.innerHTML = `
    <strong>Item:</strong> ${prodSku}
  `;
  descriptionBlock.appendChild(skuEl);

  // Append promo if exists
  const gmPromo = document.querySelector('p.gmPromo');
  if (gmPromo) {
    descriptionBlock.appendChild(gmPromo);
  }

  // Handle item disclaimers
  const disclaimerParent = document.querySelector('div#merch-info');
  const disclaimerTextMap = {
    landsEnd: `<strong>PLEASE READ BEFORE PURCHASE!  Store pick-up orders will incur a $7.50 drop ship charge.</strong> This item ships directly from the manufacturer and is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for promotional discounts, expedited or free shipping. <strong>By clicking this box, you are agreeing to these terms.</strong>`,
    landsEndReally: `<strong>PLEASE READ BEFORE PURCHASE! — Lands' End may take 10-15 business days (M-F) to ship. Store pick-up orders will incur a $7.50 drop ship charge.</strong> This custom item is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for promotional discounts, expedited or free shipping. <strong>By clicking this box, you are agreeing to these terms.</strong>`,
    kyleCavan: `<strong>PLEASE READ BEFORE PURCHASE!</strong> Shipping time takes 10-15 business days (M-F).  This item ships directly from the manufacturer and is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for store pick-up, promotional discounts, expedited or free shipping. <strong>By clicking this box, you are agreeing to these terms.</strong>`,
    jardine: `<strong>PLEASE READ BEFORE PURCHASE! — This is a manufacturer direct item. This item ships separately. Please allow 2-4 weeks for delivery.</strong> This custom item is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for expedited or free shipping. <strong>By clicking this box, you are agreeing to these terms.</strong>`,
  };

  if (itemDisclaimer) {
    const matchingDisclaimerKey = Object.keys(disclaimerTextMap).find((key) =>
      document.getElementById(key)
    );

    const disclaimerWrapper = document.createElement('div');
    disclaimerWrapper.id = 'item-disclaimer';
    disclaimerWrapper.className = 'alert alert-warning';
    const label = document.createElement('label');
    disclaimerWrapper.appendChild(label);
    disclaimerParent.appendChild(disclaimerWrapper);

    const normal = itemDisclaimer.nextElementSibling?.classList.contains(
      'normal'
    )
      ? itemDisclaimer.nextElementSibling
      : null;
    if (normal) {
      label.appendChild(normal);
    }
    itemDisclaimer.classList.remove('top4');
    label.prepend(itemDisclaimer);

    if (matchingDisclaimerKey) {
      if (normal) {
        normal.innerHTML = disclaimerTextMap[matchingDisclaimerKey];
      }
      const matchedDiv = document.getElementById(matchingDisclaimerKey);
      if (matchedDiv) matchedDiv.style.display = 'none';
    }

    // Move error message if present
    const error = document.querySelector('p.merchDisclaimerError');
    if (error) {
      disclaimerWrapper.insertAdjacentElement('afterend', error);
    }
  }

  // Get all relevant DOM elements
  const selectOptions = document.querySelectorAll(
    'select.merchDropdown option'
  );
  const logos = document.querySelectorAll('.lcsLogoWrapper');
  const sizes = document.querySelectorAll('.lcsSizeWrapper');
  const merchLogoTitle = document.querySelectorAll('.merchLogoTitle');
  const merchSizeTitle = document.querySelectorAll('.merchSizeTitle');

  function changeSizes(options) {
    options.forEach(function (opt) {
      const text = opt.textContent.toLowerCase();
      let parent = opt.parentElement;

      if (text === 'small/medium') {
        opt.textContent = 'S/M';
      } else if (text === 'medium/large') {
        opt.textContent = 'M/L';
      } else if (text === 'large/x-large' || text === 'large/xlarge') {
        opt.textContent = 'L/XL';
      } else if (text === 'xx-small') {
        opt.textContent = '2XS';
      } else if (text === 'x-small') {
        opt.textContent = 'XS';
        if (document.querySelector('span.xsmall')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'small') {
        opt.textContent = 'S';
        if (document.querySelector('span.sml')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'medium') {
        opt.textContent = 'M';
        if (document.querySelector('span.medium')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'large') {
        opt.textContent = 'L';
        if (document.querySelector('span.large')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'x-large') {
        opt.textContent = 'XL';
        if (document.querySelector('span.xlg')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'xx-large' || text === '2x-large') {
        opt.textContent = '2XL';
        if (document.querySelector('span.xxlg')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'xxx-large' || text === '3x-large') {
        opt.textContent = '3XL';
        if (document.querySelector('span.xxxlg')) {
          parent.classList.add('disabled');
          parent.setAttribute('disabled', 'disabled');
        }
      } else if (text === 'xxxx-large' || text === '4x') {
        opt.textContent = '4XL';
      } else if (text === '5x') {
        opt.textContent = '5XL';
      } else if (text === '6x') {
        opt.textContent = '6XL';
      } else if (text === 'newborn 3 month') {
        opt.textContent = 'NB/3M';
      } else if (text === '3 month') {
        opt.textContent = '3M';
      } else if (text === '6 month') {
        opt.textContent = '6M';
      } else if (text === '12 month') {
        opt.textContent = '12M';
      } else if (text === '18 month') {
        opt.textContent = '18M';
      } else if (text === '24 month') {
        opt.textContent = '24M';
      } else if (text === '2 toddler') {
        opt.textContent = '2T';
      } else if (text === '3 toddler') {
        opt.textContent = '3T';
      } else if (text === '4 toddler') {
        opt.textContent = '4T';
      } else if (text === '5 toddler') {
        opt.textContent = '5T';
      } else if (text === '5/6 toddler') {
        opt.textContent = '5/6T';
      } else if (text === '6 toddler') {
        opt.textContent = '6T';
      } else if (text === '6 child') {
        opt.textContent = '6C';
      } else if (text === '7 child') {
        opt.textContent = '7C';
      } else if (
        text === '6 x 8 / 6 x 8' ||
        text === '6 x 8 / 8 x 10' ||
        text === '8 x 10 / 8 x 10' ||
        text === 'toddler'
      ) {
        parent.classList.add('btn-w-auto');
      } else {
        parent.classList.add('btn-w-auto');
      }
    });
  }

  // Apply the transformation
  changeSizes(selectOptions);

  if (sizes.length > 0) {
    const sizeHTML = Array.from(sizes)
      .map((el) => el.innerHTML)
      .join('');
    const sizeWrapper = document.createElement('div');
    sizeWrapper.id = 'sizes';
    sizeWrapper.className = 'merch__detail-size';
    sizeWrapper.innerHTML = `<div class="grid merch__detail-size-picker">${sizeHTML}</div>`;
    document.querySelector('div#merch-info')?.appendChild(sizeWrapper);

    const label = document.createElement('label');
    label.className = 'merch__detail-size-label';
    label.textContent = 'Size |';
    sizeWrapper.prepend(label);
  } else if (
    logos.length === 0 &&
    sizes.length === 0 &&
    document.querySelector('span.selectedSize')
  ) {
    const singleItem = document
      .querySelector('span.selectedSize')
      .textContent.toLowerCase();
    const sizeWrapper = document.createElement('div');
    sizeWrapper.id = 'sizes';
    sizeWrapper.className = 'merch__detail-size';

    let displayText;
    if (singleItem === 'xxx-large') {
      displayText = '3XL';
    } else if (singleItem === 'newborn 3 month') {
      displayText = 'NB/3M';
    } else if (singleItem === 'large/x-large') {
      displayText = 'L/XL';
    } else {
      displayText = singleItem;
    }

    sizeWrapper.innerHTML = `
    <div class="grid merch__detail-size-picker">
      <span class="btn btn-default typeSelected">${displayText}</span>
    </div>
  `;
    document.querySelector('div#merch-info')?.appendChild(sizeWrapper);

    const label = document.createElement('label');
    label.className = 'merch__detail-size-label';
    label.textContent = 'Size |';
    sizeWrapper.prepend(label);
  } else if (logos.length > 0) {
    const logoHTML = Array.from(logos)
      .map((el) => el.innerHTML)
      .join('');
    const logoWrapper = document.createElement('div');
    logoWrapper.id = 'sizes';
    logoWrapper.className = 'merch__detail-size';
    logoWrapper.innerHTML = `<div class="grid merch__detail-size-picker">${logoHTML}</div>`;
    document.querySelector('div#merch-info')?.appendChild(logoWrapper);

    const label = document.createElement('label');
    label.className = 'merch__detail-size-label';
    label.textContent = 'Size |';
    logoWrapper.prepend(label);
  }

  // Run changeSizes on span.sizeName and span.logoName inside button.typeCodeOption
  const sizeOptions = document.querySelectorAll(
    'button.typeCodeOption span.sizeName'
  );
  const logoOptions = document.querySelectorAll(
    'button.typeCodeOption span.logoName'
  );
  changeSizes(Array.from(sizeOptions));
  changeSizes(Array.from(logoOptions));

  // Hide logos if both logos and sizes are present
  if (logos.length > 0 && sizes.length > 0) {
    logos.forEach((el) => (el.style.display = 'none'));
  }

  // Move error messages into #sizes
  const errors = document.querySelectorAll(
    'p.merchDisclaimerError, p.merchSelectError, p.addGiftErrorLCS, p.addGiftError'
  );
  const sizesContainer = document.querySelector('div#sizes');
  errors.forEach((err) => {
    if (sizesContainer) sizesContainer.prepend(err);
  });
}); // End of DOMContentLoaded event listener
