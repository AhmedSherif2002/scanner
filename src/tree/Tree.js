import Node from "./Node";
import program from "./program";

export default class Tree{
    head = null
    levels = []
    canvas;
    gap = 70;
    shift = this.gap
    height = 0;
    topMargin = 100;
    leftMargin = 250;
    canvasHeight = 0;
    canvasWidth = 0;
    degree = 70;
    windowWidth = 0;
    windowHeight = 0;

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

    traverseTree(node, level){
        // insert a new level array
        if(!this.levels[level]){
            this.levels[level] = [];
        }
        if(!this.levels[level+1]){
            this.levels[level+1] = [];
        }
        // assign level to the node
        node.level = level

        // console.log("node:", node.value, level);
        if(node === this.head){
            const x = this.leftMargin  // x = margin
            const y = this.topMargin // y = margin + 100*level
            this.drawNode(node, x, y);
        }
        
        const children = node.getChildren();
        for(let i = 0;i<children.length;i++){
            const child = children[i];
            child.level = level + 1
            // const x = node.coords.x;
            let x = node.coords.x + ((i === 0)?-1*this.gap * Math.tan(this.degree*Math.PI/180):(i === 1)?0:this.gap * Math.tan(this.degree*Math.PI/180));
            const y = this.topMargin + (this.rect.height+this.gap)*(level+1);
            if(!this.areCoordsValid(x, level+1))
                x = this.levels[level+1][this.levels[level+1].length-1].coords.x + this.rect.width + this.gap;
                
            this.drawNode(child, x, y);
            const line = node.connectChild(child);
            this.canvas.add(line);
            this.traverseTree(child, level + 1);
            // console.log("child",child)
            
        }
        if(node.hasSibling()){
            const sibling = node.getSibling();
            sibling.level = level
            const x = node.coords.x + this.rect.width + this.gap;
            const y = this.topMargin + (this.rect.height+this.gap)*level;
            // console.log("sibling", sibling)
            this.drawNode(sibling, x, y);
            this.traverseTree(sibling, level);
        }
    }

    areCoordsValid(x, level){
        if(this.levels[level].length === 0) return true
        const behindNode = this.levels[level][this.levels[level].length-1];
        // console.log("Behind node:",behindNode, this.levels[level], level, this.levels)
        if(behindNode.coords.x + this.rect.width >= x){
            return false;
        }
        return true;
    }

    drawNode(node, x, y){
        node.draw(this.canvas, x, y);
        // Add node to its level        
        this.levels[node.level].push(node);

        // check if canvas size wants to be extended
        // console.log("windowWidth", this.windowWidth)
        if(x + this.rect.width >= this.canvas.width){
            // console.log("truuuuuuuueeeeeee")
            this.canvas.setWidth(x + 150);
            this.canvasWidth = x + 150;
        }
        if(y + this.rect.height >= this.canvas.height){
            this.canvas.setHeight(y + 100);
        }
        if(x < 0){
            panCanvas(this.canvas, 100, 0)
        }
        // console.log("canavs width:", this.canvas.width)
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
            const y = this.topMargin + 120 * level
            node.draw(this.canvas, x, y);
        }
        this.traverseLevels(level - 1)
    }

    draw(canvas){
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.windowWidth = this.canvas.width;
        this.windowHeight = this.canvas.height
        this.traverseTree(this.head, 0);
    }
}

function panCanvas(canvas, deltaX, deltaY) {
    const transform = canvas.viewportTransform;
    transform[4] += deltaX; // Update x-axis offset
    transform[5] += deltaY; // Update y-axis offset
    canvas.requestRenderAll(); // Re-render the canvas
}
