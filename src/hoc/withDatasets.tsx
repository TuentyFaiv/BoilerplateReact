import { forwardRef } from "react";
import { useDatas } from "@hooks";

import type { ComponentType } from "react";
import type { HOCDatasets, HOCDatasetsProps } from "@typing/hocs";

function withDatasets<T extends HOCDatasets = HOCDatasets>(Component: ComponentType<T>) {
  const WithDatasets = forwardRef((props: Omit<T, keyof HOCDatasets>, ref) => {
    const { data = {}, ...newProps } = props as T & HOCDatasetsProps;
    const datas = useDatas(data);

    return (
      <Component
        {...(newProps as unknown as T)}
        ref={ref}
        datas={datas}
      />
    );
  });

  WithDatasets.displayName = `withDatasets(${Component.displayName ?? Component.name})`;

  return WithDatasets;
}

export default withDatasets;
