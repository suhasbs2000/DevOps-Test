const bookingForm = document.querySelector('#booking-form');
const arrivalInput = document.querySelector('#arrival');
const departureInput = document.querySelector('#departure');
const bookingMessage = document.querySelector('#booking-message');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
arrivalInput.min = localToday;
departureInput.min = localToday;

arrivalInput.addEventListener('change', () => {
  departureInput.min = arrivalInput.value || localToday;
  if (departureInput.value && departureInput.value <= arrivalInput.value) {
    departureInput.value = '';
  }
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const arrival = new Date(`${arrivalInput.value}T12:00:00`);
  const departure = new Date(`${departureInput.value}T12:00:00`);
  if (departure <= arrival) {
    departureInput.setCustomValidity('Choose a departure date after your arrival.');
    departureInput.reportValidity();
    departureInput.setCustomValidity('');
    return;
  }

  const dateOptions = { month: 'short', day: 'numeric' };
  const arrivalLabel = arrival.toLocaleDateString(undefined, dateOptions);
  const departureLabel = departure.toLocaleDateString(undefined, dateOptions);
  bookingMessage.textContent = `Thanks for thinking of us. We’ll check rooms for ${arrivalLabel}–${departureLabel} and be in touch.`;
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  }
});
