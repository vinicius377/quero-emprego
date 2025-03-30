import * as React from "react"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<"textarea"> & {
  error?: string
}

function Textarea({ className, error, ...props }: Props) {
  return (
    <fieldset>
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white",
          className
        )}
        {...props}
      />
      <span className="text-sm text-red-500">{error ?? ''}</span>
    </fieldset>

  )
}

export { Textarea }
