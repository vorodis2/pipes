
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



хронитель дерева
*/


import { Room } from './room/Room.js';
import { TudaSuda } from './TudaSuda.js';
import { SDebug } from './SDebug.js';

export class Scane3d  {
  	constructor(glaf,fun) {  		
  		this.type="Scane3d";
  		var self=this;
        this.par=glaf
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this._bactive=true;//драгим сцену

  		//this._sahMenu=0
        this.visi3D=glaf.visi3D
  		this.content3d = new THREE.Object3D();       
  		glaf.content3d.add(this.content3d);
        this.dCont=new DCont(this.par.dCont);
        

        this.animatS3D=new AnimatS3D(this) //Хранитель матов для кнопок и анимашки
        this.tudaSuda=new TudaSuda(this, function(type, param){ //сохроняшка действий           
            fun(type, param);
        }) 
        this.room=new Room(this, function(type, param){ //основа 3д контента и пол           
            fun(type, param);
        })
        this.foto3dLarvij=new Foto3dLarvij(this);//вото сцены        
       
        this.sDebug=new SDebug(this, function(type, param){ //дебаги           
            
        })

        

        /*
        this.startDebag=function(){
              
        }*/

        this.unDate=function(){
            if(glaf.scane2d.boolMenuActiv==false)tStyle.obj3dGron.drag()
            this.room.upDate();
        }

        this.ss=1
  		this.sizeWindow = function(w,h,s){ 
            this.ss =s;		
  		    this.room.sizeWindow(w,h,s); 
            this.animatS3D.sizeWindow(w,h,s);
            
            this.sDebug.sizeWindow(w,h,s);
  		}

        this.sobKey = function(tip,e,arrNa){ 
            this.sDebug.sobKey(tip,e,arrNa);
            this.room.sobKey(tip,e,arrNa);
        }
  	}

    set bactive(value) {
        if(this._bactive!=value){
            this._bactive= value;
            this.animatS3D.active=value;                       
        }
    }    
    get bactive() { return  this._bactive;}
}



