import React, { useState } from 'react';
import {
  Button,
  Card,
  Empty,
  Input,
  Link,
  Modal,
  Tree,
} from '@arco-design/web-react';
import { ComManifestSchema, ComNodeSchema } from '../../redux/codeTreeSlice';
import SourceItem from './SourceItem';
import axios from 'axios';
import { IconSearch } from '@arco-design/web-react/icon';

interface Props {
  treeData: ComNodeSchema[];
  comManifests: ComManifestSchema[];
  onEndDrag: Function;
  addComManifest: Function;
}

const Explorer = ({
  treeData,
  comManifests,
  onEndDrag,
  addComManifest,
}: Props) => {
  const [manifestUrl, setManifestUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const loadComManifest = async (url: string) => {
    const manifest = await axios.get(url).then((res) => res.data);
  };

  return (
    <>
      <Card
        bordered={false}
        title={'组件库'}
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
      <Card title="大纲树" bordered={false}>
        {treeData && treeData.length > 0 ? (
          <Tree
            draggable
            blockNode
            treeData={treeData}
            fieldNames={{
              key: 'id',
              title: 'title',
              children: 'children',
            }}
          />
        ) : (
          <Empty description="大纲树为空" />
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
            const url = e.target.value || '127.0.0.1:8080';
            loadComManifest(url);
          }}
        />
      </Modal>
    </>
  );
};

export default Explorer;
