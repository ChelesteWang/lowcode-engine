import { useContext, useEffect } from 'react';
import { DndContext } from 'react-dnd';
import { FrameContext } from 'react-frame-component';

interface Props {
  children: any;
}

const DndFrame = ({ children }: Props) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    (dragDropManager?.getBackend() as any).addEventListeners(window);
  }, []);

  return children;
};

export default DndFrame;
