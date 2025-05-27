---
layout: default
title: 归档
permalink: /archive/
---

<div class="container">
  <h1>归档</h1>
  <div class="posts-list">
    {% for post in site.posts %}
      <div class="post-card">
        <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
        <p class="post-date">{{ post.date | date: '%Y-%m-%d' }}</p>
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 80 }}</p>
      </div>
    {% endfor %}
  </div>
</div> 