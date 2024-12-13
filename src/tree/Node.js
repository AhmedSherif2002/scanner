export default class Node {
    children = []
    sibling = null
    value = null
    level = 0
    shape;
    constructor(value){
        this.value = value
        this.setShape(value)
    }

    setShape(value){
        if(value.includes("op(") || value.includes("id(") || value.includes("const(")){
            console.log(true)
            this.shape = "oval" 
        }else this.shape = "rect"
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

    addSibling(node){
        this.sibling = node;
    }

    getSibling(){
        return this.sibling;
    }

    hasSibling(){
        return this.sibling
    }
}