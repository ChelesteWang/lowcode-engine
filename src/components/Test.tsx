import React from "react";
import { useEffect, useState } from "react";

const Test = ({ inputs }: any) => {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("useEffect", inputs);
    inputs.text &&
      inputs.text((val) => {
        console.log("val", val);
        setText(() => val);
      });
  });

  return <div>hello{text}</div>;
};

export default Test;
