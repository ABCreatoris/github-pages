document.addEventListener('DOMContentLoaded', function() {
  const tagLinks = document.querySelectorAll('.tag-link, .tag-all');
  const tagSections = document.querySelectorAll('.tag-section');

  function activateTagFromHash() {
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    let found = false;
    tagLinks.forEach(link => {
      if (link.textContent.trim() === hash) {
        link.click();
        found = true;
      }
    });
    if (!found && hash === '') {
      document.querySelector('.tag-all')?.click();
    }
  }

  tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // 激活状态切换
      tagLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const tag = this.classList.contains('tag-all') ? null : this.getAttribute('href').replace('#', '');

      tagSections.forEach(section => {
        if (!tag || section.id === tag) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
      // 更新hash
      if (tag) location.hash = tag;
      else location.hash = '';
    });
  });

  // 页面加载时根据hash激活
  activateTagFromHash();
  window.addEventListener('hashchange', activateTagFromHash);
}); 