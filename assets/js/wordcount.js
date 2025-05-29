document.addEventListener('DOMContentLoaded', function() {
  // 主页卡片
  document.querySelectorAll('.post-card').forEach(function(card) {
    const content = card.querySelector('.post-card-content');
    if (!content) return;
    // 统计标题、摘要、内容区所有可见文本
    let text = '';
    // 标题
    const h2 = content.querySelector('h2');
    if (h2) text += h2.textContent + ' ';
    // 摘要
    const excerpt = content.querySelector('.post-excerpt');
    if (excerpt) text += excerpt.textContent + ' ';
    // 你可以根据需要加更多字段
    // 统计字数
    const count = text.replace(/\s+/g, '').length;
    // 替换字数显示
    const wordCount = content.querySelector('.word-count');
    if (wordCount) wordCount.textContent = count + '字';
    // 替换阅读时间
    const readingTime = content.querySelector('.reading-time');
    if (readingTime) readingTime.textContent = Math.max(1, Math.round(count / 400)) + '分钟';
  });

  // 文章详情页
  const postContent = document.querySelector('.post-content');
  if (postContent) {
    let text = postContent.textContent || '';
    const count = text.replace(/\s+/g, '').length;
    // 替换字数显示
    const wordCount = document.querySelector('.word-count');
    if (wordCount) wordCount.textContent = count + '字';
    // 替换阅读时间
    const readingTime = document.querySelector('.reading-time');
    if (readingTime) readingTime.textContent = Math.max(1, Math.round(count / 400)) + '分钟';
  }
}); 