import { withField } from "@hoc";

import type { ChangeEvent } from "react";
import type { FileFieldProps } from "@typing/proptypes";

import { InputFile as Styles } from "@cstyles";

const FileInput = ({ error, field, meta, helpers, ...props }: Omit<FileFieldProps, "data" | "file">) => {
  const { profile, defaultValue, alt, accept = "image/*", onChange, ...remainingProps } = props;

  const { onBlur, value } = field;
  const handleSelectFile = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const filesSelected = props.multiple ? [...value, ...files] as File[] : files[0];
      if (onChange) onChange(filesSelected);
      helpers.setValue(filesSelected);
    }
  };

  if (profile) {
    return (
      <Styles.Profile>
        <Styles.ProfileImg
          src={value ? URL.createObjectURL(value) : defaultValue}
          alt={value?.name || alt}
        />
        <Styles.File
          id={props.id || props.name}
          data-error={error}
          type="file"
          accept={accept}
          onChange={handleSelectFile}
          onBlur={onBlur}
          {...remainingProps}
        />
      </Styles.Profile>
    );
  }

  return (
    <Styles.File
      id={props.id || props.name}
      data-error={error}
      type="file"
      accept={accept}
      onChange={handleSelectFile}
      onBlur={onBlur}
      {...remainingProps}
    />
  );
};

export default withField<FileFieldProps>(FileInput);
