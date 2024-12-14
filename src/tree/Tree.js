import Node from "./Node";
import program from "./program";

export default class Tree{
    head = null
    levels = []
    canvas;
    gap = 50;
    shift = this.gap
    height = 0;
    topMargin = 100;
    canvasHeight = 0;
    canvasWidth = 0;

    rect = {
        width: 100,
        height: 50,
    }

    oval = {
        rx: 50,
        ry: 25
    }

    constructor(head){
        this.head = head
    }

    getHead(){
        return this.head;
    }

    print(){
        this.traverse(this.head, 0);
        console.log(this.levels);
    }

    visitAll(){
        this.traverse(this.head, 0);
        console.log(this.levels);
        this.height = this.levels.length * 100;
    }

    traverse(node, level){
        if(!this.levels[level]){
            this.levels[level] = [];
            this.levels[level].push(node)
        } 
        else this.levels[level].push(node)
        console.log("node:", node.value, level);
        const children = node.getChildren();
        for(let child of children){
            this.traverse(child, level + 1);
        }
        if(node.hasSibling()){
            const sibling = node.getSibling();
            this.traverse(sibling, level);
        }
    }

    traverseLevels(level){
        if(level < 0) return;
        const size = this.levels[level].length;
        const width = 150; // full width needed per node (actual width + margin)
        const height = 100; // full height needed per node (actual height + margin)
        const required = size * width;
        const margin = (this.canvasWidth - required) / 2; // margin at which drawing will start
        for(let i=0;i<this.levels[level].length;i++){
            const node = this.levels[level][i];
            console.log(node)
            const x = margin + 150 * i;
            // const x = margin + 150 * i + (level % 2 === 0)?this.shift*(-1):this.shift;
            // const x = margin + 150 * i + ((level % 2 === 0)?this.shift*(-1):this.shift);
            const y = this.topMargin + 120 * level
            node.draw(this.canvas, x, y);
        }
        this.traverseLevels(level - 1)
    }

    draw(canvas){
        this.canvas = canvas
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.traverseLevels(this.levels.length-1);
        // console.log(this.levels)
        // const rect = new window.fabric.Rect({
        //     left: 100,
        //     top: 100,
        //     stroke: "green",
        //     fill: "white", 
        //     width: 100,
        //     height: 50,
        //     selectable: false,
        // })
        // canvas.add(rect);
    }
}

// const node = new Node("0");
// const node1 = new Node("1");
// const node2 = new Node("2");
// const node3 = new Node("3");
// const node4 = new Node("4");
// const node5 = new Node("5");
// const node6 = new Node("6");
// const node7 = new Node("7");
// const node8 = new Node("8");
// const node9 = new Node("9");
// const node10 = new Node("10");

// node1.addChild(node2);
// node.addChild(node1);
// node1.addChild(node3)
// node3.addChild(node5);
// node.addChild(node4);
// node4.addChild(node7);
// node4.addSibling(node6);
// node6.addSibling(node8);
// node6.addChild(node9);
// node9.addSibling(node10);

// export const tree = new Tree(node);

// tree.print();
