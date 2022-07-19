import React from "react";

type TextareaInputProps = {
  onChange: React.ChangeEventHandler;
  children: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({ onChange, children: content }) => {

  return <textarea onChange={onChange}>{content}</textarea>;
}

