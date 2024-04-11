
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

мненеджер разруливает процессы драгов и хронит дерево




*/


import {  Blok } from './blok/Blok.js';
import {  BDoor } from './blok/BDoor.js';
import {  BWindow } from './blok/BWindow.js';
import {  BTumba } from './blok/BTumba.js';
import {  BTVstavka } from './blok/BTVstavka.js';

import {  BTBox } from './blok/BTBox.js';
import {  BTBoxVstavka } from './blok/BTBoxVstavka.js';

import {  BTBoxDin } from './blok/BTBoxDin.js';
import {  BTBoxDV} from './blok/BTBoxDV.js';

import {  BPieceObject } from './blok/BPieceObject.js';
import {  BPieceTop } from './blok/BPieceTop.js';
import {  MUtilit  } from './MUtilit.js';
import { MenedsherMaterial } from './MenedsherMaterial.js';



import {  BPieceC2 } from './blok/BPieceC2.js';
import {  BPieceC2Object } from './blok/BPieceC2Object.js';
import {  BPieceC2O2 } from './blok/BPieceC2O2.js';


import {  BPipeGroup }  from './blok/pipes/BPipeGroup.js';
import {  BPipe }       from './blok/pipes/BPipe.js';



import {  MenedsherPipes }       from './blok/pipes/MenedsherPipes.js';


