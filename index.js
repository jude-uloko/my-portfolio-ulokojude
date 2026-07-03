window.addEventListener('DOMContentLoaded', async () => {
  (async function sendVisit(){
    let userIp = 'Unknown';
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      userIp = ipData.ip;
    } catch (e) {
      // Fallback if adblocker blocks ipify
    }
    
    // We send the log to our OWN local Vercel serverless backend endpoint
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname + window.location.search,
        ua: window.navigator.userAgent,
        ip: userIp
      })
    })
    .catch(() => { /* Fail silently to protect user experience */ });
  })();
});

function sendMessage(event) {
  if (event) {
    event.preventDefault();
  }

  const whatsapp = document.getElementById('send-whatsapp').value.trim();
  const message = document.getElementById('send-message').value.trim();
  const feedback = document.getElementById('form-feedback');
  const btn = document.querySelector('.send-btn');
  const btnText = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');

  const showAlert = (message, type) => {
    feedback.innerHTML = '';
    feedback.className = `form-feedback alert alert-dismissible alert-${type}`;
    feedback.textContent = message;

    const inputs = [document.getElementById('send-whatsapp'), document.getElementById('send-message')];
    inputs.forEach(input => {
      if (!input) return;
      input.classList.remove('warning-shake', 'success-glow');
      void input.offsetWidth;
      if (type === 'warning') {
        input.classList.add('warning-shake');
      } else if (type === 'success') {
        input.classList.add('success-glow');
      }
    });

    if (type === 'success' || type === 'warning') {
      window.clearTimeout(showAlert.timeoutId);
      showAlert.timeoutId = window.setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
      }, 5000);
    }

    if (type === 'success') {
      const inputs = [document.getElementById('send-whatsapp'), document.getElementById('send-message')];
      inputs.forEach(input => {
        if (input) input.value = '';
      });
    }

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('aria-label', 'Dismiss');
    closeButton.innerHTML = `
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M4.5 4.5l7 7m0-7l-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
    closeButton.addEventListener('click', () => {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    });

    feedback.appendChild(closeButton);
  };

  feedback.className = 'form-feedback';
  feedback.textContent = '';

  if (!message && !whatsapp) {
    showAlert('Please enter required information', 'warning');
    return;
  }

  if (!message || !whatsapp) {
    showAlert('Please complete the required informations', 'warning');
    return;
  }

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  showAlert('Message sent successfully. Opening WhatsApp...', 'success');

  // Opening whatsApp
  const whatsApp = '2348161122861';
  const waText = encodeURIComponent(
    `Hi Jude, I\'m reaching out via your portfolio.\n\nMessage: ${message}`
  );
  setTimeout(() => {
    window.location.href = `https://api.whatsapp.com/send?phone=${whatsApp}&text=${waText}`;
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }, 1200);
}

const contactForm = document.getElementById('contact-form');
const scrollToggle = document.getElementById('scroll-toggle');

if (contactForm) {
  contactForm.addEventListener('submit', sendMessage);

  contactForm.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      contactForm.requestSubmit();
    }
  });
}

if (scrollToggle) {
  scrollToggle.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  scrollToggle.setAttribute('aria-label', 'Scroll to top');
}

const navToggle = document.getElementById('nav-toggle');
const nav = document.querySelector('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = nav.classList.toggle('nav-expanded');
    navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-expanded');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealSections = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('reveal-visible', entry.isIntersecting);
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -30% 0px',
});

revealSections.forEach(section => revealObserver.observe(section));

