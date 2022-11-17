import { useMemo } from "react";

import type { ObjStrCustom, SelectOption } from "@typing/types";
import type { HookMakeOptionsParam, HookMakeOptionsReturn } from "@typing/hooks";

export default function useMakeOptions<T>({
  options,
  keys
}: HookMakeOptionsParam<T>): HookMakeOptionsReturn {
  const formatted: SelectOption[] = useMemo(() => options.map((option) => ({
    label: `${(option as ObjStrCustom<string>)[keys.label]}`,
    value: `${(option as ObjStrCustom<string>)[keys.value]}`
  })), [options, keys]);

  return formatted;
}
