import type { DntModal } from '@dnt-theme/modal'
import { dntModals } from '../state'

const instanceMap = new Map<HTMLElement, DntModal.Modal>()

const Store = {
  set(element: HTMLElement, instance: DntModal.Modal) {
    instanceMap.set(element, instance)
  },

  get(element: HTMLElement) {
    return instanceMap.get(element) || null
  },

  remove(element: HTMLElement) {
    instanceMap.delete(element)
  },
}

// Static
export function removeInstance(element: HTMLElement) {
  return Store.remove(element)
}

export function getInstance(element: HTMLElement) {
  return Store.get(element)
}

export function getOrCreateInstance(
  element: HTMLDialogElement,
  config?: Partial<DntModal.ModalProps>,
) {
  let instance = Store.get(element)
  if (instance) {
    return instance
  }
  instance = new dntModals.Modal(element, config)
  Store.set(element, instance)
  return instance
}
