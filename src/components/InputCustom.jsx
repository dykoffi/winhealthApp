import React from "react";
import "../static/css/components/Inputs.css";

export const TextField = ({
  type = "text",
  label,
  className,
  placeholder,
  name,
  value,
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
}) => (
  <div className={className}>
    <label>
      <small>{label}</small>
    </label>
    <br />
    <select
      name={name}
      value={value}
      className="col-12 p-n1"
      placeholder={placeholder}
      onChange={(ev) => {
        onChange(ev);
      }}
    >
      {options.map(({ value, label }) => (
        <option value={value}>{label}</option>
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
  name,
  idList,
  list,
}) => (
  <div className={className}>
    <label>
      <small>{label}</small>
    </label>
    <br />
    <input
      name={name}
      list={idList}
      type={type}
      value={value}
      placeholder={placeholder}
      className="p-1 shadow-sm col-12 InputCustom"
    />
    <datalist id={idList}>
      {list.map((value) => (
        <option value={value} />
      ))}
    </datalist>
  </div>
);
