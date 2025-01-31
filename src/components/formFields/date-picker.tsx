"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type IDatePicker = CalendarProps & {
  errMsg?: string;
  label: string;
  value: Date | undefined
  className?: string
  onChange:  (...event: any[]) => void
};

const DatePicker: React.FC<IDatePicker> = ({
  value, 
  onChange,
  label,
  ...props
}) => {


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          onSelect={onChange}
          mode="single"
          selected={value}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
