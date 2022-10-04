import { useMemo } from "react";

import type { ObjStrCommon } from "@typing/types";

export default function useDatas(config: ObjStrCommon) {
  const datas: ObjStrCommon = useMemo(() => ({}), []);

  Object.keys(config).forEach((key) => {
    datas[`data-${key}`] = config[key];
  });

  return datas;
}
