export default class Node {
    children = []
    sibling = null
    leftSibling = null
    value = null
    level = 0
    shape;
    coords = {}
    rect = {
        width: 100,
        height: 50,
    }

    oval = {
        rx: 50,
        ry: 25
    }

    constructor(value){
        this.value = value
        this.setShape(value)
    }

    setShape(value){
        if(value.includes("op(") || value.includes("id(") || value.includes("const(")){
            // console.log(true)
            this.shape = "oval" 
        }else this.shape = "rect"
    }

    setLevel(level){
        this.level = level
    }

    setCoords(x, y){
        this.coords = {x, y}
    }

    addChild(node){
        this.children.push(node)
    }

    getChildren(){
        return this.children;
    }

    hasChildren(){
        return this.children.length > 0
    }

    addSibling(sibling){
        this.sibling = sibling;
        sibling.addLeftSibling(this)
    }

    addLeftSibling(leftSibling){
        this.leftSibling = leftSibling
    }

    getSibling(){
        return this.sibling;
    }

    hasSibling(){
        return this.sibling
    }

    draw(canvas, x, y){
        this.setCoords(x, y);

        // Create the node and add it to the canvas
        const shape = this.createShape();
        canvas.add(shape)
        
        // Create text inside this node
        const text = new fabric.Text(`${this.value}`, {
            fontSize: 20,
            fill: 'black',
            selectable: false
        });

        // Center the text relative to the shape
        text.left = shape.left + shape.width / 2 - text.width / 2;
        text.top = shape.top + shape.height / 2 - text.height / 2;

        // Add the text to the canvas
        canvas.add(text);

        // Connect with sibling
        if(this.leftSibling){
            const line = this.connectSibling();
            // console.log(line)
            canvas.add(line)
        } 
    }

    createShape(){
        if(this.shape === "rect"){
            const props = {
                left : this.coords.x,
                top: this.coords.y,
                stroke: "green",
                fill: "transparent", 
                width: 100,
                height: 50,
                selectable: false,
            }
            return new window.fabric.Rect(props);
        }
        
        if(this.shape === "oval"){
            const props = {
                left : this.coords.x,
                top: this.coords.y,
                stroke: "green",
                fill: "transparent", 
                rx: 50,
                ry: 25,
                selectable: false,
            }
            return new window.fabric.Ellipse(props);
        }
    }

    connectChild(child){
        // Current node coords where line come out
        const x1 = this.coords.x + this.rect.width / 2;
        const y1 = this.coords.y + this.rect.height;

        // Child coords where line goes into
        const x2 = child.coords.x + this.rect.width / 2;
        const y2 = child.coords.y;

        return new window.fabric.Line([x1,y1,x2,y2], {
            stroke: "black",
            strokeWidth: 1,
            selectable: false
        })
    }

    connectSibling(){
        // left sibling coords where line comes out
        const x1 = this.leftSibling.coords.x + this.rect.width;
        const y1 = this.leftSibling.coords.y + this.rect.height / 2;
        
        // Current node coords where line goes into
        const x2 = this.coords.x;
        const y2 = this.coords.y + this.rect.height / 2;

        // return the line
        return new window.fabric.Line([x1,y1,x2,y2], {
            stroke: "black",
            strokeWidth: 1,
            selectable: false
        })
    }
}