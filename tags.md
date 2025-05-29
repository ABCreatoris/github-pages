---
layout: default
title: 标签
---

<div class="tags-container">
  <div class="tags-header">
    <h2>标签</h2>
    <p>点击标签可查看相关内容</p>
  </div>

  <div class="tag-cloud-container">
    <div class="tag-cloud">
      <a href="#" class="tag-all active">全部</a>
      {% assign all_tags = site.tags | sort %}
      {% for tag in all_tags %}
        <a href="#{{ tag[0] | uri_escape }}" class="tag-link">{{ tag[0] }}</a>
      {% endfor %}
    </div>
  </div>

  {% assign all_tags = site.tags | sort %}
  {% for tag in all_tags %}
    <div id="{{ tag[0] | uri_escape }}" class="tag-section">
      <h2 class="tag-title">
        <span class="tag-icon">#</span>
        {{ tag[0] }}
      </h2>
      <div class="tag-posts">
        {% for post in tag[1] %}
          <article class="tag-post-card">
            <a href="{{ post.url | relative_url }}">
              <div class="tag-post-image">
                <img src="{{ post.image | default: 'https://placehold.co/800x400/8b5cf6/ffffff?text=Blog+Post' }}" alt="{{ post.title }}">
              </div>
              <div class="tag-post-content">
                <h4>{{ post.title }}</h4>
                <div class="post-date">{{ post.date | date: "%Y-%m-%d" }}</div>
                <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
              </div>
            </a>
          </article>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>

<script src="/assets/js/tags-filter.js"></script> 