//Хранитель матов для кнопок и анимашки
export class AnimatS3D  {
    constructor(par) { 
        this.par=par
        var self=this;
        this._active=true;//драгим сцену
        this.num=1;
        this.dCont=new DCont(this.par.dCont);
        this.array=undefined;//this.par.room.array;
        this.room

        var obj={}
        obj.geometry= new THREE.CylinderGeometry( 1, 1, 1, 32,5,true );
        obj.geometry1 = new THREE.CircleGeometry( 1, 32);        
        obj.material = new THREE.MeshBasicMaterial({color:0xffffff,transparent:true } );

        obj.texture1 = new THREE.TextureLoader().load('resources/image/p1.png');            
        obj.material1 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture1,transparent:true});
        
        obj.texture2 = new THREE.TextureLoader().load('resources/image/p2.png');            
        obj.material2 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture2,transparent:true});

        obj.texture3 = new THREE.TextureLoader().load('resources/image/p3.png');            
        obj.material3 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture3,transparent:true});

        obj.texture4 = new THREE.TextureLoader().load('resources/image/p4.png');            
        obj.material4 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture4,transparent:true});

        obj.gp= new THREE.PlaneGeometry( 1, 1);
        obj.mp = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, side:THREE.DoubleSide});

        obj.dCont=this.dCont;    
        obj.visi3D= this.par.par.visi3D;

        obj.animat=this;            
        tStyle.obj3dGron=obj;

        tStyle.obj3dGron.drag=function(){
            for (var i = 0; i < self.room.array.length; i++) {
                self.room.array[i].butDrag.fun_rotationZ()
            } 
            tStyle.obj3dGron.visi3D.intRend = 1;
            setTimeout(function() {
                for (var i = 0; i < self.room.array.length; i++) {
                    self.room.array[i].butDrag.fun_rotationZ()
                } 
                tStyle.obj3dGron.visi3D.intRend = 1;
            }, 50); 
            setTimeout(function() {
                for (var i = 0; i < self.room.array.length; i++) {
                    self.room.array[i].butDrag.fun_rotationZ()
                } 
                tStyle.obj3dGron.visi3D.intRend = 1;
            }, 150);
        }

        this.tween1 = new TWEEN.Tween(this.par.content3d.position);
        this.tween1.onUpdate(function(){
            tStyle.obj3dGron.visi3D.intRend = 1;            
        })

        this.dragRoom=function(b,t){
            if(t==undefined)t=0
            var y=0;
            if(b==true){
                if(self.par.room.niz.bbb==true){
                    y=-self.par.room.niz.hh2/2;
                }  
            }  


            self.tween1.stop();
            self.tween1.to({y:y},t).start();  
        }
        tStyle.obj3dGron.dragRoom=this.dragRoom;

        this.tween = new TWEEN.Tween(this);




        this.tween.onUpdate(function(){
            dddd()
        })

        function dddd(){
            tStyle.obj3dGron.visi3D.intRend = 1;
            obj.material.opacity=self.num;
            obj.material1.opacity=self.num;
            obj.material2.opacity=self.num;
            obj.material3.opacity=self.num;
            obj.mp.opacity=self.num*0.3;

            tStyle.obj3dGron.dCont.alpha=self.num;

            tStyle.obj3dGron.visi3D.xVerh = (self.posOld.x*(1-self.num) + self.posNew.x*(self.num));
            tStyle.obj3dGron.visi3D.yVerh = (self.posOld.y*(1-self.num) + self.posNew.y*(self.num));
            tStyle.obj3dGron.visi3D.zVerh = (self.posOld.z*(1-self.num) + self.posNew.z*(self.num));
            tStyle.obj3dGron.visi3D.rotationX = (self.posOld.rx*(1-self.num) + self.posNew.rx*(self.num));
            tStyle.obj3dGron.visi3D.rotationZ = (self.posOld.rz*(1-self.num) + self.posNew.rz*(self.num));
            tStyle.obj3dGron.visi3D.zume = (self.posOld.zume*(1-self.num) + self.posNew.zume*(self.num));

            for (var i = 0; i < self.room.array.length; i++) {
                self.room.array[i].butDrag.fun_rotationZ()
            }
        }

        this.tween.onComplete(function(){
            tStyle.obj3dGron.visi3D.intRend = 1;
            if(self._active==true){
                self.vS(false);
            }
        })

        this.posOld={x:0,y:0,z:0,rx:1,rz:0,zume:1000}
        this.posNew={x:0,y:0,z:0,rx:0,rz:0,zume:1500} 

        var bbbbb=false
        var bs=false
        var bf
        this.dragActiv=function(t){
            

            if(t==undefined){
                if(bbbbb==false){
                    t=0
                    bbbbb=true
                }else{
                    t=500
                }               
            }
            this.vS(true);
            if(this._active==false){              
                this.testZZ()//округляем до диопозона ПИ
                this.posOld.x=tStyle.obj3dGron.visi3D.xVerh;
                this.posOld.y=tStyle.obj3dGron.visi3D.yVerh;
                this.posOld.z=tStyle.obj3dGron.visi3D.zVerh;
                this.posOld.rx=tStyle.obj3dGron.visi3D.rotationX;
                this.posOld.rz=tStyle.obj3dGron.visi3D.rotationZ;
                this.posOld.zume=tStyle.obj3dGron.visi3D.zume;

                
                if(bs==false){
                    bs=true;
                    if(localS.object["visi3D_objinfo"]!=undefined){
                       // tStyle.obj3dGron.visi3D.setObj(localS.object["visi3D_objinfo"])
                    }
                }

                this.num=0;                 
                this.tween.to({num:1},t).start();                
                tStyle.obj3dGron.visi3D.position3d.pause=true;

                this.par.par.menuDiv.menuActiv(true, 500);
                self.par.room.niz.bPtioriti=true
                this.dragRoom(true)//, 500);
            }else{
                if(localS.object['dubag']==true && localS.object["visi3D_objinfo"]!=undefined){
                    this.num=0; 
                    this.par.par.menuDiv.menuActiv(false, 500);
                    self.par.room.niz.bPtioriti=false
                    this.dragRoom(false)//, 500);
                    
                    dddd()
                    tStyle.obj3dGron.visi3D.position3d.pause=false;  
                    tStyle.obj3dGron.visi3D.setObj(localS.object["visi3D_objinfo"])
                }else{
                    this.num=1; 
                    this.tween.to({num:0},t).start();   
                    tStyle.obj3dGron.visi3D.position3d.pause=false;
                     this.par.par.menuDiv.menuActiv(false, 500);
                    self.par.room.niz.bPtioriti=false
                    this.dragRoom(false)//, 500);
                }
                



               
            }   
        }
 

        var pM=-Math.PI
        var pP=Math.PI 
        this.testZZ=function(){
            if(tStyle.obj3dGron.visi3D._rotationZ>=pM &&tStyle.obj3dGron.visi3D._rotationZ<=pP){
                return
            }
            if(tStyle.obj3dGron.visi3D._rotationZ<pM){
                tStyle.obj3dGron.visi3D.rotationZ+=Math.PI*2
                this.testZZ()
                return
            }

            if(tStyle.obj3dGron.visi3D._rotationZ>pP){
                tStyle.obj3dGron.visi3D.rotationZ-=Math.PI*2
                this.testZZ()
                return
            }
        }

        this.boolS=undefined;
        this.vS=function(b){
            this.boolS=b;
            tStyle.obj3dGron.dCont.visible=b;
            if(this.room==undefined)return
            for (var i = 0; i < this.room.array.length; i++) {
                this.room.array[i].butDrag.active=b
            }
        }

        this.setRoom=function(room,scane2d) {            
            this.room=room;
            this.scane2d=scane2d;
            tStyle.obj3dGron.korektSten=scane2d.stens.korektSten;

            if(this.boolS)this.vS(this.boolS)

            //setTimeout(function() {

                self.par.bactive=false

            /*}, 10);*/
        }


        this.wh=10000
        
        this.mesh=new THREE.Mesh(new THREE.PlaneGeometry( this.wh,this.wh ),new THREE.MeshBasicMaterial())
        this.mesh.rotation.x=-Math.PI/2
        this.mesh.name="sykaXZ"
        self.mesh.layers.set(31); 
        this.dF;
        this.pointStart=new THREE.Vector3()

        this.setPoint = function(e,c3d,f){                      
            if(e==undefined)return
            this.dF= f;
            this.pointStart.set(e.point.x,e.point.y,e.point.z);
            this.startP(this.pointStart,c3d) 
        }

        this.boolDrag=false
        this.startP = function(p,c3d){
            if(this.boolDrag==true)return

            this.boolDrag=true    
            tStyle.obj3dGron.visi3D.event3DArr.poiskName=this.mesh.name;
            tStyle.obj3dGron.visi3D.scene.add(this.mesh);
            this.mesh.position.set(p.x,p.y,p.z);
            tStyle.obj3dGron.visi3D.addChildMouse(this.mesh);
            if (dcmParam.mobile==false){
                document.addEventListener("mouseup", self.mouseup);                
            }
            else{
                document.addEventListener("touchend", self.mouseup);
            } 
            
            tStyle.obj3dGron.visi3D.intRend=1;
            tStyle.obj3dGron.visi3D.addEvent("move", self.move);
        }

        var rv=new THREE.Vector3()
        self.move = function (e) {
            if(e){
                if(e.target)if(e.target.name==self.mesh.name)
                if(e.uv){
                    rv.x=(e.uv.x-0.5)*(self.wh)
                    rv.y=(e.uv.y-0.5)*(self.wh)
                    if(self.dF)self.dF("drag",rv);
                }
            }            
        }


        this.mouseup = function (e) { 
        
            self.boolDrag=false; 
            if (dcmParam.mobile==false){
                document.removeEventListener("mouseup", self.mouseup);
            }
            else {
                document.removeEventListener("touchend", self.mouseup);
            }            
            tStyle.obj3dGron.visi3D.removeEvent("move", self.move);
            tStyle.obj3dGron.visi3D.event3DArr.poiskName="xzPoisk"
            tStyle.obj3dGron.visi3D.scene.remove(self.mesh);
            tStyle.obj3dGron.visi3D.removeChildMouse(self.mesh);
            tStyle.obj3dGron.drag();
            if(self.dF)self.dF("up"); 
            tudaSuda.saveMod()            
        }




        this.sizeWindow = function(w,h,s){ 
            if(this._active==false){
                tStyle.obj3dGron.drag()
            }
        }
    }


    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dragActiv()  
            //if(this._active!=true)this.dragActiv(0)  
           // else this.dragActiv()      
        }
    }    
    get active() { return  this._active;} 
}






