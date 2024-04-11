
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

менюха с низу


*/

import { DWindowS, VuborMat, GaleriLitel } from '../Zapshsti.js';
import { DragWHXZ } from './DragWHXZ.js';
import { BatArr } from './BatArr.js';

//оброботка обьекта
export class NMObj  {
    constructor(par) {          
        this.type="NMObj";

        var self=this;
        this.par=par
        this._active=false;
        this.dCont=new DCont();
        this.mani=this.par.par.mani
        this.room=this.par.par.par.scane3d.room;

        this._width=200
        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup;
        this._sahMenu=this.par._sahMenu;
        this._vusot=this.par._vusot;

        this.panel = new DPanel(this.dCont,0,0);

        this.arrComp=[];
        this.up1Menu=undefined;

        window.nMObj=this
        
        setTimeout(function() {
           if(main.glaf.up1 == true){//Включена смена 55 up1
                self.up1Menu=new Up1Menu(self)

            } 
        }, 10);
        

        var ot=this.otstup;
        var xx=ot
        this.arrLine=[];

        var bColor=true//
        if(this.par.par.par.par.objectBase.three[1].array.length<=1)bColor=false


        for (var i = 0; i < 2; i++) {
            this.arrLine[i]=new DPanel(this.dCont);
            /*this.arrLine[i]=new DImage(this.dCont,0, this.otstup,"resources/image/x13.png",function(){
                this.width=this.picWidth; // реальные размеры картинки
                this.height=this.picHeight;
            });*/
        }


        if(bColor==true){
            this.vuborMat = new VuborMat(this,0,0,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[2].id+"/yoriginal.png",[]/*this.par.par.par.par.objectBase.three[1]*/,function(){
                
                trace("!@@@@",self.object.idCT,this.index,this.arrObj.array[this.index].id )
                self.room[self.object.idCT] = this.arrObj.array[this.index].id;//для всех
            
            });            
            this.vuborMat.index = this.par.par.par.par.objectBase.three[1].array.length-1; 
            this.vuborMat.galeri.linkPosle= "64.png"      
            this.arrComp.push(this.vuborMat)
        }else{
            this.arrLine[0].visible=false;
        }


        this.dragWHXZ=new DragWHXZ(this,0,0,function(){

        })

        this.butArAr=new ButArAr(this);


        this.batArr=new BatArr(this,0,this.otstup,function(t,s){  
            if(typeof s == "string") {
                self.par.par.mHelp.setHelp(s,"resources/image/mhelp.png",this.dCont,{x:24+this.xxx,y:-13});
            }            
            if(t=="saveMod"){//не можем поставить полку
                self.room.par.tudaSuda.saveMod();
            }
        })

        this.clear=function(){
            this.dragWHXZ.dCont.visible=false;
            this.arrLine[1].visible=false
        } 


        this.setManiO=function(o){            
            this.par.par.setManiO(o);
        }

        var xx
        this.object=undefined
        this.setObject=function(o){
            
            let b=false;
            if(this.object==undefined){
                b=true;
            }else{
                if(this.object.idArr!=o.idArr)b=true;
            }
            this.object=o;
            if(o)this.setManiO(o);


            
            this.clear();

            this.arrComp.length=0

            

            
            //cмена матерьялов
            let bvm=false;

            if(this.object.object && this.object.object.info && this.object.object.info.array && this.object.object.info.array.length>0)bvm=true;
           
            if(bvm==true){
                this.vuborMat.visible=true
                this.arrComp.push(this.vuborMat)
                this.arrLine[0].visible=true;
                this.arrComp.push(this.arrLine[0])
                trace("!@",this.object.object.info)
                this.vuborMat.setObj(this.object.object.info);
                            
                let p=-1;

                for (var i = 0; i < this.object.object.info.array.length; i++) {                
                    
                    if(this.object.object.info.array[i].id==this.object._idColor){
                        p=i
                        break
                    }
                }
                
                if(p!=-1)this.vuborMat.index=p

                xx=this.otstup+this._vusot*2+this._vusot*0.5     
            }else{
                this.vuborMat.visible=false
                xx=this._vusot/2;
                this.arrLine[0].visible=false;
            }

            //-----




            
            if(bColor==false) xx+=-113
            //let inwH=
            this.butArAr.setObject(o);
            
            
            if(this.object.type=="BDoor"||this.object.type=="BWindow"){
                this.dragWHXZ.setObject(this.object);
                this.dragWHXZ.dCont.visible=true;
                              
                this.arrLine[1].visible=true;
                this.arrComp.push(this.arrLine[1])
                
            }
           /**/


            this.batArr.setObject(o);
            //this.batArr.dCont.x=xx;
            //xx+= this.batArr.width;
            //this.width=xx+this.otstup;
      
            if(this.up1Menu!=undefined)this.up1Menu.setObject(o);/**/

            //--------------
            


            this.dragParam()
            this.sizeWidth()



        }


        this.setIdMatObject=function(s){            
            var p=-1; 
            trace("!@@@@@@@@@",s,this.vuborMat.arrObj) 
            if(bColor==false)return
            if(!this.vuborMat.arrObj)return 
            if(!this.vuborMat.arrObj.array)return    
            for (var i = 0; i < this.vuborMat.arrObj.array.length; i++) {               
                if(this.vuborMat.arrObj.array[i].id==s)p=i
            }
            this.vuborMat.index=p;
        }


        this.wPan=100
        this.sizeWidth=function(w){
            if(w)this.wPan=w;
            if(this.wPan>this.width){
                this.dCont.y=0;
                this.dCont.scale=1
                this.dCont.x=(this.wPan-this.width)/2
            }else{
                this.dCont.y=0;
                this.dCont.scale=this.wPan/this.width
                this.dCont.x=0
            }            
        }

        this.dragParam = function () { 
            
                this._vusot=localS.object.sParam.whL;    
                this.panel.height=this._vusot+localS.object.sParam.otstupL2*2;       
                this.panel.borderRadius = localS.object.sParam.borderRadius1;
                this.panel.color=localS.object.sParam.color1;

     

                

                this.panel.width = this.par.dragPAC(this.arrComp)
                this.width = this.panel.width;
                
            }



        var b
        this.keydown=function(e){           
            if(e.keyCode==46||e.keyCode==8){
                if(self._active==true){
                    b=false
                    if(document.activeElement.style!=undefined){
                        if(document.activeElement.style.height!=undefined){
                            
                            if(document.activeElement.style.height!=""){
                                b=true;
                            }
                        }
                    }
                    
                    if(b==false){
                        if(self.object!=undefined){
                            if(self.object.aa!=undefined){
                                for (var i = 0; i < self.object.aa.length; i++) {                                    
                                    if(self.object.aa[i]=="clear"){
                                        self.object.aaSob("clear") 
                                        return;  
                                    }
                                }
                            }
                        }
                    }
                }
            }                     
        }
        window.addEventListener( 'keydown', this.keydown );
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;           
            if(this._active==true){
                this.par.dCont.add(this.dCont)                
            }else{
                this.par.dCont.remove(this.dCont) 
                this.par.par.setManiO(null);              
            } 
        }
    }
    get active() { return  this._active;}


    set width(v) {
        if(this._width!=v){
            this._width = v;   
            this.panel.width=this._width;
            
        }
    }
    get width() { return  this._width;} 
}


