# MarketClip

### 😎요즘은 짧은 영상이 대세! 쇼핑에도 영상을 보는 즐거움이 있는 마켓클립!

![2](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/43f6e5a4-a517-490f-aa9e-1cfe29e98a1b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220802%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220802T144954Z&X-Amz-Expires=86400&X-Amz-Signature=366e35ebd6363395b9c513cd6951aadc21487d52e3da41b85922b5336d36bac5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

<hr/>

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

<hr/>

##  개요
### ➀ MarketClip 이란?
- 유저들의 개성있는 영상 클립과 사진으로 보는 재미를 느끼며 쇼핑을하는 웹 서비스입니다
- 기존의 거래 플랫폼에 없는 흥미로운 shorts 영상과 다양한 UX적인 요소에 실시간 거래 서비스까지 제공합니다!
![shorts5](https://user-images.githubusercontent.com/55455103/182669372-e21b2881-fe2b-4e59-8518-d8b969d15513.gif)


### ➁ 👨‍👩‍👧‍👧 팀원 및 담당 기능
- ### ⚛️FrontEnd 

  <details>
  <summary><h5>이덕희</h5></summary>
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
          <li>판매자가 거래요청 시 게시물의 상태가 거래중으로 변경되며 구매자에게 알람을 보여주고 구매자에게 알람과 메세지가 보여짐과 동시에 수락/취소 버튼이 보여짐</li>
          <li>구매자가 수락/취소 버튼을 클릭 시 구매자에게 알맞은 알람과 메세지 보여주고 거래가 완료된 게시물에는 더이상 채팅을 보낼 수 없게 구현.</li>
          <li>거래가 완료되면 게시물의 상태가 거래 완료로 바뀌고 구매자의 마이페이지에서 거래목록에서 게시물을 확인할 수 있고 판매자의 마이페이지에서 판매목록에서 게시물을 확인할 수 있다.</li>
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
    <hr/>
  </details>
  <details>
    <summary><h5>최경민</h5></summary>
    <div markdown="1">
      <hr/>
      <div>
        <h4>1. 기능 구현 계획 참여</h4>
        <ul>
          <li>컨벤션</li>
          <li>axios interceptor</li>
          <li>이미지/비디오 자동재생 carosel (scroll)</li>
          <li>element 구현</li>
        </ul>
      </div>
      <div>
        <h4>2. 내비게이션바</h4>
      </div>
      <div>
        <h4>3. 정보 수정</h4>
      </div>
      
      
    </div>
    <hr/>
  </details>

### 

### ➂ 🛠️ 기술적 의사결정
  #### ESLint
    → 사용자가 직접 정의한 것처럼 코드를 점검하며, 에러가 있으면 표시해준다. 문법 에러 뿐만 아니라 코딩 스타일까지 정할 수 있어서 마치 한 사람이 코드를 작성한 것처럼 보이게 하기 때문에 coding convention을 유지.
    → 코드와 coding convention을 점검해주는 툴은 여러가지가 있지만 ESLint가 다양한 플러그인을 사용할 수 있기 때문에 확장성이 높아서 사용.
  #### Prettier
    → code formatter의 역할을 담당하기 위해 사용.
    → ESLint처럼 코드 구현 방식이 아니라 줄 바꿈, 인덴트 간격, 공백, string에 따옴표를 하나 쓸 것인지 두 개 쓸 것인지 등 텍스트를 일관성있게 작성하도록 사용.
  #### TypeScript
    → TypeScript는 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있어서 사용. 
    → 명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있어서 의도치 않은 에러를 미리 감지할 수 있고 예측할 수 있어서 디버깅을 쉽게 할 수 있어서 사용.
    → API를 통해 response를 받거나 request를 보낼 때, 미리 지정한 interface와 같은 형식의 값을 사용해서 state에 API의 데이터를 안전하게 저장해서 사용함으로써 의도치 않은 error를 피함.
  #### Recoil
    → 기존에 사용되었던 Redux나 Mobx가 성능 자체에 문제가 있던 것이 아니라 오히려 Flux 패턴을 기반으로 안정적이지만 여러가지 문제가 존재했다
    → React 전용 라이브러리가 아니기에 React가 볼 때 Store가 외부의 어떤 것이며 동시성 모드를 구현하기에 호환성이 떨어지고 복잡한 보일러 플레이트가 존재해서 러닝커브가 높다.
    → Recoil은 React 전용 라이브러리여서 React 내부에 접근이 용이하다. 특히 동시성 모드, Suspense 등을 지원해서 UX 관점에서도 유리한 웹 어플리케이션을 만들 수 있다.
    → 러닝커브가 낮으며 전역 상태를 정의하고 설정하기가 쉽고 recoil에서 사용하는 훅들로 상태를 get/set하기 때문에 리액트 문법과도 매우 유사하며 custom hook으로 관리하기도 용이해서 사용.
  #### Recoil-Persist
    → web storage를 Recoil atom의 상태 저장소로 이용해서 로그인 후 jwt를 Recoil-persist를 이용해 저장하면 사용자가 새로고침을 해도 useEffect를 이용해 전역 상태에 jwt를 저장하는 별도의 로직 필요 없이 local storage를 저장소로 사용하는 전역 상태를 사용할 수 있어서 사용.
  #### React-Query 
    → client state와 server state중  server state를 관리하는 용도로 사용.
    → Redux와 같은 전역 상태 관리 라이브러리들이 클라이언트 상태 값에 대해서는 잘 작동하지만, 서버 상태에서는 그러지 않을 수 있다. 서버 데이터는 항상 최신 상태임을 보장하지 않기 때문이다. 
    →네트워크 통신은 최소한으로 줄이는게 좋은데, 복수의 컴포넌트에서 최신 데이터를 받아오기 위해 fetching을 여러번 수행하는 낭비가 발생할 수 있다.

    → useQuery hook을 이용해서 서버의 데이터를 가져오는 것에 대한 성공, 로딩, 에러 콜백 및 server state 관리를 쉽게 할 수 있다. 
    → 필요한 경우 최신의 server state를 유지하기 위해 useMutate 훅으로 query cache를 초기화해서 server state와 관련된 api를 자동으로 호출해서 항상 최신 server state를 유지할 수 있다.
  #### useInfiniteQuery
    → 만약 useState hook과 pagination을 이용해서 infinite scroll을 구현해서 서버에서 받아온 페이지를 차례로 쌓아나간다고 가정할 때, 만약 클라이언트가 어떤 페이지의 데이터를 변경(instagram의 좋아요 클릭 등)을 한다고 가정하면 최악의 경우 새로고침 후 기존에 불러왔던 페이지 수 만큼 API를 호출한 후 스크롤을 해당 페이지까지 이동시켜야 한다. (좋아요가 눌린 게시물은 최신 server state가 아니기 때문)
    → react-query의 useInfinteQuery를 사용하면 1에서 5페이지까지 데이터를 받아왔다고 가정했을 때, 만약 2페이지의 내용을 useMutate로 를 변경한 후 query cache를 초기화하면 새로고침 없이 2페이지의 내용이 변경된 최신의 1~5페이지 까지의 데이터를 즉시 서버에서 받아와서 화면에 바로 보여줄 수 있다.

    → 위와 같은 useInfiniteQuery의 강력한 기능 이외에도 메인 화면의 게시물 전체보기 화면에서 카테고리 및 정렬 기준 선택 시 useInfiniteQuery의 refetch 기능을 이용해서 카테고리나 정렬 기준이 변경되면 자동으로 변경된 카테고리와 정렬 기준이 반영된 api를 호출하는데 사용.
  #### react-intersection-observer
    → useInview 훅을 이용하여 페이지의 맨 마지막 데이터가 보이면 useInfiniteQuery를 이용해 다음 페이지에 해당하는 데이터를 가져오는 방식으로 infinite scroll을 구현하기 위해 사용.
    → scroll event listener를 직접 구현해서 사용하려 했지만 react-intersection-observer가 성능이 더 뛰어나서 사용.
  #### SockJS/StompJS
    → 프로젝트 내에 채팅 서비스는 stateful한 protocol인 webSocket을 이용한 pub/sub 구조로 이루어져 있어서 채팅중인 상대방이 취한 행동에 따라 다른 각각 다른 반응을 보여야 하므로 socketJs를 이용해 peer to peer 통신을 구축.
    →  pub/sub 구조로 실시간 채팅/읽지 않은 메시지 수/서비스가 사용되지 않는 동안 쌓인 메시지를 모두 볼 수 있는 기능 등을 구현.
  #### SCSS/media Query
    → 프로젝트 규모가 커지면 CSS는 불가피하게 가독성이 떨어지는 등 유지보수의 어려움을 주는 요소가 되므로 SCSS의 nesting 속성을 이용해서 코드의 재활용성을 올리고, 가독성을 올리는 등 CSS에서 보이던 단점을 보완하고, 개발의 효율을 올리기 위해 SCSS 사용.
    → 크로스 브라우징을 위해 적절한 분기에 html 태그의 font size를 조정하고 rem으로 반응형 웹 페이지 제작을 위해 사용.
  #### Yup/Formik
    → 회원가입/게시물 등록/ 게시물 수정 페이지에서 form의 state 관리 및 validation 검증을 위해 사용.
    → regex를 Yup에 이용해 적은 보일러 플레이트로 validation을 검증할 수 있고 formik에선 이를 이용해 손쉽게 Yup에 정의한 error message를 보여줄 수 있어 사용자에게 올바른 입력을 유도할 수 있고 react의 상태관리 처럼 쉽게 form의 state를 관리할 수 있어서 사용.
  #### CloudFront
    → SSL 인증서가 적용된 HTTPs 웹 페이지를 쉽게 배포할 수 있고 특정 유저가 요청시 Edge Location를 통해 웹 사이트에 컨텐츠가 딜리버리 되므로 퍼포먼스를 극대화 시켜줄 수 있어서 사용.
  #### Github Action
    → 코드의 형상 관리 및 workflow를 자동화해서 CI/CD 구축.
  #### react slick
    → 게시물 상세보기 페이지에서 이미지/비디오를 carousel로 보여주기 위해 사용.
    → 편리한 css 커스텀 및 기본으로 내장된 기능이 프로젝트에서 사용하기 충분하다 판단해서 사용.
  #### react-dnd-multi-backend
    → 게시물 등록/수정 페이지에서 drag and drop을 이용해 게시물에 올라갈 비디오/사진의 순서를 바꾸기 위해 사용. 
    → 프로젝트가 모바일과 웹 환경을 둘 다 고려해서 진행되므로 웹에서는 drag event, 모바일에선 touch event로 drag and drop을 쉽게 도입할 수 있고 따로 event listner를 해제하지 않아도 되는 편리함이 있어서 사용.

<hr/>

## 2. 프로젝트 주요 기능 
  ### ➀ 로그인/회원가입 
  - URL: /sign-in, /sign-up
  #### 1. 소셜 로그인 및 플랫폼 자체 회원가입 + 보안
  - 소셜 로그인은 카카오/구글의 로그인 api를 이용해서 구현.
    <details>
    <summary><h5>소셜로그인</h5></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/182719213-22d011f5-8bb5-45a9-b360-6f7174f7b185.gif"/>
    </div>
    </details>
  #### 2. 플랫폼 자체 회원가입/로그인
  - 플랫폼 자체 회원가입은 이메일 인증과 닉네임 중복체크를 진행해야 하며 formik과 yup으로 form의 validation 및 state를 관리함.
    <details>
    <summary><h5>회원가입 이메일 인증</h5></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/182720016-af4be124-5ea7-4013-9c83-643ea5b0a712.gif"/>
    </div>
    </details>
    <details>
    <summary><h5>닉네임 중복확인 및 form 유효성 검증</h5></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/182720339-ab1b3004-73d9-4351-b05c-cbb5777a9b5e.gif"/>
    </div>
    </details>
  #### 3. JWT(refresh + access) / Axios Interceptor / PrivateRoute 
  - 로그인 후 서버에서 받은 refresh token과 access token을 각각 cookie와 webstorage에 저장해서 csrf와 xss 공격에 대응.
  - axios interceptor를 구현해 api 요청을 가로채서 refresh token과 access token을 넣어주고 만약 access token이 만료되었다면 refresh token으로 access token을 재발급 받은 후 refresh token과 access token을 넣어서 원래 api 호출.
  - 만약 refresh token이 만료되었다면 로그인 페이지로 리다이렉트 시킨다.
  - Private Route를 구현해서 인증이 된 사용자만 접근할 수 있는 페이지를 구현한다. 만약 인증이 되지 않은 사용자가 접근 시 alert를 띄우고 접근을 막음.
     <details>
      <summary><h5>PrivateRoute</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182728855-de871baf-8313-4bc3-b298-c939ae6f30cb.gif"/>
      </div>
    </details>


  ### ➁ 게시물 등록 → drag and drop
  - URL: /add-board
  #### 1. 게시물 등록
  - yup + formik을 이용해 게시물 등록 form의 validation 검증 및 state 관리.
  - 게시물의 이미지/비디오 갯수는 최대 5개까지 허용(초과하면 valdation schema에서 에러 메시지를 보내줌)하고 동영상의 길이는 16초 이상이면 alert를 띄워주고 form의 state에 반영되지 않음.
  - drag and drop으로 서버에 올라갈 이미지/비디오의 순서를 바꿀 수 있고 맨 앞에 있는 이미지/비디오가 썸네일이 된다.
    <details>
      <summary><h5>게시물 등록 drag and drop</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182722073-05672738-8a51-4f03-bde2-187532fa5662.gif"/>
      </div>
    </details>
    <details>
      <summary><h5>게시물 등록</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182722363-123c7ae0-3127-4145-91fb-04c1558cd385.gif"/>
      </div>
    </details>
  ### ➂ 게시물 전체보기(홈 화면 → shots 영상 클립 / 카테고리,정렬 기준 선택) 
  - URL: /
  #### 1. shorts 영상 클립
  - scroll snap을 이용해 뷰포트에 한 게시물만 들어오도록 구현.
  - 뷰포트에서 게시물이 보일 맨 위,아래 y좌표를 계산하고 scroll event를 추가하여 scroll snap된 게시물의 가운데 좌표가 그 사이에 들어가면 동영상을 자동으로 재생시키도록 video 태그를 조작.
    <details>
      <summary><h5>뷰포트 y좌표 계산 예시</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182722838-6ecc2df5-7937-45ca-bf89-9dd7e90b1266.png"/>
      </div>
    </details>
  
  - 위의 구현을 기반으로 게시물의 썸네일이 동영상일 경우 youtube shorts처럼 자동 재생
    <details>
      <summary><h5>홈 화면 shots 영상 클립</h5></summary>
      <div markdown="1">
        <p align="center"><img src="https://user-images.githubusercontent.com/55455103/182723126-84ef1001-38d8-4ac9-affb-0c43f0fc4d9f.gif"/></p>
      </div>
    </details>
  
  #### 2. infinite scroll / 카테고리, 정렬 기준 선택
  - 무한스크롤은 리액트의 useState를 사용해서 페이지에 해당하는 데이터를 이어나가는 방식이 아닌 react-query의 useInfiniteQuery 훅을 이용해서 페이지의 마지막 게시물이 보이면 자동으로 다음 페이지를 fetching하는 방식을 이용.
  -  react query의 캐싱 기능을 이용해게시물 전체보기 화면에서 카테고리 및 정렬 기준 선택 시 useInfiniteQuery의 refetch 기능을 이용해서 카테고리나 정렬 기준이 변경되면 자동으로 변경된 카테고리와 정렬 기준이 반영된 api를 첫 페이지부터 호출하는데 사용.
  -  카테고리와, 정렬 기준은 recoil-persist를 이용해 전역 상태의 저장소를 로컬 스토리지로 사용해서 즐겨찾기 기능처럼 페이지를 새로고침하거나 종료해도 남아있다.
    <details>
      <summary><h5>inifinite scroll + 카테고리 선택</h5></summary>
      <div markdown="1">
        <img src="https://user-images.githubusercontent.com/55455103/182724905-197f514e-c3a7-4dbc-8231-0b5821abe234.gif"/>
      </div>
  
  ### ➃ 게시물 상세보기 (이미지,비디오 carousel / 저장하기 / 사용자별 메뉴)
  - URL: /board/:board_id
  - dynamic routing으로 board_id에 해당하는 게시물을 api 요청을 통해 가져온다.
  #### 1. 이미지,비디오 carousel
  - 사용자가 등록한 이미지,비디오는 carousel로 보여준다. 
  - 뷰포트에 보이는 동영상일 경우 shorts 클립 영상처럼 자동재생시킨다.
    <details>
      <summary><h5>이미지,비디오 carousel / shorts 클립 영상</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182731237-ee64bc11-397f-4cea-a1a2-8a6afc1ac1ab.gif"/>
      </div>
    </details>
  #### 2. 저장하기
  - 로그인한 사용자만 이용할 수 있는 메뉴
  - react-query의 useQuery 훅과 useMutation 훅을 이용해서 저장하기 버튼 클릭 시 즉시 query cache를 초기화해서 저장하기가 적용된 게시물을 서버에서 불러온 후 화면에 렌더링한다.
  - 저장하기가 눌린 게시물은 노란색 북마크 버튼이 생긴다!
    <details>
      <summary><h5>이미지,비디오 carousel / shorts 클립 영상</h5></summary>
      <div markdown="1">
      <img src="https://user-images.githubusercontent.com/55455103/182732367-dd231645-4379-458f-8408-7a450ac36de1.gif"/>
      </div>

    </details>
  
