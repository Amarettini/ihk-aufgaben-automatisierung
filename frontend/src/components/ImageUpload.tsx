import React, { useState } from "react"

type ImageUploadProps = {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  label: string;
  blocked: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = React.memo(({ selectedImage, setSelectedImage, label, blocked }) => {
  const [fileInputKey, setFileInputKey] = useState("");

  const resetFileInput = () => {
    let randomString = Math.random().toString(36);
    setFileInputKey(randomString);
  }

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    } else {
      throw new Error("Bruh");
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    resetFileInput();
  }

  const imageData = () => {
    if (selectedImage) {
      return (
        <p>Bild Typ: {selectedImage.type}</p>
      );
    }
  };



  return (
    <div className="border border-1 p-3 rounded">
      {/* <label htmlFor={label} className={"form-label"}>{label}</label> */}
      <input id={label} className="form-control mb-3" type="file" onChange={handleImageChange} disabled={blocked} key={fileInputKey} />
      {imageData()}
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="img-fluid rounded" />}
      <button type="button" className="btn btn-sm btn-danger mt-3" onClick={handleRemoveImage}>Entfernen</button>
    </div>
  );
});
