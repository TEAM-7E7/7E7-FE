import { memo, useCallback } from "react";
import DndItem from "./DndItem";
import { BoardDto, FileDto } from "../../dto/AddBoardDto";
import "../../styles/components/addBoardDnd/dndcontainer.scss";

interface DndContainerDto {
  values: BoardDto;
  setValues: any;
}
// DND를 담는 컨테이너
const DndContainer = memo(({ values, setValues }: DndContainerDto) => {
  const findItem = useCallback(
    (id: string) => {
      const item = values.files.filter((item: FileDto) => `${item.preview_URL}` === id)[0];
      return {
        item,
        index: values.files.indexOf(item),
      };
    },
    [values],
  );
  const moveItem = useCallback(
    (id: string, atIndex: number) => {
      const { item, index } = findItem(id);
      const moved_files = [...values.files];
      moved_files.splice(index, 1);
      moved_files.splice(atIndex, 0, item);
      /*update(values.files, {
        $splice: [
          [index, 1],
          [atIndex, 0, item],
        ],
      }),*/
      setValues({
        ...values,
        files: moved_files,
      });
    },
    [findItem, values],
  );

  return (
    <div className="dndcontainer-wrapper">
      {values.files?.map((item: FileDto) => (
        <DndItem
          key={item.preview_URL}
          type={item.type}
          id={`${item.preview_URL}`}
          moveItem={moveItem}
          findItem={findItem}
        />
      ))}
    </div>
  );
});
export default DndContainer;
