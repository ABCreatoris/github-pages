---
layout: default
title: 我的博客
---

<div class="menu-overlay"></div>

<div class="main-container">
  <div class="posts-container">
    <div class="tag-cloud-container">
      <a href="#" class="tag-all active">全部</a>
      <button class="tag-scroll-btn tag-scroll-left" aria-label="左移">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="tag-cloud home-tag-cloud">
        {% assign all_tags = site.tags | sort %}
        {% for tag in all_tags %}
          <a href="#{{ tag[0] }}" class="tag-link">{{ tag[0] }}</a>
        {% endfor %}
      </div>
      <button class="tag-scroll-btn tag-scroll-right" aria-label="右移">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#888" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>

    <div class="posts-list">
      {% for post in site.posts %}
        <article class="post-card" data-tags="{{ post.tags | join: ',' }}">
          <a href="{{ post.url | relative_url }}">
            <div class="post-card-image-wrapper">
              <img src="{{ post.image | default: 'https://placehold.co/800x400/8b5cf6/ffffff?text=Blog+Post' }}" alt="{{ post.title }}">
            </div>
            <div class="post-card-content">
              <h2>{{ post.title }}</h2>
              <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
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
          <span class="stat-value">3</span>
          <span class="stat-label">分类</span>
        </div>
      </div>
      <div class="social-links">
        <a href="https://github.com/yourusername">GitHub</a>
        <a href="https://twitter.com/yourusername">Twitter</a>
      </div>
    </div>
  </aside>
</div>

<script src="/assets/js/search.js"></script>
<script src="/assets/js/home-tag-filter.js"></script>
