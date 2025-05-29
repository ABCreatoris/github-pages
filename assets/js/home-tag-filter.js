// 已移除所有 .tag-link 的 click 事件绑定，实现标签云自然跳转，无 JS 阻止
// 如果需要前端筛选功能，请单独为特定区域的标签云实现，不影响跳转
// 此文件已留空，保留占位 

document.addEventListener('DOMContentLoaded', function() {
  const categoryLinks = document.querySelectorAll('.home-category-cloud .category-link');
  const allCategoryBtn = document.querySelector('.category-cloud-container .category-all');
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

  // "全部分类"按钮点击
  if (allCategoryBtn) {
    allCategoryBtn.addEventListener('click', function(e) {
      e.preventDefault();
      allCategoryBtn.classList.add('active');
      categoryLinks.forEach(l => l.classList.remove('active'));
      posts.forEach(post => post.style.display = '');
      updateCardLayout();
    });
  }

  // 分类按钮点击
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      categoryLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (allCategoryBtn) allCategoryBtn.classList.remove('active');
      const category = this.textContent.trim();
      posts.forEach(post => {
        const postCategory = post.getAttribute('data-category') || '';
        if (postCategory === category) {
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