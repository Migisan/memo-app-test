import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import Category from "../types/Category";
import CategoryItem from "../components/CategoryItem";
import { Button } from "../components/Button/Button";

const Home = () => {
  const [cookies] = useCookies();
  const [categories, setCategories] = useState<Category[]>([]);
  const [enableCategoryId, setEnableCategoryId] = useState<number | null>(null);

  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://challenge-server.tracks.run/memoapp/category",
        {
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": cookies.memo_app_test_token,
          },
        }
      );
      console.log(response);
      setCategories(response.data);
    } catch (error) {
      alert("エラーが発生しました。");
      console.log(error);
    }
  }, [cookies]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const openNewMemo = () => {};

  const addNewMemo = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://challenge-server.tracks.run/memoapp/memo",
        {
          category_id: enableCategoryId,
          title: "title",
          content: "content",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-ACCESS-TOKEN": cookies.memo_app_test_token,
          },
        }
      );
      console.log(response);
      setCategories([...categories, response.data]);
    } catch (error) {
      alert("エラーが発生しました。");
      console.log(error);
    }
  }, [cookies, enableCategoryId, categories]);

  return (
    <div className="home">
      <div className="list">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            enableCategoryId={enableCategoryId}
            onChangeNew={(categoryId: number | null) =>
              setEnableCategoryId(categoryId)
            }
          />
        ))}
        <Button
          id="new-memo"
          onClick={openNewMemo}
          disabled={!enableCategoryId}
        >
          NEW
        </Button>
      </div>
      <div className="form">
        <label htmlFor="memo-title">Title</label>
        <input type="text" id="memo-title" />
        <label htmlFor="memo-content">Content</label>
        <textarea id="memo-content" cols={30} rows={10}></textarea>
        <Button
          id="save-memo"
          onClick={addNewMemo}
          disabled={!enableCategoryId}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default Home;
