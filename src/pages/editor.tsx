import React, { useState } from "react";
import {
  Affix,
  Avatar,
  Button,
  Dropdown,
  Layout,
  Link,
  Menu,
  ResizeBox,
  Space,
} from "@arco-design/web-react";
import { IconGithub, IconNotification } from "@arco-design/web-react/icon";
import { DeviceFrameset } from "react-device-frameset";
import {
  appendComLib,
  appendNode,
  moveNode,
  setFocusId,
} from "../redux/codeTreeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Inspector from "../components/Inspector";
import Canvas from "../components/Canvas";
import Diagram from "../components/Diagram";
import Test from "../components/Test";

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;

const menuItems = [
  {
    title: "大纲树",
    key: "0",
  },
  {
    title: "组件库",
    key: "1",
  },
  {
    title: "服务接口",
    key: "2",
  },
  {
    title: "保存历史",
    key: "3",
  },
];

const EditorPage = () => {
  const codeTreeState = useAppSelector((state) => state.codeTree);
  const dispatch = useAppDispatch();
  const [activeKey, setActiveKey] = useState("0");
  const [mode, setMode] = useState("edit");

  const onEndDrag = (hoverId: string, dragItem: any, entry: any) => {
    dispatch(appendNode({ hoverId, dragItem, entry }));
  };

  const onEndDrop = (dragItem: any, overItem: any, hoverPosition: string) => {
    dispatch(moveNode({ dragItem, overItem, hoverPosition }));
  };

  const addComLib = (id: string, manifest: any) => {
    dispatch(appendComLib({ id, manifest }));
  };

  const focusedNode = (id: string) => {
    dispatch(setFocusId({ foucsId: id }));
  };

  const setElements = () => {};

  const onConnect = (params: any) => {};

  const props = {
    text: null,
  };

  const changeText = () => {
    props.text = function (fn, ...args) {
      return fn(111, ...args);
    };
  };

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header className="header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {mode === "edit" ? (
              <Button type="text" onClick={() => setMode("runtime")}>
                调试
              </Button>
            ) : (
              <Button type="text" onClick={() => setMode("edit")}>
                编辑
              </Button>
            )}
            <Dropdown>
              <IconNotification style={{ fontSize: 20, margin: 8 }} />
            </Dropdown>
            <Dropdown
              droplist={
                <Menu>
                  <Menu.Item key="0">11</Menu.Item>
                </Menu>
              }
            >
              <Avatar
                style={{
                  backgroundColor: "#3370ff",
                  height: 32,
                  width: 32,
                  margin: "8px 16px 8px 8px",
                }}
              >
                <img
                  alt="avatar"
                  src="https://avatars.githubusercontent.com/u/38871019?v=4"
                />
              </Avatar>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider style={{ width: "128px" }}>
          <Menu>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} onClick={() => setActiveKey(item.key)}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Sider
          resizeDirections={["right"]}
          style={{ minWidth: 150, maxWidth: 500 }}
        >
          <Button
            onClick={() => {
              changeText();
            }}
          >
            Button
          </Button>
          <Test
            inputs={{
              ...props,
            }}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              overflow: "hidden",
              height: "100%",
            }}
          >
            <ResizeBox.Split
              direction="vertical"
              style={{ height: "100%" }}
              panes={[
                <div
                  style={{
                    overflow: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DeviceFrameset device="iPhone 8" color="black">
                    <Canvas
                      mode={mode}
                      codeTree={codeTreeState}
                      onEndDrop={onEndDrop}
                      onNodeFocused={focusedNode}
                    />
                  </DeviceFrameset>
                </div>,
                <div style={{ minHeight: "48px", height: "auto" }}>
                  <Diagram elements={codeTreeState.comDiagrams} />
                </div>,
              ]}
            ></ResizeBox.Split>
          </Content>
          <Sider>
            <Inspector />
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditorPage;
