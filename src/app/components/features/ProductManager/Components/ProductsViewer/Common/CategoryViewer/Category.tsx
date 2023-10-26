import { IProductFood } from "app/interfaces";
import { useRef, useEffect } from "react";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";

import React from "react";
import ItemFoodCard from "../../../ProductsCard/Food";


interface ICategory {
  products: IProductFood[];
  subCategories: Record<string, ICategory>;
}

interface ICategoryList {
  isTopLevel?:boolean;
  onCategoryPosition: (category: string, position: number) => void;
  categoryName: string;
  category: ICategory;
  scrollContainer?: React.RefObject<HTMLDivElement>;
  expandedCategories: { [category: string]: boolean };
  onCategoryToggle: (category: string) => void;
}
const Category: React.FC<ICategoryList> = ({
  category,
  onCategoryPosition,
  categoryName,
  scrollContainer,
  expandedCategories,
  onCategoryToggle,
  isTopLevel = false,
}) => {
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const isExpanded = expandedCategories[categoryName];
  const theme = useTheme();

  useEffect(() => {
    const calculatePosition = () => {
      const categoryContainer = categoryContainerRef.current;
      const scrollContainerElement = scrollContainer
        ? scrollContainer.current
        : window;
      if (!categoryContainer || !scrollContainerElement) return;

      const categoryRect = categoryContainer.getBoundingClientRect();
      let elementTop = 0;

      if (scrollContainerElement instanceof HTMLElement) {
        const scrollRect = scrollContainerElement.getBoundingClientRect();
        elementTop =
          categoryRect.top - scrollRect.top + scrollContainerElement.scrollTop;
      } else {
        elementTop = categoryRect.top + window.pageYOffset;
      }

      onCategoryPosition(categoryName, elementTop);
    };
    calculatePosition();
  }, [categoryName, onCategoryPosition, expandedCategories, scrollContainer]);

  useEffect(() => {
    const handleResize = () => {
      const calculatePosition = () => {
        const categoryContainer = categoryContainerRef.current;
        const scrollContainerElement = scrollContainer
          ? scrollContainer.current
          : window;
        if (!categoryContainer || !scrollContainerElement) return;

        const categoryRect = categoryContainer.getBoundingClientRect();
        let elementTop = 0;

        if (scrollContainerElement instanceof HTMLElement) {
          const scrollRect = scrollContainerElement.getBoundingClientRect();
          elementTop =
            categoryRect.top -
            scrollRect.top +
            scrollContainerElement.scrollTop;
        } else {
          elementTop = categoryRect.top + window.pageYOffset;
        }

        onCategoryPosition(categoryName, elementTop);
      };
      calculatePosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [categoryName, onCategoryPosition, scrollContainer]);

  const categoryProducts = category.products
  if (!categoryProducts || categoryProducts.length === 0) {
    return null;
  }

  const categoryToggleHandler = () => {
    onCategoryToggle(categoryName);
  };

  const removeUnderscore = (name: string): string => {
    return name.replace(/_/g, " ");
  };
  const categoryNameFormatted = removeUnderscore(categoryName);
  return (
    <Col ref={categoryContainerRef}>
      <Row
        p="0.5rem"
        a="center"
        j="between"
        onClick={() => categoryToggleHandler()}
        style={{
          fontWeight: 600,
          fontFamily: "Raleway",
          background: theme.neutralColor.bgContainer,
          cursor: "pointer",
        }}
      >
        <Text tt="cap" c={isTopLevel ? theme.neutralColor.text : theme.neutralColor.textSecondary}>{categoryNameFormatted}</Text>
        <Icon
          name={IconName.DownArrow}
          color={isTopLevel ? theme.neutralColor.text : theme.neutralColor.textSecondary}
          style={{
            transform: `rotate(${isExpanded ? "180deg" : "0deg"})`,
            transformOrigin: "center",
            marginTop: `${isExpanded ? "4px" : "0"}`,
            marginBottom: `${isExpanded ? "0" : "4px"}`,
          }}
        />
      </Row>
      {isExpanded && (
        <>
        <Col p="0 0.5rem" >
          {categoryProducts.map((product, index) => (
            <Row
              key={index}
              br="0"
              p={'0.5rem'}
              style={{
                borderBottom:`1px dashed #c5c5c5`,
                background: theme.neutralColor.bgContainer,
              }}
            >
              <ItemFoodCard item={{ ...product }} key={product.id} />
            </Row>
          ))}
        </Col>
        {Object.entries(category.subCategories).map(([subCatName, subCategory], index) => (
          <Category
            key={index}
            categoryName={subCatName}
            category={subCategory}
            isTopLevel={false}
            onCategoryPosition={onCategoryPosition}
            scrollContainer={scrollContainer}
            expandedCategories={expandedCategories}
            onCategoryToggle={onCategoryToggle}
          />
        ))}
        </>
      )}
    </Col>
  );
};

export default React.memo(Category);
