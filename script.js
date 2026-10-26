
document.addEventListener('DOMContentLoaded', () => {

  const bookingForm = document.querySelector('#contact-form');
  if (bookingForm) {
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const message = document.querySelector('#form-message');
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.querySelector('#name');
      const email = document.querySelector('#email');
      const zone = document.querySelector('#zone-type');
      const errors = [];
      if (!name.value.trim()) errors.push('Please enter your full name.');
      const emailValue = email.value.trim();
      if (!emailValue) errors.push('Please enter your email address.');
      else if (!emailValue.includes('@')) errors.push('Email address must contain the @ symbol.');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) errors.push('Enter a valid email format, for example name@example.com.');
      if (!zone.value) errors.push('Please select a zone.');
      if (password && password.value.length < 8) errors.push(`Password is ${password.value.length} characters long; it must contain at least 8 characters.`);
      if (password && confirmPassword && password.value !== confirmPassword.value) errors.push('Password confirmation does not match.');
      if (errors.length) {
        message.className = 'form-message error';
        message.innerHTML = '<strong>Please fix the following:</strong><ul>' + errors.map(e => '<li>' + e + '</li>').join('') + '</ul>';
        message.focus();
        return;
      }
      message.className = 'form-message success';
      message.textContent = 'Validation successful! Your booking request is ready (demo only; no data was sent).';
      bookingForm.reset();
    });
  }


  const passwordInput = document.querySelector('#password');
  const passwordLength = document.querySelector('#password-length');
  if (passwordInput && passwordLength) {
    const updatePasswordLength = () => {
      const length = passwordInput.value.length;
      passwordLength.textContent = `Password length: ${length} character${length === 1 ? '' : 's'} (minimum 8). ${length >= 8 ? 'Length requirement met.' : `${8 - length} more needed.`}`;
      passwordLength.classList.toggle('valid-note', length >= 8);
    };
    passwordInput.addEventListener('input', updatePasswordLength);
    updatePasswordLength();
  }


  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(willOpen));
      panel.classList.toggle('is-open', willOpen);
      panel.setAttribute('aria-hidden', String(!willOpen));
    });
  });


  const modal = document.querySelector('#subscription-modal');
  const openModal = document.querySelectorAll('[data-open-subscription]');
  const closeModal = document.querySelector('#close-modal');
  if (modal) {
    openModal.forEach(button => button.addEventListener('click', () => {
      modal.classList.add('visible'); modal.setAttribute('aria-hidden', 'false');
      const first = modal.querySelector('input'); if (first) first.focus();
    }));
    const close = () => { modal.classList.remove('visible'); modal.setAttribute('aria-hidden', 'true'); };
    if (closeModal) closeModal.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('visible')) close(); });
    const subscribeForm = document.querySelector('#subscription-form');
    if (subscribeForm) subscribeForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = subscribeForm.querySelector('input[type="email"]');
      const feedback = document.querySelector('#subscription-feedback');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        feedback.textContent = 'Please enter a valid email address.'; feedback.className = 'form-message error'; return;
      }
      feedback.textContent = 'Thanks for subscribing! This demo does not send or store your email.';
      feedback.className = 'form-message success'; subscribeForm.reset();
    });
  }


  const colorButton = document.querySelector('#change-color');
  if (colorButton) {
    const colors = ['#121212', '#172a3a', '#29213d', '#18352e', '#38251e'];
    let colorIndex = 0;
    colorButton.addEventListener('click', () => {
      colorIndex = (colorIndex + 1) % colors.length;
      document.body.style.backgroundColor = colors[colorIndex];
      const output = document.querySelector('#color-name');
      if (output) output.textContent = `Theme ${colorIndex + 1} of ${colors.length}`;
    });
  }

  const clocks = document.querySelectorAll('#date-time, .footer-date-time');
  if (clocks.length) {
    const updateClock = () => {
      const formatted = new Date().toLocaleString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      clocks.forEach(clock => { clock.textContent = formatted; });
    };
    updateClock(); window.setInterval(updateClock, 1000);
  }


  //  Day/Night theme switch 
  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDay = document.body.classList.toggle('day-theme');
      themeToggle.setAttribute('aria-pressed', String(isDay));
      themeToggle.textContent = isDay ? 'Switch to Night theme' : 'Switch to Day theme';
    });
  }

  //click event that displays the current time
  const showTimeButton = document.querySelector('#show-time');
  if (showTimeButton) {
    showTimeButton.addEventListener('click', () => {
      const feedback = document.querySelector('#time-feedback');
      if (feedback) feedback.textContent = `Current time: ${new Date().toLocaleTimeString()}`;
    });
  }

  // switch statement changes the greeting language
  const languageSelect = document.querySelector('#language-select');
  const welcomeMessage = document.querySelector('#welcome-message');
  if (languageSelect && welcomeMessage) {
    const updateGreeting = (language) => {
      let greeting;
      switch (language) {
        case 'ru': greeting = 'Добро пожаловать в наше интернет-кафе!'; break;
        case 'kk': greeting = 'Интернет-кафемізге қош келдіңіз!'; break;
        case 'en':
        default: greeting = 'Welcome to our Internet Cafe!';
      }
      welcomeMessage.textContent = greeting;
    };
    languageSelect.addEventListener('change', () => updateGreeting(languageSelect.value));
  }

  // objects, array, loop and higher-order function (map)
  const cafeTips = [
    { title: 'Choose your zone', description: 'Standard, VIP and Pro zones suit different gaming needs.' },
    { title: 'Take a short break', description: 'Short breaks can help you stay comfortable during long sessions.' },
    { title: 'Book ahead', description: 'Use the Contact Us form to send a demo booking request.' }
  ];
  const tipsList = document.querySelector('#cafe-tips');
  if (tipsList) {
    // map() transforms each object into a list item; forEach() adds each item to the page.
    const tipElements = cafeTips.map(tip => {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = `${tip.title}: `;
      item.append(title, document.createTextNode(tip.description));
      return item;
    });
    tipElements.forEach(item => tipsList.appendChild(item));
  }

  //  Read More button changes visibility and accessible state
  const readMoreButton = document.querySelector('#read-more-toggle');
  const extraInfo = document.querySelector('#extra-cafe-info');
  if (readMoreButton && extraInfo) {
    readMoreButton.addEventListener('click', () => {
      const willShow = extraInfo.hidden;
      extraInfo.hidden = !willShow;
      readMoreButton.setAttribute('aria-expanded', String(willShow));
      readMoreButton.textContent = willShow ? 'Read less' : 'Read more';
      if (willShow) extraInfo.classList.add('pulse-animation');
      window.setTimeout(() => extraInfo.classList.remove('pulse-animation'), 700);
    });
  }

  //  gallery thumbnails update a large preview image
  const imageViewer = document.querySelector('#image-viewer');
  const largeImage = document.querySelector('#large-gallery-image');
  const largeCaption = document.querySelector('#large-image-caption');
  const closeImageViewer = document.querySelector('#close-image-viewer');
  const galleryImages = document.querySelectorAll('.gallery-thumb');
  const showGalleryImage = (image) => {
    if (!imageViewer || !largeImage || !image) return;
    largeImage.src = image.src;
    largeImage.alt = image.alt;
    const caption = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
    if (largeCaption) largeCaption.textContent = caption;
    imageViewer.classList.add('visible');
    imageViewer.setAttribute('aria-hidden', 'false');
    if (closeImageViewer) closeImageViewer.focus();
  };
  galleryImages.forEach(image => {
    image.addEventListener('click', () => showGalleryImage(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showGalleryImage(image);
      }
    });
  });
  const hideGalleryImage = () => {
    if (!imageViewer) return;
    imageViewer.classList.remove('visible');
    imageViewer.setAttribute('aria-hidden', 'true');
  };
  if (closeImageViewer) closeImageViewer.addEventListener('click', hideGalleryImage);
  if (imageViewer) {
    imageViewer.addEventListener('click', event => {
      if (event.target === imageViewer) hideGalleryImage();
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && imageViewer?.classList.contains('visible')) hideGalleryImage();
  });

  //  keyboard navigation through the main navigation links
  const navigationLinks = Array.from(document.querySelectorAll('.nav-menu a'));
  navigationLinks.forEach((link, index) => {
    link.addEventListener('keydown', event => {
      let nextIndex = index;
      switch (event.key) {
        case 'ArrowRight': nextIndex = (index + 1) % navigationLinks.length; break;
        case 'ArrowLeft': nextIndex = (index - 1 + navigationLinks.length) % navigationLinks.length; break;
        case 'Home': nextIndex = 0; break;
        case 'End': nextIndex = navigationLinks.length - 1; break;
        default: return;
      }
      event.preventDefault();
      navigationLinks[nextIndex].focus();
    });
  });

  //  play a short notification sound using the Web Audio API
  const soundButton = document.querySelector('#play-sound');
  if (soundButton) {
    soundButton.addEventListener('click', () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const feedback = document.querySelector('#sound-feedback');
      if (!AudioContextClass) {
        if (feedback) feedback.textContent = 'Sound is not supported by this browser.';
        return;
      }
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.12);
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.32);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.34);
      oscillator.addEventListener('ended', () => audioContext.close());
      if (feedback) feedback.textContent = 'Notification sound played.';
    });
  }

  //  event-triggered CSS animation
  const animateButton = document.querySelector('#animate-card');
  if (animateButton) {
    animateButton.addEventListener('click', () => {
      const section = animateButton.closest('.card');
      if (!section) return;
      section.classList.remove('pulse-animation');
      void section.offsetWidth;
      section.classList.add('pulse-animation');
      window.setTimeout(() => section.classList.remove('pulse-animation'), 700);
    });
  }
});
