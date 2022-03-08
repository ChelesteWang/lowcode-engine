import React from "react";
import {
  Avatar,
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
import Explorer from "../components/Explorer";
import Diagram from "../components/Diagram";

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;

const EditorPage = () => {
  const codeTreeState = useAppSelector((state) => state.codeTree);
  const dispatch = useAppDispatch();

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

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Header className="header">
        <Space>
          <Dropdown>
            <svg
              width="20"
              height="20"
              style={{ margin: "16px" }}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.5 5L5 5L5 2.5L2.5 2.5L2.5 5ZM5 11.25L2.5 11.25L2.5 8.75L5 8.75L5 11.25ZM17.5 11.25L15 11.25L15 8.75L17.5 8.75L17.5 11.25ZM8.75 11.25L11.25 11.25L11.25 8.75L8.75 8.75L8.75 11.25ZM5 17.5L2.5 17.5L2.5 15L5 15L5 17.5ZM15 17.5L17.5 17.5L17.5 15L15 15L15 17.5ZM11.25 17.5L8.75 17.5L8.75 15L11.25 15L11.25 17.5ZM17.5 5L15 5L15 2.5L17.5 2.5L17.5 5ZM8.75 5L11.25 5L11.25 2.5L8.75 2.5L8.75 5Z"
                fill="currentColor"
              ></path>
            </svg>
          </Dropdown>
        </Space>
        <Space>
          <Link>
            <IconGithub style={{ fontSize: 20, margin: 8 }} />
          </Link>
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
              style={{ backgroundColor: "#3370ff", margin: "8px 16px 8px 8px" }}
            >
              <img
                alt="avatar"
                src="https://avatars.githubusercontent.com/u/38871019?v=4"
              />
            </Avatar>
          </Dropdown>
        </Space>
      </Header>
      <Layout>
        <Sider style={{ width: "128px" }}>
          <Menu>
            <Menu.Item key="0">设计器</Menu.Item>
            <Menu.Item key="1">服务接口</Menu.Item>
            <Menu.Item key="2">保存历史</Menu.Item>
          </Menu>
        </Sider>
        <Sider
          resizeDirections={["right"]}
          style={{ minWidth: 150, maxWidth: 500 }}
        >
          <Explorer
            treeData={codeTreeState.root.children}
            comManifests={codeTreeState.comManifests as any}
            addComManifest={addComLib}
            onEndDrag={onEndDrag}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              backgroundColor: "#F0F1F4",
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
