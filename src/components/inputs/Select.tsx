import { memo, useEffect, useMemo, useRef } from "react";
import { stopPropagation } from "@utils";
import { withField } from "@hoc";

import type { MouseEvent } from "react";
import type { MultipleValueProps, SelectFieldProps } from "@typing/proptypes";

import { InputSelect as Styles } from "@cstyles";

const MultipleValue = ({ text, onRemove }: MultipleValueProps) => (
  <Styles.MultipleOption>
    <Styles.MultipleValue>
      {text}
    </Styles.MultipleValue>
    <Styles.MultipleRemove
      type="button"
      onClick={stopPropagation(onRemove)}
    />
  </Styles.MultipleOption>
);

const SelectInput = ({ error, field, meta, helpers, multiple, ...props }: Omit<SelectFieldProps, "data">) => {
  const { options = [], label, onSelect, ...remainingProps } = props;
  const selectRef = useRef<HTMLDivElement | null>(null);
  const value = useMemo(() => options.find(({ value: valueOption }) => (
    valueOption === meta.value
  ))?.label || remainingProps.withoutValue, [meta.value, options, remainingProps.withoutValue]);
  const multipleValue = meta.value as string[];
  const memoOptions = useMemo(() => (
    multiple ? options.filter((optionOk) => (
      !(multipleValue.some((optionNot) => (optionOk.value === optionNot)))
    )) : options
  ), [multiple, options, multipleValue]);

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

  const handleRemoveMultiple = (itemToRemove?: string) => {
    if (itemToRemove) {
      const newValues = multipleValue.filter(((item) => (
        (item !== itemToRemove)
      )));
      helpers.setValue(newValues);
      if (onSelect) onSelect(newValues);
    } else {
      helpers.setValue([]);
      if (onSelect) onSelect([]);
    }
  };

  const handleSelect = (event: MouseEvent) => {
    if (multiple) event.stopPropagation();
    const option = event.target as HTMLDivElement;
    const select = selectRef.current;
    if (select) {
      if (!(option.dataset.select === "true")) {
        const valueSelected = option.dataset.value;
        const newValue = multiple ? [...multipleValue, valueSelected] : valueSelected;
        helpers.setValue(newValue);
        if (onSelect) onSelect(newValue);
        if (!multiple) select.dataset.active = "false";
        select.dataset.active = "false";
      } else {
        if (!multiple) handleCloseSelect();
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
    <Styles.Select
      ref={selectRef}
      onClick={handleCloseSelect}
      role="button"
      tabIndex={0}
      data-select="true"
    >
      <Styles.Value hasValue={!!(value)} data-box="true">
        {!multiple ? (value ?? label) : null}
        <Styles.Multiple>
          {multiple ? multipleValue.map((item, index) => (
            <MultipleValue
              key={`${index + 0}-${item}`}
              text={item}
              onRemove={() => handleRemoveMultiple(item)}
            />
          )) : null}
          {(multiple && multipleValue.length === 0) ? label : null}
        </Styles.Multiple>
        {(multiple && multipleValue.length > 0) ? (
          <Styles.MultipleRemove
            type="button"
            onClick={stopPropagation(() => handleRemoveMultiple())}
            all
          />
        ) : null}
      </Styles.Value>
      <Styles.Options onClick={handleSelect} onMouseLeave={handleCloseSelect} data-option="true">
        {memoOptions.map((option) => (
          <Styles.Option
            key={option.key ?? option.value}
            data-value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Styles.Option>
        ))}
      </Styles.Options>
    </Styles.Select>
  );
};

const Select = memo(SelectInput);

Select.displayName = "Select";

export default withField<SelectFieldProps>(Select);
