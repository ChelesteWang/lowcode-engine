import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index";
import EditorPage from "./pages/editor";
import "./app.less";
import "@arco-design/web-react/dist/css/arco.css";
import "react-device-frameset/styles/marvel-devices.min.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<IndexPage />} />
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>,
  document.getElementById("root")
);
