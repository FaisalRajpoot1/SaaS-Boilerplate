import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 *
 * `clsx` handles conditional/array/object class inputs; `tailwind-merge` then
 * dedupes conflicting Tailwind utilities (e.g. `px-2 px-4` → `px-4`). This is
 * the canonical Shadcn UI helper every component relies on.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
