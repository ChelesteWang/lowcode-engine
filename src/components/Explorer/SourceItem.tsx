import React from 'react';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ComInfoSchema } from '../../redux/codeTreeSlice';

interface Props {
  item: ComInfoSchema;
  onEndDrag: Function;
}

const SourceItem = ({ item, onEndDrag }: Props) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: () => ({}),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult() as any;
      if (monitor.didDrop() && dropResult) {
        onEndDrag(dropResult.id, item);
      }
    },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      onDoubleClick={() => {
        onEndDrag('root', item);
      }}
    >
      {item.name}
    </div>
  );
};

export default SourceItem;
