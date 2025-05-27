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

  // 搜索功能
  function performSearch(searchTerm) {
    let hasResults = false;
    let visibleCount = 0;

    posts.forEach(post => {
      const title = post.querySelector('h2').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
      const tags = post.getAttribute('data-tags').toLowerCase();
      
      // 标签筛选
      const matchesTag = currentTag === 'all' || tags.includes(currentTag.toLowerCase());
      
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

    // 重新排序可见的文章
    const visiblePosts = Array.from(posts).filter(post => !post.classList.contains('hidden'));
    visiblePosts.forEach((post, index) => {
      if (index % 2 === 0) {
        post.querySelector('a').style.flexDirection = 'row';
      } else {
        post.querySelector('a').style.flexDirection = 'row-reverse';
      }
    });

    // 显示/隐藏无结果提示
    if (!hasResults) {
      postsList.style.display = 'none';
      noResults.style.display = 'flex';
    } else {
      postsList.style.display = '';
      noResults.style.display = 'none';
    }
  }

  // 搜索框事件监听
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      performSearch(this.value.toLowerCase());
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', function() {
      performSearch(searchInput.value.toLowerCase());
    });
  }

  // 标签点击事件
  if (tagAll) {
    tagAll.addEventListener('click', function(e) {
      e.preventDefault();
      currentTag = 'all';
      
      // 更新标签状态
      tagAll.classList.add('active');
      tagLinks.forEach(t => t.classList.remove('active'));
      
      // 执行搜索（保持搜索框的内容）
      performSearch(searchInput.value.toLowerCase());
    });
  }

  tagLinks.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const tagText = this.getAttribute('data-tag');
      
      // 更新当前选中的标签
      currentTag = tagText;
      
      // 更新标签状态
      if (tagAll) {
        tagAll.classList.remove('active');
      }
      tagLinks.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 执行搜索（保持搜索框的内容）
      if (searchInput) {
        performSearch(searchInput.value.toLowerCase());
      }
    });
  });

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