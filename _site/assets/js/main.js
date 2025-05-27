document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const menuOverlay = document.querySelector('.menu-overlay');

  // 回到顶部按钮
  const backToTop = document.querySelector('.back-to-top');

  // 切换移动端菜单
  menuToggle.addEventListener('click', function() {
    navRight.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
  });

  // 点击遮罩层关闭菜单
  menuOverlay.addEventListener('click', function() {
    navRight.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // 处理窗口大小变化
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navRight.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // 监听滚动事件
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // 点击回到顶部
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}); 