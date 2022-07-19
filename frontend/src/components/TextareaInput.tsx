import React from "react";

type TextareaInputProps = {
  onChange: React.ChangeEventHandler;
  label: string;
  children: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({ onChange, label, children: content }) => {

  return (<div className={"mb-3"}>
    {/* <label htmlFor={label} className={"form-label"}>{label}</label> */}
    <textarea id={label} className="form-control" onChange={onChange} rows={4}>{content}</textarea>
  </div >)
}

