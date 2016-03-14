/**
 * Created by WesternRanger on 16/2/4.
 */
//import "./point.js";
//console.log(square(5));

class DOM {
    constructor(name) {
        this.wrap = name;
    }
}
class Exts extends DOM {
    constructor(name) {
        super(name);
    }
    getEvery() {
        this.wrap.on("click",".head-box1",()=>{
            console.log("extend");
        })
    }
}
let wayou = new Exts($(".head-top"));
wayou.getEvery();