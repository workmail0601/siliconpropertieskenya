// Toggle the navigation menu on hamburger click
document.getElementById('hamburger-menu').addEventListener('click', () => {
    const navLinks = document.querySelector('nav ul');
    navLinks.classList.toggle('show'); // Toggle the 'show' class to reveal the nav
});

// Carousel Functionality
const carousel = document.querySelector('.carousel'); // Outer container
const carouselItems = document.querySelector('.carousel-items'); // Items wrapper
const prevBtn = document.querySelector('.prev-btn'); // Previous button
const nextBtn = document.querySelector('.next-btn'); // Next button

// Initialize carousel state
let currentIndex = 0;
carouselItems.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition

// Helper: Calculate item width including margin
function getItemWidth() {
    const item = carouselItems.querySelector('.property-card');
    return item.offsetWidth + 30; // Include margin
}

// Move carousel to the right (next)
nextBtn.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    const maxIndex = carouselItems.children.length - Math.floor(carousel.offsetWidth / itemWidth);

    currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0; // Loop back to the start
    carouselItems.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
});

// Move carousel to the left (previous)
prevBtn.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    const maxIndex = carouselItems.children.length - Math.floor(carousel.offsetWidth / itemWidth);

    currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxIndex; // Loop back to the end
    carouselItems.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
});

// Optional: Transition end event (reset logic for custom cases)
carousel.addEventListener('transitionend', () => {
    // No additional reset needed since looping logic is handled in buttons
});

// Autoplay functionality
let autoplay = setInterval(() => nextBtn.click(), 3000); // Change slides every 3 seconds

// Pause autoplay on hover
carousel.addEventListener('mouseenter', () => clearInterval(autoplay));

// Resume autoplay when the mouse leaves
carousel.addEventListener('mouseleave', () => autoplay = setInterval(() => nextBtn.click(), 3000));

// Get the scroll-to-top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
};

// Scroll to top function
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
