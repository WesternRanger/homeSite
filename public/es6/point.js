/**
 * Created by WesternRanger on 16/3/13.
 */

class DOM {
    constructor(name) {
        this.wrap = name;
    }
}
export class Exts extends DOM {
    constructor(name) {
        super(name);
    }
    getEvery() {
        this.wrap.on("click",".head-box1",()=>{
            console.log("extend");
        })
    }
}
//let wayou = new Exts($(".head-top"));
//wayou.getEvery();
