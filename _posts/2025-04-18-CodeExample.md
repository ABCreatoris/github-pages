---
layout: post
title: "代码示例与最佳实践"
date: 2025-04-18
categories: [技术]
tags: [代码, 示例, 技术]
image: https://placehold.co/800x400/8b5cf6/ffffff?text=Code+Example
---

在这篇文章中，我们将展示各种代码示例，包括不同编程语言的语法高亮、代码块和行内代码。

## JavaScript 示例

以下是一个简单的 JavaScript 函数示例：

```javascript
function calculateTotal(items) {
  return items.reduce((total, item) => {
    const price = item.price * (1 - item.discount);
    return total + price;
  }, 0);
}

// 使用示例
const items = [
  { price: 100, discount: 0.1 },
  { price: 200, discount: 0.2 }
];

const total = calculateTotal(items);
console.log(`Total: $${total}`);
```

## Python 示例

这是一个 Python 的类定义示例：

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.posts = []

    def create_post(self, title, content):
        post = {
            'title': title,
            'content': content,
            'created_at': datetime.now()
        }
        self.posts.append(post)
        return post

    def get_posts(self):
        return sorted(self.posts, 
                     key=lambda x: x['created_at'], 
                     reverse=True)
```

## HTML 和 CSS 示例

下面是一个响应式导航栏的示例：

```html
<nav class="navbar">
  <div class="logo">
    <img src="logo.png" alt="Logo">
  </div>
  <ul class="nav-links">
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
    <li><a href="/contact">联系</a></li>
  </ul>
</nav>
```

对应的 CSS 样式：

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
```

## Shell 命令示例

以下是一些常用的 Git 命令：

```bash
# 初始化仓库
git init

# 添加远程仓库
git remote add origin https://github.com/username/repo.git

# 创建并切换到新分支
git checkout -b feature/new-feature

# 提交更改
git add .
git commit -m "Add new feature"

# 推送到远程仓库
git push origin feature/new-feature
```

## 行内代码示例

在 Markdown 中，我们可以使用 `行内代码` 来突出显示特定的代码片段。例如，`console.log()` 是一个常用的 JavaScript 函数。

## 代码块中的注释

```javascript
// 这是一个单行注释

/* 
 * 这是一个多行注释
 * 可以包含多行内容
 */

/**
 * 这是一个文档注释
 * @param {string} name - 用户名
 * @returns {string} 问候语
 */
function greet(name) {
  return `Hello, ${name}!`;
}
```

## 总结

通过以上示例，我们可以看到不同编程语言的语法特点和最佳实践。在实际开发中，我们应该：

1. 保持代码整洁和可读性
2. 添加适当的注释
3. 遵循语言特定的编码规范
4. 使用版本控制管理代码

希望这些示例对您有所帮助！ 