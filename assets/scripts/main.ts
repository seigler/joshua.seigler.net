/** @param {Event} evt */
function removeEffect({ target }) {
  const effectsLayer = document.querySelector("#effects")
  if (effectsLayer == null) {
    return
  }
  const effects = Array.from(effectsLayer.children).filter(
    (e) => e["__effectParent"] === target
  )
  effects.forEach((e) => {
    e.getAnimations().forEach((anim) => {
      if (+(anim.currentTime ?? 0) < 100) {
        anim.pause()
        effectsLayer.removeChild(e)
        return
      }
      anim.pause()
      anim.updatePlaybackRate(-0.25)
      anim.play()
      anim.addEventListener("finish", () => {
        if (effectsLayer.contains(e)) {
          effectsLayer.removeChild(e)
        }
      })
    })
  })
}

function isElement(target: EventTarget | null): target is Element {
  return target !== null && typeof target["matches"] === "function"
}

function addEffect({ target }: UIEvent) {
  const effectsLayer = document.querySelector("#effects")
  if (
    !isElement(target) ||
    !target.matches("a[href],.nav-toggle-button,button,input[type='radio']")
  ) {
    return
  }
  const color = window.getComputedStyle(target).getPropertyValue("--glowColor")
  const rects = Array.from(target.getClientRects())
  Array.from(target.children).forEach((child) => {
    rects.push(...Array.from(child.getClientRects()))
  })
  rects.forEach((rect) => {
    const { top, left, width, height } = rect
    const newEffect = document.createElement("div")
    newEffect["__effectParent"] = target
    newEffect.classList.add("effect-instance")
    const padding = "10rem"
    newEffect.style.top = `calc(${top + window.scrollY}px - ${padding})`
    newEffect.style.left = `calc(${left + window.scrollX}px - ${padding})`
    newEffect.style.width = `calc(${width}px + 2 * ${padding})`
    newEffect.style.height = `calc(${height}px + 2 * ${padding})`
    newEffect.style.setProperty("--glowColor", color)
    effectsLayer?.appendChild(newEffect)
  })
}

function addCodeBlockCopiers() {
  document.querySelectorAll('pre[class^=language]').forEach(el => {
    const copyButton = document.createElement('button')
    copyButton.classList.add('copy-button')
    copyButton.addEventListener('click', () => {
      if (el instanceof HTMLElement) {
        navigator.clipboard.writeText(el.innerText)
      }
    })
    el.appendChild(copyButton)
  })
}

function attend({ target}: UIEvent) {
  if (!isElement(target) || !target.matches("a[href][target=_blank]")) {
    return
  }
  umami?.track(`Link: ${target['innerText'] ?? target.getAttribute('href')}`, {
    from: document.location.href,
    destination: target.getAttribute('href'),
  })
}

document.addEventListener("mouseenter", addEffect, true)
document.addEventListener("focus", addEffect, true)

document.addEventListener("mouseleave", removeEffect, true)
document.addEventListener("blur", removeEffect, true)

document.addEventListener("click", attend, true)

document.addEventListener("DOMContentLoaded", addCodeBlockCopiers)
