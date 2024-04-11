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



export class MBILink {
    constructor(par,fun) {  
      
        this.type="MBILink";
        var self=this;
        this.par=par;
        this.fun=fun; 
        this.param=par.param;
        this.otstup = this.param.otstup

        this._active=false

        this.dCont1=new DCont(this.par.dCont); 
        this.dCont=new DCont(); 
        this.dCont2=new DCont(this.dCont);


        this.panel=new DPanel(this.dCont2,0,0); 
        this.panel1=new DPanel(this.dCont2,this.otstup/2,this.otstup*1.5+this.param.fontSize); 
        this.panel1.color="#aaaaaa"

        this.label=new DLabel(this.dCont2,this.otstup,this.otstup,"")  
        this.label.width=666
        this.label.activMouse=false
        this.image=new DImage(this.dCont2,this.otstup,this.otstup*2+this.param.fontSize,null,function(){            
            self.dCont2.visible=true    
            self.image.width=   self.image.picWidth;
            self.image.height=   self.image.picHeight;
            self.panel1.width=   self.image.picWidth+self.otstup;
            self.panel1.height=   self.image.picHeight+self.otstup;

            self.panel.width=self.image.width+self.otstup*2;
            self.panel.height=self.image.height+self.otstup*3+self.param.fontSize;            
            var s=self.image.width+" x "+self.image.height+"    "+self.image.link;
            self.label.text=s;

            var ss=self.label.getTextWidth()+self.otstup*2
            if( self.panel.width<ss)self.panel.width=ss 
            self.active=true
        });




        this.inDCont
        this.inx
        this.iny
        this.inLink
        this.setLink=function(dCont, x, y, link){
            
            dCont.xyp.x=0
            dCont.xyp.y=0
            dCont.funXYP(dCont, dCont.xyp)
            this.dCont.x=dCont.xyp.x+ x; 
            this.dCont.y=dCont.xyp.y+ y; 

            trace("!!!!",dCont, x, y, link,dCont.xyp,this.param.fontSize)
            if(this.image.link==link){
                self.active=true
                return
            }
            this.dCont2.visible=false
            this.image.link=link;
        }




        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){
            if(_w!=undefined){
                w=_w
                h=_h
                s=_s
            }         
          
        }
    }


    set active(value) {
        if(this._active!=value){
            this._active= value;
            if(this._active==true){
                this.dCont1.add(this.dCont)
            }else{
                this.dCont1.remove(this.dCont)
            }
        }
    }    
    get active() { return  this._active;}   

}  
