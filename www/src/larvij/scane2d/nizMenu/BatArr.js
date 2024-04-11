
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

менюха с низу


*/

import { DWindowS, VuborMat, GaleriLitel } from '../Zapshsti.js';



export class BatArr  {
    constructor(par,x,y,fun) {          
        this.type="BatArr";
        var self=this;
        this.par=par
        this.fun=fun;   
        window.batArrGlobal=this
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        
        this.sizeFont=20
        this._vusot=this.par._vusot
        this.otstup=this.par.otstup
        this._width=100;
        this.array=[];

       

        this.clear=function(){
            this._width=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible = false;
            }
        }
        var b
        this.object=undefined
        this.setObject=function(o){
            this.object=o;
            this.clear()
            
            for (var i = 0; i < this.object.aa.length; i++) {  
                b=true
                if(this.object.aa[i]=="copy")b=false;
                if(this.object.aa[i]=="clear")b=false;
                if(this.object.aa[i]=="width")b=false;
                if(this.object.aa[i]=="height")b=false;

                if(this.object.aa[i].indexOf("mod_55_")!=-1){
              
                    if(this.object.xz==null && this.object.xz1==null){
                        b=false;
                    }
                    
                }
                
                if(b==true)this.plus(this.object.aa[i]);
            }
            for (var i = 0; i < this.object.aa.length; i++) {
                if(this.object.aa[i]=="clear"){
                    let b=this.plus("clear")
                    b.panel.color1='#ff5555';
                    b.color='#ff5555';
                    b.notDragColor=true 
                }               
            }
            if(this._width!=0)this._width-=this.otstup
        }

        this.xxx=0
        this.down=function(){
            var r = self.object.aaSob(this.name)  
            self.xxx= this.x         
            self.fun(this.name, r)

            if(typeof r =="object"){                                 
                self.par.par.par.mHelp.setHelp(r.text,"resources/image/mhelp.png",this.dCont,{x:24,y:-13});
            }
            self.fun("saveMod", false) 
        }

        this.plus=function(s){
            var p=-1;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].name==s){
                    p=i;
                    break;
                }
            }
            if(p==-1){
                var xp=new DButton(this.dCont,0,0," ",this.down,"resources/image/a_"+s+".png")
                xp.name=s;
                xp.borderRadius=111;
                xp.boolLine=false;
                xp.width=this._vusot; 
                xp.height=this._vusot;
                xp.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 
                p=this.array.length;
                this.array.push(xp);
            }            
            this.array[p].visible=true;
            this.array[p].x=this._width
            this._width+=this._vusot+this.otstup;
            this.par.arrComp.push(this.array[p])
            return this.array[p]
        }
    }

    set width(v) {
        if(this._width!=v){
            this._width = v;
        }
    }
    get width() { return  this._width;} 
}
