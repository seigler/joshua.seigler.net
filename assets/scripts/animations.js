'use strict'

const body = document.documentElement || document.body;
function setScrollAmount() {
  body.style.setProperty("--scrollLengthPx", body.scrollTop);
}
setScrollAmount();
document.addEventListener("scroll", setScrollAmount);
document.addEventListener("resize", setScrollAmount);
function rippleListener(el) {
  return(evt) => {
    const rects = Array.from(evt.target.getClientRects());
    Array.from(evt.target.children).forEach(child => {
      rects.push(...Array.from(child.getClientRects()));
    });
    rects.forEach(rect => {
      const {top, left, width, height} = rect;
      const effects = body.querySelector("#effects");
      const newEffect = document.createElement("div");
      newEffect.classList.add("effect-instance");
      const padding = '10rem';
      newEffect.style.top = `calc(${
        top + window.scrollY
      }px - ${padding})`;
      newEffect.style.left = `calc(${
        left + window.scrollX
      }px - ${padding})`;
      newEffect.style.width = `calc(${
        width
      }px + 2 * ${padding})`;
      newEffect.style.height = `calc(${
        height
      }px + 2 * ${padding})`;
      effects.appendChild(newEffect);
      const reverser = () => {
        newEffect.getAnimations().forEach(anim => {
          if (anim.currentTime < 100) {
            anim.pause();
            effects.removeChild(newEffect);
            return;
          }
          anim.pause();
          anim.updatePlaybackRate(0.25);
          anim.reverse();
          anim.addEventListener('finish', () => {
            if (effects.contains(newEffect)) {
              effects.removeChild(newEffect);
            }
          });
        });
      };
      el.addEventListener('mouseleave', reverser);
      el.addEventListener('blur', reverser);
    });
  }
}
Array.from(
  document.querySelectorAll('a[href],.nav-toggle-button,button,input')
).forEach(el => {
  el.addEventListener('mouseenter', rippleListener(el));
  el.addEventListener('focus', rippleListener(el));
});
