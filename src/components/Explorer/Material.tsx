import { Card, Empty, Input, Link, Modal } from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import axios from "axios";
import React, { useState } from "react";
import { ComManifestSchema } from "../../redux/codeTreeSlice";
import SourceItem from "./SourceItem";

interface Props {
  comManifests: ComManifestSchema[];
  onEndDrag: Function;
  addComManifest: Function;
}

const Material = ({ comManifests, onEndDrag, addComManifest }: Props) => {
  const [manifestUrl, setManifestUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const loadComManifest = async (url: string) => {
    const manifest = await axios.get(url).then((res) => res.data);
  };

  return (
    <>
      <Card
        bordered={false}
        title={"组件库"}
        extra={[<Link onClick={() => setModalVisible(true)}>添加组件库</Link>]}
      >
        {comManifests && comManifests.length > 0 ? (
          comManifests.map((manifest) => (
            <div>
              {manifest.components.map((item) => (
                <SourceItem item={item} onEndDrag={onEndDrag} />
              ))}
            </div>
          ))
        ) : (
          <Empty description="组件库为空" />
        )}
      </Card>

      <Modal
        title="所有组件库"
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
        autoFocus={true}
        focusLock={true}
      >
        <Input.Search
          style={{ width: 350 }}
          addBefore="http://"
          addAfter={<IconSearch />}
          searchButton={true}
          allowClear
          placeholder="输入组件库地址"
          defaultValue="127.0.0.1:8080"
          onChange={(value) => {
            setManifestUrl(value);
          }}
          onPressEnter={async (e) => {
            const url = e.target.value || "127.0.0.1:8080";
            loadComManifest(url);
          }}
        />
      </Modal>
    </>
  );
};

export default Material;