export class Menedsher  {
    constructor(room, fun) {         
        this.type="Menedsher";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.par=room;
        this.whDrag=2500;        
        this.plus=room.par.par.par.plus;
        this._materialBase=null;
        this.csvConfigArray=room.par.par.par.csvConfigArray



        this.matNull = new THREE.MeshPhongMaterial({
            color:0x0000ff,
            transparent:true,
            opacity:0.3
        });
        this.matNull1 = new THREE.MeshPhongMaterial({
            color:0x00ff00,
            transparent:true,
            opacity:0.3
        });

        this.mPanel = new THREE.Mesh(new THREE.BoxGeometry(this.whDrag,this.whDrag,0.001),this.matNull);
        this.mPanel.layers.set(31);

        //this.mPNa = new THREE.Mesh(new THREE.BoxGeometry(this.whDrag,this.whDrag,0.001),this.matNull1);
        //this.mPanel.layers.set(31);


        this.mPanel1 = new THREE.Mesh(new THREE.BoxGeometry(this.whDrag,this.whDrag,0.001),this.matNull1);
        this.mPanel1.layers.set(31);




        this.content3d = new THREE.Object3D();
        room.content3d.add(this.content3d);       
        this.glaf=this.par.par.par; 
        this.visi3D=this.par.par.par.visi3D;         
        this.object=undefined;
        self.objectOld=undefined;

        this.menedsherObject = new MenedsherObject(this,function(s,p){//менеджер обьектов
            fun(s,p)
        });
        this.menedsherObject.setOB(this.par.par.par.main.objectBase);

        this.mMaterial = new MenedsherMaterial(this,function(s,p){//менеджер матерьялов
            fun(s,p)
        });

        this.mUtilit = new MUtilit(this,function(s,p){
            fun(s,p)
        });

        this.menedsherPipes=new MenedsherPipes(this,function(s,p){//менеджер матерьялов
            fun(s,p)
        })

 
        this.mMaterial.setConfig(
            this.par.par.par.visi3D,  
            this.par.par.par.main.objectBase,
            this.par.par.par.server
        )
        
        this.menedsherObject.geterMat=this.mMaterial.geterMat

        this.clear=function(blok){            
            if(blok.parent!=undefined)blok.parent.remove(blok)
            self.fun("visi3d");
        }

        this.copy=function(blok){
            
        }


        this.dragPriceScane=function(){
            if(this.par.par.par.menuDiv){
                
                this.dragTime()
            }           
        }

        this.sah=0
        this.dragTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s){
                    //self.save()
                    self.par.par.par.menuDiv.mani.dragPriceScane2(self.menedsherObject.array);
                }
            }, 100);
        } 





        this.startObj=function(obj){
         
            this.menedsherObject.csvTest(obj.obj);
            this.start(this.menedsherObject.getBlok(obj.obj));
        }


        this.start=function(obj){  
                    
            this.stop();             
            this.visi3D.position3d.pause=true;
            this.par.name3d='xzPoisk';            
            this.object=obj;
            this.objectOld=obj;
            this.object.activObject=true;            
            this.menedsherObject.activIndex=this.object.idArr
            if(this.object.tsSet)this.object.tsSet();           
                 
            this.visi3D.addEvent("move", this.move);
            if (dcmParam.mobile==false)document.addEventListener("mouseup", self.mouseup);
            else document.addEventListener("touchend", self.mouseup);

        }

        
        this.stop=function(){  
                    
            this.par.pozZdvigAll(0)
            this.pointZdvig.set(0,0,0)
            if(self.mPanel.parent!=undefined) {
                self.mPanel.parent.remove(self.mPanel)                 
            }
            /*if(self.mPNa.parent!=undefined) {
                self.mPNa.parent.remove(self.mPNa)                 
            }*/


            if(this.object)if(this.object.stopDrag!=undefined)this.object.stopDrag()
            this.visi3D.position3d.pause=false;
            if(this.object)if(this.object.parent==undefined)this.object.clear();
            this.par.name3d='null';            
            if(this.object)this.object.activObject=false
            this.object=undefined;          
            this.visi3D.removeEvent("move", this.move); 

            if (dcmParam.mobile==false)document.removeEventListener("mouseup", self.mouseup);
            else document.removeEventListener("touchend", self.mouseup);            
        }


        this.mouseup = function (e) { 
            self.stop();
            self.par.par.tudaSuda.saveMod(); 
            self.par.drawTestUp();            
        }


        this.sten
        this.pointZdvig=new THREE.Vector3(0,0,0)
        var intersects
        var _xx, _yy, _bb
        var stenDown
        this.pointReal=new THREE.Vector3(0,0,0)
        this.move = function (e) { 
        
            if(e)if(e.target)if(e.target.sten){ 
                
                if(self.object!=undefined){
        
                    _bb=true
                    if(self.object.parent!=undefined)
                    if(self.mPanel.parent!=undefined)     
                    
                    if(stenDown!=undefined){
                        if(self.object.parent.parent!=undefined)if(self.object.parent.parent.idArr==stenDown.idArr)_bb=false
                        if(self.object.parent!=undefined)if(self.object.parent.idArr==stenDown.idArr)_bb=false    
                    }                         

                    if(_bb==false){                            
                        intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel], true);                        
                        if(intersects[0]){
                            self.pointReal.x=(intersects[0].uv.x-0.5)*self.whDrag;
                            self.pointReal.y=(intersects[0].uv.y-0.5)*self.whDrag;


                            _xx=self.pointZdvig.x + self.pointReal.x;
                            _yy=self.pointZdvig.y + self.pointReal.y;

                            self.object.setXY(_xx, _yy)                    
                            self.fun("visi3d");
                            self.par.visiActiv.dragActiv() 
                            _bb=false
                        }                                                
                    } 

                    if(_bb==true){
                        _xx=e.uv.x*e.target.sten.width;
                        _yy=e.uv.y*e.target.sten.height;
                        self.object.setXY(_xx, _yy)                    
                        self.fun("visi3d");
                        self.par.visiActiv.dragActiv() 
                    }                    
                }
            } 

            if(self.object)if(self.object.parent==undefined){
                self.over(e)

            } 
        }


        this.out = function (e) { 

            if(self.par.par.bactive==false)return  
            

            if(e)if(e.target){
                if(e.target.sten){  
                    if(self.mPanel1.parent!=undefined) self.mPanel1.parent.remove(self.mPanel1)

                    self.sten=undefined
                    if(self.object!=undefined){//разруливаем тоскаемый элемент 
                        if(self.object.notBlok)return                   
                        if(self.object.parent!=undefined){  
                                        
                            e.target.sten.remove(self.object); 
                            var l=self.getLink(self.object.object)                        
                            self.glaf.dragPic.start(32, l, null,null,true);
                            self.dragPriceScane();  
                            

                        }
                        if(self.object.outDrag)self.object.outDrag()
                    }
                }
            }
            self.fun("visi3d");    
            window.document.body.style.cursor = "auto";    
            blok=null 
            self.par.visiActiv.dragActiv();       
        }

        var _yy1,_xx1
        this.over = function (e) {  

            if(self.par.par.bactive==false)return
                
            if(e)if(e.target){
                if(e.target.sten){

                    if(self.mPanel1.parent==undefined) e.target.sten.content3d.add(self.mPanel1) 

                    self.sten=e.target.sten
                    if(self.object!=undefined){//разруливаем тоскаемый элемент   
                        if(self.object.notBlok)return

                        if(self.object.parent==undefined){
                            let b=true;

                            intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel], true);                            
                            
                            if(intersects.length!=0){
                                _xx=self.pointZdvig.x + (intersects[0].uv.x-0.5)*self.whDrag;
                                _yy=self.pointZdvig.y + (intersects[0].uv.y-0.5)*self.whDrag;
                            }

                            intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel1], true);
                            if(intersects.length!=0){
                                _xx1 = (intersects[0].uv.x-0.5)*self.whDrag;
                                _yy1 = (intersects[0].uv.y-0.5)*self.whDrag;

                                if(self.object.isOver!=undefined){
                                    b=self.object.isOver(e.target.sten,_xx1,_yy1)                                    
                                }
                               

                                if(b){//если можно пихнуть

                                    e.target.sten.add(self.object);
                                    //self.move(e)
                                    self.glaf.dragPic.stop();
                                    self.dragPriceScane(); 
                                    
                                      
                                }else{
                                    //mHelp.setHelp("Данный обьект не может быть размещен, не хватает пространства","resources/image/mhelp.png",mHelp.dCNM,{x:13,y:-13});
                                }
                            }
                        }                        
                        if(self.object.overDrag)self.object.overDrag()                   
                    }
                } 

                blok=self.poiscParam(e.target,"blok");
                if(blok!=null){                    
                    window.document.body.style.cursor = "pointer";  
                }
            }
            self.par.visiActiv.dragActiv()
            self.fun("visi3d");
        }

        this.clik1 = function (e) {           
            self.menedsherObject.activIndex=-1;
        }

        var pppp={x:0,y:0}
        this.getPNa= function () { 

            intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel1], true);
            if(intersects[0]==undefined)return null
            pppp.x=(intersects[0].uv.x-0.5)*self.whDrag;    
            pppp.y=(intersects[0].uv.y-0.5)*self.whDrag;     
            return pppp
        }


        this.getLink=function(o){
            var r="resources/data/"+o.id+"/100.png"+this.plus;           
            if(o.resurs)if(o.resurs.array)if(o.resurs.array.length!=0){                
                for (var i = 0; i < o.resurs.array.length; i++) {
                    if(o.resurs.array[i].b!=undefined){                        
                        if(o.resurs.array[i].i=="icon"){
                            r="resources/data/"+o.id+"/resources/"+o.resurs.array[i].name+this.plus;
                            break;
                        }
                    }
                }
            }
            return r
        }

        var blok=null
        var p={x:0,y:0}
        this.down = function (e) { 
                      
            if(self.par.par.bactive==false)return
            if(e){
                if(e.target){
                    
                    blok=self.poiscParam(e.target,"blok");
                    self.testActSten(e.target)
                    if(blok!=null){ 
                      
                        p.x=e.originalEvent.clientX;
                        p.y=e.originalEvent.clientY;
                        self.par.par.sDebug.setBlok(blok); 
                        self.start(blok);                                           
                        self.downZdig(e,blok)
                        if(blok.dragStart)  if(blok.dragStart()!=true)return 
                    }else{
                        
                        self.glaf.dragPic.testDrag(1, self.clik1, null);  
                    }   /**/                 
                }
                
            }else{
                if(blok==null) self.menedsherObject.activIndex=-1;
            }            
            self.fun("visi3d");
        }

        this.setBlokActiv = function (b) {  
            blok=b
        }

        this.setBlokStart = function (b) {             
            blok=b;
            self.testActSten(blok.content3d)
            self.start(blok); 
            self.stop()
        }




        this.pointOld=new THREE.Vector3();
        var xx,xx1,xx2,xx3
        var oo
        var hh,hh1
        this.downZdig = function (e,b) {  
            if(b.parent==undefined)return;

            if(b.parent.pozZdvig!=undefined){
                stenDown=b.parent
                if(b.parent.idArr==0){
                    
                    hh1=0;
                    if(self.par.children[2].width>self.par.children[0].width) {
                        hh1=-(self.par.children[2].width-self.par.children[0].width)/2
                    }                    
                    hh=b.parent.width/2+hh1; 

                    
                   
                    this.mPanel.position.x= hh - e.point.z
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z= this.par.niz.ww/2+e.point.x
                }

                if(b.parent.idArr==1){
                    this.mPanel.position.x= e.point.x + b.parent.width/2 
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z= this.par.niz.hh2/2+e.point.z
                    if(this.par.niz.bbb==true){                            
                        this.mPanel.position.z=e.point.z
                    }
                }

                if(b.parent.idArr==2){ 

                    hh1=0;
                    if(self.par.children[0].width>self.par.children[2].width) {
                        hh1=(self.par.children[0].width-self.par.children[2].width)/2
                    }                    
                    hh=b.parent.width/2+hh1;

                    this.mPanel.position.x= e.point.z + hh
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z=this.par.niz.ww/2-e.point.x
                }

                b.parent.content3d.add(this.mPanel);                
                this.pointZdvig.x=b.content3d.position.x
                this.pointZdvig.y=b.content3d.position.y

               

            }else{
                if(b.parent.parent.pozZdvig!=undefined){
                    stenDown=b.parent.parent;

                    if(b.parent.parent.idArr==0){

                        

                        hh1=0;
                        if(self.par.children[2].width>self.par.children[0].width) {
                            hh1=-(self.par.children[2].width-self.par.children[0].width)/2
                        }                    
                        hh=b.parent.parent.width/2+hh1; 

                       // this.mPanel.position.x= b.parent.parent.width/2 - e.point.z
                        this.mPanel.position.x= hh - e.point.z
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.ww/2+e.point.x
                    }

                    if(b.parent.parent.idArr==1){
                        this.mPanel.position.x= e.point.x + b.parent.parent.width/2 
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.hh/2+e.point.z
                        if(this.par.niz.bbb==true){
                            this.mPanel.position.z= this.par.niz.hh/2+e.point.z
                            this.mPanel.position.z=-4+e.point.z
                        }                        
                    }

                    if(b.parent.parent.idArr==2){

                        hh1=0;
                        if(self.par.children[0].width>self.par.children[2].width) {
                            hh1=(self.par.children[0].width-self.par.children[2].width)/2
                        }                    
                        hh=b.parent.parent.width/2 +hh1;

                          

                        this.mPanel.position.x= e.point.z + hh
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.ww/2-e.point.x                       
                    }

                    b.parent.parent.content3d.add(this.mPanel);
                    this.pointZdvig.x=b.content3d.position.x+b.parent.content3d.position.x
                    this.pointZdvig.y=b.content3d.position.y+b.parent.content3d.position.y


                    //b.parent.content3d.add(this.mPNa);

                }
            }
        }


        this.clik = function () {            
            self.objectOld.setAA(self.aroundButton)
            self.fun("visi3d");
        }

        self.testActSten=function(c){           
            if(c.sten!=undefined){
                room.indexAct=c.sten.idArr;
                return
            }
            if(c.parent!=undefined)self.testActSten(c.parent)
        }




        this.poiscParam = function (o,p) {
            if(o[p]!=undefined)return o[p];
            if(o.parent!=undefined)return this.poiscParam(o.parent, p)
            return null;
        }         


        this.visi3D.addEvent("out", this.out);        
        this.visi3D.addEvent("over", this.over);
        this.visi3D.addEvent("down", this.down);

        
        this.setIdColor = function (idColor, tip) {
            if(tip==undefined)tip="idMatObject"
            this.menedsherObject.setIdColor(idColor, tip);
        }


        self.glaf.dragPic.addFunAp(function(){        
            if(self.glaf.dragPic.object!=undefined){            
                if(self.glaf.dragPic.object.id!=undefined){
                    if((self.glaf.dragPic.object.id+"").indexOf("m_")!=-1){                     
                        if(blok!=null){                            
                            blok.idColor=self.glaf.dragPic.object.id;
                        }                        
                    }
                }
            }
        })

        this.objectL
        this.setObj=function(o){  
            this.menedsherObject.clear();
            this.objectLoad=o;  
                  
            if(this.testLoad()==true){
                this.setObjPostLoad(); 
            } 
            self.dragPriceScane();
            for (var i = 0; i < 10; i++) {
                setTimeout(function() {
                    self.dragPriceScane()
                }, i*750);
            }         
        }

        this.testLoad=function(f){ 
            trace(this.objectLoad)
            var a=[];
            for (var i = 0; i < this.objectLoad.children.length; i++) {
                for (var j = 0; j < this.objectLoad.children[i].children.length; j++) {
                    a.push(this.objectLoad.children[i].children[j].id)
                    if(this.objectLoad.children[i].children[j].children!=undefined){
                        for (var k= 0; k < this.objectLoad.children[i].children[j].children.length; k++) {
                            a.push(this.objectLoad.children[i].children[j].children[k].id)
                        } 
                    }
                            

                }
            }
            if(this.menedsherObject.testIdObj(a)!=-1){                
                this.menedsherObject.loadID(a,function(){
                    self.setObjPostLoad()
                })
                return false;
            }
            return true;
        }

        var idd
        this.setObjPostLoad=function(){            
            for (var i = 0; i < this.objectLoad.children.length; i++) {                
                this.par.array[i].collision.activ = false;
                for (var j = 0; j < this.objectLoad.children[i].children.length; j++) {
                     
                    
                    idd=this.objectLoad.children[i].children[j].id;
                    var ooo=this.menedsherObject.getIdObj(idd);                    
              
                    if(ooo!=null){    
               

                        blok=this.menedsherObject.getBlok(ooo.obj)                        
                        blok.setObj(this.objectLoad.children[i].children[j])
                        this.par.array[i].add(blok, false);                       
                    }
                                
                }
                this.par.array[i].collision.activ = true;
                this.par.array[i].collision.drawDegug()                
            }
            self.dragPriceScane() 
            setTimeout(function() {
                self.dragPriceScane(); 
            }, 1000);
        }

        


        this.sobKey = function(tip,e,arrNa){ 

            //self.object
            
            this.menedsherObject.sobKey(tip,e,arrNa);
            

        } 


    }

    set materialBase(v) {
        this._materialBase = v;
        this.menedsherObject.materialBase=v;
        this.mMaterial.materialBase=v;     
    }
    get materialBase() { return  this._materialBase;}
}


