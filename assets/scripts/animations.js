"use strict";

// function setScrollAmount() {
//   (document.documentElement || document.body).style.setProperty("--scrollLengthPx", body.scrollTop);
// }
// setScrollAmount();
// document.addEventListener("scroll", setScrollAmount);
// document.addEventListener("resize", setScrollAmount);

/** @param {Event} evt */
function addEffect({ target }) {
  const effectsLayer = document.querySelector("#effects");
  if (
    target == null ||
    !target["matches"] ||
    !target.matches(
      "a[href],.nav-toggle-button,button,input[type='radio']",
    )
  ) {
    return;
  }
  const rects = Array.from(target.getClientRects());
  Array.from(target.children).forEach((child) => {
    rects.push(...Array.from(child.getClientRects()));
  });
  rects.forEach((rect) => {
    const { top, left, width, height } = rect;
    const newEffect = document.createElement("div");
    newEffect.__effectParent = target;
    newEffect.classList.add("effect-instance");
    const padding = "10rem";
    newEffect.style.top = `calc(${top + window.scrollY}px - ${padding})`;
    newEffect.style.left = `calc(${left + window.scrollX}px - ${padding})`;
    newEffect.style.width = `calc(${width}px + 2 * ${padding})`;
    newEffect.style.height = `calc(${height}px + 2 * ${padding})`;
    effectsLayer.appendChild(newEffect);
  });
}
document.addEventListener("mouseenter", addEffect, true);
document.addEventListener("focus", addEffect, true);

/** @param {Event} evt */
function removeEffect({target}) {
  const effectsLayer = document.querySelector("#effects");
  const effects = Array.from(effectsLayer.children).filter(
    (e) => e.__effectParent === target,
  );
  effects.forEach(e => {
    e.getAnimations().forEach(anim => {
      if (anim.currentTime < 100) {
        anim.pause();
        effectsLayer.removeChild(e);
        return;
      }
      anim.pause();
      anim.updatePlaybackRate(-0.25);
      anim.play();
      anim.addEventListener('finish', () => {
        if (effectsLayer.contains(e)) {
          effectsLayer.removeChild(e);
        }
      });
    });
  })
};
document.addEventListener('mouseleave', removeEffect, true);
document.addEventListener('blur', removeEffect, true);
