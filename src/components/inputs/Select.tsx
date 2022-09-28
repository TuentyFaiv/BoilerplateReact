import { memo, useEffect, useMemo, useRef } from "react";
import { withField } from "@hoc";

import type { MouseEvent } from "react";
import type { SelectFieldProps } from "@typing/proptypes";

const SelectInput = ({ error, field, meta, helpers, ...props }: Omit<SelectFieldProps, "data">) => {
  const { options = [], label, onSelect, ...remainingProps } = props;
  const selectRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => options.find(({ value: valueOption }) => (
    valueOption === meta.value
  ))?.label || remainingProps.withoutValue, [meta.value, options, remainingProps.withoutValue]);

  const handleCloseSelect = () => {
    const select = selectRef.current;
    if (select) {
      if (select.dataset.active) {
        delete select.dataset.active;
      } else {
        select.dataset.active = "true";
      }
    }
  };

  const handleSelect = (event: MouseEvent) => {
    const option = event.target as HTMLDivElement;
    const select = selectRef.current;
    if (select) {
      if (!(option.dataset.select === "true")) {
        const valueSelected = option.dataset.value;
        helpers.setValue(valueSelected);
        if (onSelect) onSelect(valueSelected);
        select.dataset.active = "false";
      } else {
        handleCloseSelect();
        select.lastElementChild?.scrollTo(0, 0);
      }
    }
  };

  useEffect(() => {
    if (options.length === 1 && field.value !== options[0].value) {
      helpers.setValue(options[0].value);
      if (onSelect) onSelect(options[0].value);
    }
  }, [options, field, helpers, onSelect]);

  return (
    <div
      ref={selectRef}
      className="field__select"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      data-select="true"
    >
      <p className="field__select-value">
        {value ?? label}
      </p>
      <div className="field__select-options" onMouseLeave={handleCloseSelect}>
        {options.map((option) => (
          <span
            key={option.key ?? option.value}
            data-value={option.value}
            className="field__select-option"
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const Select = memo(SelectInput);

Select.displayName = "memo(Select)";

export default withField<SelectFieldProps>(Select);
