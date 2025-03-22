import type { RouterOutput } from '@packages/trpc';

export type Role = RouterOutput['auth']['businessLogin']['role'];
