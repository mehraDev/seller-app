const getImageFileFromURL = async (imageUrl: string): Promise<File> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1); // Extract filename from URL

    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export default getImageFileFromURL;
