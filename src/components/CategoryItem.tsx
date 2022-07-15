import "../styles/components/header.scss";
import { StarIcon } from "../assets/icons/FigmaIcons";
import { useState } from "react";

interface CategoryItemOptions {
  id: number;
  name: string;
  starred?: boolean;
}

const CategoryItem = ({ id, name, starred }: CategoryItemOptions) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="category">
      <p>{name}</p>
      <i className={`category-${starred ? "starred" : "not-starred"}`}>
        <StarIcon />
      </i>
    </div>
  );
};

export default CategoryItem;
