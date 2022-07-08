import React, { useState } from "react";
import "../../src/styles/pages/mypage.scss";
import SaleList from "../../src/components/myPage/list/saleList/SaleList";
import BuyList from "../../src/components/myPage/list/buyList/BuyList";
import LikeList from "../../src/components/myPage/list/likeList/LikeList";
import { IconButton } from "../../src/elements/IconButton";
import { SalelistIcon } from "../../src/assets/icons/FigmaIcons";

const MyProfilePage = () => {
  const [category, setCategory] = useState("saleList");

  return (
    <div className="myProfile">
      <div className="myProfile-swapper">
        <h1>마이페이지</h1>
        <div className="myProfile-head">
          <div className="myProfile-head-user">
            <div className="user-img">
              <button className="iconbutton-large">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="160" height="160" rx="80" fill="#EFEFEF" />
                </svg>
                user
              </button>
            </div>
            <div className="user-info">
              <span className="user-nick">방배동 후라이팬</span>
              <span className="user-email">Email</span>
            </div>
          </div>
          <div className="myProfile-head-button">
            <button className="iconbutton-large iconbutton-icon-large iconbutton-filled">
              <svg width="50" height="48" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.6364 36.3669H10.0375L9.60329 36.7794L2.30713 43.7108V5.18454C2.30713 4.36964 2.64717 3.57154 3.27972 2.97062C3.91488 2.36721 4.79203 2.01562 5.72177 2.01562H45.0389C45.9687 2.01562 46.8458 2.36721 47.481 2.97062C48.1135 3.57154 48.4536 4.36964 48.4536 5.18454V33.198C48.4536 34.0129 48.1135 34.811 47.481 35.4119C46.8458 36.0153 45.9687 36.3669 45.0389 36.3669H10.6364Z"
                  stroke="black"
                  stroke-width="3"
                />
                <line
                  x1="11.6367"
                  y1="11.8027"
                  x2="39.1246"
                  y2="11.8027"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path d="M11.6367 19.1738H39.1246" stroke="black" stroke-width="2" stroke-linecap="round" />
                <path d="M11.8652 26.3164H26.6092" stroke="black" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
            <button className="iconbutton-large iconbutton-icon-large iconbutton-filled">
              <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30.1859 31.4286V32.0499L30.6253 32.4893L33.5678 35.4318C34.0663 35.9303 33.7164 36.7717 33.0089 36.7717H2.96781C2.29911 36.7717 1.92191 35.9416 2.43176 35.4318L5.37428 32.4893L5.81362 32.0499V31.4286V20.0235C5.81362 13.521 9.20825 8.42126 14.9241 7.06699L16.0782 6.79353V5.6074V4.0563C16.0782 2.99148 16.9349 2.13477 17.9998 2.13477C19.0646 2.13477 19.9213 2.99148 19.9213 4.0563V5.6074V6.79257L21.0743 7.06672C26.7694 8.42079 30.1859 13.5452 30.1859 20.0235V31.4286ZM20.6651 42.0527C20.1371 42.9823 19.137 43.6148 17.9998 43.6148C16.8495 43.6148 15.853 42.9836 15.3295 42.0527H20.6651Z"
                  stroke="#030303"
                  stroke-width="3"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr />
        <div className="myProfile-body">
          <div className="myProfile-category">
            <div className="category-list">
              <IconButton size="large" onClick={() => setCategory("saleList")} icon={<SalelistIcon />}>
                <div className="list-content">
                  <span>판매내역</span>
                  <p>건</p>
                </div>
              </IconButton>
              <button
                className="iconbutton-text iconbutton-filled"
                onClick={() => {
                  setCategory("buyList");
                }}
              >
                <svg width="81" height="102" viewBox="0 0 81 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6">
                    <path
                      d="M11.1707 41.0546C11.9062 36.1608 16.1108 32.541 21.0596 32.541H59.9404C64.8893 32.541 69.0938 36.1608 69.8293 41.0546L76.9504 88.4309C77.8593 94.4778 73.1764 99.9173 67.0615 99.9173H13.9385C7.82361 99.9173 3.14068 94.4778 4.04959 88.4309L11.1707 41.0546Z"
                      stroke="#2D2D2D"
                      stroke-width="4"
                    />
                    <path
                      d="M40.6294 81.1422C47.0294 81.1422 50.5294 77.4922 50.5294 73.0922C50.5294 67.9422 46.1794 66.3422 42.2294 64.8422C39.1794 63.6922 36.3794 62.7422 36.3794 60.1422C36.3794 58.0422 37.9794 56.2422 41.4294 56.2422C43.8294 56.2422 45.7294 57.2422 47.5794 58.6422L49.7794 55.6922C47.6794 54.0422 44.7294 52.6422 41.3794 52.6422C35.4794 52.6422 31.9794 56.0422 31.9794 60.3422C31.9794 64.9422 36.1294 66.7922 39.9294 68.1922C42.9294 69.3422 46.1294 70.5422 46.1294 73.3422C46.1294 75.6922 44.3794 77.5922 40.7794 77.5922C37.5294 77.5922 35.0794 76.2922 32.7294 74.3922L30.4794 77.3922C33.0794 79.5422 36.7794 81.1422 40.6294 81.1422Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M53.1484 33.75V19.3139C53.1484 12.5498 47.665 7.06641 40.9008 7.06641C34.1367 7.06641 28.6533 12.5498 28.6533 19.3139V33.75H21.6533V19.3139C21.6533 8.6838 30.2707 0.0664062 40.9008 0.0664062C51.531 0.0664062 60.1484 8.68382 60.1484 19.3139V33.75H53.1484Z"
                      fill="#2D2D2D"
                    />
                  </g>
                </svg>
                <div className="list-content">
                  <span>구매목록</span>
                  <p>건</p>
                </div>
              </button>
              <button className="iconbutton-text iconbutton-filled" onClick={() => setCategory("likeList")}>
                <svg width="95" height="103" viewBox="0 0 95 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.6">
                    <g clip-path="url(#clip0_191_3203)">
                      <path
                        d="M48.5526 74.9206L47.4998 74.4318L46.4471 74.9206L22.2915 86.1357V21.4416C22.2915 17.9131 24.9194 15.3652 27.7082 15.3652H67.2915C70.0803 15.3652 72.7082 17.9131 72.7082 21.4416V86.1357L48.5526 74.9206Z"
                        stroke="black"
                        stroke-width="5"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_191_3203">
                      <rect width="95" height="102.917" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="list-content">
                  <span>저장목록</span>
                  <p>건</p>
                </div>
              </button>
            </div>
          </div>
          {category === "saleList" && <SaleList />}
          {category === "buyList" && <BuyList />}
          {category === "likeList" && <LikeList />}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
