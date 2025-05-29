document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const postsList = document.querySelector('.posts-list');
  const posts = document.querySelectorAll('.post-card');
  const noResults = document.querySelector('.no-results');
  const tagAll = document.querySelector('.tag-all');
  const tagLinks = document.querySelectorAll('.tag-cloud a');

  // 菜单交互
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (menuToggle && navRight && menuOverlay) {
    menuToggle.addEventListener('click', function() {
      navRight.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
    });

    menuOverlay.addEventListener('click', function() {
      navRight.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  let currentTag = 'all';

  // 记录所有 .post-card 的原始顺序
  const allPosts = Array.from(posts);

  // 搜索功能
  function performSearch(searchTerm) {
    let hasResults = false;
    let visibleCount = 0;

    posts.forEach(post => {
      // 安全获取 title、excerpt、tags
      const h2 = post.querySelector('h2');
      const excerptEl = post.querySelector('.post-excerpt');
      let tags = '';
      try {
        const tagsAttr = post.getAttribute('data-tags');
        if (typeof tagsAttr === 'string') {
          tags = tagsAttr.toLowerCase();
        }
      } catch (e) {
        tags = '';
      }
      const title = (h2 && typeof h2.textContent === 'string') ? h2.textContent.toLowerCase() : '';
      const excerpt = (excerptEl && typeof excerptEl.textContent === 'string') ? excerptEl.textContent.toLowerCase() : '';
      
      // 标签筛选
      const matchesTag = currentTag === 'all' || tags.includes((typeof currentTag === 'string') ? currentTag.toLowerCase() : '');
      
      // 搜索框筛选
      const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);
      
      // 同时满足标签和搜索条件才显示
      if (matchesTag && matchesSearch) {
        post.classList.remove('hidden');
        visibleCount++;
        hasResults = true;
      } else {
        post.classList.add('hidden');
      }
    });

    // 先将所有卡片按原始顺序 append，保证 DOM 顺序
    allPosts.forEach(post => postsList.appendChild(post));
    // 重置所有卡片的 flexDirection
    allPosts.forEach(post => {
      const a = post.querySelector('a');
      if (a) a.style.flexDirection = '';
    });
    // 只对可见卡片，按当前可见顺序设置 flexDirection
    const visiblePosts = allPosts.filter(post => !post.classList.contains('hidden'));
    visiblePosts.forEach((post, index) => {
      const a = post.querySelector('a');
      if (a) a.style.flexDirection = (index % 2 === 0) ? 'row' : 'row-reverse';
    });

    // 显示/隐藏无结果提示
    if (!hasResults) {
      if (postsList) postsList.style.display = 'none';
      if (noResults) noResults.style.display = 'flex';
    } else {
      if (postsList) postsList.style.display = '';
      if (noResults) noResults.style.display = 'none';
    }
  }

  // 搜索框事件监听
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      performSearch(typeof this.value === 'string' ? this.value.toLowerCase() : '');
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', function() {
      performSearch(typeof searchInput.value === 'string' ? searchInput.value.toLowerCase() : '');
    });
  }

  // 标签点击事件（只保留分类云，移除标签云 .tag-link 的 click 绑定）
  // if (tagAll) {
  //   tagAll.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     currentTag = 'all';
  //     tagAll.classList.add('active');
  //     tagLinks.forEach(t => t.classList.remove('active'));
  //     performSearch(typeof searchInput.value === 'string' ? searchInput.value.toLowerCase() : '');
  //   });
  // }

  // tagLinks.forEach(tag => {
  //   tag.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     const tagText = this.getAttribute('data-tag');
  //     currentTag = tagText;
  //     if (tagAll) {
  //       tagAll.classList.remove('active');
  //     }
  //     tagLinks.forEach(t => t.classList.remove('active'));
  //     this.classList.add('active');
  //     if (searchInput) {
  //       performSearch(typeof searchInput.value === 'string' ? searchInput.value.toLowerCase() : '');
  //     }
  //   });
  // });

  // 标签云滚动功能
  const tagCloud = document.querySelector('.tag-cloud');
  const scrollLeftBtn = document.querySelector('.tag-scroll-left');
  const scrollRightBtn = document.querySelector('.tag-scroll-right');

  if (tagCloud && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 200; // 每次滚动的距离

    scrollLeftBtn.addEventListener('click', () => {
      tagCloud.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    scrollRightBtn.addEventListener('click', () => {
      tagCloud.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    // 根据滚动位置显示/隐藏箭头按钮
    function updateScrollButtons() {
      scrollLeftBtn.style.display = tagCloud.scrollLeft > 0 ? 'flex' : 'none';
      scrollRightBtn.style.display = 
        tagCloud.scrollLeft < (tagCloud.scrollWidth - tagCloud.clientWidth) ? 'flex' : 'none';
    }

    tagCloud.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // 初始化按钮状态
  }
}); 