import React from "react";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { isParentNode, traverse } from "../utils";

export interface ComNodeSchema {
  id: string;
  title: string;
  type: string | any;
  props: Record<string, any>;
  children: ComNodeSchema[];
}

export interface ComInfoSchema {
  id: string;
  name: string;
  editor: string;
  runtime: string;
  inputs: Record<string, any>[];
  outputs: Record<string, any>[];
}

export interface ComRefSchema {
  id: string;
  comInfo: ComInfoSchema;
}

export interface ComManifestSchema {
  name: string;
  namespace: string;
  uid: string;
  version: string;
  components: ComInfoSchema[]
}

export interface CodeTreeState {
  foucsId?: string;
  root: ComNodeSchema;
  comDiagrams: any[];
  comRef?: Record<string, ComInfoSchema> | any;
  comLib?: [];
  comManifests?: ComManifestSchema[];
}

const initialState: CodeTreeState = {
  foucsId: '',
  root: {
    id: 'root',
    type: 'div',
    title: '根节点',
    props: {
      style: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      },
      layout: 'flex-column'
    },
    children: [

    ],
  },
  comDiagrams: [
    {
      id: 'root',
      type: 'input',
      data: { label: '开始' },
      position: { x: 0, y: 50 },
      sourcePosition: 'right',
    },
    {
      id: nanoid(10),
      data: { label: 'JS计算' },
      position: { x: 200, y: 50 },
      sourcePosition: 'left',
      targetPosition: 'right',
    }
  ],
  comRef: {},
  comManifests: []
}

const codeTree = createSlice({
  name: 'codeTree',
  initialState,
  reducers: {
    appendNode: (state, action) => {
      const { hoverId, dragItem } = action.payload;
      const comLibId = dragItem.comLibId, comName = dragItem.name;
      let item = state.comManifests?.find(item => item.uid === comLibId)?.components.find(item => item.name === comName) as any;
      traverse(state.root, (sub) => {
        if (sub.id === hoverId) {
          sub.children.push({ ...item, props: { text: '112112' } })
          return false;
        }
        return true;
      });
    },
    moveNode: (state, action) => {
      const { dragItem, overItem, hoverPosition } = action.payload;

      const { dragId, dragType, dragParentId } = dragItem;
      const { overId, overType, overParentId } = overItem;

      let item: any;

      traverse(state.root, (sub) => {
        if (sub.id === dragParentId) {
          const dragIndex = sub.children.findIndex((item) => item.id === dragId);
          item = sub.children.splice(dragIndex, 1)[0];
          return false;
        }
        return true;
      });

      if (!isParentNode(overType)) {
        traverse(state.root, (sub) => {
          if (sub.id === overParentId) {
            const dragIndex = sub.children.findIndex((item) => item.id === dragId);
            if (hoverPosition === 'left' || hoverPosition === 'top') {
              if (dragIndex === 0) {
                sub.children.unshift(item);
              } else {
                sub.children.splice(dragIndex - 1, 0,)
              }
            } else {
              if (dragIndex === sub.children.length - 1) {
                sub.children.push(item);
              } else {
                sub.children.splice(dragIndex + 1, 0,)
              }
            }
            return false;
          }
          return true;
        });
      } else {
        traverse(state.root, (sub) => {
          if (sub.id === overId) {
            sub.children.push(item);
          }
          return true;
        })
      }
    },
    updateNode: (state, action) => {

    },
    removeNode: (state, action) => {

    },
    setFocusId: (state, action) => {
      const { foucsId } = action.payload;
      state.foucsId = foucsId;
    },
    appendComLib: (state, action) => {
      const { manifest } = action.payload;
      const index: number = state.comManifests?.findIndex((item) => item.uid === manifest.uid) as any;
      if (index === -1) {
        state.comManifests?.push(manifest);
      } else {
        state.comManifests?.splice(index, 0, manifest)
        state.comManifests?.splice(index, 1);
      }
    }
  }
});

export const { appendNode, moveNode, updateNode, removeNode, setFocusId, appendComLib } = codeTree.actions;

export default codeTree.reducer;
