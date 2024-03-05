import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../axios/auth";

const SignupPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeIdHandler = (e) => {
    setId(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onChangeNicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // 시도할 내용
      const { data } = await authApi.post("/register", {
        id,
        password,
        nickname,
      });

      // 성공 시
      if (data.success) {
        alert("회원가입에 성공하였습니다. 로그인 페이지로 이동할게요.");
        navigate("/login");
      }
    } catch (error) {
      // 오류가 났을 때

      // 실패 시 => 4~: 내 잘못 / 5~: 서버 잘못
      alert(error.response.data.message);
      console.log("Error", error);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <p>Signup page</p>

      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="id">id</label>
          <input type="text" id="id" value={id} onChange={onChangeIdHandler} />
        </div>
        <div>
          <label htmlFor="nickname">nickname</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNicknameHandler}
          />
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

        <button type="submit">Signup</button>
        <button
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인하러가기
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

export default SignupPage;
