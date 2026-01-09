export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const COMPONENT_SIZES: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export type ComponentRounded =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';
export const COMPONENT_ROUNDED: ComponentRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];

export type ComponentStatus = 'help' | 'success' | 'warn' | 'error';
export const COMPONENT_STATUSES: ComponentStatus[] = [
  'help',
  'success',
  'warn',
  'error',
];

export type ComponentColorPreset = 'primary' | 'secondary';
export const COMPONENT_COLOR_PRESETS: ComponentColorPreset[] = [
  'primary',
  'secondary',
];
