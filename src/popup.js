// Get the modal
let modal = document.getElementById('cyberMondayPopup');

if (typeof Storage !== 'undefined') {
  if (!sessionStorage.getItem('cyberMonday24')) {
    // When the page loads, open the modal
    window.addEventListener('load', function () {
      modal.style.display = 'block';
      sessionStorage.setItem('cyberMonday24', 'opened');
    });
  } else {
    sessionStorage.setItem('cyberMonday24', 'opened');
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
