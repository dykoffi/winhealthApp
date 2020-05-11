import React from "react";
import "../static/css/components/Inputs.css";

export const TextField = ({
  type = "text",
  label,
  className,
  placeholder,
  name,
  min,
  max,
  value = "",
  onChange,
}) => (
  <div className={className}>
    <label>
      <small>{label}</small>
    </label>
    <br />
    <input
      type={type}
      value={value}
      onChange={(ev) => onChange(ev)}
      className="p-1 shadow-sm col-12 InputCustom"
      placeholder={placeholder}
      name={name}
    />
  </div>
);

export const Select = ({
  label,
  className,
  placeholder,
  name,
  value,
  onChange,
  options,
  multiple,
}) => (
  <div className={className}>
    <label>
      <small>{label}</small>
    </label>
    <br />
    <select
      multiple={multiple}
      name={name}
      value={value}
      className="col-12 p-n1 SelectCustom custom-select"
      placeholder={placeholder}
      onChange={(ev) => {
        onChange(ev);
      }}
    >
      <option selected>Selectionner</option>
      {options.map(({ value, label }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export const TextFieldAutoComplete = ({
  type = "text",
  label,
  className,
  value,
  placeholder,
  idList,
  list,
  id,
}) => (
  <div className={className}>
    <label for={id}>
      <small>{label}</small>
    </label>
    <br />
    <input
      id={id}
      name={id}
      list={idList}
      type={type}
      value={value}
      placeholder={placeholder}
      className="p-1 shadow-sm col-12 InputCustom"
    />
    <datalist id={idList}>
      {list.map((value, i) => (
        <option key={i} value={value} />
      ))}
    </datalist>
  </div>
);
