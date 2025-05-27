document.addEventListener('DOMContentLoaded', function() {
  // 获取所有需要处理的图片
  const images = document.querySelectorAll('.post-card img, .post-image img, .tag-post-image img');

  images.forEach(img => {
    // 创建新的图片对象来预加载
    const tempImage = new Image();
    
    tempImage.onload = function() {
      // 图片加载成功，添加loaded类
      img.classList.add('loaded');
      // 给父容器也添加loaded类
      const container = img.closest('.post-card-image-wrapper, .post-image, .tag-post-image');
      if (container) {
        container.classList.add('loaded');
      }
    };
    
    tempImage.onerror = function() {
      // 图片加载失败，保持占位符状态
      img.style.display = 'none';
    };
    
    // 开始加载图片
    tempImage.src = img.src;
  });
}); 