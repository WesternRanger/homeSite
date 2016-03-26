/**
 * Created by WesternRanger on 16/3/21.
 */
class DOM {
    constructor(name) {
        this.wrap = name;
        this.age = 11;
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
export default Exts;
//let wayou = new Exts($(".head-top"));
//wayou.getEvery();