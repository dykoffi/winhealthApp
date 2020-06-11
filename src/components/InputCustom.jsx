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
      <small>{label}</small>
      <input
        type={type}
        onChange={(ev) => onChange(ev)}
        className={`InputCustom ${className}`}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );

export const TextFieldLine = ({
  type = "text",
  label,
  className,
  placeholder,
  name,
  icon,
  min,
  max,
  value = "",
  onChange,
  onKeyPress
}) => (
    <div className={className}>
      <div className={`align-items-center InputCustom px-1 py-2 my-2 row rounded`}>
        {icon ? <small className="font-weight-bold"><i className={`mdi-${icon}`}></i> {label} : </small> : <small className="font-weight-bold">{label} : </small>}
        {value ?
          <input
            value={value}
            type={type}
            onChange={(ev) => onChange(ev)}
            className="border-0 col text-secondary pl-1"
            placeholder={placeholder}
            name={name}
            onKeyPress={onKeyPress}
          />
          :
          <input
            type={type}
            onChange={(ev) => onChange(ev)}
            className="border-0 col text-secondary pl-1"
            placeholder={placeholder}
            name={name}
            onKeyPress={onKeyPress}
          />
        }
      </div>
    </div>
  );

export const Select = ({
  label,
  className,
  placeholder,
  name,
  value,
  icon,
  onChange,
  options,
  multiple,
}) =>
  (
    <div className={className}>
      <div className={`align-items-center InputCustom py-2 my-2 px-1 row rounded`}>
        {icon ? <small className="font-weight-bold"><i className={`mdi-${icon}`}></i> {label} :</small> : <small className="font-weight-bold">{label} :</small>}
        <select
          multiple={multiple}
          name={name}
          value={value}
          className="col-lg SelectCustom border-0 pl-1 white"
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
      <input
        id={id}
        name={id}
        list={idList}
        type={type}
        value={value}
        placeholder={placeholder}
        className="shadow-sm col-12 InputCustom"
      />
      <datalist id={idList}>
        {list.map((value, i) => (
          <option key={i} value={value} />
        ))}
      </datalist>
    </div>
  );
