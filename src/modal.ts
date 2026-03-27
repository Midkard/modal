import { controlButton, isDisabled, targetElement } from './library/utils/dom'
import './modal.css'
import { dntModals } from './state'
export type { DntModal } from './namespace'
export { dntModals }

/**
 * Close by button click
 */
document.addEventListener('click', function (event) {
  const btn =
    event.target instanceof Element && event.target.closest<HTMLElement>(`[data-dnt-dismiss]`)
  if (!btn) {
    return
  }
  event.preventDefault()

  if (isDisabled(btn)) {
    return
  }

  const targetEl = targetElement(btn) || btn.closest<HTMLElement>('dialog')
  if (!targetEl) {
    return
  }
  dntModals.getOrCreateInstance(targetEl as HTMLDialogElement).hide()
})

/**
 * Open by button
 */
document.addEventListener('click', function (event) {
  const btn = controlButton(event.target)
  if (!btn) {
    return
  }
  const targetEl = targetElement(btn)
  if (!targetEl || !(targetEl instanceof HTMLDialogElement)) {
    return
  }

  event.preventDefault()

  if (isDisabled(btn)) {
    return
  }

  const data = dntModals.getOrCreateInstance(targetEl)
  data.toggle(btn)
  return false
})
