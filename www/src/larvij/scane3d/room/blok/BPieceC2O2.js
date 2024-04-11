/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

Элнменнты на подвеске
*/


import { Blok } from './Blok.js';
import { SahSuper } from './SahSuper.js';


export class BPieceC2O2 extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPieceC2O2";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        
        this.idCT="idMatObject3";//Тип общего цвета    
        this.matBas="materialBase3";//Тип общего цвета
        this._material=roomBig[this.matBas];
        this.boolDinColor = true;
        var aS;
        var coliz
        var xx, yy, point,b;

        /*let aa=new THREE.AxesHelper(100);
        this.content3d.add(aa);*/

        this.SAH=3.2
        //this.byZdvig=false
        this.content3d.position.z=1
        this._parent0=undefined
        this._parent1=undefined

        this.sahSuper=new SahSuper(this);//крючки

        this.byZdvig=false



        this.funInitMod=function(){
            this.boxColizi.rectCollisMeshdy.disStick=1
        }

        this.setXY=function(_x,_y){
            
            xx=_x;
            yy=Math.round(_y/this.SAH)*this.SAH;

            this.boxColizi.position._x = xx;
            this.boxColizi.position.y = yy;
            this.content.position.x = xx;
            this.content.position.y =yy;            
            if(this.parent!=undefined){
                this.parent.collision.testRect(this.boxColizi);
                this.isDvaKrai()
                
                if(this.content.funRender!=undefined){
                    this.content.funRender()
                }
            }
        }


        this.aaSob=function(s,p){

            var r=false

            if(s=="clear"){
                self.mO.par.clear(self);
                self.clear()
                self.mO.activIndex=-1;                
            }
            if(s=="copy")self.mO.par.copy(self);

            if(self.sahSuper.bool==true){
                r=self.sahSuper.aaSob(s,p); 
            }
            return r 
        }

        this.fun_clear=function(){
            if(self.sahSuper.bool==true){
                self.sahSuper.clear();  
            }
    
        }


        ////////////////////////////////////////////////////////////////
        var bint=-1;
        var bint0=-1;
        var bint1=-1;
        var x0,x1,y0,y1
        this.isDvaKrai=function(){ 
            aS=mO.par.sten;
            bint=-1;
            bint0=-1;
            bint1=-1;
            x0 = this.x+this.rect[0]-1;
            x1 = this.x+this.rect[0]+this.rect[3]+1;

            y0 = this.y+this.rect[2];
            y1 = this.y+this.rect[2]+this.rect[5];

           
            for (var i = 0; i < aS.collision.arrRect.length; i++) {
                
                if(aS.collision.arrRect[i].parent.type=="BPieceC2"){
                    if(
                        y0>aS.collision.arrRect[i].parent.y+aS.collision.arrRect[i].parent.rect[2] && 
                        y1<aS.collision.arrRect[i].parent.y+aS.collision.arrRect[i].parent.rect[2]+aS.collision.arrRect[i].parent.rect[5]
                        ){
                        if(
                            x0>aS.collision.arrRect[i].parent.x+aS.collision.arrRect[i].parent.rect[0] && 
                            x0<aS.collision.arrRect[i].parent.x+aS.collision.arrRect[i].parent.rect[0]+aS.collision.arrRect[i].parent.rect[3]
                            ){
                            bint0=aS.collision.arrRect[i].parent;                            
                        }
                        if(
                            x1>aS.collision.arrRect[i].parent.x+aS.collision.arrRect[i].parent.rect[0] && 
                            x1<aS.collision.arrRect[i].parent.x+aS.collision.arrRect[i].parent.rect[0]+aS.collision.arrRect[i].parent.rect[3]
                            ){
                            bint1=aS.collision.arrRect[i].parent;                            
                        } 
                    }                    
                }
            }            

            if(bint0!==-1 && bint1!==-1){
                bint=0;
            }else{

            } 

            this.bint=bint;

            return bint; 
        }


        this._bint=0;

        this.corectMatVisi=function(){ 



        }


        this.textOld=this.textError
        this.visiBlok=this.textError

        var mDin    
        var bb        
        /*this.dragColor=function(){            
            if(self.idArr==-1)return  
            if(self._material==undefined)return

            if(this._bint===-1) return;   

            mDin=self._material;  
            this.visiBlok=null;
            this.bvColor=true;   
            bb=null;
            if(this._material.idUz){
                if(this.objBase.json && this.objBase.json.modelArray){         
                    for (var i = 0; i < this.objBase.json.modelArray.arrII.length; i++) { 
                        if(this.objBase.json.modelArray.arrII[i].id==this._material.idUz){
                            if(this.objBase.json.modelArray.array[i] && this.objBase.json.modelArray.array[i][0] && this.objBase.json.modelArray.array[i][0].id!=-1){
                                let oae=this.objBase.json.modelArray.array[i][0]
                                if(oae.tovar==undefined){
                                    mhbd.getKeyId("group",oae.id,function(e){
                                        oae.tovar=e;
                                        self.dragColor()
                                    }) 
                                }else{
                                    if(oae.tovar.available==false){
                                        bb = true;
                                        mDin = mO.matBTBDV;
                                        this.bvColor=false;
                                    }                                   
                                }
                            }else{
                                bb = true;
                                mDin = mO.matBTBDV;
                                this.bvColor=false;
                            }
                            break;
                        }                        
                    }                    
                    this.objBase.json
                }
            }

            if(this.idArr==-1){                
                mDin=mO.matNull
                this.bvColor=true
                bb = null; 
            }  



     

            for (var i = 0; i < self.arrayMat.length; i++) {                
                if(self.arrayMat[i].material.uuid!=mDin.uuid) {
                    if(bb!=null){                       
                        bb=null;
                        this.visiBlok = drahHelp3D.set(this);
                        this.visiBlok.set(this);
                    }                      
                    self.arrayMat[i].material=mDin;
                }                               
            }
              
        }*/

        this.setError=function(){ 
        
            for (var i = 0; i < self.arrayMat.length; i++) { 
                //if(self.arrayMat[i].material.uuid!=mat.uuid) {

                    self.arrayMat[i].material=mO.matBTBDV;
                //}
            }
        }

        ////////////////////////////////////////////////////////////////




        this.tsSet=function(){ 

        }

        this.stopDrag=function(){ 

        } 



        //обработка бабла
        var aaa,aa
        this.getPrice=function(intColor,idMat){           
            aaa=[];
           // menedsherMaterial.getAOO(this.objBase.json.modelArray, idMat, null, aaa);
          //  if(this.sahSuper.bool==true)this.sahSuper.getPrice(aaa, intColor, idMat);


           // menedsherMaterial.getAOO(this.objBase.json.modelArray, idMat, null, aaa);
          
            //aa=null;
            //if(this.bvColor==false)return aaa
        
            aa=menedsherMaterial.getArrOtObj(this.object,idMat)
            if(aa==null)return aaa
            
            aa[8]=this.object;
            aa[9]=this.object.id;
            aa[10]=1;
            aa[11]=aa[3]*1;
            aaa.push(aa) 

            if(this.sahSuper.bool==true)this.sahSuper.getPrice(aaa, intColor, idMat);        
            return aaa;   
        } 

        this.fun_getObj=function(obj){
            if(this.sahSuper.bool==true)obj.sahSuper=this.sahSuper.getObj()
        }
        this.fun_setObj=function(obj){
            if(obj.sahSuper!=undefined){
                this.sahSuper.setObj(obj.sahSuper)
            }  
        }


        


    }

    set bint(v) {
        if(this._bint!=v){
            this._bint= v; 


            if( this._bint==0){
                this.textError=this.textOld;
                if(this.visiBlok)this.visiBlok.set(this) 
                this.dragColor();
            }else{
                this.textError= "Со всех сторон должены быть перекладины";
                this.setError();
                this.bvColor=false

            }
            this.dragColor()
                    
        }       
    }   
    get bint() { return  this._bint;}



/*    set parent0(v) {
        if(this._parent0!=v){
            if(this.dragParentDo) this.dragParentDo(this._parent0, v)   

            if(v && v.type && v.type=="Sten" ){
                v.collision.removeRect(this.boxColizi);
            }
              
            this._parent0= v; 
            if(this._parent0==undefined){
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
            } else{
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
            }  
            if(this.dragParent) this.dragParent()  

            if(this.parent0!=undefined){                 
                if(this.drahShadow)this.drahShadow()               
            }          
        }       
    }   
    get parent0() { return  this._parent0;}




    set parent(v) {
        if(this._parent!=v){
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
        }       
    }   
    get parent() { return  this._parent;}*/
}

