document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.navbar a');
  const sections = document.querySelectorAll('section');

  // Toggle mobile menu
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Combined scroll event listener for better performance
  window.addEventListener('scroll', () => {
    // Sticky header
    header.classList.toggle('sticky', window.scrollY > 0);

    // Active link highlighting
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  });

  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');
  const submitBtn = document.querySelector('#contact-form button[type="submit"]');
  const submitBtnText = submitBtn ? submitBtn.innerHTML : '';

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' },
      })
      .then(response => {
        if (response.ok) {
          showMessage('Thank you for your message! I will get back to you soon.', 'success');
          form.reset();
        } else {
          return response.json().then(data => {
            const errorMessage = data.errors 
              ? data.errors.map(e => e.message).join(", ")
              : "Oops! There was a problem submitting your form";
            throw new Error(errorMessage);
          });
        }
      })
      .catch(error => {
        showMessage(error.message || "An error occurred. Please try again.", 'error');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnText;
        }
      });
    });
  }

  function showMessage(message, type) {
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = 'form-message';
    messageDiv.classList.add(type);
    messageDiv.style.display = 'block';
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.style.opacity = '1';
      }, 300);
    }, 5000);
  }

});