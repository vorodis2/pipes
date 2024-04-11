/***
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2.
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2.
contacts:
site: vorodis2
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557 
website: vorodis2.com
*/

export class MassivFun {
    constructor() {
        var self = this;
        this.type = "MassivFun";
        
        this.array=[]
        this.add= function (fun) {
           this.array.push(fun)
        }
        this.drag= function (fun) {
            if(this.array.length==0)return
            for (var i = 0; i < this.array.length; i++) {
                this.array[i]()
            }
            this.array.length=0
        }

    }
/*
	set realHeight(value) {

        if (value !== this._realHeight) {
            this._realHeight = value;
            this._updScrl();
            this.dragHTMLHole();
            return;
        }
        
	}
	get realHeight() { return this._realHeight; }*/

}
