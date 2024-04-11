
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.
*/


import { DDebug } from '../../component/dDebug/DDebug.js';


export class SDebug  {
  	constructor(par,fun) {  		
  		this.type="SDebug";
  		var self=this;
        this.par=par
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=par
        var self=this;
        this._active=false;
        this.dCont=new DCont();
        this.saveModel=undefined;
    
        this.pO=undefined;
        


        /*
        //scan2d
        setTimeout(function() {            
            if(main.glaf.scane3d.dubag.active==true){
                self.par.scane3d.bactive=true;
                self.par.menuDiv.mHelp.testStartHelp()                
            }
        }, 500);

        //LMain
        if(localS.object.dubag!=undefined){
                if(localS.object.dubag==true){                      
                    self.glaf.scane3d.dubag.active=true;                                         
                }
            }  
            if(localS.object.model!=undefined){
                if(localS.object.model!=null){                   
                    if(self.glaf.scane3d.dubag.saveModel){                      
                        self.glaf.scane3d.dubag.saveModel.setModel(localS.object.model)
                    }
                }
            }
        */


        function PrintElem(elem) {
            Popup($(elem).html());
        }
        function Popup(data){
            var mywindow = window.open('xz', 'xz', 'height=600,width=800');
            mywindow.document.write('<html><head>');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); 
            mywindow.focus(); 
            mywindow.print();
            mywindow.close(); 
            return true;
        }

        var dContXZ=null
        var dContSave=null
        var dContVizi2d=null
        this.dCPipes
        this.init=function(){
            if(this.saveModel!=undefined)return

            window.dDebug=this.dDebug=new DDebug(null,0,0,"xz3d_larvij",this.param);    

            dContXZ=window.dDebug.getDDcont("xz")
            dContSave=window.dDebug.getDDcont("save")
            dContVizi2d=window.dDebug.getDDcont("Vizi2d")
            var dCPipes=this.dCPipes=window.dDebug.dCPipes=window.dDebug.getDDcont("Pipes");





            let oi=window.dDebug.getBase("Intefes")
            var ooo={x:3, y:4}
            
            oi.object=window.localS.object.sParam;

            oi.tipRide=true;
            oi.funDrag=function(){                
                window.localS.save()
                main.dragParam()
                
            } 
            new DButton(oi.dCont, 10,10,"revert",function(){
                
                for(var s in localS.object.sParam){
                    localS.object.sParam[s]=undefined
                }
                for(var s in main.sParam){
                    localS.object.sParam[s]=main.sParam[s]
                }
                window.localS.save();
                main.dragParam()
                
                window.dDebug.addObject(oi.object,true,oi.funDrag)
            })

           
            this.saveModel=new SaveModel(this, dContSave)
            this.boolCTRL=false;


            this.pO=new DParamObject(dContXZ, 950,0)

            this.color=new DColor(dContXZ,800,0,"#ffffff",function(){
                self.par.room.color=this.value;
            })
            this.color.width=150;

            this.but=new DButton(dContXZ,700,0,"testFilt",function(){
                self.par.visi3D.efect.renderPass=true;
                self.par.visi3D.efect.outlinePass=true;
                self.par.visi3D.efect.shaderPass=true;
                self.pO.addObject(self.par.visi3D.efect.array[3].effect, true)
                self.par.visi3D.render()
            })

            this.but=new DButton(dContXZ,500,50,"тест печать",function(){
                self.par.par.menuDiv.mPrint.start(0,function(div){
                    PrintElem(div)
                });
            })

            this.but=new DButton(dContXZ,500,100,"тест печать2",function(){
                self.par.par.menuDiv.mPrint.start(1,function(doc){
                    doc.output('dataurlnewwindow');                 
                });
            })
            this.but=new DButton(dContXZ,600,50,"get Text",function(){
                self.ctraetText()
            })
            this.but=new DButton(dContXZ,600,80,"get Мин",function(){
                self.ctraetText(1)
            })

            new DButton(dContXZ,300,50,">",function(){
                if(localS.object.positionVisi3d)self.par.visi3D.setObj(localS.object.positionVisi3d)
            }).width=30           
            new DButton(dContXZ,331,50,"save",function(){
                localS.object.positionVisi3d=self.par.visi3D.getObj();
                localS.save()
            }).width=40



            this.but=new DButton(dContXZ,500,130,"arrBMP",function(){
                var a=self.par.foto3dLarvij.get("arrayVisi",1500,1500,"image/jpeg");
                var wh=600
                for (var i = 0; i < a.length; i++) {
                    var bb=new DButton(dContXZ,200+i*wh,250,"")
                    bb.width=bb.height=wh
                    bb.loadImeg(a[i])
                }                
            })

            this.but=new DButton(dContXZ,400,50,"тест pdf",function(){                
                self.par.par.menuDiv.mPrint.start(1,function(doc){
                    doc.save("test.pdf");
                });
            })

            this.but=new DButton(dContXZ,700,86,"help Очистка",function(){
                localS.object.help=0;
                localS.object.help2=0;
                localS.save()
            })

            this.but=new DButton(dContXZ,500,2,">>>>>>",function(){
                self.par.par.menuDiv.menuActiv(true, self.slid.value);
            })
            this.but=new DButton(dContXZ,600,2,"<<<<<",function(){
                self.par.par.menuDiv.menuActiv(false, self.slid.value);
            })

            this.slid=new DSliderBig(dContXZ, 300,2, function(){
                localS.object.sts=this.value;
                localS.save()
            }, "размер текста 3D", 0, 18);
            this.slid.value=500;
            this.slid.width=200;

            this.checkBox=new DCheckBox(dContXZ,800,30,"visiMark",function(){
                self.par.room.visiMark=this.value;               
            })
            this.checkBox.value=self.par.room.visiMark;


            this.checkBox=new DCheckBox(dContXZ,800,60,"stopDrag",function(){
                self.par.bactive=this.value;               
            })
            this.checkBox.value=self.par.bactive;

            this.checkBox=new DCheckBox(dContXZ,800,90,"lmActive",function(){
                self.par.room.lmActive=this.value;               
            })
            this.checkBox.value=self.par.room.lmActive;

            this.wind2=new DWindow(dContXZ,900,110,"Настройки твинов")
            this.wind2.width=250
            this.wind2.height=150+32
           
            var pp=self.par.par.visi3D.position3d
       
            this.slid=new DSliderBig(this.wind2.content, 2,2, function(){
                pp.ppp=this.value
            }, "% от реала", 0, 1);
            this.slid.width=this.wind2.width-4;
            this.slid.value=pp.ppp

            this.slid0=new DSliderBig(this.wind2.content, 2,50, function(){
                pp.pppW=this.value
            }, "% колесико", 0, 1);
            this.slid0.width=this.wind2.width-4;
            this.slid0.value=pp.pppW
            

            this.slid1=new DSliderBig(this.wind2.content, 2,100, function(){
                pp.pTime=this.value
            }, "время милСек", 0, 2000);
            this.slid1.width=this.wind2.width-4;
            this.slid1.value=pp.pTime;

            let aa=[]
            for (var i = 0; i < dContXZ.children.length; i++) {
                //aa.push(dContXZ.children[i]);
                dContXZ.children[i].x-=300
            }



            this.fotoXZ=new FotoXZ(this,dContSave);




            //dContXZ

            setTimeout(function() {            
                
                self.par.par.scane3d.bactive=true;
                self.par.par.menuDiv.mHelp.testStartHelp()  
                self.par.par.dCont.add(dDebug)
                if(localS.object.model!=undefined){
                                   
                                         
                        self.saveModel.setModel(localS.object.model)
                        
                   
                }              
                
            }, 500);
        }


