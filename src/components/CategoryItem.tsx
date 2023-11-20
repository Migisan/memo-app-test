import Category from "../types/Category";

type Props = {
  category: Category;
  enableCategoryId: number | null;
  onChangeNew: (value: number | null) => void;
};

const CategoryItem = ({ category, enableCategoryId, onChangeNew }: Props) => {
  const onClickCategory = () => {
    onChangeNew(enableCategoryId === category.id ? null : category.id);
  };

  return (
    <>
      <div id={`category-${category.id}`} onClick={() => onClickCategory()}>
        {category.name}
        {category.textContent &&
          enableCategoryId === category.id &&
          category.textContent.map((title) => <div key={title}>{title}</div>)}
      </div>
    </>
  );
};

export default CategoryItem;
