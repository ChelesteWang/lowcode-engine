import React, { useEffect } from "react";
import { ComNodeSchema } from "../../redux/codeTreeSlice";
import RemoteComponent from "./RemoteComponent";

interface Props {
  root: ComNodeSchema;
}

const RuntimeComponent = ({ root }: Props) => {
  const renderChildren = (children: ComNodeSchema[]) => {
    return (
      <>
        {children && Array.isArray(children)
          ? children.map((item) => (
              <div>
                <RemoteComponent>{item.children}</RemoteComponent>
              </div>
            ))
          : children}
      </>
    );
  };

  useEffect(() => {}, []);

  return React.createElement(root.type, { ...root.props });
};

export default RuntimeComponent;
