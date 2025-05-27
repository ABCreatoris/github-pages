document.addEventListener('DOMContentLoaded', function() {
  const tagLinks = document.querySelectorAll('.home-tag-cloud .tag-link, .tag-cloud-container .tag-all');
  const posts = document.querySelectorAll('.posts-list .post-card');

  function updateCardLayout() {
    // 只对可见卡片重新布局
    const visiblePosts = Array.from(posts).filter(post => post.style.display !== 'none');
    visiblePosts.forEach((post, idx) => {
      post.classList.remove('left', 'right');
      const cardLink = post.querySelector('a');
      if (cardLink) cardLink.style.flexDirection = (idx % 2 === 0) ? 'row' : 'row-reverse';
      post.classList.add((idx % 2 === 0) ? 'left' : 'right');
    });
  }

  tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      tagLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const tag = this.classList.contains('tag-all') ? null : this.textContent.trim();

      posts.forEach(post => {
        const tags = post.getAttribute('data-tags') || '';
        if (!tag || tags.split(',').map(t => t.trim()).includes(tag)) {
          post.style.display = '';
        } else {
          post.style.display = 'none';
        }
      });
      updateCardLayout();
    });
  });

  // 初始布局
  updateCardLayout();
}); 