// Get the modal
let modal = document.getElementById('freeShippingPopup');

if (typeof Storage !== 'undefined') {
  if (!sessionStorage.getItem('freeShip')) {
    // When the page loads, open the modal
    window.addEventListener('load', function () {
      modal.style.display = 'block';
      sessionStorage.setItem('freeShip', 'opened');
    });
  } else {
    sessionStorage.setItem('freeShip', 'opened');
  }

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName('popup-close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
