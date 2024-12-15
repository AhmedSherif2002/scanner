import React, { useEffect, useRef } from "react";
import Node from "../tree/Node";
import { Link, useLocation } from "react-router-dom";
import Tree from "../tree/Tree";
import program from "../tree/program";
// import Node from '../tree/Node';

function TreePage() {
  const location = useLocation();
  const { output } = location.state || {};
  const canvasParentRef = useRef();

  if (Object.entries(output).length == 0) {
    return (
      <div className="">
        <Link
          className="text-green-700 font-semibold text-xl relative w-fit left-1/2 block mt-4 p-2 -translate-x-1/2 bg-slate-200 rounded-md"
          to={"/"}
        >
          Return Back
        </Link>
      </div>
    );
  }

  useEffect(() => {
    console.log(output);
    const head = program(output, { index: 0 });
    const tree = new Tree(head);
    console.log(tree);
    // tree.visitAll();

    const canvas = new window.fabric.Canvas("treeCanvas");
    const canvasParent = canvasParentRef.current;
    console.log(window.innerWidth);
    canvas.setWidth(canvasParent.offsetWidth - 100);
    canvas.setHeight(window.innerHeight - 500);
    tree.draw(canvas);
  }, [output]);

  return (
    <div className="bg-white w-full p-0 m-0">
      <h1 className="text-green-500 font-semibold text-xl text-center">
        Syntax Tree
      </h1>
      <div ref={canvasParentRef} className="w-full" id="canvas-container">
        <canvas id="treeCanvas" style={{}}></canvas>
      </div>
      <Link
        className="text-green-700 font-semibold text-xl relative w-fit left-1/2 block mt-4 p-2 -translate-x-1/2 bg-slate-200 rounded-md"
        to={"/"}
      >
        Scanner
      </Link>
    </div>
  );
}

export default TreePage;
