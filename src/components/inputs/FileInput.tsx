/* eslint-disable import/prefer-default-export */
import { withField } from "@hoc";

import type { ChangeEvent } from "react";
import type { FileFieldProps } from "@typing/proptypes";

const FileInput = ({ error, field, meta, helpers, ...props }: Omit<FileFieldProps, "data" | "file">) => {
  const { profile, defaultValue, alt, accept = "image/*", onChange, ...remainingProps } = props;

  const { onBlur, value } = field;
  const handleSelectFile = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const filesSelected = props.multiple ? [...value, ...files] : files[0];
      if (onChange) onChange(filesSelected);
      helpers.setValue(filesSelected);
    }
  };

  if (profile) {
    return (
      <div className="input__profile">
        <img
          src={value ? URL.createObjectURL(value) : defaultValue}
          alt={value?.name || alt}
          className="input__profile-image"
        />
        <input
          id={props.id || props.name}
          className="input__file"
          data-error={error}
          type="file"
          accept={accept}
          onChange={handleSelectFile}
          onBlur={onBlur}
          {...remainingProps}
        />
      </div>
    );
  }

  return (
    <input
      id={props.id || props.name}
      className="input__file"
      data-error={error}
      type="file"
      accept={accept}
      onChange={handleSelectFile}
      onBlur={onBlur}
      {...remainingProps}
    />
  );
};

export const File = withField<FileFieldProps>(FileInput);