        this.setBlok=function(blok){
            if(this._active==false)return            
            var o=blok.getObj();
            var s=JSON.stringify(o);
            var a=s.split('"');
            var ss=''
            for (var i = 0; i < a.length; i++) {
                if(i==a.length-1)ss+=a[i];
                else ss+=a[i]+"|";
            }
            this.saveModel.textArae.text=self.saveModel.textArae.text=ss;//JSON.stringify(o); 
        }

        this.sobKey = function(tip,e,arrNa){
            if(tip=="up" && arrNa.indexOf(17)!=-1 && arrNa.indexOf(81)!=-1 ){
                //self.active =  !self.active
                localS.object.dubag=!self.active;
                localS.save();
                location.reload()
            }
        }
        
        var strDin=""
        var oT={}
        this.ctraetText=function(n){
            oT={}
            strDin="";
            let acsv=this.par.par.main.csvConfigArray;
            for (var i = 0; i < acsv.length; i++) {
                if(acsv[i].color){
                    for (var s in acsv[i].color) {
                        this.sao(acsv[i].color[s],n)
                    }
                }                
            }
            console.warn(strDin)
        }
        this.sao=function(o,n){
            
            if(o.art==undefined)return
            if(o.art=="0")return 
            if(o.art=="")return     
            if(o.art.length>2 && o.art[0]=="m"&& o.art[1]=="_")return 
            if(oT[o.art]!=undefined)return 
            oT[o.art]=o
            if(n && n==1){
                strDin+=o.art+";" +o.pri +"\n" 
                return
            }
            strDin+=o.art+";" +o.pri+";" +o.art+"XZ;"+o.niz +"\n" 
              
        } 

