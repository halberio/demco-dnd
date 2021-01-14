import React, { useState, useRef, useEffect } from "react";
import { CardItem } from "./CardItem";

function DragNDrop({ data }: any) {
 const [list, setList] = useState(data);
 const [dragging, setDragging] = useState(false);

 useEffect(() => {
  setList(data);
 }, [setList, data]);

 const dragItem = useRef();
 const dragItemNode = useRef();

 const handletDragStart = (e: any, item: any) => {
  console.log("Starting to drag", item);

  dragItemNode.current = e.target;
  //@ts-ignore
  dragItemNode.current.addEventListener("dragend", handleDragEnd);
  dragItem.current = item;

  setTimeout(() => {
   setDragging(true);
  }, 0);
 };
 const handleDragEnter = (e: any, targetItem: any) => {
  console.log("Entering a drag target", targetItem);
  if (dragItemNode.current !== e.target) {
   console.log("Target is NOT the same as dragged item");
   setList((oldList: any) => {
    let newList = JSON.parse(JSON.stringify(oldList));
    newList[targetItem.grpI].items.splice(
     targetItem.itemI,
     0,
     //@ts-ignore
     newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0]
    );
    dragItem.current = targetItem;
    return newList;
   });
  }
 };

 const handleDragEnd = (e: any) => {
  setDragging(false);
  //@ts-ignore
  dragItem.current = null;
  //@ts-ignore
  dragItemNode.current.removeEventListener("dragend", handleDragEnd);
  //@ts-ignore
  dragItemNode.current = null;
 };

 const getStyles = (item: any) => {
  if (
   //@ts-ignore
   dragItem.current.grpI === item.grpI &&
   //@ts-ignore
   dragItem.current.itemI === item.itemI
  ) {
   return "dnd-item current";
  }
  return "dnd-item";
 };

 if (list) {
  return (
   <div className="drag-n-drop">
    {list.map((grp: any, grpI: any) => (
     <div
      key={grp.title}
      //@ts-ignore
      onDragEnter={
       dragging && !grp.items.length
        ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
        : null
      }
      className="dnd-group"
     >
      {grp.items.map((item: any, itemI: any) => (
       <div
        draggable
        key={item}
        onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
        //@ts-ignore
        onDragEnter={
         dragging
          ? (e) => {
             handleDragEnter(e, { grpI, itemI });
            }
          : null
        }
        className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
       >
        {item}
        <CardItem
         nbfolders={[1]}
         folderIcon={<div />}
         emptyFolder={<div />}
         navigateFolder={() => console.log("navigateFolder")}
         mutipleFolders={<div />}
         folder={<div />}
         selected={false}
         placeholder={"placeholder txt"}
        />
       </div>
      ))}
     </div>
    ))}
   </div>
  );
 } else {
  return null;
 }
}

export default DragNDrop;