import { GLTFLoader } from '../../../three/GLTFLoader.js';
//import { GLTFLoaderOld } from '../../../three/GLTFLoaderOld.js';

export class MenedsherObject  {
    constructor(penedsher, fun) {
        this.type="MenedsherObject";
        window.menObject=this
        var self=this;
        this.par=penedsher;
        this.visi3D=penedsher.par.par.par.visi3D;    
        this.fun= fun   
        this.array=[];
        this.arrayHron=[];
        this._materialBase=undefined;
        this.objectBase=undefined;
        this.arrayKey=["fbx", "3ds", "gltf"];
        this.wN=[50,75,100];
        this.hN=[58]; 

        this.stepKey=2    

        this.activObject = undefined; 
        this._visiMark = false; 
        
      
        this.loaderFBX// = new THREE.FBXLoader();
        this.loaderTDS// = new THREE.TDSLoader();
        this.loaderGLTF = new GLTFLoader();
        //this.loaderGLTF = new THREE.GLTFLoader();
        this.material = new THREE.MeshPhongMaterial({color:0xff0000});

        this.boolClone=false

        this.gBox=new THREE.BoxGeometry( 1, 1, 1 )
        this.matNull = new THREE.MeshPhongMaterial({
            color:0xffffff,
            transparent:true,
            opacity:0.3
        });
        this.matRed = new THREE.MeshPhongMaterial({
            color:0x476875,
            transparent:true,
            opacity:0.3
        });
        this.matRed1 = new THREE.MeshPhongMaterial({
            color:0xff0000,
            transparent:true,
            opacity:0.7
        });
        this.mat2 = new THREE.MeshPhongMaterial({
            color:0x00ff00,
            transparent:true,
            opacity:0.7
        });

        this.matBaseName = new THREE.MeshPhongMaterial({
            color:0xffffff
        });
        this.matBaseName.name="m_base"
        

        this.dragPriceScane=function(){ 
            this.par.dragPriceScane()
        }

        this.testIdObj=function(a){            
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                for (var j = 0; j < a.length; j++) {
                    if(a[j]==this.objectBase.bd[i].id){                        
                        if(this.objectBase.bd[i].obj == undefined) return i                        
                    }
                }
            }
            return -1
        }
        
