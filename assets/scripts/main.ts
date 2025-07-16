function removeEffect(event: UIEvent) {
  const { target } = event
  const effectsLayer = document.querySelector("#effects")
  if (effectsLayer == null) {
    return
  }
  const effects = Array.from(effectsLayer.children).filter(
    (e) => {
      if (e["__effectParent"] === target) {
        return true
      }
      return isTouchEvent(event) && Array.from(event.changedTouches).some(t => t.identifier === e["__effectTouch"])
    }
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

function isTouchEvent(event: UIEvent): event is TouchEvent {
  return event.type.startsWith('touch')
}

function addEffect(event: UIEvent) {
  const { target } = event
  const effectsLayer = document.querySelector("#effects")
  const color = window.getComputedStyle(isElement(target) ? target : document.body).getPropertyValue("--glowColor")
  let rects: {top: number, left: number, width: number, height: number }[] = []
  if (isTouchEvent(event)) {
    rects = Array.from(event.targetTouches).map(t => ({ top: t.clientY - 5, left: t.clientX - 5, width: 10, height: 10 }))
  } else {
    if (!isElement(target) || !target.matches("a[href],.nav-toggle-button,button,input[type='radio']")) {
      return
    }
    rects = Array.from(target.getClientRects())
    Array.from(target.children).forEach((child) => {
      rects.push(...Array.from(child.getClientRects()))
    })
  }
  rects.forEach((rect) => {
    const { top, left, width, height } = rect
    const newEffect = document.createElement("div")
    if (isTouchEvent(event)) {
      newEffect["__effectTouch"] = event.targetTouches.item(0)?.identifier
    } else {
      newEffect["__effectParent"] = target
    }
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
document.addEventListener("touchstart", addEffect, true)

document.addEventListener("mouseleave", removeEffect, true)
document.addEventListener("blur", removeEffect, true)
document.addEventListener("touchend", removeEffect, true)
document.addEventListener("touchcancel", removeEffect, true)

document.addEventListener("click", attend, true)

document.addEventListener("DOMContentLoaded", addCodeBlockCopiers)
