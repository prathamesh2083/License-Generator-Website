import React from 'react'

export default function certificate() {
  const printRef = React.useRef();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  return (
    <div>
      <div
        ref={printRef}
        style={{
          backgroundColor: "beige",
          width: "550px",
          height: "350px",
          padding: "40px",
          margin: "30px",
          textAlign: "center",
        }}
      >
        <h1>certificate</h1>
        <h3>prathamesh pandit</h3>
      </div>
      <button onClick={handleDownloadImage}>Download</button>
    </div>
  );
}