        this.fDrag
        this.loadID=function(a, f){
            if(f!=undefined)self.fDrag=f;
            var ii=self.testIdObj(a);
            if(ii==-1){
                
                self.fDrag()
                return
            }           
            self.loadID2(a, self.objectBase.bd[ii])
        }

        this.loadID2=function(a, o){            
            $.ajax({
                url: "resources/data/"+o.id+"/config.json"+this.par.plus,
                success: function function_name(data) { 
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        o.obj = self.csvTest(conf);
                    } else o.obj = self.csvTest(data); 


                    self.loadID(a)            
                },
                error:function function_name(data) {
                    console.log("Что то случилось с конфигом")
                }
            }); 
        }


        this.csvTest=function(o){
          
            if(this.par.csvConfigArray==undefined)return o;
           
            for (var i = 0; i < this.par.csvConfigArray.length; i++) {                
                if(this.par.csvConfigArray[i].id*1==o.id*1){
                  
                    o.info=this.par.csvConfigArray[i]
                   
                   
                    return o

                }
            }
            return o
        }
        this.setObjArr=function(obj, a){
            if(obj)
            if(obj.plus){ 
                if(a[3]){
                    obj.plus[0]=a[2];
                    obj.plus[3]=a[3]; 
                }               
                if(a[5]){
                    obj.plus1[0]=a[4];
                    obj.plus1[3]=a[5];
                }
            }                
        } 


        this.objA={}

        var aaa
        this.getRendomID =function(str){
            if(this.objA[str]==undefined){  
                this.objA[str]={}
                this.objA[str].sah=0
                this.objA[str].array=[];
                this.objA[str].arsah=[];               
                for (var i = 0; i < this.objectBase.bd.length; i++) {               
                    if(str==this.objectBase.bd[i].title){                        
                        this.objA[str].array.push(this.objectBase.bd[i]);
                        this.objA[str].arsah.push(0);
                    }               
                }                    
            }            


            aaa=[];             
            for (var i = 0; i < this.objA[str].arsah.length; i++) {
                if(this.objA[str].arsah[i]==this.objA[str].sah)aaa.push(i)//this.objA[str].array[i])
            }

            if(aaa.length==0){
                this.objA[str].sah++;
                for (var i = 0; i < this.objA[str].arsah.length; i++) {
                    if(this.objA[str].arsah[i]==this.objA[str].sah)aaa.push(i)//this.objA[str].array[i])
                }
            }
            
            if(aaa.length!=0){
                var p=Math.round(Math.random()*(aaa.length-1)) 
                this.objA[str].arsah[aaa[p]]++;                
                return this.objA[str].array[aaa[p]];
            }
            return null;
        }

        var oo
        this.getInTEXT=function(_id,_text){ 
            oo=this.getIdObj(_id)
            if(oo)if(oo.obj)if(oo.obj.info){
                if(oo.obj.info.text.indexOf(_text)!=-1)return true;
            }
            return false;
        }

        var rr
        this.getIdObj=function(id){
            if(this.objB2)if(this.objB2[id])return this.objB2[id]
            rr=this.getIdRecurs(id, this.objectBase.bd);
                    
            return rr;
        }

        var ook,oc,ss
        ///Есть хотя бы один цвет в идишнеке
        this.isIdPrice=function(id){
            ook=this.objB2[id]
            if(ook && ook.obj && ook.obj.info  && ook.obj.info.color){
                oc=ook.obj.info.color;                
                for (ss in  oc) {
                    if(isNaN(oc[ss].pri*1)==false){                        
                        return true;
                    }
                }
            }
            
            return false;
        }

        
        this.getIdRecurs=function(id,arr){
            
            var r=null
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].id==id) {

                    return arr[i];  
                }             
                if(arr[i].array){
                    r=this.getIdRecurs(id, arr[i].array)
                    if(r!=null)return r;
                }
            }
            return null;
        }


        this.blokTumba
        this.btBox
        this.btBoxDin
        this.objB2={}
        this.setOB=function(oo){
            this.objectBase=oo 
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                
                this.objB2[this.objectBase.bd[i].id]=this.objectBase.bd[i];
                
            }

            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="tumbaBase"){
                    let iii=i;
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[iii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[iii].obj = self.csvTest(conf);
                            } else{                                
                                self.objectBase.bd[iii].obj = self.csvTest(data);
                            }  

                            self.blokTumba = new BTumba(self, self.objectBase.bd[iii].obj, -1 ,self.sob);
                            self.blokTumba.init();
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }           

            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="BTBoxDin"){
                    
                    let ii=i;
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[ii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[ii].obj = self.csvTest(conf);
                            } else{                                
                                self.objectBase.bd[ii].obj = self.csvTest(data);
                            }  

                            self.btBoxDin = new BTBoxDin(self, self.objectBase.bd[ii].obj, -1 ,self.sob);
                            self.btBoxDin.init();
                            
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }

            




            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="pieceTop"){
                    
                    let iii=i
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[iii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {                         
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[iii].obj = self.csvTest(conf);
                            } else self.objectBase.bd[iii].obj = self.csvTest(data); 

                            self.pieceTop = new BPieceTop(self, self.objectBase.bd[iii].obj, -1 ,self.sob);
                            self.pieceTop.init();
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }


            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="BPieceC2"){
                    
                    let iii=i
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[iii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {                         
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[iii].obj = self.csvTest(conf);
                            } else self.objectBase.bd[iii].obj = self.csvTest(data); 

                            self.bPC2Din = new BPieceC2(self, self.objectBase.bd[iii].obj, -1 ,self.sob);
                            self.bPC2Din.init();
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }


        }

        this.korektActiv =function(blok){ 
              
            setTimeout(function() {
                self.par.par.visiActiv.korektActiv(blok)
            }, 1);            
        }       


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }


        this.matBTBDV= new THREE.MeshPhongMaterial({
            /*color:0xf28044,
            transparent:true,
            opacity:0.3*/

            color:0xff0000,
            transparent:true,
            opacity:0.3
        });
        this.activBTBDV=function(b){            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].activBTBDV)this.array[i].activBTBDV(b)
            }
        }






        this.sob=function(s,p){
            fun(s,p)
        }

        this.getBigobj=function(id){
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].id==id)return this.objectBase.bd[i]
            }
            return null

        }

        var blok
        this.getBlok=function(o){   

            blok=null; 
                     
            if(o.str[0]=="BGroup"){
                blok=this.getGroup(o)                
                if(blok.drapPlus!=undefined){                    
                    blok.drapPlus=true
                }
                return this.getGroup(o)                 
            }

            if(this.objB2[o.id].obj==undefined)this.objB2[o.id].obj=o;

            for (var i = 0; i < this.array.length; i++) {                               
                if(this.array[i].id==o.id){
                    if(this.array[i].parent==undefined){
                        this.array[i].clear()
                        return this.array[i];
                    }
                }
            }

           
            if(o.str[0]=="BDoor") blok=new BDoor(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BWindow") blok=new BWindow(this, o, this.array.length,this.sob);               
            if(o.str[0]=="BTumba") blok=new BTumba(this, o, this.array.length,this.sob);   
            if(o.str[0]=="BTVstavka") blok=new BTVstavka(this, o, this.array.length,this.sob);
            if(o.str[0]=="BPieceObject") blok=new BPieceObject(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BPieceBottom") blok=new BPieceBottom(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BPieceTop") blok=new BPieceTop(this, o, this.array.length,this.sob); 



            if(o.str[0]=="BTBox") blok=new BTBox(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BTBoxVstavka") blok=new BTBoxVstavka(this, o, this.array.length,this.sob);

            if(o.str[0]=="BTBoxDin") blok=new BTBoxDin(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BTBoxDV") blok=new BTBoxDV(this, o, this.array.length,this.sob); 

            if(o.str[0]=="BPieceC2") blok=new BPieceC2(this, o, this.array.length,this.sob);//проемы окна двери и т п 
            if(o.str[0]=="BPieceC2Object") blok=new BPieceC2Object(this, o, this.array.length,this.sob);//проемы окна двери и т п 
            if(o.str[0]=="BPieceC2O2") blok=new BPieceC2O2(this, o, this.array.length,this.sob);//елементы на две стойки

            if(o.str[0]=="BPipeGroup") blok=new BPipeGroup(this, o, this.array.length,this.sob);//елементы на две стойки
            if(o.str[0]=="BPipe") blok=new BPipe(this, o, this.array.length,this.sob);//елементы на две стойки

            
            if(blok==null)blok = new Blok(this,o,this.array.length,this.sob)
            blok.init();
            this.array.push(blok)   

            return this.array[this.array.length-1];
        }
        
        this.getGroup=function(o){              
            var a=o.str[1].split("|")
            var s=a[0]
            for (var i = 1; i < a.length; i++) {
                s+='"'+a[i];
            }            
            var oo=JSON.parse(s)          
            var ooo=this.getIdObj(oo.id); 
            var b=this.getBlok(ooo.obj)                        
            b.setObj(oo) 
            return b
        }
 
        this.pmIzCloset=new PMIzCloset()
        this.getModel=function(link, key, fun){              
           
            for (var i = 0; i < this.arrayHron.length; i++) {
                if(this.arrayHron[i].link==link){
                    this.arrayHron[i].setFun(fun);
                    return;
                }
            }
         

            this.arrayHron.push(new Hron(this, link, key, fun))
        }


        this.setIdColor = function (idColor, tip) {       
            for (var i = 0; i < this.array.length; i++) {
         
                if(this.array[i].idCT==tip)this.array[i].setColorId(idColor);
                
            }
        }

        this.sobKey = function(tip,e,arrNa){
         
            if(e.keyCode==17 && tip=="down")  {
                this.boolClone=true;
            }
            if(e.keyCode==17 && tip=="up")  {
                this.boolClone=false;
            }


            if(this.activObject)this.activObject.sobKey(tip,e,arrNa);

            
        } 

        this._activTime=-1;
    }


    set materialBase(v) {
        this._materialBase = v;
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].material=this._materialBase;
        }   
    }
    get materialBase() { return  this._materialBase;}


    set visiMark(v) {
        if(this._visiMark!=v){
            this._visiMark= v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visiMark=this._visiMark;                
            }
            this.fun("visi3d");         
        }       
    }   
    get visiMark() { return  this._visiMark;} 


    set activIndex(v) {
        if(this._activIndex!=v){

            this._activIndex = v;
            for (var i = 0; i < this.array.length; i++) {
                if(i==this._activIndex)this.array[i].activTime=true;
                else this.array[i].activTime=false;                              
            }  
            if(this.array[v]!=undefined) {                
                this.par.visi3D.arrOut=this.array[v].c3dNa;
                this.par.menedsherPipes.setObject(this.array[v])
                this.par.par.visiActiv.setObject(this.array[v])
                this.activObject=this.array[v]
            } else{

                this.par.visi3D.arrOut=null;
                this.par.menedsherPipes.setObject(null)
                this.par.par.visiActiv.setObject(null)
                this.activObject=undefined
            }
            this.par.fun("visi3d");
        }       
    }   
    get activIndex() { return  this._activIndex;} 

}

