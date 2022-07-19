import React from "react"

type ImageUploadProps = {
  selectedImage: File | null;
  setSelectedImage: (image: File) => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, setSelectedImage, label }) => {

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    } else {
      throw new Error("Bruh");
    }
  }

  const imageData = () => {
    if (selectedImage) {
      return (
        <p>Bild Typ: {selectedImage.type}</p>
      );
    }
  };

  return (
    <div>
      {/* <label htmlFor={label} className={"form-label"}>{label}</label> */}
      <input id={label} className={"form-control"} type="file" onChange={handleImageChange} />
      {imageData()}
    </div>
  );
}
