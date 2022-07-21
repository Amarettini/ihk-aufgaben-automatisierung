import React from "react";

type AnwserInputProps = {
  onChange?: React.ChangeEventHandler;
  children: string;
  success?: boolean;
  anwser?: string;
}

export const AnwserInput: React.FC<AnwserInputProps> = ({ onChange, success, anwser, children: content }) => {
  return (<div className="card py-2">
    <div className="card-body">
      <header className="h5 card-subtitle mb-2 text-muted">Muster Antwort:</header>
      {content}
    </div>
  </div >)
}

