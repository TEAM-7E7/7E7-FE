import "../../styles/pages/sign-in/signIn.scss";
const SignIn = () => {
  return (
    <div className="signIn-wrapper">
      <div className="signIn-header">
        <h1>로그인</h1>
        <div className="input-form">
          <input type="email" placeholder="이메일을 입력해주세요!" />
          <input type="password" placeholder="비밀번호를 입력해주세요!" />
          <button>로그인</button>
          <div className="signin-service">
            <div className="signin-password">
              <span>비밀번호를 잊어버리셨다면!</span>
              <a>비밀번호 찾기</a>
            </div>
            <div className="signin-join">
              <span>아직 마켓클립 회원이 아니시라면?</span>
              <a>가입하러 가기</a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="signin-social">
        <button>구글 계정으로 로그인하기</button>
        <button>네이버 계정으로 로그인하기</button>
        <button>카카오톡 계정으로 로그인하기 </button>
      </div>
    </div>
  );
};

export default SignIn;
