/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

Элнменнты на подвеске. Тоесть тот что тоскаеться.
*/


import { Blok } from './Blok.js';
import { TLabel } from '../../../../t3d/TStyle.js';

export class BPieceC2Object extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPieceC2Object";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        this.idCT="idMatObject3";//Тип общего цвета    
        this.matBas="materialBase3";//Тип общего цвета
        this._material=roomBig[this.matBas];
        this.boolDinColor = true;
  
        if(this._material==undefined){  
                   
            roomBig.idMatObject3 = o.info.array[0].id            
            this.setColorId(o.info.array[0].id)
        }
        
       
        var aS;
        var coliz
        var xx, yy, point,b




        this.SAH=3.2
        this.vusota=1.7
        
        this.arrayStoiki=[mO.bPC2Din, mO.bPC2Din1]

        this.typeSigm=0;      
        //if(this.objBase.json.obj && this.objBase.json.obj.type && this.objBase.json.obj.type.x)this.typeSigm=this.objBase.json.obj.type.x
        

        this.bPC2D=this.arrayStoiki[this.typeSigm]
        if(glafBig.debug){
            this.tLabel=new TLabel(self.content3d,-15,0,"="+self.idArr)
            this.tLabel.fontSize=4
        }

        this.notPolka=false

        this.funInitMod=function(){ 
            self.cont3dLoad.position.z=this.vusota;
        
            this.dragObjHA(self.boxHelper, this.rect);
            if(this.object.bool[0]==1)this.notPolka=true
            
        }

         this.dragObjNWD = function() {

            this.dragObjHA(self.boxHelper, this.rect);

            this.box.scale.set(this.rect[3], this.rect[5], this.rect[4] );

            this.box.position.z =this.vusota// (this.rect1[1] - this.rect1[5] / 2) //(2*this.prosZ)
            this.box.position.y =(-this.rect1[2] - this.rect1[5] / 2)



            this.box.position.z = this.rect[4] / (2 * this.prosZ);




            if (this.funDrag != undefined) this.funDrag();/**/
            this.fun("visi3d");
        }

        this.dragObjHA = function(bH, a) {
            
            /*//if (a[3] > 0 && a[4] > 0 && a[5] > 0) {
                bH.width = a[3];
                bH.position.x = a[0] + a[3] / 2;
                bH.height = a[4];
                bH.position.z = 0//a[1] + a[4] / 2;
                bH.depth = 55//a[5];
                bH.position.y = 111//-a[2] +this.vusota*13//- a[5] / 2;
           // }*/
        }

        this.testCreat=function(){  
            if(this.bPC2D==undefined){
                this.arrayStoiki=[mO.bPC2Din, mO.bPC2Din1]
                this.bPC2D=this.arrayStoiki[this.typeSigm]
                
            }
        }


        this.setXY=function(_x,_y){           
            aS=mO.par.sten;
            coliz=this.isNaColis(_x,_y,20);           
            xx=_x;
            yy=Math.round(_y/this.SAH)*this.SAH; 
            this.isY(yy)  
            this.testCreat()
            
            if(this.parent && coliz && coliz.parent && coliz.parent.type=="BPieceC2" && coliz.parent.typeSigm==this.typeSigm ){ //попали или на перекладине 
                if(this.parent.idRandom != coliz.parent.idRandom){                    
                    coliz.parent.add(this);
                }                
            }else{ 
                b=false;
                if(this.parent==undefined)b=true;

                if(!b && this.parent.idRandom!==self.bPC2D.idRandom)b=true;
                
                if(b){                    
                    mO.par.sten.add(self.bPC2D);
                    self.bPC2D.add(this);  
                }                              
            }

            if(this.parent && this.parent.type=="BPieceC2"){
                if(this.parent.idRandom==self.bPC2D.idRandom){
                    xx=0;
                    yy=0;
                    this.parent.setXY(_x,_y);
                }else{
                    point=this.parent.gsetBlok(_x,_y,this); 
                    xx=point.x;                
                    yy=point.y;
                    if(self.bPC2D.parent!=undefined){
                        mO.par.sten.remove(self.bPC2D);
                    }
                }                
            }



            this.boxColizi.position._x = xx;
            this.boxColizi.position.y = yy;
            this.content.position.x = xx;
            this.content.position.y =yy;
            if(this.parent!=undefined){                
                if(this.parent.collision)this.parent.collision.testRect(this.boxColizi);
                if(this.content.funRender!=undefined){
                    this.content.funRender();
                }
                if(this.parent.type="BPieceC2"){  
                                       
                    this.parent.corectPosit();
                } 
            }
        }

        this.isY=function(_y){  
            yy=Math.round(_y/this.SAH)*this.SAH; 
            
            let bool = false;
            if(this.parent!=undefined && this.parent.gsetBlok2){
                bool =!this.parent.gsetBlok2(yy-this.parent.y, this, true)
            }
           
            return bool
        }


       /* this.funInitMod=function(){ 
            this.dragColor()
        }*/



        this.outDrag=function(){            
            if(this.parent!=undefined){
                if(this.parent.idRandom==self.bPC2D.idRandom){
                    self.bPC2D.clear()
                }
                if(this.parent!=undefined){
                    this.parent.remove(this)
                }
            }
        }


       
        var abd, ab,aaar
        this.isNaColis = function(x,y,ot){  //ищем поподающию близлижайщею коробку
            
            ab=99999
            abd=-1
            for (var i = 0; i < aS.collision.arrRect.length; i++) {
                if(x>=aS.collision.arrRect[i].rectCollisMeshdy._x-ot && x<=aS.collision.arrRect[i].rectCollisMeshdy._x+aS.collision.arrRect[i].rectCollisMeshdy.width+ot){
                    aaar=Math.abs((aS.collision.arrRect[i].rectCollisMeshdy._x+aS.collision.arrRect[i].rectCollisMeshdy.width)-x);
                    
                    if(ab>aaar){
                        ab=aaar;
                        abd=i
                    }                                    
                }           
            }
            if(abd==-1)return null;            
            return aS.collision.arrRect[abd];
        }

        //обработка бабла
        var aaa,aa
        this.getPrice=function(intColor,idMat){           
            aaa=[];
           // menedsherMaterial.getAOO(this.objBase.json.modelArray, idMat, null, aaa);
          
            aa=null;
            if(this.bvColor==false)return aaa
        
            aa=menedsherMaterial.getArrOtObj(this.object,idMat)
            if(aa==null)return aaa
            
            aa[8]=this.object;
            aa[9]=this.object.id;
            aa[10]=1;
            aa[11]=aa[3]*1;
            aaa.push(aa)     
            
            /* 
            if(aa!=undefined){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[8]=this.object;
                ad[9]=this.object.id;
                ad[10]=1;
                ad[11]=aa[3]*1;
                aaa.push(ad);
            }            

            this.krai.getPrice(aaa, intColor, idMat);             
            if(this.hrenNiz.bool==true)this.hrenNiz.getPrice(aaa, intColor, idMat);              
            if(this.sahSuper.bool==true)this.sahSuper.getPrice(aaa, intColor, idMat);           
            if(this.pppObj.bool==true)this.pppObj.getPrice(aaa, intColor, idMat);  
           
            if(this.id==95||this.id==31){
                if(!po)po=mO.getIdObj(110);
                var strXZ="plus"
                if(intColor==1)strXZ="plus1" 
                aaaWW=menedsherMaterial.getArrOtObj(po.obj,idMat,intColor)    
                
                aaaWW[9]=po.obj.id;
                aaaWW[8]=po.obj;
                aaa.push(aaaWW)
            }
            */
            
            return aaa;   
        } 

        var blok
        this.stopDrag = function(){            
            if(this.parent!=undefined){
                this.testCreat()
                if(this.parent.idRandom==self.bPC2D.idRandom){
                    aS=mO.par.sten
                    var ooo = self.bPC2D.getObj();
                    self.bPC2D.clear();
                                
                    blok = mO.getBlok(self.bPC2D.object); 
                    blok.setObj(ooo);
                    aS.add(blok, false); 
                }else{
                    this.parent.zdvigCenter()

                }
                this.mO.dragPriceScane();
            }
        }


    }

    set parent(v) {
        if(this._parent!=v){
            let po=this._parent
            if(this.dragParentDo) this.dragParentDo(this._parent, v)   

            if(v && v.type && v.type=="Sten" ){
                v.collision.removeRect(this.boxColizi);
            }
              
            this._parent= v; 
            if(this._parent==undefined){
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
            } else{
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
            }  
            if(this.dragParent) this.dragParent()  

            if(this.parent!=undefined){                 
                if(this.drahShadow)this.drahShadow()               
            }  
            if(po) {
                if(po!==undefined){                
                    for (var i = po.children.length - 1; i >= 0; i--) {
                        if(po.children[i].idArr==this.idArr){
                            po.children.splice(i,1)
                        }
                    }
                }
               
            }  else{
                
            }     
        }       
    }   
    get parent() { return  this._parent;}
}

