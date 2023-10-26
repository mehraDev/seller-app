import { IProductFood } from "app/interfaces";

interface ICategoryTree {
  [category: string]: ICategoryTree;
}

export const createCategoryTree = (products: IProductFood[]): ICategoryTree => {
  const categoryTree: ICategoryTree = {};

  products.forEach((product) => {
    const categoryArr = product.category ? splitAndSanitizeCategory(product.category) : ["Others"];
    let currentLevel: ICategoryTree = categoryTree;

    categoryArr.forEach((category) => {
      if (!currentLevel[category]) {
        currentLevel[category] = {};
      }
      currentLevel = currentLevel[category];
    });
  });

  return categoryTree;
};

function splitAndSanitizeCategory(category: string): string[] {
  let categories = category.split("/");
  return categories.filter((cat) => cat.trim() !== "").map((cat) => cat.trim().toLowerCase());
}
