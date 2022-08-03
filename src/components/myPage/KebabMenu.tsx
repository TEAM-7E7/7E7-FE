import { DeleteIcon, EditIcon, KebabIcon } from "../../assets/icons/FigmaIcons";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "../../styles/components/myPage/kebabmenu.scss";
import { useNavigate } from "react-router-dom";
import DeleteBoardModal from "../modals/DeleteBoardModal";

interface KebabMenu {
  board_id: number;
  board_title: string;
  board_status: string;
}

const KebabMenu = ({ board_id, board_title, board_status }: KebabMenu) => {
  // kebab button
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="item-kebab" onClick={handleClick}>
        <KebabIcon />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {board_status === "SALE" && (
          <MenuItem
            onClick={() => {
              navigate(`/edit-board/${board_id}`);
            }}
          >
            <div className="item-kebab-menu">
              <div className="menu-icon">
                <EditIcon />
              </div>
              <div className="menu-text">수정하기</div>
            </div>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <div className="item-kebab-menu">
            <div className="menu-icon">
              <DeleteIcon />
            </div>
            <div
              className="menu-text"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              삭제하기
            </div>
          </div>
        </MenuItem>
        <DeleteBoardModal
          board_id={board_id}
          board_title={board_title}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </Menu>
    </>
  );
};
export default KebabMenu;
