document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.post-content pre').forEach(function(pre) {
    if (!pre.querySelector('.mac-dots')) {
      const dots = document.createElement('div');
      dots.className = 'mac-dots';
      dots.innerHTML = '<span class="mac-dot red"></span><span class="mac-dot yellow"></span><span class="mac-dot green"></span>';
      pre.insertBefore(dots, pre.firstChild);
    }
  });
}); 