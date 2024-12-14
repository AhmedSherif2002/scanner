import React, { useEffect, useRef } from 'react'
import Node from '../tree/Node'
import { Link, useLocation } from 'react-router-dom'
import Tree from '../tree/Tree';
import program from '../tree/program';
// import Node from '../tree/Node';

function TreePage() {
    const location = useLocation();
    const { output } = location.state || {}
    const canvasParentRef = useRef();

    useEffect(()=>{
        console.log(output);
        const head = program(output, { index: 0 });
        const tree = new Tree(head);
        console.log(tree);
        // tree.visitAll();

        const canvas = new window.fabric.Canvas("treeCanvas");
        const canvasParent = canvasParentRef.current;
        console.log(window.innerWidth)
        canvas.setWidth(canvasParent.offsetWidth-100);
        canvas.setHeight(window.innerHeight-100);
        // canvas.setWidth(4000);
        // canvas.setHeight(1000);
        // console.log(canvas.width)
        tree.draw(canvas);

    },[output])

    return (
        <div className='bg-white w-full h-full'>
            <Link className='text-green-700 font-semibold text-xl relative w-fit left-1/2 block mt-4 p-2 -translate-x-1/2 bg-slate-200 rounded-md' to={"/"}>Scanner</Link>
            <h1 className='text-green-500 font-semibold text-xl text-center'>Syntax Tree</h1>
        <div ref={canvasParentRef} className='w-full' id='canvas-container'>
            <canvas id='treeCanvas' style={{}}></canvas>
        </div>
    </div>
    )
}

export default TreePage
