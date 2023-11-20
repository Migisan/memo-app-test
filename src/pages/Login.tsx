import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [accessToken, setAccessToken] = useState<string>("");
  const [enableInput, setEnableInput] = useState<boolean>(true);
  const [enableLogin, setEnableLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeAccessToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(event.target.value);
    setEnableLogin(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        event.target.value
      )
    );
  };

  const login = async () => {
    setIsLoading(true);
    try {
      setEnableInput(false);
      setEnableLogin(false);
      // 認証検証のためのリクエスト
      await axios.get("https://challenge-server.tracks.run/memoapp/category", {
        headers: {
          "Content-Type": "application/json",
          "X-ACCESS-TOKEN": accessToken,
        },
      });
      setCookie("memo_app_test_token", accessToken);
      navigate("/");
    } catch (error) {
      alert("エラーが発生しました。");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <label htmlFor="access_token">Access Token</label>
      <input
        type="text"
        id="access_token"
        value={accessToken}
        onChange={onChangeAccessToken}
        disabled={!enableInput}
      />
      <button onClick={login} disabled={!enableLogin}>
        LOGIN
      </button>
      {isLoading && <div>ローティング中</div>}
    </>
  );
};

export default Login;
