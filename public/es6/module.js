/**
 * Created by WesternRanger on 16/4/14.
 */
class Employee{
    constructor(){
        this.id = '111';
        this.getAge();
    }
    getAge(){
        console.log(this.id);
    }
}

function fun_aa(){
    console.log('export fss success');
}
module.exports = {
    Employee,
    fun_aa
};