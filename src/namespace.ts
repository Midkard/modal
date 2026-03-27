/**
 * This module exists solely to make the DntModal namespace extensible
 * with declaration merging:
 *
 * ```ts
 * declare module '@dnt-theme/modal' {
 *     export namespace DntModal {
 * 		     export interface Modal {
 * 		         id: number;
 * 		         // ...
 * 	       }
 * 	   }
 * }
 * ```
 *
 * The huge upside is that consumers of @dnt-theme/modal may extend the
 * exported data types using interface merging as follows:
 *
 * ```ts
 * import type { ModalProps as BaseProps } from '@dnt-theme/modal;
 * declare module '@dnt-theme/modal' {
 *     export namespace DntModal {
 *         export interface ModalProps extends BaseProps {
 *             numberOfViews: number;
 *         }
 *     }
 * }
 *
 * ```
 */
export namespace DntModal {}