export class Hron  {
    constructor(mO, link, key, fun) {
        this.type="Hron";
        var self=this;
        this.link=link;
        this.content3d=undefined;
        this.array=[]
        this.array.push(fun);


        this.setFun = function(fun){
            if(this.content3d!=undefined){
                let oc=this.content3d.clone();
                oc.hron=this


                fun(oc)
                return;
            }

            this.array.push(fun);
        }
        
        this.finalLoad=function(o3d){     

            if(self.obj && self.obj.obj && self.obj.obj.iz){
                
                let aa=mO.pmIzCloset.strToObj(self.obj.obj.iz.str)

                mO.pmIzCloset.setMod(o3d,aa,false) 


            }


            this.content3d = new THREE.Object3D();
            this.content3d.add(o3d);
            
            for (var i = 0; i < this.array.length; i++) {
                
                let oc=this.content3d.clone();
                oc.hron=this
                this.array[i](oc);
            }
        }

        this.id=-1;
        let aa=link.split("resources/data/")
        let aa1=aa[1].split("/")
        this.id=aa1[0]*1
        this.obj=mO.getBigobj(this.id)
        




     
        if(key=="gltf"||key=="glb"){
            mO.loaderGLTF.load( link, function ( object ) { 
                
                let dd
                if(link.indexOf("resources/data/65/")!=-1){
                    dd="m_8" 
                   
                }   

                mO.par.mMaterial.geterMat.getTestTitleObj(object.scene, dd)
                object.scene.rotation.x=Math.PI/2
                self.finalLoad(object.scene);
            })
        } 
       


        this.getObj3D=function(o3d){
            var o=new THREE.Object3D();
            o.position.set(o3d.position.x,o3d.position.y,o3d.position.z);
            o.rotation.set(o3d.rotation.x,o3d.rotation.y,o3d.rotation.z);
            o.scale.set(o3d.scale.x,o3d.scale.y,o3d.scale.z);

            for (var i = o3d.children.length-1; i >=0; i++) {
                if(o3d.children[i].type=="Mesh"){
                    o.add(o3d.children[i]);
                }else{
                    if(o.name!="Default_light"){
                        var oo=this.getObj3D(o3d.children[i]);
                        o3d.remove(o3d.children[i])
                        o.add(oo)
                    }                    
                }
            }
            return o;
        }
    }
}


