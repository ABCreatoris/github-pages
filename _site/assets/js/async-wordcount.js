document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.post-card').forEach(function(card) {
    const link = card.querySelector('a');
    if (!link) return;
    const url = link.getAttribute('href');
    if (!url) return;
    fetch(url)
      .then(res => res.text())
      .then(html => {
        // 创建虚拟DOM解析
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const postContent = doc.querySelector('.post-content');
        if (!postContent) return;
        const text = postContent.textContent || '';
        const count = text.replace(/\s+/g, '').length;
        const wordCount = card.querySelector('.word-count');
        if (wordCount) wordCount.textContent = count + '字';
        const readingTime = card.querySelector('.reading-time');
        if (readingTime) readingTime.textContent = Math.max(1, Math.round(count / 400)) + '分钟';
      })
      .catch(() => {});
  });
}); 