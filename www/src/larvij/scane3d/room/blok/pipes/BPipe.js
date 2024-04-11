/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

Элнменнты на подвеске
*/


import { Blok } from '../Blok.js';


export class BPipe extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPipe";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        this.aEntr=[]
        this.boolDinColor=true
        this.idCT="idMatObject4";//Тип общего цвета    
        this.matBas="materialBase4";//Тип общего цвета
        this._material=roomBig[this.matBas];


        this.c3d = new THREE.Object3D();
        this.content3d.add(this.c3d);


        this.funInitMod = function(){ 
            

            self.dragMaterial.boolAllDrawing = true

            //self.dragMaterial.setC3d(self.cont3dLoad, self.linkMod)  
            this.dragColor()
        }

        this.dragColor = function() {
      
            if (self._material == undefined) return




            self.dragMaterial.dragColor(self._material);
            if (self.dragMat2 != undefined) self.dragMat2();


        }


        this.dragEntrance = function(){ 
            
            
            if(this.object.pipes==undefined) return
            let ar=this.object.pipes.array           
            for (var i = 0; i < ar.length; i++) {
                
                let entrance=new BPEntrance(this)
                entrance.idArr=this.aEntr.length;
                entrance.setEntrance(ar[i]); 
                this.aEntr.push(entrance)
                
            }
            
        }
        self.dragEntrance()
        this.fun_setObj
        this.fun_getObj
        let bb=-1
        this.fun_getObj = function(o) {
            
            if(this.parent.type=="BPipe"){
                
                for (var i = 0; i < this.parent.aEntr.length; i++) {
                    bb=-1
                 
                    if(this.parent.aEntr[i].ent){
                        
                        for (var j = 0; j < this.aEntr.length; j++) {
                           // trace("0== ",i,  this.parent.aEntr[i].ent.uuid+"---",j,this.aEntr[j].uuid)
                            if(this.aEntr[j].uuid==this.parent.aEntr[i].ent.uuid){
                                bb=j
                            }
                        }
                    }
                    
                    if(bb!=-1){
                        if(o.aEntr==undefined)o.aEntr=[]
                        o.aEntr.push(this.aEntr[bb].getObj())    
                        
                    }
                }

            }

          
            
        }

        this.setPosObj = function(o) {            
            if(o.aEntr){
                for (var i = 0; i < o.aEntr.length; i++) {               
                    if(o.aEntr[i].ent1IdArr!=undefined){                        
                        if(this.parent.aEntr && this.parent.aEntr[o.aEntr[i].ent1IdArr]){
                            this.parent.aEntr[o.aEntr[i].ent1IdArr].addEnt(this.aEntr[o.aEntr[i].idArr])
                            trace("~~~~",i,o.aEntr[i].rotation)
                            if(o.aEntr[i].rotation1!=undefined){
                                this.parent.aEntr[o.aEntr[i].ent1IdArr].rotation=o.aEntr[i].rotation1
                            }
                        }
                    }
                }
               
            }
            self.fun('visi3D')
        }


        this.dragParent=function(){

            if(this._parent==undefined){
              /// if(this.content3d.parent!=undefined)this.content3d.parent.remove(this.content3d)

                /*if(this._parent==undefined){
                    for (var i = 0; i < this.aEntr.length; i++) {
                        this.aEntr[i].clear()
                    }
                } */  
            }

            
           /* */
        }




    }

    set parent(v) {
        if (this._parent != v) {
            if (this.dragParentDo) this.dragParentDo(this._parent, v)
            this._parent = v;
            
            if (this._parent == undefined) {
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
                
            } else {
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
            }
            if (this.dragParent) this.dragParent()

            if (this.parent != undefined) {
                if (this.drahShadow) this.drahShadow()
            }
        }
    }
    get parent() { return this._parent; }


}


///Входы
export class BPEntrance{
    constructor(par) {

        this.type = "BPEntrance";
        var self=this;
        this.uuid=calc.generateRendom(1)
        this.par = par;
        this.idArr=-1;
        this.mesh=null;

        this.intType=-1

        this.c3d = new THREE.Object3D();
        this.par.c3d.add(this.c3d);
        this.c3dNa0= new THREE.Object3D();
        this.c3d.add(this.c3dNa0);
        this.c3dNa1= new THREE.Object3D();
        this.c3dNa0.add(this.c3dNa1);

        this._rotation=0
        self.cont3dLoad =null


        this.obj;    
        this.setEntrance = function(obj){ 
            this.obj=obj;
                   
            this.c3d.position.set(obj.position.x,obj.position.y,obj.position.z )   
            this.c3d.rotation.set(obj.rotation.x*Math.PI/180,obj.rotation.y*Math.PI/180,0 )  
            let id=304;
            
 
            if(this.obj.type && this.obj.type==1)id=305;
              

            let oi=menObject.getIdObj(id)
            
            let lll = "resources/data/" + id + "/mod/" + oi.obj.mod.name;
            


            this.par.mO.getModel(lll, oi.obj.mod.key, function(o) {
                self.cont3dLoad = o;
                self.c3d.add(o)
                visi3D.intRend=1
            })
        }  

        this.clear= function(){
            
            if(this.ent!=null){

                trace("========clear======", this.ent, this.ent1)

                //this.removeEnt(this.ent)
            } /**/

        }


        this.ent=null;
        this.ent1=null;
        this.addEnt = function(ent){ //входящий
            this.removeEnt(this.ent)//на всякий удалили
            this.ent=ent            //записали       
            /*if(this.par.parent.uuid!=){

            }*/
            this.par.add(ent.par)   //докинули в парент


            ent.par.content3d.parent.remove(ent.par.content3d)//удалили из парент конт3д
            this.c3dNa1.add(ent.par.content3d)//вставили в точку
            this.c3dNa1.position.set(-ent.obj.position.x,-ent.obj.position.y,-ent.obj.position.z)
            //this.c3dNa0.rotation.set(-ent.obj.rotation.x,-ent.obj.rotation.y,-ent.obj.rotation.z)
            this.c3dNa0.rotation.x=-ent.obj.rotation.x*Math.PI/180;
            this.c3dNa0.rotation.y=-ent.obj.rotation.y*Math.PI/180;

        
            
            visi3D.intRend=1;
            ent.ent1 = this            //вписали в память что он закреплен 



        }


        this.removeEnt = function(ent){ 
            if(ent==null)return           
            this.par.remove(ent.par)
           
            if(ent.par.content3d.parent!=undefined)ent.par.content3d.parent.remove(ent.par.content3d)
            for (var i =  this.c3dNa1.children.length - 1; i >= 0; i--) {
                this.c3dNa1.remove(this.c3d.children[i])
            } 
            this.ent=null;
            ent.ent1 = null 
            visi3D.intRend=1;
            
        }

        this.getObj = function() {
            var obj = {}
           
            obj.idArr=this.idArr;
            
            if(this.ent){
                obj.entIdArr=this.ent.idArr;
                obj.entId=this.ent.par.id;
                obj.rotation=this.ent.rotation;
            }
            
            if(this.ent1){
                obj.ent1IdArr=this.ent1.idArr;
                obj.ent1Id=this.ent1.par.id;
                obj.rotation1=this.ent1.rotation;

            }

                     
            return obj;
        }


        
        this.setObj = function(obj) {
            
            return obj;
        }       


    }

    set rotation(v) {
        if (this._rotation != v) {         
            this._rotation = v;
            this.c3dNa1.rotation.z=this._rotation           
        }
    }
    get rotation() { return this._rotation; }


}



