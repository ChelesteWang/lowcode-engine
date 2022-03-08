import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ComNodeSchema } from '../../redux/codeTreeSlice';
import RemoteComponent from './RemoteComponent';

interface Props {
  node: ComNodeSchema;
  focusId: string;
  parentId: string;
  onEndDrop: Function;
  onNodeFocused: Function;
  children: any;
}

const DndComponent = ({
  node,
  focusId,
  parentId,
  onEndDrop,
  onNodeFocused,
  children,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  const [hoverPosition, setHoverPosition] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    // 用于描述拖动源的普调JS对象s
    item: () => ({ id: node.id, type: node.type, parentId }),
    // 收集功能，用来收集属性，返回一个JS对象，并且返回值会合并到你的组件属性中
    // monitor 里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const dropResult: any = monitor.getDropResult();
      console.log('dropResult', dropResult);
      if (dropResult.dragItem && dropResult.overItem) {
        const { dragItem, overItem } = dropResult;
        onEndDrop(dragItem, overItem);
      }
    },
    canDrag: () => {
      return node.id !== 'root';
    },
  });

  const [{ isOver }, drop] = useDrop({
    // 一个字符串，这个放置目标只会对指定类型的拖动源发生反应
    accept: 'ITEM',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: any, monitor) => {
      // 被拖动的卡片的索引
      const dragId = item.id,
        parentId = item.parentId;
      const dropId = node.id,
        dropParentId = parentId;
      if (dragId === dropId) return;
      if (!monitor.isOver({ shallow: true })) return;
      const { left, right, top, bottom } =
        ref.current?.getBoundingClientRect() as any;
      const halfOfHoverHeight = (bottom - top) / 2,
        halfOfHoverWidth = (right - left) / 2;
      const { x, y } = monitor.getClientOffset() as any; // event.clientY
      const hoverClientY = y - top,
        hoverClientX = x - left;
      console.log('hover', ref.current?.id, halfOfHoverHeight, hoverClientY);
      //  console.log("hover", ref.current?.id, halfOfHoverHeight, hoverClientY);
      if (hoverClientY > halfOfHoverHeight) {
        setHoverPosition('bottom');
      } else {
        setHoverPosition('top');
      }
      // if (node.props.layout && node.props.layout === "flex-column") {

      // } else {
      //   if (hoverClientX > halfOfHoverWidth) {
      //     setHoverPosition("right");
      //   } else {
      //     setHoverPosition("left");
      //   }
      // }
    },
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      console.log('drop', item, monitor, didDrop);
      if (didDrop) {
        return undefined;
      }

      const {
        id: dragId,
        type: dragType,
        parentId: dragParentId,
      } = item as any;
      const { id: overId, type: overType } = node as any,
        overParentId = parentId;

      if (dragId) {
        if (
          dragId === overId ||
          dragId === overParentId ||
          dragParentId === overId ||
          overParentId === undefined
        ) {
          return undefined;
        } else if (dragParentId === undefined) {
          return { id: overId };
        }

        const dragItem = { dragId, dragType, dragParentId };
        const overItem = { overId, overType, overParentId };

        onEndDrop(dragItem, overItem, hoverPosition);

        return {
          dragItem,
          overItem,
        };
      }
      return { id: overId };
    },
    canDrop: (item, monitor) => {
      return true;
    },
  });

  drag(drop(ref));

  return (
    <>
      {node.id === 'root' ? (
        React.createElement(node.type, {
          ...node.props,
          key: node.id,
          id: node.id,
          type: node.type,
          ref,
          children,
        })
      ) : (
        <div ref={ref as any} id={node.id}>
          <RemoteComponent
            library={(node as any).library}
            url={node.type}
            props={{ ...node.props }}
          >
            {children}
          </RemoteComponent>
        </div>
      )}
    </>
  );
};

export default DndComponent;
