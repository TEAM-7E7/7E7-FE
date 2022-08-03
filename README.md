# MarketClip

### 😎요즘은 짧은 영상이 대세! 쇼핑에도 영상을 보는 즐거움이 있는 마켓클립!

![2](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/43f6e5a4-a517-490f-aa9e-1cfe29e98a1b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220802%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220802T144954Z&X-Amz-Expires=86400&X-Amz-Signature=366e35ebd6363395b9c513cd6951aadc21487d52e3da41b85922b5336d36bac5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## 목차

### 1. 개요
### 2. 프로젝트 주요 기능 소개
### 3. 페이지별 기능 소개
- SignIn
- SignUP
- HomePage
- Product Registration Page
- DetailPage
- MyPage
- Chatting


##  개요
### ➀ MarketClip 이란?
- 유저들의 개성있는 영상 클립과 사진으로 보는 재미를 느끼며 쇼핑을하는 웹 서비스입니다
- 기존의 거래 플랫폼에 없는 흥미로운 shorts 영상과 다양한 UX적인 요소에 실시간 거래 서비스까지 제공합니다!

  <details>
  <summary><h5>이미지 미리보기</h5></summary>
  <div markdown="1">
    <p align="center"><img src="https://user-images.githubusercontent.com/55455103/182564438-00e3793b-6f80-49b0-ad5d-fa12c2ca608f.gif"/><p/>
  </div>
  </details>

### ➁ 👨‍👩‍👧‍👧 팀원 및 담당 기능
### ⚛️FrontEnd 

  <details>
    <summary>이덕희</summary>
    <div markdown="1">
      <hr/>
      <div>
        <h4>1. EsLint/Prettier 설정 및 coding conventions/rules 정의</h4>
        <ul>
          <li>https://www.notion.so/conventions-6c4b123eebf141cda6e3079e2d0df087</li>
        </ul>
      </div>
      <div>
        <h4>2. 프론트 페이지 HTTPS 배포 및 CI/CD 구축</h4>
        <ul>
          <li>CloudFront + Gihub Action + S3</li>
        </ul>
      </div>
      <div>
        <h4>3. 플랫폼 자체 로그인/회원가입 및 소셜 로그인 페이지 구현</h4>
        <ul>
          <li>yup+formik을 이용한 form의 state관리 및 validation 검증</li>
          <li>email이 인증될 때까지 꺼지지 않는 modal을 이용해 비정상적인 인증 요청 방지</li>
          <li>recoil persist를 이용해 local storage에 refresh token 저장/cookie에 access token 저장</li>
        </ul>
      </div>
      <div>
        <h4>4. axios interceptor 구현</h4>
        <ul>
          <li>api 요청을 가로채고 token을 넣어서 api 호출</li>
          <li>access token 만료 시 token 자동 갱신 후 api 호출</li>
        </ul>
      </div>
      <div>
        <h4>5. PrivateRoute/jwt 해독 util 클래스 구현</h4>
        <ul>
          <li>인증된 사용자만 통과할 수 있는 PrivateRoute 구현. 만약 사용자가 검증되지 않았다면 로그인 페이지로 redirect 시킨다.</li>
          <li>jwt의 expired date가 valid한지 검증하거나 payload에 있는 필요한 데이터를 사용하기 위한 jwt util 클래스.</li>
        </ul>
      </div>
      <div>
        <h4>6. 게시물 작성/수정 페이지 구현</h4>
        <ul>
          <li>yup+formik을 이용한 form의 state관리 및 validation 검증</li>
          <li>drag and drop을 구현해서 업로드할 비디오/이미지 순서 바꾸기</li>
          <li>drag and drop을 구현해서 업로드할 비디오/이미지 순서 바꾸기</li>
        </ul>
      </div>
      <div>
        <h4>7. 메인 페이지 구현 </h4>
        <ul>
          <li>scoll snap된 게시물의 동영상 자동 재생 → scroll event를 이용해 구현</li>
          <li>화면에 게시물이 하나만 보이도록 구현</li>
        </ul>
      </div>
      <div>
        <h4>8. 카테고리 즐겨찾기 구현</h4>
        <ul>
          <li>recoil-persist를 이용해 web storage에 카테고리 즐겨찾기를 저장.</li>
          <li>새로운 카테고리 추가/해제 시 useInfiniteQuery를 이용해서 구현한 infinite scroll에 쌓인 데이터를 refetching해서 카테고리가 적용된 최신 서버 상태 유지 </li>
        </ul>
      </div>
      <div>
        <h4>9. 게시물 상세보기 페이지 구현</h4>
        <ul>
          <li>이미지/비디오 carousel 구현 → 동영상일 경우 자동 재생</li>
          <li>저장하기 기능 구현 → react-query를 이용해 저장하기가 반영된 게시물의 최신 서버의 데이터를 즉시 refetching</li>
        </ul>
      </div>
      <div>
        <h4>10. 마이페이지 구현</h4>
        <ul>
          <li>판매/거래완료/구매목록/저장목록을 게시물의 상태에 따라 한 페이지에서 새로고침 없이 사용자와 연관된 모든 게시물을 볼 수 있는 페이지.</li>
          <li>상태에 해당하는 버튼 클릭 시 화면에 렌더링 될  상태만 변경하고 페이지는 리로드 시키지 않음.</li>
        </ul>
      </div>
      <div>
        <h4>11. 채팅 기능 및 거래 기능 구현</h4>
        <ul>
          <li>pub/sub 구조를 이용해 실시간 채팅 및 DB에 채팅 기록 저장</li>
          <li>전체/현재 채팅방 실시간 갱신 및 미 열람 채팅 수 확인</li>
          <li>채팅방 삭제 시 상대방에게 상대방이 나갔다는 알람 보여준 후 전체 채팅 화면으로 이동</li>
          <li>판매자가 거래요청 시 구매자에게 알람을 보여주고 거래 구매자에게 알람과 동시에 수락/취소 버튼이 보여짐</li>
          <li>구매자가 수락/취소 버튼을 클릭 시 구매자에게 알맞은 알람을 보여주고 거래가 완료된 게시물에는 더이상 채팅을 보낼 수 없게 구현.</li>
        </ul>
      </div>
      <div>
        <h4>12. react-helmet을 이용해 SEO 최적화</h4>
        <ul>
          <li>페이지별로 og tag 설정</li>
        </ul>
      </div>
      <div>
        <h4>13. 페이지 디자인 및 element 배치/공용 element 구현</h4>
        <ul>
          <li>전반적인 디자인 및 크로스브라우징 처리</li>
        </ul>
      </div>
    </div>
  </details>

