document.addEventListener('DOMContentLoaded', function() {
  const tagCloud = document.querySelector('.home-tag-cloud');
  const scrollLeftBtn = document.querySelector('.tag-scroll-left');
  const scrollRightBtn = document.querySelector('.tag-scroll-right');
  if (!tagCloud || !scrollLeftBtn || !scrollRightBtn) return;

  const scrollAmount = 200;

  scrollLeftBtn.addEventListener('click', () => {
    tagCloud.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  scrollRightBtn.addEventListener('click', () => {
    tagCloud.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  function updateScrollButtons() {
    scrollLeftBtn.style.visibility = tagCloud.scrollLeft > 0 ? 'visible' : 'hidden';
    scrollRightBtn.style.visibility =
      tagCloud.scrollLeft < (tagCloud.scrollWidth - tagCloud.clientWidth - 1) ? 'visible' : 'hidden';
  }
  tagCloud.addEventListener('scroll', updateScrollButtons);
  window.addEventListener('resize', updateScrollButtons);
  updateScrollButtons();
}); 