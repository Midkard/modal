class BaseEvent extends Event {
  constructor(type: string) {
    const eventInitDict: EventInit = {
      bubbles: true,
    }
    super(`modal.dnt.${type}`, eventInitDict)
  }
}

export class ShowEvent extends BaseEvent {
  relatedTarget?: Element

  constructor(relatedTarget?: Element) {
    super('show')
    this.relatedTarget = relatedTarget
  }
}
export class ShownEvent extends BaseEvent {
  relatedTarget?: Element

  constructor(relatedTarget?: Element) {
    super('shown')
    this.relatedTarget = relatedTarget
  }
}
export class CloseEvent extends BaseEvent {
  constructor() {
    super('close')
  }
}
export class ClosedEvent extends BaseEvent {
  preventFocus: boolean

  constructor(preventFocus = false) {
    super('closed')
    this.preventFocus = preventFocus
  }
}
