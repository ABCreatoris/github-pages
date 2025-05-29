---
layout: default
title: 我的博客
---

<div class="menu-overlay"></div>

<div class="main-container">
  <div class="posts-container">
    <div class="category-cloud-container">
      <a href="#" class="category-all active">全部分类</a>
      <button class="category-scroll-btn category-scroll-left" aria-label="左移">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="category-cloud home-category-cloud">
        {% assign all_categories = site.categories | sort %}
        {% for category in all_categories %}
          <a href="#{{ category[0] }}" class="category-link">{{ category[0] }}</a>
        {% endfor %}
      </div>
      <button class="category-scroll-btn category-scroll-right" aria-label="右移">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>

    <div class="posts-list">
      {% for post in site.posts %}
        <article class="post-card" data-tags="{{ post.tags | join: ',' }}" data-category="{% if post.categories and post.categories.size > 0 %}{{ post.categories[0] }}{% endif %}">
          <a href="{{ post.url | relative_url }}">
            <div class="post-card-image-wrapper">
              <img src="{{ post.image | default: 'https://placehold.co/800x400/8b5cf6/ffffff?text=Blog+Post' }}" alt="{{ post.title }}">
            </div>
            <div class="post-card-content">
              <h2>
                {{ post.title }}
                {% if post.categories and post.categories.size > 0 %}
                  <span class="post-category">{{ post.categories[0] }}</span>
                {% endif %}
              </h2>
              <div class="post-meta">
                <span class="post-meta-item post-date">{{ post.date | date: "%Y-%m-%d" }}</span>
                <span class="post-meta-item word-count">～</span>
                <span class="post-meta-item reading-time">～</span>
              </div>
              <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
              {% if post.tags.size > 0 %}
                <div class="post-tags">
                  {% for tag in post.tags %}
                    <span class="post-tag">#{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </a>
        </article>
      {% endfor %}
    </div>
  </div>

  <aside class="sidebar">
    <div class="search-box">
      <div class="search-input-wrapper">
        <input type="text" placeholder="搜索文章..." class="search-input">
        <button class="search-button">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="profile-card">
      <img src="/avatar.jpg" alt="头像" class="profile-avatar">
      <h2 class="profile-name">ChenXY</h2>
      <p class="profile-bio">热爱技术，热爱生活</p>
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-value">{{ site.posts | size }}</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ site.categories | size }}</span>
          <span class="stat-label">分类</span>
        </div>
      </div>
      <div class="social-links">
        <a href="https://github.com/yourusername">GitHub</a>
        <a href="https://twitter.com/yourusername">Twitter</a>
      </div>
      <div class="tag-cloud-container">
        <div class="tag-cloud home-tag-cloud" id="draggable-tag-cloud">
          {% assign all_tags = site.tags | sort %}
          {% for tag in all_tags %}
            <a href="/tags#{{ tag[0] | uri_escape }}" class="tag-link">{{ tag[0] }}</a>
          {% endfor %}
        </div>
      </div>
    </div>
  </aside>
</div>

<script src="/assets/js/search.js"></script>
<script src="/assets/js/home-tag-filter.js"></script>
<script src="/assets/js/async-wordcount.js"></script>

<script>
// 拖拽滚动标签云
(function() {
  const tagCloud = document.getElementById('draggable-tag-cloud');
  let isDown = false;
  let startX, scrollLeft;
  if (tagCloud) {
    tagCloud.addEventListener('mousedown', (e) => {
      isDown = true;
      tagCloud.classList.add('dragging');
      startX = e.pageX - tagCloud.offsetLeft;
      scrollLeft = tagCloud.scrollLeft;
    });
    tagCloud.addEventListener('mouseleave', () => {
      isDown = false;
      tagCloud.classList.remove('dragging');
    });
    tagCloud.addEventListener('mouseup', () => {
      isDown = false;
      tagCloud.classList.remove('dragging');
    });
    tagCloud.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tagCloud.offsetLeft;
      const walk = (x - startX) * 1.5; // 滚动速度
      tagCloud.scrollLeft = scrollLeft - walk;
    });
    // 支持触摸
    tagCloud.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - tagCloud.offsetLeft;
      scrollLeft = tagCloud.scrollLeft;
    });
    tagCloud.addEventListener('touchend', () => {
      isDown = false;
    });
    tagCloud.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - tagCloud.offsetLeft;
      const walk = (x - startX) * 1.5;
      tagCloud.scrollLeft = scrollLeft - walk;
    });
  }
})();
</script>
