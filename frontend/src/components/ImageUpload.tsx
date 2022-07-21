import React from "react"

type ImageUploadProps = {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = React.memo(({ selectedImage, setSelectedImage, label }) => {

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    } else {
      throw new Error("Bruh");
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)

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
      <input id={label} className="form-control mb-3" type="file" onChange={handleImageChange} />
      {imageData()}
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="img-fluid" />}
      <button type="button" className="btn btn-sm btn-danger" onClick={handleRemoveImage}>Entfernen</button>
    </div>
  );
});
