document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navRight = document.querySelector('.nav-right');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  // 确保在移动端视图下菜单按钮可见
  function checkMobileView() {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
    }
  }

  // 初始检查
  checkMobileView();
  // 监听窗口大小变化
  window.addEventListener('resize', checkMobileView);

  function toggleMenu() {
    const isActive = menuToggle.classList.contains('active');
    
    if (!isActive) {
      menuToggle.classList.add('active');
      navRight.classList.add('active');
      menuOverlay.classList.add('active');
      body.style.overflow = 'hidden';
    } else {
      menuToggle.classList.remove('active');
      navRight.classList.remove('active');
      menuOverlay.classList.remove('active');
      body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });
  }

  // 点击导航链接时关闭菜单
  const navLinks = document.querySelectorAll('.nav-right a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navRight.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 处理 ESC 键关闭菜单
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navRight.classList.contains('active')) {
      toggleMenu();
    }
  });
}); 