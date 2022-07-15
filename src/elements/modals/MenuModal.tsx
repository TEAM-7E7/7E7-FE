import React, { FC, useEffect, useState } from "react";
import "../../styles/elements/modals/menuModal.scss";
import axios from "axios";

interface Props {
  show: boolean;
}

const MenuModal: FC<Props> = ({ show }) => {
  // show가 false면 화면에 메뉴를 나타내지 않는다.
  if (!show) {
    return null;
  }
  // show가 true면 아래 메뉴가 화면에 나타난다.
  return (
    <ul>
      <button>
        <li>삭제하기</li>
      </button>
      <button>
        <li>수정하기</li>
      </button>
    </ul>
  );
};

export default MenuModal;