        var w, h, s;
        this.sizeWindow = function(_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }                        
            if(w && this._active==true)window.dDebug.sizeWindow(w,h,s)           
        }

        if(localS.object.dubag!=undefined){
            if(localS.object.dubag==true){                      
                self.active=true;                                         
            }
        }  
       /* if(localS.object.model!=undefined){
            if(localS.object.model!=null){                   
                if(self.glaf.scane3d.dubag.saveModel){                      
                    self.saveModel.setModel(localS.object.model)
                }
            }
        } */

        

    
    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            if(this._active==true) {
                this.init();
                this.par.dCont.add(this.dCont)
                this.sizeWindow()
            }else{
                this.par.dCont.remove(this.dCont)
            } 
            //this.par.par.menuDiv.menuSave.otprovlashka.window.visible=this._active
            
        }
    }
    get active() { return  this._active;}
}






export class FotoXZ {
    constructor(par,dCont) {
        this.par=par
        var self=this;
        this.dCont=new DCont(dCont)
        this.dCont.x=0
        this.dCont.y=0

        this.panel1=new DPanel(this.dCont,0,0)
        this.panel1.height=20
        this.panel1.width=20
        this.image=new DImage(this.panel1,2,2)


        this.panel=new DPanel(this.dCont,-2,-2)
        this.panel.height=36
        this.panel.width=124


        this.input=new DInput(this.dCont,0,0,"170"); 
        this.input.width=30;
        this.input1=new DInput(this.dCont,32,0,"170"); 
        this.input1.width=30;

        this.chek=new DCheckBox(this.dCont,66,8," ")

        this.but=new DButton(this.dCont,85,0,"get",function(){
            let b64=funFoto();
          
            var down = document.createElement('a');
                down.href = b64;
                down.download = 'pic.png';
                down.click();

            self.panel1.width =self.input.value*1+4
            self.panel1.height =self.input1.value*1+4 
            self.panel1.y=38
            self.image.width =self.input.value*1
            self.image.height =self.input1.value*1
            self.image.link=b64 
        }) 
        this.but.width=34;

        this.fpGet = this.par.par.foto3dLarvij   
        function funFoto(){

      
            let b64=self.fpGet.get("wh",self.input.value*1,self.input1.value*1)
            return b64
        }
    }
}





export class SaveModel  {
    constructor(par,dCont) { 
        this.par=par
        var self=this;

        this.json ='{"color":"#ffffff","children":[{"type":"Sten","width":300,"height":275,"active":false,"children":[]},{"type":"Sten","width":300,"height":275,"active":true,"children":[{"type":"BPieceTop","id":14,"x":72.94569430772117,"y":186.2014636180158,"children":[{"type":"BPieceObject","id":39,"x":0,"y":1.4255789905515641,"intSah":0,"intSah1":0,"polka":false,"children":[],"idColor":"m_8"}]}]},{"type":"Sten","width":300,"height":275,"active":false,"children":[]}]}'
        
        this.setModel=function(strObj){

            var o = JSON.parse(strObj);
            self.textArae.text=strObj;             
            self.setObj(o);                
            self.par.par.par.menuDiv.menuActiv(false,500)  
        }        

        this.window=new DWindow(dCont,200,0,"SaveModel");
        this.window.width=200;
        this.window.height=150;        

        this.bat1=new DButton(this.window.content, 0, 115, "saveLS", function(){
            var oo=self.getObj()            
            var s=JSON.stringify(oo);            
            localS.object.model=s
            localS.save()
        })
        this.bat2=new DButton(this.window.content, 100, 115, "clearLS", function(){                   
            localS.object.model=null
            localS.save()
        })

        this.batGET=new DButton(this.window.content, 0, 0, "get", function(){
            var oo=self.getObj() 
        
            var s=JSON.stringify(oo);            
            self.textArae.text=s;
        })
        this.batSET=new DButton(this.window.content, 100, 0, "set", function(){
            var o= JSON.parse(self.textArae.text);  
            self.setObj(o);
        })
        this.textArae=new DTextArea(this.window.content, 0, 32, this.json)
        this.textArae.height=this.window.height-32-32;
        this.textArae.width=this.window.width;        

        this.setObj=function(o){            
            this.par.par.room.setObj(o);
        }
        this.getObj=function(){
            return this.par.par.room.getObj()
        }
    }
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