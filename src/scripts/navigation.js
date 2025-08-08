// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeButton = document.getElementById('mobile-menu-close');
  
  function toggleMobileMenu() {
    mobileMenu?.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
    updateAriaAttributes();
  }
  
  function updateAriaAttributes() {
    const isOpen = !mobileMenu?.classList.contains('translate-x-full');
    mobileMenuButton?.setAttribute('aria-expanded', isOpen.toString());
  }
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        toggleMobileMenu();
      }
    });
  }
  
  // Update ARIA attributes when menu state changes
  if (mobileMenu) {
    const observer = new MutationObserver(updateAriaAttributes);
    observer.observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });
  }
  
  // Sticky header functionality
  let lastScroll = 0;
  const header = document.getElementById('main-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('header-scrolled');
        return;
      }
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.classList.add('header-hidden');
      } else {
        // Scrolling up
        header.classList.remove('header-hidden');
      }
      
      if (currentScroll > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
});