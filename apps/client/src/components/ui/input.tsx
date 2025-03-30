import type * as React from 'react';

import { cn } from '@/lib/utils';

type Icon = {
  Left?: React.ReactNode
  Right?: React.ReactNode
}
type Props = React.ComponentProps<'input'> & {
	error?: string;
	styleField?: React.CSSProperties;
  icons?: Icon
};

function Input({ className, styleField = {}, icons = {}, type, error, ...props }: Props) {
	return (
		<fieldset className="w-full" style={styleField}>
			<div
				className={cn(
					'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring bg-white w-full',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'flex gap-2',
					className,
				)}
			>
        {icons.Left && icons.Left}
				<input type={type} data-slot="input" {...props} className="w-full focus:outline-none" />
        {icons.Right && icons.Right}
			</div>
			<span className="text-sm text-red-500">{error ?? ''}</span>
		</fieldset>
	);
}

export { Input };