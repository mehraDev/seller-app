import imageCompression from "browser-image-compression";

async function compressImage(file: File) {
  const compressionOptions = {
    maxSizeMB: 0.01,
    initialQuality: 0.9,
    outputType: "image/png",
  };

  const COMPRESSION_LIMIT = 5;
  let compressionCount = 0;

  try {
    console.log("Original file size:", (file.size / 1024).toFixed(2), "KB");

    let compressedFile = file;
    while (compressedFile.size > compressionOptions.maxSizeMB * 1024 * 1024 && compressionCount < COMPRESSION_LIMIT) {
      compressedFile = await imageCompression(compressedFile, compressionOptions);
      compressionCount++;

      console.log(`Size after compression #${compressionCount}:`, (compressedFile.size / 1024).toFixed(2), "KB");

      // Decrease the quality slightly for each subsequent compression
      compressionOptions.initialQuality *= 0.9;
      if (compressionOptions.initialQuality < 0.1) {
        compressionOptions.initialQuality = 0.1; // Set a floor to avoid excessive degradation
      }
    }

    if (compressedFile.size > compressionOptions.maxSizeMB * 1024 * 1024) {
      console.log(`After ${COMPRESSION_LIMIT} compressions, desired size not achieved.`);
    } else {
      console.log(`Desired size achieved after ${compressionCount} compressions.`);
    }

    return compressedFile;
  } catch (error) {
    console.error("Error during image compression:", error);
    return null;
  }
}

export default compressImage;
