const gmPromo = document.querySelectorAll('p.gmPromo');
const promoMsg = document.querySelectorAll('span.Merch_Promo_Message');

const updatePromo = (el) => {
  if (el.length) {
    el.forEach((x) => {
      x.classList.remove('red', 'bold');
      x.classList.add('alert', 'alert-success');
      const promoTxt = x.textContent;

      if (promoTxt === 'Buy 1 Get 20 Percent Off') {
        x.innerHTML = `<strong>Get 20% Off this item when purchased with the ABSN bundle.</strong><br>Promotional Discounts applied to items on your cart may not be viewable until the end of the checkout process.`;
      } else if (promoTxt === 'Buy 1 Get $119.00 Off') {
        x.innerHTML = `<strong>iPad Back-to-School Promo</strong>
        <p>Get free Apple Pencil Pro with eligible iPad Air or iPad Pro purchase.
Valid for UW student, staff, faculty and UW Health personal purchases, NOT for department purchases. Qualified purchasers may only receive one promo with Mac purchase.
Discount will not reflect until related items are added to your cart and/or after shipping/delivery method is chosen during checkout.
</p>`;
      } else if (promoTxt === 'Buy 1 Get $169.00 Off') {
        x.innerHTML = `<strong>Mac Back-to-School Promo</strong>
        <p>Get free AirPods 3rd-Gen with Lightning case or $169 off AirPods 3rd-Gen with MagSafe or AirPods Pro 2nd-Gen or AirPods Max with eligible Mac purchase.
Valid for UW student, staff, faculty and UW Health personal purchases, NOT for department purchases. Qualified purchasers may only receive one promo with Mac purchase.
Discount will not reflect until related items are added to your cart and/or after shipping/delivery method is chosen during checkout.</p>`;
      }
    });
  }
};

updatePromo(gmPromo);
updatePromo(promoMsg);
// Buy 1 Get 20 Percent Off

$(document).ready(function () {
  // if ($('.bts').length) {
  //   $(
  //     `<div class="alert alert-success"><strong>Apple Back-to-School Promo</strong><br>
  //     Get $129.00 Off <a href="https://www.uwbookstore.com/Wisconsin-Badgers/Tech/Back-to-School-AirPods">AirPods</a> (limit one) with eligible Mac or iPad purchase.<br>Valid for UW student, staff, faculty and UW Health personal purchases, NOT for department purchases.<br> Qualified purchasers may only receive one promo with iPad purchase and one promo with Mac purchase.<br><br>Discount will not reflect until related items are added to your cart and/or after shipping/delivery method is chosen during checkout.</div>`
  //   ).insertAfter('#description-block');
  // }

  if ($('.bts-m').length) {
    $(
      `<div class="alert alert-success">
        <strong>Mac Back-to-School Promo</strong>
        <p>Get free AirPods 3rd-Gen with Lightning case or $169 off AirPods 3rd-Gen with MagSafe or AirPods Pro 2nd-Gen with eligible Mac purchase.<br>
        Valid for UW student, staff, faculty and UW Health personal purchases, NOT for department purchases.
        Qualified purchasers may only receive one promo with Mac purchase.</p>
        <p>Discount will not reflect until related items are added to your cart and/or after shipping/delivery method is chosen during checkout.</p>
      </div>`
    ).insertAfter('#description-block');
  }

  if ($('.bts-i').length) {
    $(
      `<div class="alert alert-success">
        <strong>iPad Back-to-School Promo</strong>
        <p>Get Apple Pencil 2nd-Gen free with eligible iPad Air or iPad Pro purchase.<br>
        Valid for UW student, staff, faculty and UW Health personal purchases, NOT for department purchases.
        Qualified purchasers may only receive one promo with iPad purchase.</p>
        <p>Discount will not reflect until related items are added to your cart and/or after shipping/delivery method is chosen during checkout.</p>
      </div>`
    ).insertAfter('#description-block');
  }
});
