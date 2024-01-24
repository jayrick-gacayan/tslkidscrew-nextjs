import { InputProps } from "@/types/props/input-props";
import { ChangeEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function CustomTextarea({
  labelText,
  fieldInput,
  onChange,
  rows,
  className
}: {
  labelText: string | ReactNode;
  fieldInput: InputProps<string>;
  onChange: (value: string) => void;
  rows: number
  className?: string;
}) {
  return (
    <div className="w-full space-y-[2px]">
      <label className="block space-y-1 w-full">
        <p className="font-semibold text-black">{labelText}</p>
        <div tabIndex={-1}
          className={
            twMerge(
              'block has-[input:focus]:border-primary border-transparent justify-between gap-4 bg-secondary overflow-hidden rounded border', className!)
          }>
          <textarea
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              onChange(event.target.value);
            }}
            className="resize-none p-2 w-full outline-0 outline-transparent rounded bg-transparent border-transparent"
            rows={rows} />
        </div>
      </label>
    </div>
  )
}