export const validateAspectRatio = async (imageSrc: string, aspectRatio: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      const isWithinBounds = Math.abs(imageAspectRatio - aspectRatio) < 0.01;
      resolve(isWithinBounds);
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = imageSrc;
  });
};

export default validateAspectRatio;
