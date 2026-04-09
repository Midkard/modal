# @midkard/modal

A lightweight, flexible modal library built on top of the native HTML `<dialog>` element. Part of the DNT WordPress theme.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Native HTML Dialog** — Built on the standard `<dialog>` element for accessibility and semantic correctness
- **TypeScript Support** — Fully typed with extensible interfaces
- **Multiple Modal Types** — Standard dialogs, offcanvas (left/right), bottom sheets, and fullscreen modals
- **CSS Animations** — Smooth transitions with `@starting-style` and `allow-discrete` support
- **Event System** — Custom events for show/shown/close/closed lifecycle
- **Lightweight** — Minimal JavaScript with no external dependencies
- **Accessible** — ARIA attributes and keyboard navigation support

## Installation

```bash
npm install @midkard/modal
```

## Usage

### Basic Example

```html
<!-- Trigger button -->
<button data-dnt-control="#my-modal">Open Modal</button>

<!-- Modal dialog -->
<dialog id="my-modal" class="modal" aria-label="My Modal">
  <article>
    <p>Modal content goes here...</p>
  </article>
  <button data-dnt-dismiss="modal">Close</button>
</dialog>
```

```typescript
import '@midkard/modal';
import '@midkard/modal/style';
```

### Modal Types

#### Standard Modal (Centered)
```html
<dialog class="modal" id="modal-standard">
  <article>Content</article>
</dialog>
```

#### Left Offcanvas
```html
<dialog class="modal modal_start" id="menu-offcanvas">
  <article>Menu content</article>
</dialog>
```

#### Right Offcanvas
```html
<dialog class="modal modal_end" id="sidebar">
  <article>Sidebar content</article>
</dialog>
```

#### Bottom Sheet
```html
<dialog class="modal modal_bottom" id="bottom-sheet">
  <article>Bottom content</article>
</dialog>
```

#### Fullscreen
```html
<dialog class="modal modal_fullscreen" id="modal-full">
  <article>Fullscreen content</article>
</dialog>
```

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-dnt-control` | Opens/toggles the target modal (value: CSS selector) |
| `data-dnt-dismiss` | Closes the modal when clicked |
| `data-dnt-backdrop` | Set to `"false"` to disable backdrop click-to-close |

### Events

| Event | Description |
|-------|-------------|
| `modal.dnt.show` | Fired when modal starts opening |
| `modal.dnt.shown` | Fired when modal open animation completes |
| `modal.dnt.close` | Fired when modal starts closing |
| `modal.dnt.closed` | Fired when modal close animation completes |

```javascript
const modal = document.querySelector('#my-modal');

modal.addEventListener('modal.dnt.show', (e) => {
  console.log('Modal is opening');
});

modal.addEventListener('modal.dnt.shown', (e) => {
  console.log('Modal is now visible');
});
```

### Programmatic API

```typescript
import { dntModals } from '@midkard/modal';

const modal = dntModals.getOrCreateInstance(document.querySelector('#my-modal'));

// Show modal
modal.show();

// Hide modal
modal.hide();

// Toggle modal
modal.toggle();

// Destroy instance
modal.destroy();
```

## CSS Variables

Customize the modal appearance using CSS variables:

```css
.modal {
  --duration: 0.15s;      /* Animation duration */
  --padding-y: 1rem;      /* Horizontal padding */
  --border-raius: 0.5rem; /* Border radius */
  --color: inherit;       /* Text color */
  --bg: white;            /* Background color */
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## Browser Support

Requires browsers that support:
- HTML `<dialog>` element
- CSS `@starting-style` at-rule
- CSS `allow-discrete` keyword

## License

MIT © [Dimenius Novus](https://dn-ms.ru)
