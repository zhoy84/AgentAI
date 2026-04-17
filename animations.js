// animations.js - Scroll-triggered animations and marquee effects
document.addEventListener('DOMContentLoaded', () => {
  // Respect user preference for reduced motion
  const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!preferReduced) {
    // 滚动进入触发：淡入 + 向上平滑移动
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      revealElements.forEach(el => obs.observe(el));
    } else {
      // 无 IntersectionObserver 时直接显示
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  } else {
    // Reduced motion: show all immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
  
  // 导航栏从顶部滑入（CSS 已实现初始向上位移）
  const header = document.querySelector('.header-nav');
  if (header) {
    setTimeout(() => {
      header.style.transform = 'translateY(0)';
    }, 600);
  }
});
