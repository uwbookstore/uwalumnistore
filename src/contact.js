console.clear();
/* Script to rewrite contact page DOM */
const fName = document.getElementById('fname');
const email = document.getElementById('email');
const confirmationText = document.querySelector('.confirmationText');
const cardHeader = document.querySelector('.card-header');
const addressBlock = document.querySelector(
  '.card-body .row > div:first-child',
);
const selectedSubject = document.querySelector('#selectedSubject');
const SubmitButton = document.querySelector('.SubmitButton');

if (SubmitButton) {
  // Disable submit button if subject isn't selected
  SubmitButton.classList.add('btn-disabled');
  SubmitButton.setAttribute('disabled', 'true');
}

if (confirmationText) {
  // Add a Homepage link
  const homeLink = document.createElement('div');
  homeLink.classList.add('text-center');
  homeLink.innerHTML = `
    <a href="https://www.uwalumnistore.com/home" class="btn btn-primary mt-3">
      HOME
    </a>
  `;

  // Update card header text
  cardHeader.innerHTML = `<h3 class="m-0">Contact Us</h3>`;
  // If the confirmation text is shown, add success callout
  confirmationText.classList.add(
    'callout',
    'callout-success',
    'fit-content',
    'mx-auto',
    'mt-0',
  );

  // Add Home page link after confirmationText
  confirmationText.after(homeLink);
} else {
  // If not logged in set focus on first name input
  // otherwise set it on the email input
  if (fName.value === '') {
    fName.focus();
  } else {
    email.focus();
  }

  // Update card header text
  cardHeader.innerHTML = `<h3 class="m-0">Contact Us</h3>`;

  // Create danger callout note
  const selMsg = document.createElement('div');
  selMsg.id = 'sel_msg';
  selMsg.classList.add('callout', 'callout-danger', 'mb-2', 'text-center');
  selMsg.textContent = `Please select a valid subject`;

  // Add callout to DOM after selectedSubject
  selectedSubject.after(selMsg);

  // Update the contact-info address block
  addressBlock.innerHTML = `
    <div class="contact-info">
      <h4>Store Contact Information:</h4>
      <div>University Book Store<br>711 State Street<br>Madison, WI 53703</div>
      <div class="phone">(608) 257-3784</div>
      <div class="phone">(800) 993-2665</div>
    </div>
  `;

  selectedSubject.addEventListener('change', function (e) {
    // const selOpt = Number(e.target.value);

    SubmitButton.classList.remove('btn-disabled');
    SubmitButton.removeAttribute('disabled');
    selMsg.style.display = 'none';
  });
}

// TODO: Add Webmaster message when selected from dropdown
/* 
  `
    If you are experiencing problems with the website, please include the following information in your message:
    <ul class="ul">
      <li>Error message(s) – (If any)</li>
      <li>What system you are on (Mac, PC, mobile device)</li>
      <li>What browser you are using (Chrome, Firefox, Safari, IE, etc.)</li>
      <li>What page you were one when you encountered the error/problem.</li>
    </ul>
  `
*/
