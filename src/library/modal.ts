import type { DntModal } from '@dnt-theme/modal'
import { ClosedEvent, CloseEvent, ShowEvent, ShownEvent } from './event'
import { removeInstance } from './store'
import { getDataAttribute, getDataAttributes } from './utils/data-attributes'
import { animationsComplete } from './utils/dom'

/**
 * Class definition
 */
export class Modal implements DntModal.Modal {
  _dialog: HTMLDialogElement

  _isTransitioning = false
  _replaced = {} as Record<string, string>
  _config: DntModal.ModalProps
  _dialogAttrObserver: MutationObserver
  _relatedTarget: Element | undefined

  constructor(element: HTMLDialogElement, config?: Partial<DntModal.ModalProps>) {
    this._dialog = element
    this._config = {
      backdrop: true,
      ...getDataAttributes<DntModal.ModalProps>(this._dialog),
      ...(config || {}),
    }

    this._isTransitioning = false

    // track open
    this._dialogAttrObserver = this._observeOpen(element)
    // track close
    this._dialog.addEventListener('close', () => this._onClose())

    this._dialog.addEventListener('modal.dnt.show', () => this._replaceSelectors())
    this._dialog.addEventListener('modal.dnt.closed', () => this._restoreSelectors())

    if (this._config['backdrop']) {
      this._dialog.addEventListener('click', (e) => this._onClickBackdrop(e))
    }

    this._dialog.addEventListener('click', (ev) => this.clickInside(ev))
  }

  // Public
  toggle(relatedTarget?: Element) {
    return this._dialog.open ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget?: Element) {
    if (this._dialog.open) {
      return
    }
    this._relatedTarget = relatedTarget

    // void this._dialog.offsetHeight

    this._dialog.showModal()
  }

  hide() {
    if (!this._dialog.open) {
      return
    }
    this._dialog.close()
  }

  destroy() {
    this._dialogAttrObserver.disconnect()
    removeInstance(this._dialog)
  }

  clickInside(ev: MouseEvent) {
    if (!(ev.target instanceof Element)) {
      return
    }
    const a = ev.target.closest('a')
    if (a && a.matches('.menu a')) {
      this.hide()
    }
  }

  _observeOpen(dialog: HTMLDialogElement) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(async (mutation) => {
        if (mutation.attributeName === 'open') {
          const isOpen = dialog.hasAttribute('open')
          if (!isOpen) return

          dialog.dispatchEvent(new ShowEvent(this._relatedTarget))
          await animationsComplete(dialog)
          dialog.dispatchEvent(new ShownEvent(this._relatedTarget))
        }
      })
    })
    observer.observe(dialog, {
      attributes: true,
    })
    return observer
  }

  async _onClose() {
    this._dialog.dispatchEvent(new CloseEvent())
    await animationsComplete(this._dialog)
    this._dialog.dispatchEvent(new ClosedEvent())
    this._relatedTarget = undefined
  }

  _onClickBackdrop(event: MouseEvent) {
    if (!this._dialog.open) {
      return
    }

    const rect = this._dialog.getBoundingClientRect()
    const { clientX: x, clientY: y } = event
    const inside = rect.top <= y && y <= rect.bottom && rect.left <= x && x <= rect.right
    if (!inside) this.hide()
  }

  _replaceSelectors(relatedTarget?: Element) {
    if (!relatedTarget) {
      return
    }
    if (!(relatedTarget instanceof HTMLElement)) {
      return
    }
    const selectors = getDataAttribute(relatedTarget, 'modal-replace') as Record<string, string>
    for (const key in selectors) {
      if (Object.prototype.hasOwnProperty.call(selectors, key)) {
        const html = selectors[key]
        const inElement = this._dialog.querySelector(key)
        if (!inElement) {
          continue
        }
        if (inElement instanceof HTMLInputElement) {
          this._replaced[key] = inElement.value
          inElement.value = html
        } else {
          this._replaced[key] = inElement.innerHTML
          inElement.innerHTML = html
        }
      }
    }
  }

  _restoreSelectors() {
    for (const key in this._replaced) {
      if (Object.prototype.hasOwnProperty.call(this._replaced, key)) {
        const html = this._replaced[key]
        const inElement = this._dialog.querySelector(key)
        if (inElement) {
          if (inElement instanceof HTMLInputElement) {
            inElement.value = html
          } else {
            inElement.innerHTML = html
          }
        }
        delete this._replaced[key]
      }
    }
  }
}

declare module '@dnt-theme/modal' {
  namespace DntModal {
    export interface ModalProps {
      backdrop: boolean
    }
    export interface Modal {
      toggle(relatedTarget?: Element): void

      show(relatedTarget?: Element): void

      hide(): void

      destroy(): void
    }
  }
}

declare global {
  export interface GlobalEventHandlersEventMap {
    'modal.dnt.show': ShowEvent
    'modal.dnt.shown': ShownEvent
    'modal.dnt.close': CloseEvent
    'modal.dnt.closed': ClosedEvent
  }
}
