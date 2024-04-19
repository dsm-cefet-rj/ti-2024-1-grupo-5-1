export const imgToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


//  const { name, value, files } = e.target;
//  const file = files[0]
//  console.log(file)
//  const reader = new FileReader();
//  reader.onloadend = function () {
//      setImgPreview(reader.result);
//  };
//  reader.readAsDataURL(file);