export class ButArAr  {
    constructor(par) {   
        var self=this       
        this.type="ButArAr";
        this.par=par
        this._visible=false;
        this.ab
        this.ab1
        window.butArAr=this

        this.dCont=new DCont(this.par.dCont);
        this.dCWidth=new DCont(this.dCont);
        this.dCont.visible=false;
        this.object=undefined
       
        this._vusot=this.par._vusot;
        this.vuborW

        this.pmBoxDin=new PMBoxDin(this)

        this.init=function(){
            if(this.ab!=undefined)return
            this.ab=[];
                
            var a={array:[ ]};                
            for (var i = 0; i < this.object.wN.length; i++) {
                a.array.push("resources/image/boxw_"+this.object.wN[i]+".png")
            }
           
            this.vuborW = new VuborMat(this,0,0,"resources/image/boxw.png",a,function(){ 
                self.object.aaSob("indexW",this.index)                    
            });            
            this.vuborW.index = 0; 


            var a={array:[ ]};                
            for (var i = 0; i < this.object.hN.length; i++) {
                a.array.push("resources/image/boxh_"+this.object.hN[i]+".png")
            } 


            
            this.vuborH = new VuborMat(this,100,0,"resources/image/boxh.png",a,function(){
                self.object.aaSob("indexH",this.index)                    
            });            
            this.vuborH.index = 0;




            this.slider=new DSliderBig(this.dCWidth, 0,24, function(s){
        
                self.object.aaSob("sizeWidth",this.value)   
            },"width",4,300)
            this.slider.borderRadius=12
            this.slider.label.visible=false;
            this.slider.input.visible=false;
            this.slider.width=140
            this.slider.slider.height=12
            this.slider.slider.okrug=1

           

            this.input=new DInput(this.dCWidth,0,5,"height",function(){
                if(isNaN(this.value*0.1)==true){
                    this.value=Math.round(self.object.width*10);
                }
                let ww=this.value*0.1
                if(ww<self.object.minWidth)ww=self.object.minWidth
                if(ww>self.slider.max)ww=self.slider.max    
                self.object.aaSob("sizeWidth",ww)                   
            })                
            dcmParam.styleInput(this.input);
            this.label1=new DLabel(this.dCWidth,this.input.width+5,10,"mm",function(){

            })
            this.label1.width=30;
            this.label1.fontSize=20;
            this.label1.fontFamily="SFUIDisplay-Light";    

        }



        this.down=function(){
            self.object[this.name]=this.idArr
        }





        this.setObject=function(o){
            if(o.type=="BTBox"||o.type=="BTBoxDin"){}else{
                this.visible=false
                return false
            }

            

            this.object=o
            this.visible=true
            this.init();
            

            

            let sah=0;            

            if(this.object.static==false){
                let oo1=self.object.getMOWH(); 
                if(oo1!=null){                    
                    this.dCWidth.visible = true;  
                    this.slider.min=self.object.minWidth               
                    this.slider.max=Math.floor(oo1.w);
                                                  
                    this.slider.value=self.object.width;
                    this.input.text=self.object.width+"0"                
                    sah+=140;
                }else{
                    this.dCWidth.visible=false;
                }
                this.vuborW.visible=false; 

            }else{

                this.dCWidth.visible=false; 
                this.par.arrComp.push(this.vuborW)               
                this.vuborW.visible=true;
                this.vuborW.index = self.object.indexW; 
                sah+=this.vuborW.width+this.pmBoxDin.width;
            }
           


            let b2=false;
            if(this.object.indexH!=undefined){
                if(this.object.hN.length>1){
                    b2=true
                }
            }

            if(b2==true){
                this.vuborH.visible = true;
                this.vuborH.index = self.object.indexH;                
                this.par.arrComp.push(this.vuborH)
                sah+=this.vuborH.width;

            }else{
                this.vuborH.visible = false;                
            }
            this.pmBoxDin.setObj(this.object)
            return sah

        }
    }

