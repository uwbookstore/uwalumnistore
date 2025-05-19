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
  const selectOptions = document.querySelectorAll(
    'select.merchDropdown option'
  );
  const logos = document.querySelectorAll('.lcsLogoWrapper');
  const sizes = document.querySelectorAll('.lcsSizeWrapper');
  const merchLogoTitle = document.querySelector('.merchLogoTitle');
  const merchSizeTitle = document.querySelector('.merchSizeTitle');

  // Change select option to readable button-style labels
  function changeSizes(options) {
    options.forEach((option) => {
      const text = option.textContent.trim().toLowerCase();
      let newText = null;

      // prettier-ignore
      switch (text ) {      
        case 'small/medium': newText = 'S/M'; break;
        case 'medium/large': newText = 'M/L'; break;
        case 'large/x-large':
        case 'large/xlarge': newText = 'L/XL'; break;
        case 'xx-small': newText = '2XS'; break;
        case 'x-small': newText = 'XS'; break;
        case 'small': newText = 'S'; break;
        case 'medium': newText = 'M'; break;
        case 'large': newText = 'L'; break;
        case 'x-large': newText = 'XL'; break;
        case 'xx-large':
        case '2x-large': newText = '2XL'; break;
        case 'xxx-large':
        case '3x-large': newText = '3XL'; break;
        case 'xxxx-large':
        case '4x': newText = '4XL'; break;
        case '5x': newText = '5XL'; break;
        case '6x': newText = '6XL'; break;
        case 'newborn 3 month': newText = 'NB/3M'; break;
        case '3 month': newText = '3M'; break;
        case '6 month': newText = '6M'; break;
        case '12 month': newText = '12M'; break;
        case '18 month': newText = '18M'; break;
        case '24 month': newText = '24M'; break;
        case '2 toddler': newText = '2T'; break;
        case '3 toddler': newText = '3T'; break;
        case '4 toddler': newText = '4T'; break;
        case '5 toddler': newText = '5T'; break;
        case '5/6 toddler': newText = '5/6T'; break;
        case '6 toddler': newText = '6T'; break;
        case '6 child': newText = '6C'; break;
        case '7 child': newText = '7C'; break;        
      }

      if (newText) {
        option.textContent = newText;
      }

      // Auto-width button classes
      const autoWidthLabels = [
        '6 x 8 / 6 x 8',
        '6 x 8 / 8 x 10',
        '8 x 10 / 8 x 10',
        'toddler',
      ];
      if (autoWidthLabels.includes(text) || !newText) {
        const parent = option.closest('select');
        if (parent) {
          parent.classList.add('btn-w-auto');
        }
      }
    });
  }

  // Apply the size text transformations
  changeSizes(Array.from(selectOptions));

  // Hide the original select element
  const merchDropdown = document.querySelector('select.merchDropdown');
  if (merchDropdown) {
    merchDropdown.style.display = 'none';
  }

  const merchInfo = document.querySelector('div#merch-info');

  // Configuration: change this to customize the label
  const sizeLabelText = 'Size |';

  // Create a container for size/logo options
  const sizeWrapper = document.createElement('div');
  sizeWrapper.id = 'sizes';
  sizeWrapper.className = 'merch__detail-size';

  // Create label
  const label = document.createElement('label');
  label.className = 'merch__detail-size-label';
  label.textContent = sizeLabelText;
  sizeWrapper.appendChild(label);

  // Create inner grid container
  const pickerFlexBox = document.createElement('div');
  pickerFlexBox.className = 'merch__detail-size-picker';
  sizeWrapper.appendChild(pickerFlexBox);

  // Combine logos and sizes
  if (sizes.length > 0) {
    pickerFlexBox.innerHTML += sizes[0].innerHTML;
  }

  if (logos.length > 0) {
    pickerFlexBox.innerHTML += logos[0].innerHTML;
  }

  // Handle fallback if no sizes/logos but selectedSize is present
  if (
    logos.length === 0 &&
    sizes.length === 0 &&
    document.querySelector('span.selectedSize')
  ) {
    const selected = document
      .querySelector('span.selectedSize')
      .textContent.trim()
      .toLowerCase();
    let displayText = selected;

    // prettier-ignore
    switch (selected) {
      case 'xxx-large': displayText = '3XL'; break;
      case 'newborn 3 month': displayText = 'NB/3M'; break;
      case 'large/x-large': displayText = 'L/XL'; break;
    }

    pickerFlexBox.innerHTML = `
      <span class="btn btn-default typeSelected">
        ${displayText}
      </span>
    `;
  }

  // Only append if there's something inside the picker
  if (pickerFlexBox.innerHTML.trim() !== '') {
    merchInfo.appendChild(sizeWrapper);
  }

  // Call changeSizes on relevent options
  const sizeOptions = document.querySelectorAll(
    'button.typeCodeOption span.sizeName'
  );
  const logoOptions = document.querySelectorAll(
    'button.typeCodeOption span.logoName'
  );

  changeSizes(Array.from(sizeOptions));
  changeSizes(Array.from(logoOptions));

  // Move error message to the size picker block
  ['p.merchDisclaimerError', 'p.merchSelectError'].forEach((selector) => {
    document.querySelectorAll(selector).forEach((p) => {
      sizeWrapper.insertBefore(p, sizeWrapper.firstChild);
    });
  });

  // Helper function to insert after an element
  function insertAfter(newNode, referenceSelector) {
    const referenceNode = document.querySelector(referenceSelector);
    if (referenceNode && referenceNode.parentNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }

  // Function to crea a size guide link
  function createSizeGuideLink(href, titleText) {
    const a = document.createElement('a');
    a.href = href;
    a.className = 'merch__detail-size-link gtmSizeTrack';
    a.title = titleText;
    a.textContent = 'Size Guide';
    return a;
  }

  // Add size charts
  if (sizes.length > 0 && prodName.toLowerCase().startsWith('the red shirt')) {
    insertAfter(
      createSizeGuideLink(
        'https://i.univbkstr.com/sizeChart/redShirt/',
        'The Red Shirt Size Guide'
      )
    );
  } else if (merchLogoTitle !== null || merchSizeTitle !== null) {
    // prettier-ignore
    let chartMap = [
      ['Champion', 8, 'https://i.univbkstr.com/sizeChart/champion/', 'Champion Size Guide'],
      ['Game Bibs', 9, 'https://i.univbkstr.com/sizeChart/gameBibs/', 'Game Bibs Size Guide'],
      ['Columbia', 8, 'https://i.univbkstr.com/sizeChart/columbia/', 'Columbia Size Guide'],
      ['Under Armour', 12, 'https://i.univbkstr.com/sizeChart/ua/', 'Under Armour Size Guide'],
      ['Peter Millar', 12, 'https://i.univbkstr.com/sizeChart/peterMillar/', 'Peter Millar Size Guide'],
      ['Blue 84', 7, 'https://i.univbkstr.com/sizeChart/blue84/', 'Blue 84 Size Guide'],
      ['For Bare Feet', 13, 'https://i.univbkstr.com/sizeChart/fbf/', 'For Bare Feet Size Guide'],
      ['College Kids', 12, 'https://i.univbkstr.com/sizeChart/cllgKids/', 'College Kids Size Guide'],
      ["&#39;47 Brand", 13, 'https://i.univbkstr.com/sizeChart/47Brand/', "'47 Brand Size Guide"],
      ['47 Brand', 8, 'https://i.univbkstr.com/sizeChart/47Brand/', "'47 Brand Size Guide"],
      ["'47 Brand", 9, 'https://i.univbkstr.com/sizeChart/47Brand/', "'47 Brand Size Guide"],
      ['JanSport', 8, 'https://i.univbkstr.com/sizeChart/jansport/chart.html', 'JanSport Size Guide'],
      ['All Star Dogs', 13, 'https://i.univbkstr.com/sizeChart/allStarDog/', 'All Star Dogs Size Guide'],
      ['zoozatz', 7, 'https://i.univbkstr.com/sizeChart/zooZatz/', 'ZooZatz Size Guide', true],
      ['Boxercraft', 10, 'https://i.univbkstr.com/sizeChart/boxercraft/', 'Boxercraft Size Guide'],
      ["Lands' End", 10, 'https://i.univbkstr.com/sizeChart/landsEnd/', "Lands' End Size Guide"],
      ['League', 6, 'https://i.univbkstr.com/sizeChart/league/', 'League Size Guide'],
      ['Vantage', 7, 'https://i.univbkstr.com/sizeChart/vantage', 'Vantage Size Guide'],
      ['Alternative', 11, 'https://i.univbkstr.com/sizeChart/alternativeApparel', 'Alternative Apparel Size Guide'],
      ['little earth wisconsin pet hat', 30, 'https://i.univbkstr.com/sizeChart/littleEarth', 'Little Earth Size Guide', true]
    ];

    let matched = false;

    for (let [name, len, url, title, caseInsesitive] of chartMap) {
      let nameToMatch = prodName.substring(0, len);
      if (caseInsesitive) {
        nameToMatch = nameToMatch.toLowerCase();
        name = name.toLocaleLowerCase();
      }

      if (nameToMatch === name) {
        insertAfter(
          createSizeGuideLink(url, title),
          '.merch__detail-size-label'
        );
        matched = true;
        break;
      }
    }

    if (!matched) {
      insertAfter(
        createSizeGuideLink(
          'https://i.univbkstr.com/sizeChart/',
          'General Size Guide'
        )
      );
    }
  }

  // === Append Quantity & Add to Cart button ===

  // Helper: append an element to a parent selector
  function appendTo(element, parentSelector) {
    const parent = document.querySelector(parentSelector);
    if (parent) {
      parent.appendChild(element);
    }
  }

  // Helper: insert element before another element
  function insertBeforeSelector(element, selector) {
    const reference = document.querySelector(selector);
    if (reference && reference.parentNode) {
      reference.parentNode.insertBefore(element, reference);
    }
  }

  // Create main container
  const addContainer = document.createElement('div');
  addContainer.className = 'merch__detail-add';
  appendTo(addContainer, 'div#merch-info');

  // Create quantity container
  const qtyContainer = document.createElement('div');
  qtyContainer.className = 'merch__detail-qty';

  const qtyLabel = document.createElement('label');
  qtyLabel.htmlFor = 'merchQTY';
  qtyLabel.textContent = 'Quantity: ';
  qtyContainer.appendChild(qtyLabel);

  const qtyInput = document.querySelector('input#merchQTY');
  if (qtyInput) qtyContainer.appendChild(qtyInput);

  addContainer.appendChild(qtyContainer);

  // Create add-to-cart button container
  const btnContainer = document.createElement('div');
  btnContainer.className = 'merch__detail-add-btn';
  addContainer.appendChild(btnContainer);

  // Move existing add to cart buttons
  const addToCartBtn = document.querySelector('a.addToCart.btn.btn-primary');
  const addToCartTypesBtn = document.querySelector(
    'a.addToCartTypes.btn.btn-primary'
  );
  if (addToCartBtn) btnContainer.appendChild(addToCartBtn);
  if (addToCartTypesBtn) {
    btnContainer.appendChild(addToCartTypesBtn);

    // Add click event with jQuery functionality replaced
    addToCartTypesBtn.addEventListener('click', () => {
      const itemCount = document.getElementById('ItemCount');
      if (itemCount) {
        itemCount.animate(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-10)' },
            { transform: 'translateY(0)' },
          ],
          {
            duration: 1000,
            iterations: 6,
          }
        );
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    });
  }

  // Move 'addedToCart' paragraph
  const addedToCart = document.querySelector('p.addedToCart');
  if (addedToCart) btnContainer.appendChild(addedToCart);

  // Optional elements moved befor add-to-cart
  const tOs = document.getElementById('tOs');
  if (tOs) insertBeforeSelector(tOs, 'div.merch__detail-add');

  const soldOut = document.getElementById('sold-out');
  if (soldOut) insertBeforeSelector(soldOut, 'div.merch__detail-add');
});
