import React from "react";
import { CodeTreeState, ComNodeSchema } from "../../redux/codeTreeSlice";
import Frame from "react-frame-component";
import DndFrame from "./DndFrame";
import DndComponent from "./DndComponent";

interface Props {
  mode?: string;
  codeTree: CodeTreeState;
  onEndDrop: Function;
  onNodeFocused: Function;
}

const Canvas = ({ mode, codeTree, onEndDrop, onNodeFocused }: Props) => {
  const renderTree = (node: ComNodeSchema, parentId: string): any => {
    return (
      <>
        <DndComponent
          key={node.id}
          node={node}
          onEndDrop={onEndDrop}
          parentId={parentId}
          focusId={codeTree.foucsId as string}
          onNodeFocused={onNodeFocused}
        >
          {node.children && Array.isArray(node.children)
            ? node.children.map((child) => renderTree(child, node.id))
            : node.children}
        </DndComponent>
      </>
    );
  };

  return (
    <>
      <Frame
        initialContent={`<!DOCTYPE html>
    <html style="width: 100%;height: 100%;">
    <head>
      <style>
        .frame-content {
          width:100%;
          height:100%
        }
      </style>
    </head>
    <body style="margin:0px;width:100%;height: 100%;">
    </body>
    </html>`}
        mountTarget="body"
        style={{ width: "100%", height: "100%", border: "0" }}
      >
        {mode === "edit" ? (
          <DndFrame>{renderTree(codeTree.root, "")}</DndFrame>
        ) : null}
      </Frame>
    </>
  );
};

export default Canvas;
