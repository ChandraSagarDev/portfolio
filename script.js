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
});