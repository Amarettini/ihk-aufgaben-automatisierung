import React from "react";

type TextareaInputProps = {
  onChange: React.ChangeEventHandler;
  label: string;
  blocked?: boolean;
  children: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({ onChange, label, blocked = false, children: content }) => {

  return (<div className={"mb-3"}>
    {/* <label htmlFor={label} className={"form-label"}>{label}</label> */}
    <textarea id={label} className="form-control" onChange={onChange} rows={4} disabled={blocked}>{content}</textarea>
  </div >)
}

