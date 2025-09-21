/**
 * NDS Rating Component
 * Interactive star rating component with hover preview and keyboard navigation
 */

class NDSRating {
  constructor(element) {
    this.rating = element;
    this.stars = element.querySelectorAll('.nds-rating-star');
    this.currentRating = parseFloat(element.dataset.rating) || 0;
    this.isInteractive = element.classList.contains('interactive');

    if (this.isInteractive) {
      this.init();
    } else {
      // For display-only ratings, just set the visual state
      this.updateVisualState();
    }
  }

  init() {
    // Add event listeners
    this.stars.forEach((star, index) => {
      const value = index + 1;

      star.dataset.value = value;
      star.setAttribute('aria-label', `${value} star${value > 1 ? 's' : ''}`);

      star.addEventListener('click', (e) => this.handleStarClick(e, value));
      star.addEventListener('mouseenter', (e) => this.handleStarHover(e, value));
      star.addEventListener('mouseleave', () => {
        if (this.isInteractive) {
          this.hidePreview();
        }
      });
      star.addEventListener('keydown', (e) => this.handleKeyboard(e, value));
    });

    // Set initial visual state
    this.updateVisualState();
  }

  handleStarClick(e, starValue) {
    if (this.isInteractive) {
      this.setRating(starValue);
    }
  }

  handleStarHover(e, starValue) {
    if (this.isInteractive) {
      this.showPreview(starValue);
    }
  }


  setRating(value) {
    this.currentRating = value;
    this.rating.dataset.rating = value;
    this.updateVisualState();

    // Dispatch custom event
    this.rating.dispatchEvent(new CustomEvent('ratingChange', {
      detail: {
        rating: value,
        element: this.rating
      },
      bubbles: true
    }));
  }

  showPreview(value) {
    // Remove all preview classes first
    this.stars.forEach(star => {
      star.classList.remove('preview');
    });

    // Handle whole stars for preview
    const wholeStars = Math.floor(value);

    // Add preview class to whole stars
    for (let i = 0; i < wholeStars; i++) {
      this.stars[i].classList.add('preview');
    }
  }

  hidePreview() {
    // Remove all preview classes
    this.stars.forEach(star => {
      star.classList.remove('preview');
    });
  }

  updateVisualState() {
    // Remove all state classes first
    this.stars.forEach(star => {
      star.classList.remove('selected', 'half');
    });

    // Handle whole and half stars
    const wholeStars = Math.floor(this.currentRating);
    const decimalPart = this.currentRating % 1;
    const hasHalfStar = decimalPart >= 0.3;

    // Add selected class to whole stars
    for (let i = 0; i < wholeStars; i++) {
      this.stars[i].classList.add('selected');
    }

    // Add half star if decimal is 0.3 or more
    if (hasHalfStar && wholeStars < this.stars.length) {
      this.stars[wholeStars].classList.add('half');
    }
  }

  handleKeyboard(e, value) {
    const currentIndex = value - 1;

    switch(e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.setRating(value);
        break;

      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex < this.stars.length - 1) {
          this.stars[currentIndex + 1].focus();
        }
        break;

      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex > 0) {
          this.stars[currentIndex - 1].focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        this.stars[0].focus();
        break;

      case 'End':
        e.preventDefault();
        this.stars[this.stars.length - 1].focus();
        break;

      case 'Escape':
        e.preventDefault();
        e.target.blur();
        break;
    }
  }

  // Public method to get current rating
  getRating() {
    return this.currentRating;
  }

  // Public method to set rating programmatically
  setValue(value) {
    if (value >= 0 && value <= this.stars.length) {
      this.setRating(value);
    }
  }

  // Public method to disable/enable the rating
  setDisabled(disabled) {
    this.stars.forEach(star => {
      star.disabled = disabled;
      if (disabled) {
        star.setAttribute('aria-disabled', 'true');
      } else {
        star.removeAttribute('aria-disabled');
      }
    });

    // Toggle interactive class to reflect state
    if (disabled) {
      this.rating.classList.remove('interactive');
    } else {
      this.rating.classList.add('interactive');
    }
  }

}

// Initialize all ratings (both display and interactive)
function initializeRatings() {
  const ratings = document.querySelectorAll('.nds-rating');
  ratings.forEach(rating => {
    // Only initialize if not already initialized
    if (!rating.ndsRating) {
      rating.ndsRating = new NDSRating(rating);
    }
  });
}

// Expose to window for nds-init.js
window.NDSRating = window.NDSRating || {};
window.NDSRating.initializeRatings = initializeRatings;

// Observer to watch for new elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Handle new nodes being added
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the added node is a rating
          if (node.classList && node.classList.contains('nds-rating')) {
            if (!node.ndsRating) {
              node.ndsRating = new NDSRating(node);
            }
          }
          // Check for ratings within the added node
          const ratings = node.querySelectorAll && node.querySelectorAll('.nds-rating');
          if (ratings) {
            ratings.forEach(rating => {
              if (!rating.ndsRating) {
                rating.ndsRating = new NDSRating(rating);
              }
            });
          }
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NDSRating;
}