export class Foto3dLarvij  {
    constructor(par,fun) { 
        this.par=par
        var self=this;
        var aGlaf=this.par.par;
        var room=this.par.room;
        var wOld, hOld,x,z,zume,visOld;
        this.tip="image/png"
        this.get=function(type, w, h, tip){
            if(tip==undefined)this.tip="image/png"
            else this.tip=tip
            var r=null;
            wOld=aGlaf.visi3D.width;
            hOld=aGlaf.visi3D.height;

            x=aGlaf.visi3D.rotationX;
            z=aGlaf.visi3D.rotationZ;
            zume=aGlaf.visi3D.zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                visOld=aGlaf.visi3D.utility.sky.cont3d.visible
            }


            if(type=="base") r=this.getBase(w, h);
            if(type=="arrayVisi") r=this.getArrayVisi(w, h);
            if(type=="original") r=this.getOriginal();
            if(type=="wh") r=this.getWH(w, h);

            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wOld,hOld);
            aGlaf.visi3D.rotationX=x;
            aGlaf.visi3D.rotationZ=z;
            aGlaf.visi3D.zume=zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                aGlaf.visi3D.utility.sky.cont3d.visible=visOld;
            }
            aGlaf.visi3D.render();
            return r;
        }


        this.getOriginal=function(){
            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL(this.tip);
            return r;
        }

        this.getWH=function(w, h){
            wOld=aGlaf.visi3D.width;
            hOld=aGlaf.visi3D.height;   
            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                visOld=aGlaf.visi3D.utility.sky.cont3d.visible
                aGlaf.visi3D.utility.sky.cont3d.visible=false;
            }
                
            for (var i = 0; i < aGlaf.scane3d.room.array.length; i++) {
                aGlaf.scane3d.room.array[i].c3dContent.visible=false
            }
            aGlaf.scane3d.room.niz.m.visible=false;
            aGlaf.scane3d.room.niz.mesh.visible=false;


            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);
            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL(this.tip);  


            for (var i = 0; i < aGlaf.scane3d.room.array.length; i++) {
                aGlaf.scane3d.room.array[i].c3dContent.visible=true
            }
            aGlaf.scane3d.room.niz.m.visible=true;
            aGlaf.scane3d.room.niz.mesh.visible=true;


            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wOld,hOld);
            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){                
                aGlaf.visi3D.utility.sky.cont3d.visible=visOld;
            }
            return r;
        }


        this.getBase=function( w, h){
            aGlaf.visi3D.rotationX=1.34;
            aGlaf.visi3D.rotationZ=-0.1;
            aGlaf.visi3D.utility.focus.active=true;
            aGlaf.visi3D.utility.focus.targetObject=aGlaf.content3d; 
            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);           
            aGlaf.visi3D.render();
            this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL(this.tip);
            aGlaf.visi3D.utility.focus.active=false;







            return r;
        } 



        


        this.getOriginalWeb=function(f){


            var r=null;
            wOld=aGlaf.visi3D.width;
            hOld=aGlaf.visi3D.height;

            x=aGlaf.visi3D.rotationX;
            z=aGlaf.visi3D.rotationZ;
            zume=aGlaf.visi3D.zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                visOld=aGlaf.visi3D.utility.sky.cont3d.visible
            }

            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");


            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wOld,hOld);
            aGlaf.visi3D.rotationX=x;
            aGlaf.visi3D.rotationZ=z;
            aGlaf.visi3D.zume=zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                aGlaf.visi3D.utility.sky.cont3d.visible=visOld;
            }
            aGlaf.visi3D.render();

            if(aGlaf.webCamera.active==false){
                f(r)
            }else{


                let img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    let  canvas = document.createElement('canvas'); // канвас для картинки
                    let context = canvas.getContext('2d'); // контекст картинки
                    canvas.width=this.width;
                    canvas.height=this.height;

                    let aW=aGlaf.webCamera.video.style.width.split("px");
                    let aH=aGlaf.webCamera.video.style.height.split("px");
                    let aX=aGlaf.webCamera.video.style.left.split("px");
                    let aY=aGlaf.webCamera.video.style.top.split("px");                    
                    context.drawImage(aGlaf.webCamera.video, aX[0]*1, aY[0]*1, aW[0]*1, aH[0]*1); 
                    context.drawImage(this, 0, 0, wOld, hOld); 
                    f(canvas.toDataURL("image/png"));
                };
                img.src = r;
            }

            
        }






        this.getArrayVisi=function( w, h){
            var a=[]            
            var cc=aGlaf.visi3D.utility.sky.color;
            aGlaf.visi3D.utility.sky.color=0xffffff
            aGlaf.visi3D.utility.focus.active=true;
            aGlaf.visi3D.utility.focus.targetObject=aGlaf.content3d; 
            room.niz.mesh.visible=false;
            room.niz.m.visible=false
            room.niz.c3dl.visible=false
            var fov=aGlaf.visi3D.camera.fov
            aGlaf.visi3D.camera.fov = 15;
            aGlaf.visi3D.camera.updateProjectionMatrix();
          
            this.par.room.lmActive=true
            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);
            for (var i = 0; i < room.array.length; i++) {
                room.array[i].krai3D.content3d.visible=false;
                room.array[i].krai3D1.content3d.visible=false;
            } 

            //0
            if(room.array[0].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=-Math.PI/2; 
                this.content3d;
                this.visiSten(false);
                room.array[0].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }


            if(room.array[1].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=0;
               this.content3d;
                this.visiSten(false);
                room.array[1].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }

            if(room.array[2].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=Math.PI/2;
                this.content3d;
                this.visiSten(false);
                room.array[2].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }


            for (var i = 0; i < room.array.length; i++) {
                room.array[i].krai3D.content3d.visible=true;
                room.array[i].krai3D1.content3d.visible=true;
            }

            room.niz.mesh.visible=true
            aGlaf.visi3D.utility.sky.color=cc
            room.niz.mesh.visible=true;
            room.niz.m.visible=true;
            room.niz.c3dl.visible=true;            
            this.par.room.lmActive=false 
            aGlaf.visi3D.camera.fov = fov;
            aGlaf.visi3D.camera.updateProjectionMatrix();
            aGlaf.visi3D.utility.focus.active=false;
            return a;
        }

        this.visiSten=function(b){
            if(b==true){
                for (var i = 0; i < room.array.length; i++) {
                    room.array[i].contPoz3d.visible=room.array[i].active;
                }
            }else{
                for (var i = 0; i < room.array.length; i++) {
                    room.array[i].contPoz3d.visible=false;
                }
            }
        }

    }
}