    set visible(v) {
        if(this._visible!=v){
            this._visible = v;   
            this.dCont.visible=this._visible;            
        }
    }
    get visible() { return  this._visible;}   
}



export class Up1Menu  {
    constructor(par) {  
        var self=this       
        this.type="Up1Menu";
        this.object=undefined;
        this.par=par

        this.setObject=function(o){

            if(o.pppObj)
            if(o.pppObj.up1.active==true){
                if(this.object &&this.object.idArr==o.idArr)return
                this.object=o;  

                if(this.object.xz==null || this.object.xz1==null){

                }else{
                    return
                }
                
                              
                if(main.localStorage.object.up1==undefined){
                    main.localStorage.object.up1={}
                    main.localStorage.object.up1.sahTime=0
                }
                if(main.localStorage.object.up1.sahTime<=0)return


                main.localStorage.object.up1.sahTime--;
                main.localStorage.save();
                
           
                let ww=60//+10
                let xx=115+ww/2+(o.pppObj.up1.aaPosit-2)*ww// o.pppObj.up1.aaPosit*33



                self.par.par.par.mHelp.setHelp(
                    "Выберите нужный вариант установки корзины:\nна раму или на телескопические направляющие.",
                    "resources/image/mhelp.png",
                    this.par.dCont,
                    {x:xx,y:-3}
                );
               /* self.par.par.par.mHelp.setIframe(
                    main.glaf.up1Obj.link,
                    main.glaf.up1Obj.width,
                    main.glaf.up1Obj.height,
                    self.par.dCont,
                    {x:135-(main.glaf.up1Obj.width/2),y:-13-(main.glaf.up1Obj.height)}
                );*/


            }             
        }

    }
}
export class PMBoxDin  {
    constructor(par) {  
        var self=this       
        this.type="PMBoxDin";
        this.object=undefined;
        this.par=par;
        this._active=false
        this._vusot=this.par._vusot
        this.width=0
        this.dC=new DCont(this.par.dCont)
        //this.dC.x = 100
        //this.dC.y = -100
        this.dCont=undefined
        //this.panel
        this.vubor
        this.otstup=this.par.par.otstup
        
        this.init=function(o){
            if(this.dCont!=undefined)return
            this.dCont=new DCont()
           /* this.panel=new DPanel(this.dCont,0,80)
            this.panel.height=15;*/

           /* this.vubor = new VuborMat(this,0,0,"resources/image/boxw.png",["resources/image/boxw.png","resources/image/boxw.png"],function(){
                                    
            });            
            this.vubor.index = 0;*/ 
            
            
        }



        this.arrVub=[]
        this.getVubor=function(str, link, fun){          

            for (var i = 0; i < this.arrVub.length; i++) {
                if(this.arrVub[i].strName==str){
                    this.arrVub[i].visible=true;
                    return this.arrVub[i]
                }
            }
            var a={array:[]};
            if(fun==undefined)a.array.push("resources/image/picxz_1.png");

            let aa= str.split(",")               
            for (var i = 0; i < aa.length; i++) {
                a.array.push(aa[i])
            }
            let s="resources/image/picxz_0.png"
            if(link!=undefined)s=link
            let vub = new VuborMat(this,0,0,s,a,function(){
                self.aObj.index=this.index-1  
                self.par.par.setObject(self.par.par.object)                   
            }); 
            if(fun!=undefined)vub.fun=fun;

            vub.strName=str;
            this.arrVub.push(vub)
            return vub
            //this.vubor.index = 0; 
        } 
        this.b=undefined
        this.getButton=function(){
            if(this.b==undefined){
                this.b=new DCont(this.dCont);
                let bb=new DButton(this.b,0 ,0," ",function(){                    
                    //self.object.btBoxDinDoor.setActive(true)
                    self.object.btBoxDinDoor.aObj.bScal=false;
                    self.par.par.setObject(self.par.par.object)

                },"resources/image/picxz_2.png")
                
                this.b.but=bb

                bb=new DButton(this.b,0 ,0," ",function(){                    
                    //self.object.btBoxDinDoor.setActive(true)
                    self.object.btBoxDinDoor.aObj.bScal=true;
                    self.par.par.setObject(self.par.par.object)
                    
                },"resources/image/picxz_3.png")
                
                this.b.but1=bb

            }
            return this.b
        }



        this.setObj=function(o){
            this.width=0
            if(o && o.type&& o.type=="BTBoxDin"){

            }else{
                this.active=false
                return;
            }
            this.init();
            this.active=true
            this.object=o;
            this.korektObj() 
        }
        this.aObj;

        this.sobRushka=function(s,p){
            
            self.btBoxDinDoor.btRushka.index=this.index             
        }
        
        this.vubor
        this.korektObj=function(){

            for (var i = 0; i < this.arrVub.length; i++) {
                this.arrVub[i].visible=false
            }
          
            this.aObj=this.object.btBoxDinDoor.aObj;
            this.btBoxDinDoor=this.object.btBoxDinDoor;
            this.vubor=this.getVubor(this.aObj.strDoor)
            this.vubor.index=self.aObj.index+1
            this.vubor.visible = true;
            this.par.par.arrComp.push(this.vubor)
            
           
            if(this.b)this.b.visible=false

            if( this.aObj.index!=-1){ 
                if(this.aObj.kol==1){                    
                    this.getButton();
                    this.b.visible = true;  
                    this.b.but.visible=  this.aObj.bScal;
                    this.b.but1.visible=  !this.aObj.bScal; 
                    if(this.b.but.visible)this.par.par.arrComp.push(this.b.but)
                    if(this.b.but1.visible)this.par.par.arrComp.push(this.b.but1)    
                }
                this.vubor1=this.getVubor(this.btBoxDinDoor.btRushka.strDoor,"resources/image/picxz_4.png",this.sobRushka)
                this.vubor1.index=this.btBoxDinDoor.btRushka.index
                this.vubor1.visible = true;                
                this.par.par.arrComp.push(this.vubor1)

                
                


            } 
        }
    }
    set active(v) {
        if(this._active!=v){
            this._active = v;   
            if(v){
                this.dC.add(this.dCont)
            } else{
                this.dC.remove(this.dCont)
            }          
        }
    }
    get active() { return  this._active;} 
}



