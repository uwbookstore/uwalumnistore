document.addEventListener('DOMContentLoaded', () => {
  // Hide elements
  document
    .querySelectorAll(
      '#contentSection ul.breadcrumb, a.pageHelp, h1.page_header'
    )
    .forEach((el) => (el.style.display = 'none'));

  // Create and prepend merch-main structure
  const merchHTML = `
  <div id="merch-main" class="merch">
    <div class="grid merch__detail">
      <div id="merch-imgs" class="merch__detail-images"></div>
      <div id="merch-info" class="merch__detail-info"></div>
    </div>
  </div>`;
  document
    .querySelector('div#ContainDiv')
    .insertAdjacentHTML('afterbegin', merchHTML);

  // Grab product details
  const prodName = document.querySelector('h2.merchTitle')?.textContent || '';
  const prodSku = document.querySelector('p.merchItem span')?.textContent || '';
  const description = document.querySelector('div.merchDesc')?.innerHTML || '';
  const itemDisclaimer = document.querySelector('input.merchDisclaimer');
  const noAddCart = document.querySelector('div.hiddenCartText');
  const thumbnails = document.querySelectorAll('a.merchThumbnail');
  const imgArray = thumbnails.length;

  // Handle images
  const merchImgsDiv = document.querySelector('div#merch-imgs');

  if (imgArray > 0) {
    const sliderHTML = `<div class="flexslider"><ul class="slides merch__detail-slides"></ul></div>`;
    merchImgsDiv.insertAdjacentHTML('beforeend', sliderHTML);
    const slidesUl = merchImgsDiv.querySelector('ul.slides');

    thumbnails.forEach((thumb, i) => {
      const li = document.createElement('li');
      li.id = `thumbnail_${i}`;
      const img = document.createElement('img');
      img.id = `fullsize_${i}`;
      img.alt = '';
      img.className = 'merch__detail-img';
      img.src = thumb.querySelector('img')?.getAttribute('data-high') || '';
      li.setAttribute('data-thumb', thumb.getAttribute('data-full') || '');
      li.appendChild(img);
      slidesUl.appendChild(li);
    });
  } else {
    const defaultImg = document.querySelector('img.merchDetailImage');
    if (defaultImg?.getAttribute('src') === '/images/notavail.gif') {
      console.log('Image Not Available');
      merchImgsDiv.innerHTML = `
      <img src="https://i.univbkstr.com/uwbookstore/img/no-image.jpg"
           data-src="holder.js/600x600?auto=yes&text=Image not available"
           class="merch__detail-img"
           alt="Image not available">`;
    } else {
      const imgSrc = defaultImg?.getAttribute('data-high') || '';
      merchImgsDiv.innerHTML = `
      <img src="${imgSrc}"
           alt="${prodName}"
           class="merch__detail-img">`;
    }
  }

  // Product name
  const merchInfoDiv = document.querySelector('div#merch-info');
  const titleEl = document.createElement('h2');
  titleEl.className = 'merch__detail-title';
  titleEl.textContent = prodName;
  merchInfoDiv.appendChild(titleEl);

  // Price block
  const prodPrice =
    document.querySelector('span.merchPriceCurrent')?.textContent || '';
  let salePrice = prodPrice;
  const priceBlock = document.createElement('div');
  priceBlock.id = 'priceBlock';
  priceBlock.className = 'merch__detail-price';
  merchInfoDiv.appendChild(priceBlock);

  if (document.querySelector('p.salePrice')) {
    const origPriceStr =
      document.querySelector('p.merchRegPrice')?.innerHTML?.split('$').pop() ||
      '';
    const origPrice = parseFloat(origPriceStr);
    const salePriceNum = parseFloat(salePrice.replace(/\$/g, ''));
    let pctOff = Math.round(((origPrice - salePriceNum) / origPrice) * 100);

    const origSpan = document.createElement('span');
    origSpan.className = 'original';
    origSpan.textContent = `$${origPrice.toFixed(2)}`;
    priceBlock.appendChild(origSpan);

    const saleSpan = document.createElement('span');
    saleSpan.className = 'sale';
    saleSpan.textContent = `$${salePriceNum.toFixed(2)}`;
    priceBlock.appendChild(saleSpan);
  } else {
    const priceSpan = document.createElement('span');
    priceSpan.textContent = prodPrice;
    priceBlock.appendChild(priceSpan);
  }

  // Create and append description block
  const descriptionBlockHTML = `
  <div id="description-block" class="merch__detail-description">
    <h3 class="merch__detail-title-small">The Details</h3>
  </div>`;
  merchInfoDiv.insertAdjacentHTML('beforeend', descriptionBlockHTML);

  const descriptionBlock = document.querySelector('#description-block');

  // Append product description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'merch__detail-description-open';
  descriptionDiv.innerHTML = description;
  descriptionBlock.appendChild(descriptionDiv);

  // Append noAddCart (if exists)
  if (noAddCart) {
    noAddCart.classList.add('alert', 'alert-warning', 'text-center', 'm5');
    descriptionBlock.appendChild(noAddCart);
  }

  // Append SKU
  const skuDiv = document.createElement('div');
  skuDiv.className = 'merch__detail-sku';
  skuDiv.innerHTML = `<strong>Item:</strong> ${prodSku}`;
  descriptionBlock.appendChild(skuDiv);

  // Move gmPromo paragraph (if exists)
  const gmPromo = document.querySelector('p.gmPromo');
  if (gmPromo) {
    descriptionBlock.appendChild(gmPromo);
  }

  // Handle item disclaimer conditions
  const landsEnd = document.querySelector('div#landsEnd');
  const landsEndReally = document.querySelector('div#landsEndReally');
  const kyleCavan = document.querySelector('div#kyleCavan');
  const jardine = document.querySelector('div#jardine');
  const disclaimerError = document.querySelector('p.merchDisclaimerError');
  const normalText = itemDisclaimer?.nextElementSibling?.classList.contains(
    'normal'
  )
    ? itemDisclaimer.nextElementSibling
    : null;

  if (itemDisclaimer) {
    const disclaimerWrapper = document.createElement('div');
    disclaimerWrapper.id = 'item-disclaimer';
    disclaimerWrapper.className = 'alert alert-warning';
    disclaimerWrapper.innerHTML = '<label></label>';
    merchInfoDiv.appendChild(disclaimerWrapper);

    const disclaimerLabel = disclaimerWrapper.querySelector('label');

    if (normalText) disclaimerLabel.appendChild(normalText);
    itemDisclaimer.classList.remove('top4');
    disclaimerLabel.insertBefore(itemDisclaimer, disclaimerLabel.firstChild);

    if (landsEnd) {
      disclaimerLabel.querySelector('.normal').innerHTML = `
      <strong>PLEASE READ BEFORE PURCHASE!  Store pick-up orders will incur a $7.50 drop ship charge.</strong> 
      This item ships directly from the manufacturer and is <strong>NOT ELIGIBLE</strong> for returns or exchanges 
      and does not qualify for promotional discounts, expedited or free shipping. 
      <strong>By clicking this box, you are agreeing to these terms.</strong>`;
      landsEnd.style.display = 'none';
    } else if (landsEndReally) {
      disclaimerLabel.querySelector('.normal').innerHTML = `
      <strong>PLEASE READ BEFORE PURCHASE! — Lands' End may take 10-15 business days (M-F) to ship. Store pick-up orders will incur a $7.50 drop ship charge.</strong> 
      This custom item is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for promotional discounts, expedited or free shipping. 
      <strong>By clicking this box, you are agreeing to these terms.</strong>`;
      landsEndReally.style.display = 'none';
    } else if (kyleCavan) {
      disclaimerLabel.querySelector('.normal').innerHTML = `
      <strong>PLEASE READ BEFORE PURCHASE!</strong> Shipping time takes 10-15 business days (M-F).  
      This item ships directly from the manufacturer and is <strong>NOT ELIGIBLE</strong> for returns or exchanges 
      and does not qualify for store pick-up, promotional discounts, expedited or free shipping. 
      <strong>By clicking this box, you are agreeing to these terms.</strong>`;
      kyleCavan.style.display = 'none';
    } else if (jardine) {
      disclaimerLabel.querySelector('.normal').innerHTML = `
      <strong>PLEASE READ BEFORE PURCHASE! — This is a manufacturer direct item. This item ships separately. Please allow 2-4 weeks for delivery.</strong> 
      This custom item is <strong>NOT ELIGIBLE</strong> for returns or exchanges and does not qualify for expedited or free shipping. 
      <strong>By clicking this box, you are agreeing to these terms.</strong>`;
      jardine.style.display = 'none';
    }

    // Append merchDisclaimerError if it exists
    if (disclaimerError) {
      disclaimerWrapper.insertAdjacentElement('afterend', disclaimerError);
    }
  }

  // Select elements
});
