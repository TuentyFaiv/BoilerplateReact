import type { HookMakeOptionsParam, HookMakeOptionsReturn } from "@typing/hooks";
import type { SelectOption } from "@typing/interfaces";
import type { ObjStrCustom } from "@typing/types";

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
