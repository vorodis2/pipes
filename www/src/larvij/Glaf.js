
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

sdfsf
мост иницилизация основ, глобал дополнение, грабли на мобильники
*/



import { MVisi3D } from '../visi3D/MVisi3D.js';
import { SceneSB } from '../visi3D/SceneSB.js';
import { CubeMap } from '../visi3D/CubeMap.js';

import { MenuDiv } from './scane2d/MenuDiv.js';
import { Galleres } from './scane2d/Galleres.js';
import { Scane2d } from './scane2d/Scane2d.js';
import { Scane3d } from './scane3d/Scane3d.js';
import { TCInfa } from './scane2d/TCInfa.js';



//import { WebCamera } from './WebCamera.js';

import { Calc } from '../component/Calc.js';

import { TLabel } from '../t3d/TStyle.js';





export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this;
  		this.content3d = new THREE.Object3D();
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        window.glafBig=this
        this.debug=false;
        if(localS.object['dubag'])this.debug=localS.object['dubag']
        
        this.scale=1;
		this.dCont=undefined;
        this.main=main;
        this.par=main;
        this.otstup=5;
        this.widthBig=182;

        this.dCont=new DCont(main.contentHTML); 
        //let gt=new GT()


        //u1 Включена замена полок апдейт up1_10_06_2020 
        this.up1 = false; //смена полок 55 иди
        this.up1Obj = undefined;

        this.urlSave = null;
        
        if(main.confText.up1){ 
            if(main.confText.up1.active){
                this.up1 = true
                this.up1Obj = main.confText.up1;
            }else{
                this.up1 = false;
                this.up1Obj = main.confText.up1;
                if(main.localStorage.object.up1!=undefined&&main.localStorage.object.up1.sahTime!=15){   
                    main.localStorage.object.up1.sahTime=15
                    main.localStorage.save();
                }                  
            }
        }




        
        //-----------------------




        //инфа о сервере
        this.resurs="resources/";
        this.resursPlus="data/";
        this.resursData=this.resurs+this.resursPlus;
        this.plusLink="";
        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index")

        this.debug=false;
        if(main.localStorage.object.dubag==true)  this.debug=true;  
         
        this.server=aa[0];
        if(main.localStorage.object.otstup!=undefined)this.otstup=main.localStorage.object.otstup;

        window.calc=  new Calc();//мат класс
        
        this.tCInfa=new TCInfa(this.par.confText);
        dcmParam.tCInfa=this.tCInfa;
        dcmParam.confText=this.par.confText;


        //основные цвета и настройки текстов

        tStyle._fontFamily="SFUIDisplay-Light";
        tStyle.glaf=this;
        
        var t=new TLabel(this.content3d,0,0," ");
        t._fontFamily="SFUIDisplay-Bold";
        t.text="1234567890.,";
        t.object3d.parent.remove(t.object3d);
        
        //метод для инпутов проекта
        dcmParam.addComponent=[]
        dcmParam.styleInput=function(ibput,text,_h,_sf){
            var hh=32
            if(_h)hh=_h

            var sf=20
            if(_sf)sf=_sf   
            if(ibput.type=="DInput" || ibput.type=="DTextArea"){    
                


                
                if(text!=undefined){
                    var t=text;
                    ibput.text=t;
                    ibput.funFocus=function(){                      
                        if(this.boolFocus==true && this.text==t){
                            this.text="";
                        }
                        if(this.boolFocus==false && this.text==""){
                            this.text=t;
                        }                    
                    }
                }
                

            }

            if(ibput.type=="DWindowS"){

            }
            self.dragAC(ibput)
            dcmParam.addComponent.push(ibput)           
        }

        this.dragAC = function(ibput){
            
            if(ibput.type=="DInput" || ibput.type=="DTextArea"){   
                 
                if(ibput.type=="DInput") ibput.height=localS.object.sParam.whInput
                if(ibput.type=="DTextArea") ibput.height=localS.object.sParam.whInput * 3   
                ibput.borderRadius=localS.object.sParam.borderRadius1
                ibput.fontFamily=localS.object.sParam.fontFamily1
                ibput.fontSize=localS.object.sParam.fontSize;
                ibput.color=localS.object.sParam.color//Text1

                ibput.object.style.background=dcmParam.compToHexArray(dcmParam.hexDec(localS.object.sParam.color), -localS.object.sParam.sahColor*2);
                //ibput.object.style.color1
                ibput.numLine=0;
            }
            if(ibput.type=="DButton"){  
                ibput.height=localS.object.sParam.whInput
                ibput.borderRadius=localS.object.sParam.borderRadius1
                ibput.fontFamily=localS.object.sParam.fontFamily
                ibput.fontSize=localS.object.sParam.fontSize;
                //ibput.color=localS.object.sParam.color//Text1
                ibput.color=dcmParam.compToHexArray(dcmParam.hexDec(localS.object.sParam.color), -localS.object.sParam.sahColor*2);
            }
            if(ibput.type=="DWindowS"){ 
                ibput.panel.color1=localS.object.sParam.color1
                ibput.panel1.color1=localS.object.sParam.color1
                ibput.panel.borderRadius=localS.object.sParam.borderRadius1
                ibput.panel1.borderRadius=localS.object.sParam.borderRadius1

                ibput.label.fontSize=localS.object.sParam.fontSize;
                ibput.label.fontFamily=localS.object.sParam.fontFamily1
            }

            if(ibput.type=="DLabel"){ 
                ibput.color=localS.object.sParam.colorText
               
                ibput.fontSize=localS.object.sParam.fontSize;
                ibput.fontFamily=localS.object.sParam.fontFamily1
            }
        }


        this.dContVisi3d=new DCont(this.dCont); 
        let alphaQ=true
        alphaQ=false
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.dContVisi3d.div, null, dcmParam.mobile, true, true, true, alphaQ);		
		this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        this.visi3D.rotationX=1.63;
        this.visi3D.rotationZ=0.5;
        this.visi3D.zume=450;
        this.visi3D.position3d.isDragPan=true;
        
        //this.visi3D.intRendOk=20;
        
      /*  this.visi3D.cubeMap=new CubeMap();
        this.visi3D.cubeMap.init(this.visi3D.renderer, this.visi3D.scene);
        this.visi3D.getEnvMap = function () {
            return self.visi3D.cubeMap.getTexture();
        };
        this.visi3D.cubeMap1=new CubeMap();
        this.visi3D.cubeMap1.init(this.visi3D.renderer, this.visi3D.scene);
        this.visi3D.getEnvMap = function () {
            return self.visi3D.cubeMap1.getTexture();
        };

        */
        /*this.visi3D.getEnvMap = function () {
            let r=self.visi3D.cubeMap.getTexture()
          
            return self.visi3D.cubeMap.getTexture();
        };*/
        this.visi3D.getEnvMap = function () {           
            return null
        };
        window.visi3D=this.visi3D
       
        this.visi3D.groupObject.add(new THREE.AxesHelper(355));
        
       /* const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
        const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );*/

        

        //хрень принемашка ресурсов и настроек камеры для 
        this.sceneSB=new SceneSB(this.visi3D);    

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (main.objectBase.scene[this.sceneSB.array[i].name] === undefined) {
                main.objectBase.scene[this.sceneSB.array[i].name] = {};                
            }    
           
            this.sceneSB.array[i].setBasa(main.objectBase.scene[this.sceneSB.array[i].name]);
        } 
        this.visi3D.utility.sky.cont3d.visible=false     


        this.visi3D.utility.debug=false;



        if (dcmParam.mobile==false){   
            document.addEventListener('mousewheel', function(e){
                
                self.scane3d.room.fun_rotationZ(self.visi3D._rotationZ, self.visi3D._rotationX)
                self.visi3D.intRend=1;
            })
        }


        ////////////////////////
        ////////////////////////       

        
               
        this.dContPod=new DCont(this.dCont);
        this.dContNad=new DCont();

        this.dragPic = new DDragPic(this.dCont);//драгер картинок
        this.dragPic.whBase=Math.round(120*0.9)//основное разрешение окна  		

        //создаюм геометрию для 3д текста с основными символами, требует N для создание и подвешивает комп
        
        

        


        //основная логика 3д
  		this.scane3d = new Scane3d(this, function(type, param){
            if(type=="visi3d"||type=="intRend"){
                self.visi3D.intRend=1;
                return
            }
            if(type=="onDown")self.scane2d.stens.sob(type, param);                        
        })

        //тама только стены низ право
  		this.scane2d = new Scane2d(this, function(type, param){
            if(type=="visi3d"||type=="intRend"){
                self.visi3D.intRend=1;
                return
            }
            if(type=="upkraiDrag"){
                self.scane3d.room.upkrai()
            }

            if(type=="saveMod"){
                self.scane3d.tudaSuda.saveMod()
            }            
        })  


        //галереи с права
        this.galleres = new Galleres(this, function(type, param){
            if(type=="startObj"){
                self.scane3d.room.menedsher.startObj(param)
            }
            if(type=="idColor"){
                self.scane3d.room.menedsher.mMaterial.geterMat.idColor=param
                self.scane3d.room.menedsher.setIdColor(param)
            }
            if(type=="idNiz"){
                self.scane3d.room.niz.idMat=param
                self.visi3D.intRend=1;
            }
            if(type=="idSten"){
                self.scane3d.room.idSten=param
                self.visi3D.intRend=1;
            }           
        });

        this.dContPod.add(this.scane2d.dC)
        //основной интерфейс 2д
        this.menuDiv = new MenuDiv(this);
        this.menuDiv.setConfig(main.objectBase)
        
        this.scane2d.stens.korektSten.dragMin = this.scane3d.room.dragMin;
        this.dCont.add(this.dContNad);  


       // this.webCamera=new WebCamera(this, this.dCont, document.getElementById('video'), false)  
        
        

        //великая грабля с событиями 
        this.touchmove=function(e){            
            e.preventDefault();

            self.visi3D.position3d.stageMoveNew(e);
            self.visi3D.event3DArr.mousemove(e);
            self.dragPic.mousemove(e);
            self.scane2d.stens.korektSten.mousemoveBig(e);
            self.galleres.array[1].mousemove(e)
            self.menuDiv.mani.minMani.galleryMani.mousemove(e)
            e.stopPropagation();
        }        
        if (dcmParam.mobile==true){            
            window.addEventListener('touchmove', this.touchmove, { passive: false, capture: true });
            this.visi3D.position3d.div.removeEventListener('touchmove', this.visi3D.position3d.stageMoveNew, { passive: false, capture: true });
            window.removeEventListener('touchmove', this.visi3D.event3DArr.mousemove);
            window.removeEventListener("touchmove", this.dragPic.mousemove);            
            window.removeEventListener("touchmove", this.galleres.array[1].mousemove); 
            window.removeEventListener("touchmove", this.menuDiv.mani.minMani.galleryMani.mousemove);             
        }

        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () {            
            self.scane3d.room.fun_rotationZ(this._rotationZ, this._rotationX)
            self.scane2d.fun_rotationZ();
            self.savePos()
           
        }


        this.savePos=function(){ 
            
            this.timeDrag()
        }

        this.drag=function(){
            localS.object["visi3D_objinfo"]=visi3D.getObj()
            
            localS.save()
        }

        this.sah=0;
        //Кидает фун и отработает через тайм если еще не прейдет
        this.timeDrag=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.drag()
            }, 500);
        }


        //открываем новый продукт по ид
        this.openId = function (id) {   
            
            let link = "save/"+id+"/config.json";
            if(this.par.php.key != null) link="users/"+this.par.php.key+"/save/"+id+"/config.json";

            if(this.par.php.urlSave!=null) link=this.par.php.urlSave+id+"/config.json";

           
           
            $.ajax({
                url: link,
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;   



                    self.setObj(oo)
                                  
                },
                error:function function_name(data) {
                    console.error("Что то случилось с конфигом")
                }
            });
        } 

        this.setObj = function (oo) {
            if(self.scane3d.saveModel!=undefined){
                self.scane3d.saveModel.setObj(oo)  
            }  else{
                self.scane3d.room.setObj(oo) 
            } 
        }  

  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {
			this.visi3D.upDate()	
            this.menuDiv.upDate() 
            this.scane3d.unDate()

		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            this.dCont.scale=s
            this.dragPic.scale=s;
            this.dContVisi3d.scale=1/s;
  			this.menuDiv.sizeWindow(w,h,s);
  			this.scane2d.sizeWindow(w,h,s);
  			this.scane3d.sizeWindow(w,h,s);
            this.galleres.sizeWindow(w,h,s);
  			this.visi3D.sizeWindow(0,0,w,h);
           // this.webCamera.sizeWindow(w,h,s); 
            this.dragCent3d();
  		}

        this.activDragDC=true;
        //метод постоновки 3д по центру экрана
        this.dragCent3d = function(){   
            if(this.activDragDC==false)return
           /* this.visi3D.utility.focus.active=true;
            this.visi3D.utility.focus.targetObject=this.content3d            
            self.visi3D.utility.focus.upDate();*/
            self.visi3D.utility.focus.active=false;           
        }
        this.scane3d.animatS3D.setRoom(this.scane3d.room, this.scane2d)


        var arrNa=[]
        this.keydown=function(e){
            if(arrNa.indexOf(e.keyCode)==-1){
                arrNa.push(e.keyCode);
            }
            self.scane3d.sobKey("down", e, arrNa);
            

            /*if(event.keyCode==17)self.boolCTRL=true;
            if(event.keyCode==81&&self.boolCTRL)  {
                self.active =  !self.active
                self.localStorage.object.dubag=self.active;
                self.localStorage.save();
            }*/

        }
        this.keyup=function(e){
            

            self.scane3d.sobKey("up", e, arrNa);
            
            for (var i = 0; i < arrNa.length; i++) {
                if(arrNa[i]==e.keyCode){
                    arrNa.splice(i,1)
                    i=0
                }
            }

            //if(event.keyCode==17)self.boolCTRL=false
            

        }
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup );

        this.dragParam = function () { 
            for (var i = 0; i < dcmParam.addComponent.length; i++) {
                self.dragAC(dcmParam.addComponent[i])
            }

            self.scane2d.dragParam()
            self.galleres.dragParam()

            for (var i = 0; i < self.scane3d.room.array.length; i++) {
                self.scane3d.room.array[i].butDrag.dragParam()
            }

            this.menuDiv.dragParam()
        }
  	}
}