export default function PMIzCloset() { 
    this.type="PMIzCloset";
    var self=this;

 


    
    this.setHron=function(hron, _c){
        var o, c
        o=hron.object.iz
        c=hron.content3d;
        if(_c)c=_c
        if(c==undefined||o==undefined)return

        if(o.a==true){

            
            

            this.setMod(c,this.strToObj(o.str),o.st) 
        } 
    }

    this.strToObj=function(s){       
        var ss=""
        for (var i = 0; i < s.length; i++) {                
            if(s[i]=='|')ss+='"'
            else ss+=s[i]    
        }
        var o = JSON.parse(ss)
        return o
    }







    ////////////////////////get///////////////////////////////////
    //------------------------------------------------------------
    var sahMi, arrMi;
    this.getIz=function(_c3d){
        sahMi++;        
        if(_c3d.iz!=undefined){
            var o=0
            if(_c3d.iz.renderOrder!=undefined){
                if(o==0)o={}
                o.renderOrder=_c3d.iz.renderOrder;
            }

            if(_c3d.iz.bs!=undefined){
                if(o==0)o={}
                o.bs=_c3d.iz.bs;
            }


            if(_c3d.iz.mod!=undefined){
                if(o==0)o={}
                o.mod=_c3d.iz.mod;
            }
            if(_c3d.iz.position!=undefined){
                if(o==0)o={}
                o.position=_c3d.iz.position;
            }
            if(_c3d.iz.scale!=undefined){
                if(o==0)o={}
                o.scale=_c3d.iz.scale;
            }
            if(_c3d.iz.rotation!=undefined){
                if(o==0)o={}
                o.rotation=_c3d.iz.rotation;
            }
            if(_c3d.iz.visible!=undefined){
                if(o==0)o={}
                o.visible=_c3d.iz.visible;
            }
            if(_c3d.iz.material!=undefined){
                if(o==0)o={}
                
                o.material=_c3d.iz.material;
            }
            if(o!=0)o.sah=sahMi;
            arrMi.push(o)
        }else{
            arrMi.push(0)
        }

        if(_c3d.children && _c3d.notPar==undefined){
            for (var i = 0; i < _c3d.children.length; i++) {
                this.getIz(_c3d.children[i])
            }
        }        
    }

    this.getMod=function(_c3d){
        
        sahMi=-1;
        arrMi=[]
        this.getIz(_c3d)
        return arrMi;
    }
    
    ////////////////////////set///////////////////////////////////
    //------------------------------------------------------------

    var aa
    this.setIz=function(_c3d, _bool){
        sahMi++;
        if(aa[sahMi]){
            if(aa[sahMi]!=0){
                _c3d.iz={}
               

                if(aa[sahMi].mod!=undefined){
                    if(_bool)_c3d.iz.mod=aa[sahMi].mod;
                    

                    var o=new THREE.Object3D()

                    var ii=0;
                    for (var i = 0; i < _c3d.parent.children.length; i++) {
                        if(_c3d.parent.children[i].uuid==_c3d.uuid)ii=i;
                    }

                    o.notPar=true
                    _c3d.parent.add(o)
                    _c3d.parent.remove(_c3d)

                    o.parent.children.splice(o.parent.children.length-1,1)
                    o.parent.children.splice(ii,0,o)
                    
                    self.par.getId(aa[sahMi].mod, function(c3d){
                        o.add(c3d)
                    })
                }



                if(aa[sahMi].renderOrder!=undefined){
                    if(_bool)_c3d.iz.renderOrder=aa[sahMi].renderOrder
                    _c3d.renderOrder =  aa[sahMi].renderOrder
                }

                if(aa[sahMi].bs!=undefined){
                    if(_bool)_c3d.iz.bs=aa[sahMi].bs;
                    _c3d.bs =  aa[sahMi].bs;
                }


                if(aa[sahMi].position!=undefined){

                    if(_bool)_c3d.iz.position=aa[sahMi].position                   
                    _c3d.position.set(aa[sahMi].position.x,aa[sahMi].position.y,aa[sahMi].position.z)                   

                }
                if(aa[sahMi].scale!=undefined){
                    if(_bool)_c3d.iz.scale=aa[sahMi].scale
                    _c3d.scale.set(aa[sahMi].scale.x,aa[sahMi].scale.y,aa[sahMi].scale.z)
                }
                if(aa[sahMi].rotation!=undefined){
                    if(_bool)_c3d.iz.rotation=aa[sahMi].rotation
                    _c3d.rotation.set(aa[sahMi].rotation.x,aa[sahMi].rotation.y,aa[sahMi].rotation.z)  
                }            
                if(aa[sahMi].visible!=undefined){
                    if(_bool)_c3d.iz.visible=aa[sahMi].visible
                    _c3d.visible =  aa[sahMi].visible
                }

                if(aa[sahMi].material!=undefined){   
                    if(_c3d.material){
                        if(_c3d.oldName==undefined){
                            _c3d.oldName=_c3d.material.name
                        }
                        if(_bool)_c3d.iz.material=aa[sahMi].material
                            
                        _c3d.material= self.par.matDop.getIDObj(aa[sahMi].material); 
                        

                    } 
                }
            }
        }else{
            //return
        }           
       
        if(_c3d.children && _c3d.notPar==undefined){
            for (var i = 0; i < _c3d.children.length; i++) {
                this.setIz(_c3d.children[i])
            }
        }        
    }

    this.setMod=function(_c3d_,_a,b){        
       
        if(typeof _a != "object")return
        if(_a[0]==undefined)return  
        
        aa=_a
        sahMi=-1
        
        this.setIz(_c3d_,b)
     
    }

    ////////////////////////MAT///////////////////////////////////
    //------------------------------------------------------------   

    this.setMat=function(_c3d,_mat,_name,_bool){
        
        if(_bool!=undefined)  _bool=true
        if(_c3d.material!=undefined){            
            if(_c3d.oldName==undefined){                
                _c3d.oldName=_c3d.material.name;
            }
            //if(typeof _mat=="string")
                _mat=menedsherMaterial.geterMat.getIDReturn(_mat)
         
            if(_name==null){
                _c3d.material=_mat;
                if(_c3d.iz==undefined)_c3d.iz={}
                _c3d.iz.material= _mat.idUz;                
            }
            else{                         
                if(_c3d.oldName){ 
                    if(_c3d.oldName.indexOf(_name)!=-1){
                        

                        _c3d.material=_mat;  
                        if(_c3d.iz==undefined)_c3d.iz={}
                        _c3d.iz.material= _mat.idUz; 

                       
                    }
                }
            }            
        }

        if(_c3d.children){
            if(_c3d.notPar==undefined){
                for (var i = 0; i < _c3d.children.length; i++) {
                    this.setMat(_c3d.children[i],_mat,_name,_bool); 
                }
            }
        }
    }


}
