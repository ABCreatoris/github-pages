document.addEventListener('DOMContentLoaded', function() {
  const tagItems = document.querySelectorAll('.tag-item');
  const tagSections = document.querySelectorAll('.tag-section');
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const menuOverlay = document.querySelector('.menu-overlay');

  // 菜单交互
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

  // 标签点击事件
  tagItems.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      
      // 移除所有标签的激活状态
      tagItems.forEach(t => t.classList.remove('active'));
      // 添加当前标签的激活状态
      this.classList.add('active');

      // 滚动到目标标签区域
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 监听滚动事件，更新激活的标签
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const headerOffset = 100;

    tagSections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        tagItems.forEach(tag => {
          if (tag.getAttribute('href') === '#' + sectionId) {
            tag.classList.add('active');
          } else {
            tag.classList.remove('active');
          }
        });
      }
    });
  });

  // 检查 URL 中的标签参数
  const hash = window.location.hash;
  if (hash) {
    const targetTag = document.querySelector(`a[href="${hash}"]`);
    if (targetTag) {
      targetTag.click();
    }
  }
}); 