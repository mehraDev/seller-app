import heic2any from "heic2any";

async function convertHEICToWebp(heicFile: File): Promise<File> {
  try {
    const result = await heic2any({
      blob: heicFile,
      toType: "image/webp",
      quality: 1,
    });

    let webpBlob: Blob;
    if (Array.isArray(result)) {
      webpBlob = result[0];
    } else {
      webpBlob = result;
    }

    return new File([webpBlob], heicFile.name.replace(/\.[^/.]+$/, "") + ".webp", { type: "image/webp" });
  } catch (error) {
    console.error("Error converting HEIC to WebP:", error);
    throw error;
  }
}

export default convertHEICToWebp;
