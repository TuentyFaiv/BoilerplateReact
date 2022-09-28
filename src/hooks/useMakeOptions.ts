import type { ObjStrCustom, SelectOption } from "@typing/types";
import type { HookMakeOptionsParam, HookMakeOptionsReturn } from "@typing/hooks";

export default function useMakeOptions<T extends ObjStrCustom<string>>({
  options,
  keys
}: HookMakeOptionsParam<T>): HookMakeOptionsReturn {
  const formatted: SelectOption[] = options.map((option) => ({
    label: option[keys.label],
    value: option[keys.value]
  }));

  return formatted;
}
