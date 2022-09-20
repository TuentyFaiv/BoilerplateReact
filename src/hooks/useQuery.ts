import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import type { ObjStrCustom } from "@typing/types";

export default function useQuery() {
  const { search } = useLocation();
  const query: ObjStrCustom<string> = useMemo(() => (
    Object.fromEntries(new URLSearchParams(search).entries())
  ), [search]);

  return query;
}
