import { Card, Empty, Tree } from "@arco-design/web-react";
import React from "react";
import { ComNodeSchema } from "../../redux/codeTreeSlice";

interface Props {
  treeData: ComNodeSchema[];
}

const Outline = ({ treeData }: Props) => {
  return (
    <>
      <Card title="大纲树" bordered={false}>
        {treeData && treeData.length > 0 ? (
          <Tree
            draggable
            blockNode
            treeData={treeData}
            fieldNames={{
              key: "id",
              title: "title",
              children: "children",
            }}
          />
        ) : (
          <Empty description="大纲树为空" />
        )}
      </Card>
    </>
  );
};

export default Outline;
