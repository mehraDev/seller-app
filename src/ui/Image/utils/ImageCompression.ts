import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB: number;
  initialQuality: number;
  outputType: string;
  maxCompressions?: number;
}

async function compressImage(file: File, options: CompressionOptions) {
  const { maxCompressions = 1, ...compressionLibOptions } = options;
  try {
    let compressedFile = file;
    let compressionCount = 0;
    console.log("Original file size:", (file.size / 1024).toFixed(2), "KB");

    while (compressedFile.size > compressionLibOptions.maxSizeMB * 1024 * 1024 && compressionCount < maxCompressions) {
      compressedFile = await imageCompression(compressedFile, compressionLibOptions);
      compressionCount++;

      console.log(`Size after compression #${compressionCount}:`, (compressedFile.size / 1024).toFixed(2), "KB");

      // Decrease the quality slightly for each subsequent compression
      compressionLibOptions.initialQuality *= 0.9;
      if (compressionLibOptions.initialQuality < 0.1) {
        compressionLibOptions.initialQuality = 0.1; // Set a floor to avoid excessive degradation
      }
    }

    // if (compressedFile.size > compressionOptions.maxSizeMB * 1024 * 1024) {
    //   console.log(`After ${compressionOptions.maxCompressions} compressions, desired size not achieved.`);
    // } else {
    //   console.log(`Desired size achieved after ${compressionCount} compressions.`);
    // }

    return compressedFile;
  } catch (error) {
    throw error;
  }
}

export default compressImage;
