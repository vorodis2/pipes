/**
* Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
* Разработчик и владелец данного кода Сидоров Евгений vorodis2:
* The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
* Developer and owner of this code Sidorov Evgeniy vorodis2
* contacts:
* site: vorodis2
* mail: vorodis2@gmail.com
* skype: vorodis2
* phone: +380951026557
*/


//Подложка под Локол Хорон
export class Languages  {
  	constructor(array) {  		
  		this.type="Languages";
  		var self=this;

        
        this.a=array;

        this._key=array[0].key;

        this.array=[];
        this.arrayC=[];

        this.setCompObj=function(comp, obj, type, fun) {
            this.array.push(new DBLeng(comp, obj, type, fun));
            this.dragDB(this.array[this.array.length-1])
        }

        this.dragDB=function(db){
            db.setKey(this._key)
        }


        this.setClass=function(clS){
            this.arrayC.push(clS);            
            clS.languages=this._key
        }

        this.arrayFun=[];


        this.bd=null
        this.bdObj=null
        this.setDinBD=function(bd){
            
            this.bd=bd
            this.bdObj={}
            for (var s in this.bd) {
                this.bdObj[s]={}
                for (var i = 0; i < this.bd[s].length; i++) {
                    this.bdObj[s][this.bd[s][i].id]=this.bd[s][i]  
                
                }
            } 
            trace("~~",bd,this.bdObj)
        }

        this.getKey=function(key, id){
            let s="null"
            if(this.bdObj && this.bdObj[key] && this.bdObj[key][id]&& this.bdObj[key][id][this._key]){
                s=this.bdObj[key][id][this._key]
            }
            return s
        }


        this.keyIp="null_"+Math.random()
        this.getMabbiKey=function(fun){
            let key=this.a[0].key;
            let tB=true
            $.getJSON('https://ipinfo.io', function(data){
                if(tB==false)return
                tB=false;
                if(data){
                    let s=data.country.toLowerCase();

                    for (var i = 0; i < self.a.length; i++) {
                        if(self.a[i].array){
                            for (var j = 0; j < self.a[i].array.length; j++) {
                                if(self.a[i].array[j]==s){
                                    key=self.a[i].key
                                }
                            }
                        }
                    }
                    self.keyIp =data.country+"_"+data.city+"_"+data.ip;
                }
                trace(">>>>",data)
                             
                fun(key);
            });
            setTimeout(function() {
                if(tB==false)return
                tB=false;                
                fun(key);    
            }, 500);
            //return key
        }
    }

    set key(value) {
        if(this._key!=value){
            this._key= value;   
            for (var i = 0; i < this.array.length; i++) {
                this.dragDB(this.array[i])
            } 

            for (var i = 0; i < this.arrayC.length; i++) {
                this.array[i].languages=this._key;
            }

            for (var i = 0; i < this.arrayFun.length; i++) {
                this.arrayFun[i](this._key);
            }
        }   
    }    
    get key() { return  this._key;}

}



export class DBLeng  {
    constructor(comp, obj, type, fun) {        
        this.type="DBLeng";
        var self=this;
        this.comp=comp;
        this.obj=obj;
        this.type="text";
        this.fun = fun
        if(type!=undefined) this.type=type

        var s=""
        this.setKey=function(key){
            s="null";
            if(obj)if(obj[key])s=obj[key];
            if(self.type)comp[self.type]=s
            if(self.fun)self.fun(key)
        }
    }

}



