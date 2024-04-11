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



//Замеры тайма, Функция под запаздание кучи функций SAVE
export class TimeInfo  {
  	constructor() {  		
  		this.type="TimeInfo";
  		var self=this;
        this.array=[]
        this.sah=-1

        //чистит
        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }


        this.getK=function(p,k){
            let s=p+"";
            for (var i = s.length; i < k; i++) {
                s+="_";
            }
            return s
        }

        //Выдает в консоль инфу
        this.dragConsole=function(){          
            for (var i = 0; i < this.sah+1; i++) {
                let mm=Math.round((this.array[i].time-this.array[0].time)*1000)/1000000
                let mm1=0;
                if(i!=0)mm1=Math.round((this.array[i].time-this.array[i-1].time)*1000)/1000000
                let ss=this.getK(mm,10)
                let ss1=this.getK(mm1,10)
                console.log(this.getK(i,3)+":"+ss+":"+ss1+":"+this.array[i].t+"::"+this.array[i].s+"::",this.array[i].p)
            }
            let mm1=Math.round((this.array[this.sah].time-this.array[0].time)*1000)/1000000
            console.warn("time::",mm1)
        }

        ///Принимет сообжение
        this.get=function(s,p,t){
            this.sah++;
            if(this.array[this.sah]==undefined){
                this.array[this.sah]=new THron()
                this.array[this.sah].idArr=this.sah
            }
            this.array[this.sah].set(s,p,t)
            return this.array[this.sah];
        }

        ///Финалит и выводит инфу
        this.stop=function(s,p){
            this.get(s,p,"stop")
            this.dragConsole()
            this.sah=-1
        }

        ///Начинает замеры тайма
        this.start=function(s,p){
            this.sah=-1
            this.get(s,p,"start")
        }

        //Дублирует get
        this.trace=function(s,p){
            this.get(s,p,"trace")
        }

    }
}

//Хранитель сообщений
export class THron  {
    constructor() {         
        this.type="TimeInfo";
        var self=this;
        this.idArr=-1
        this.s;
        this.p;
        this.time
        this.date
        this.set=function(s,p,t){
            this.t=t; 
            this.s=s;            
            this.p=p;
            this.date=new Date()
            this.time=this.date.getTime()            
        }
    }
}


///Save timeSave
export class TimeDrag  {
    constructor(fun) {         
        this.type="TimeDrag";
        var self=this;
        this.fun=fun;
        this.time=500;
        this.drag=function(){
            if(self.fun)self.fun()
        }

        this.sah=0;
        //Кидает фун и отработает через тайм если еще не прейдет
        this.timeDrag=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.drag()
            }, this.time);
        }        
    }
}

