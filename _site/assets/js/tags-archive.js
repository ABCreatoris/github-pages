document.addEventListener('DOMContentLoaded', function() {
  // Tags page functionality
  const tagLinks = document.querySelectorAll('.tag-link');
  const tagAll = document.querySelector('.tag-all');
  const tagSections = document.querySelectorAll('.tag-section');

  // Function to show all posts
  function showAllPosts() {
    tagSections.forEach(section => {
      section.style.display = 'block';
    });
    tagAll.classList.add('active');
    tagLinks.forEach(link => link.classList.remove('active'));
  }

  // Function to filter posts by tag
  function filterPostsByTag(tag) {
    tagSections.forEach(section => {
      if (section.id === tag) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  // Add click event listeners to tag links
  tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tag = this.getAttribute('href').substring(1);
      filterPostsByTag(tag);
      tagLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      tagAll.classList.remove('active');
    });
  });

  // Add click event listener to "All" tag
  if (tagAll) {
    tagAll.addEventListener('click', function(e) {
      e.preventDefault();
      showAllPosts();
    });
  }

  // Archive page functionality
  const archiveYears = document.querySelectorAll('.archive-year');
  
  // Add smooth scroll to year sections
  archiveYears.forEach(year => {
    const yearTitle = year.querySelector('h3');
    yearTitle.style.cursor = 'pointer';
    
    yearTitle.addEventListener('click', () => {
      year.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Add hover effect to archive posts
  const archivePosts = document.querySelectorAll('.archive-post');
  archivePosts.forEach(post => {
    post.addEventListener('mouseenter', () => {
      post.style.transform = 'translateX(10px)';
    });
    
    post.addEventListener('mouseleave', () => {
      post.style.transform = 'translateX(0)';
    });
  });

  // Add smooth scroll to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}); 