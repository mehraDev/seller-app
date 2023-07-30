import React from "react";
import { IViewerFood } from "../../interfaces/viewerInterface";
import { Grid } from "ui/basic";
import FoodItemCard from "./FoodItemCard";

const ViewerFood: React.FC<IViewerFood> = ({ products }) => {

  return (
    <Grid
      columns={2}
      mc={[0.5]}
      style={{ backgroundColor: "#f8f8f8" }}
    >
      {products.map((product) => (
        <FoodItemCard item={product} />
      ))}
    </Grid>
  );
};

export default ViewerFood;

