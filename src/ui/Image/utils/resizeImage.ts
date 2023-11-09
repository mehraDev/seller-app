import pica from "pica";

// Helper function to create an Image from a File object
const createImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;

    const reader = new FileReader();
    reader.onload = (e) => (img.src = e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// This function will take a File object (image) and a target width.
// It will maintain the aspect ratio of the original image and output a WebP format File.
const resizeImage = async (imageFile: File, targetWidth: number, targetHeight: number): Promise<File> => {
  const img = await createImage(imageFile); // Await the creation of the Image object

  // Create a canvas element to resize the image
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // Use Pica to resize the image to the canvas
  await pica().resize(img, canvas, {
    unsharpAmount: 80,
    unsharpRadius: 0.6,
    unsharpThreshold: 2,
  });

  // Convert the canvas content to a WebP format Blob
  const blob = await pica().toBlob(canvas, "image/webp", 1);

  // Convert the Blob to a File
  const resizedImageFile = new File([blob], imageFile.name, {
    type: "image/webp",
    lastModified: Date.now(),
  });
  console.log("Resized image size:", resizedImageFile.size / 1024, "bytes");

  return resizedImageFile;
};

export default resizeImage;
