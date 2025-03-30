
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  selected: Date
  onSelect: (date: Date | undefined) => void
  limitBefore?: Date
  limiteAfter?: Date
  title?: string
}
export function DatePicker({ selected, title, onSelect, limitBefore, limiteAfter }: Props) {

  return (
    <Popover>
      <div className="flex flex-col">
        <span className="text-sm">{title}</span>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {selected ? format(selected, "PPP", { locale: ptBR }) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
          disabled={{ before: limitBefore, after: limiteAfter }}
        />
      </PopoverContent>
    </Popover>
  )
}
