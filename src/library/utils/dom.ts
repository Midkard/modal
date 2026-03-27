export function isDisabled(element: Element & { disabled?: boolean }) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true
  }

  if (element.classList.contains('disabled')) {
    return true
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
}

export function controlButton(btn: EventTarget | null) {
  if (!(btn instanceof Element)) {
    return null
  }
  return btn.closest<HTMLElement>(`[data-dnt-control]`)
}

export function targetElement(button: HTMLElement) {
  if (!(button instanceof HTMLElement)) {
    return null
  }
  const target = button.getAttribute('data-dnt-control')

  return target ? document.querySelector<HTMLElement>(target) : null
}

export function animationsComplete(element: HTMLElement) {
  return Promise.allSettled(element.getAnimations().map((animation) => animation.finished))
}
