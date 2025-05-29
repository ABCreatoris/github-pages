document.addEventListener('DOMContentLoaded', function() {
  const tagLinks = document.querySelectorAll('.tag-link, .tag-all');
  const tagSections = document.querySelectorAll('.tag-section');

  function showTag(tag) {
    tagLinks.forEach(link => {
      const linkTag = link.getAttribute('href').replace(/^#/, '');
      if ((tag === null && link.classList.contains('tag-all')) || linkTag === tag) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    tagSections.forEach(section => {
      if (tag === null || section.id === tag) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  }

  function handleHash() {
    const hash = location.hash.replace('#', '');
    if (!hash) {
      showTag(null); // 显示全部
    } else {
      showTag(hash);
      // 滚动到目标
      const targetSection = document.getElementById(hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // 页面加载和 hash 变化时
  handleHash();
  window.addEventListener('hashchange', handleHash);

  // 点击事件只更新 hash
  tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const tag = this.classList.contains('tag-all') ? '' : href.replace('#', '');
        if (location.hash.replace('#', '') !== tag) {
          location.hash = tag;
        } else {
          // 如果 hash 没变，手动触发
          handleHash();
        }
      }
    });
  });
}); 