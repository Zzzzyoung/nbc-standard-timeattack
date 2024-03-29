import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../axios/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeIdHandler = (e) => {
    setId(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // 로그인 시도
      const { data } = await authApi.post("/login?expiresIn=10m", {
        id,
        password,
      });

      const { accessToken, userId, nickname } = data;

      // localStorage에 토큰 저장
      if (!accessToken) {
        alert("토큰이 없습니다. 고객센터에 문의해주세요.");
        return;
      }

      if (data.success) {
        // 로그인 성공 시 안내 메시지
        alert("로그인에 성공하였습니다. 메인 페이지로 이동할게요.");

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("nickname", nickname);

        // 메인 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log("Error", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Login page</p>

      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="id">id</label>
          <input type="text" id="id" value={id} onChange={onChangeIdHandler} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePasswordHandler}
          />
        </div>

        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입하러가기
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
