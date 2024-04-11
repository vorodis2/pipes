/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Стойка под элементом
*/
import { Blok } from './Blok.js';
import { TLabel } from '../../../../t3d/TStyle.js';


export class BPieceC2 extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPieceC2";
        this.minH=50;
        var self=this;

        //materialBase3
        this.idCT="idMatObject3";//Тип общего цвета
        this.matBas="materialBase3";//Тип общего цвета
        this._material=roomBig[this.matBas];
        this.boolDinColor=true
        /*if(this._material==undefined){           
            roomBig.idMatObject3 = o.info.array[0].id            
            this.setColorId(o.info.array[0].id)
        }*/
        this.SAH=3.2;

        this.bPC2Line=new BPC2Line(this);

        this.typeSigm=0;  
        if(this.ido3d==316)this.typeSigm=1;
        if(glafBig.debug){

            this.tLabel=new TLabel(self.content3d,5,0,"="+self.idArr)
            this.tLabel.fontSize=4            
        }


        
        this.funInitMod = function(){            
            

            this.bPC2Line.funInitMod();  
            this.rect[4]=2;
            this.rect[3]=3;
            this.rect[0]=-this.rect[3]/2;
            for (var i = 0; i < this.rect.length; i++) {
                this.rect1[i]=this.rect[i]
            }
            this.boxColizi.rectCollisMeshdy.disStick=1
            this.boxColizi.rectCollisMeshdy.width=this.rect[3];
            this.boxColizi.width=this.rect[3];
            this.boxColizi._x=this.rect[0];
            this.boxColizi.sx=this.rect[0];           
            this.dragObjHA(this.boxHelper, this.rect);   

            this.boolDinColor = true   
            

            //self.dmC3dDin=self.dragMaterial.setC3d(this.bPC2Line.cont3d ,277)
              
        }

        this.dragMat2 = function(){
            
            this.bPC2Line.dragMat2()
        }


        var yy
        this.durXY = function(x,y){
            yy=Math.round(y/this.SAH)*this.SAH
            self.y=yy;           
            self.content3d.position.y=yy; 
        }


        //ищем на положение для ребенка//////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        var debMy=false
        var yyw,yu,dd2
        var sahOt=50;
        var point={x:0, y:0} 
        var pointV={x:0, y:0, d:0}  
        var pointV1={x:0, y:0, d:0}
        this.gsetBlok=function(_x,_y, blok){//сюда позиции и блок, обратно точку или            
            yyw=Math.round((_y-this.y)/this.SAH)*this.SAH;
            point.y=yyw;
            // this.gsetBlok2(yyw,blok)
            // return point;

            debMy=true
            if(this.gsetBlok2(yyw,blok,true)==false){//свободно положение   
            
            debMy=false            
                return this.gsetBlok3(yyw,blok);  
                //return point
            }
            
            debMy=false    
            //смотрим верх
            
            
            pointV.y=yyw;
            pointV.d=-1;           
            for (var i = 0; i < sahOt; i++) {
                yu=yyw+i*this.SAH;
                   
                if(this.gsetBlok2(yu,blok)==false){                    
                    pointV.y=yu;
                    pointV.d=Math.abs(yyw-yu);                                     
                    break
                }
            }
            
            //смотрим низ
            pointV1.y=yyw;
            pointV1.d=-1;
            for (var i = 1; i < sahOt; i++) {
                yu=yyw-i*this.SAH;                 
                if(this.gsetBlok2(yu,blok)==false){                    
                    pointV1.y=yu;
                    pointV1.d=Math.abs(yyw-yu);                    
                    break
                }
            }
            if(pointV.d==-1 && pointV1.d!==-1){
                point.y=pointV1.y;
                return point;
            }
            if(pointV.d!==-1 && pointV1.d==-1){
                point.y=pointV.y;
                return point;
            }
            //оптимальное
            if(pointV.d<pointV1.d){
                 point.y=pointV.y;
            }else{
                point.y=pointV1.y;
            } /**/
            return point;
        }
        var ax,ax1,_ax,_ax1

        if(glafBig.debug){
            ax=new THREE.AxesHelper(10);
            this.content3d.add(ax);
            ax1=new THREE.AxesHelper(20);
            this.content3d.add(ax1);

            _ax=new THREE.AxesHelper(5);
            this.content3d.add(_ax);
            _ax1=new THREE.AxesHelper(8);
            this.content3d.add(_ax1);
            ax.position.x=-12
            ax1.position.x=-12
            _ax.position.x=-12
            _ax1.position.x=-12

        }




        //есть ли помехи из за друхих полок
        var e,e1,_e,_e1,yt,ytt
        this.gsetBlok2=function(_y, blok,bool, boolFin){
            e1=_y-blok.rect[2];
            e=_y-blok.rect[2]-blok.rect[5]  
            if(glafBig.debug && bool){
                ax.position.y=e
                ax1.position.y=e1
            }
            

       

            if(_y>0)return true

            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].idArr!=blok.idArr){                    
                    _e=this.children[i].y-this.children[i].rect[2]
                    _e1=this.children[i].y-this.children[i].rect[2]-this.children[i].rect[5];  
                    if(glafBig.debug){
                        _ax.position.y=_e
                        _ax1.position.y=_e1
                    }
                    


                    if(this.testLineXZ(e,e1,_e,_e1)==true){
                        return true
                    } 
                }
            }

            //return false;

            //проверка вер
            yt=_y+this.y-blok.rect[2];//+blok.rect[5];
            ytt=_y-this.y;
            


            if(this.parent._height<yt){              
                return true
            }
          


            //проверка низ
            yt=_y+this.y-blok.rect[5];
            if(0>yt){                
                return true
            }          
            

            return this.gsetBlok4(yt);
        }

        var _point=new THREE.Vector2()
        var _point1=new THREE.Vector2()
        var _point2=new THREE.Vector2()
        var sten;
        this.gsetBlok4=function(_y){
            
            //if(debMy){

            sten=this.parent;
            _point.x=this.x
            _point.y=_y;

             //перебераем рексты
            for (var i = 0; i < sten.collision.arrRect.length; i++) {
                if(sten.collision.arrRect[i].parent==undefined)continue;
                if(sten.collision.arrRect[i].parent.idRandom==this.idRandom) continue;

                _point1.x=sten.collision.arrRect[i].rectCollisMeshdy._x;
                _point2.x=sten.collision.arrRect[i].rectCollisMeshdy._x+sten.collision.arrRect[i].rectCollisMeshdy.width;
                _point1.y=sten.collision.arrRect[i].rectCollisMeshdy._y+sten.collision.arrRect[i].rectCollisMeshdy.height;

                

                if(_point.x>_point1.x&&_point.x<_point2.x) { 
                 
                    if(_point1.y>_point.y){                                       
                        _point2.y = _point.y-_point1.y-this.SAH/2;
                    
                      

                        return true; 
                       /* if(heiDin>_point2.y) {
                           
                        } */                        
                    }                       
                } 
            }
            return false;
        }


        //проверка на соседних полках 
        var t,t1,as,bpc2   
        this.gsetBlok3=function(_y, blok){            
            point.y=_y; 

            t1=  Math.round((_y+this.y)*10)
            if(this.gsetBlok3TestOt(t1,blok)==true){                 
                return point;  
            }

            t1 =  Math.round((_y+this.y+this.SAH)*10)
            if(this.gsetBlok2(t1,blok)==false){//смотрим выше если можем то прогоняем                 
                if(this.gsetBlok3TestOt(t1,blok)==true){                     
                    point.y=Math.round((_y+this.SAH)*10)/10;  
                    return point;  
                }
            }

            t1 =  Math.round((_y+this.y-this.SAH)*10)
            if(this.gsetBlok2(t1,blok)==false){//смотрим выше если можем то прогоняем                 
                if(this.gsetBlok3TestOt(t1,blok)==true){                    
                    point.y=Math.round((_y-this.SAH)*10)/10;  
                    return point;  
                }
            }
            return point
        }

        //Смотрим есть ли на против элементы
        this.gsetBlok3TestOt=function(_y, blok){ 
            if(this.parent){
                as=this.parent                
                for (var i = 0; i < as.children.length; i++) {//да напротив есть подобие
                    if(as.children[i].type=="BPieceC2" ){
                        bpc2=as.children[i];
                        if(bpc2.idArr!=this.idArr){
                            for (var j = 0; j < bpc2.children.length; j++) {                                
                                t = bpc2.children[j].y+bpc2.y 
                                if(Math.round(t*10)==t1){                               
                                    return true;
                                }                                 
                            }
                        }
                    }
                }
            }

            return false
        }

        //сверяем две полосы
        this.testLineXZ=function(ps,pf,ps1,pf1){                     
            if(ps1>=ps &&pf1<=ps)return true;
            if(ps1>=pf &&pf1<=pf)return true;          
            if(ps>=ps1 &&pf<=ps1)return true;
            if(ps>=pf1 &&pf<=pf1)return true; 

            

            if(ps1>=ps && pf1<=pf) return true;       
            return false;
        }
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////

        //зброс центра, то есть центруем при отпуске
        var p,p1
        this.zdvigCenter=function(){           
            p=this.bPC2Line.r_y0-Math.round(Math.round((this.bPC2Line.r_y0-this.bPC2Line.r_y1)/2/this.SAH )*this.SAH*10)/10 
            p1=p
            p1= Math.round(p /this.SAH)*this.SAH    
            this.dragMat2()  
           // if(p1==0)
                return
           

            //проверка низа



            for (var i = 0; i < this.children.length; i++) {         
                this.children[i].setXYPosit(0,this.children[i].y-p1)
            }      
            this.setXYPosit(this.x,this.y+p1);
            
            this.corectPosit(); 
                     
        }

        
        //смещение от мышки и
        var _x, _y
        this.setXY=function(__x,__y){

            _x=__x;
            _y=Math.round((__y)/this.SAH)*this.SAH;
            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;  
                                  
            if(this.parent!=undefined){               
                this.parent.collision.testRect(this.boxColizi);
                this.parent.collision.drawDegug()
            }
          
            if(this.parent){                
                this.parent.sBPC2Doski.drag();
            }

            if(this.tLabel)this.tLabel.text="=="+Math.round( _y)+"||"+Math.round(this.boxColizi.rectCollisMeshdy.height)
            
            this.drahShadow();
        }


        //отрисовка 2д теней
        this.drahShadow=function(_x,_y){ 
            if(this.parent==undefined)return                   
            if(this.parent!=undefined){
                this.heightSten=this.parent._height               
                if(_x==undefined){
                    this.content.position.x = self.content3d.position.x;
                    this.content.position.y = this.heightSten-self.content3d.position.y;
                }else{
                    this.content.position.x = _x;
                    this.content.position.y = _y; 
                }
                if(this.content.funRender!=undefined){
                    this.content.funRender();
                }
            }            
        } 


        //изменяет основную длину перекладины
        var min,max, y0,y1,yy,yyy, dd;        
        this.corectPosit =function(){
        
            min=99999;
            max=-99999;
            y0=-99999;
            y1=99999;
            if(this.children.length!=0){
                for (var i = 0; i < this.children.length; i++) {
                    yyy=this.children[i].y+this.children[i].rect[2]+this.children[i].rect[5]                    
                    yy=this.children[i].y+this.children[i].rect[2];                                       
                    if(y0<yyy)y0=yyy;
                    if(y1>yy)y1=yy;
                }               
            }else{
                y0=-this.minH/2;
                y1=this.minH/2;
            }   

            this.bPC2Line.sety01(y0,y1);//<< реальные размеры от и до

            if(this.parent){                
                this.parent.sBPC2Doski.drag();
            }

        }


        ///дернуть обьекты типа полок роверка на их верное нахожление
        this.stopDrag=function(){ 
            
            if(this._parent){
                for (var i = 0; i < this._parent.children.length; i++) {
                    if(this._parent.children[i].type=="BPieceC2O2"){
                        this._parent.children[i].isDvaKrai()

                    }
                }
            }

        } 



        //при удалении внутренего обьекта 
        this.fun_remove=function(){
            if(this.children.length==0){
                this.clear()
                return
            }
            this.corectPosit()
        }


        this.fun_add=function(blok){
            blok.content3d.position.z=2.1
        }

        this.fun_clear=function(){
      
                          
            roomBig.dragDoski();
            setTimeout(function() {
                roomBig.dragDoski();
            }, 10);
           
    
        }

        //замена цвета
       /* this.dragColor=function(){
            this.fun("visi3d");      
            if(self._material==undefined)return 
            this.bPC2Line.setMat(self._material);
        }*/

        
        //обработка бабла
        this.getPrice=function(intColor,idMat){           
            return this.bPC2Line.getPrice(intColor,idMat);   
        }   

        //возвращение обьекта для сохранения
        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            obj.hh=this.boxColizi.rectCollisMeshdy.height
            obj.aido3d=[this.ido3d];            
            obj.children=[];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i]=this.children[i].getObj();
            }
            
            return obj;            
        }

        //вставляет обьект
        var ob,ooo
        this.setObj = function(obj){
            
            if(this.tLabel)this.tLabel.text="S=" +obj.y  

            this.setXYPosit(obj.x,obj.y);
            
            if(obj.hh)this.boxColizi.rectCollisMeshdy._y=obj.y-obj.hh

            if(obj.children){
                for (var i = 0; i < obj.children.length; i++) { 
                    ooo=menObject.getIdObj(obj.children[i].id)
                   
                   /* ooo= mhbd.getKeyId("group1", obj.children[i].id)                  
                    if(ooo){*/ 
                        ob=mO.getBlok(ooo.obj)
                        ob.setObj(obj.children[i])
                        this.add(ob);    
                   // }                                 
                }               
            }
           
            this.zdvigCenter()
        }
    }
}



//Линия подстаиваеться под габариты
export class BPC2Line {
    constructor(par) {  
        this.type = "BPC2Line";
        var self=this;
        this.par=par;
        this.arrBlok=[];
        this._height=par.minH;
        this.minH=par.minH;
        this.oPod=1
        this.SAH=par.SAH;
        this.cont3d=new THREE.Object3D();
        this.par.c3dNa.add(this.cont3d);
        this.content3d=new THREE.Object3D();
        this.cont3d.add(this.content3d)
        this.content=new PIXI.Container();
        par.content.addChild(this.content);
        this.contMin=new PIXI.Container();
        this.content.addChild(this.contMin);
/*
        let aa=new THREE.AxesHelper(50);
        this.content3d.add(aa);*/

        this.y0=-this.par.minH/2
        this.y1=this.par.minH/2
        this.vnb

        


        this.funInitMod = function(){  
            var a=[]
            var o= par.cont3dLoad;

           
            
            this.recursArr(par.cont3dLoad)
           
           // return
            if(par.cont3dLoad.parent)par.cont3dLoad.parent.remove(par.cont3dLoad);
            
            this.vnb = new VNB2(this,this.arrBlok);
            this.vnb.visible=true; 
            this.sety01(this.y0,this.y1,true)
            //if(this.m)this.vnb.setMat(this.m);
            this.par.corectPosit()
            this.dragMat2()

        }

        this.recursArr = function(c3d){
            var a
            if(c3d.material!=undefined){
                if(c3d.name.indexOf("marker_")!=-1){
                    a=c3d.name.split("_")
                    this.arrBlok[a[1]*1] = c3d;
                    c3d.geometry.computeBoundingBox();
                    c3d.zz=c3d.geometry.boundingBox.max.z-c3d.geometry.boundingBox.min.z;
                    c3d.xx=c3d.geometry.boundingBox.max.x-c3d.geometry.boundingBox.min.x;
                    c3d.yy=c3d.geometry.boundingBox.max.y-c3d.geometry.boundingBox.min.y;               
                    c3d.position.set(0,0,0);
                    c3d.rotation.x=Math.PI/2;
                    c3d.rotation.y=0;
                    c3d.rotation.z=0;
                    if(this.material)  if(c3d.material) c3d.material=  this.material 
                }
                return
            }
            if(c3d.children){
                for (var i = 0; i < c3d.children.length; i++) {
                    this.recursArr(c3d.children[i]);
                }
            }
        }

        this.dragMat2 = function(){
           
            if(!self.par.dragMaterial.material)return
            let key=self.par.dragMaterial.material.idUz;            
            let mm=self.par.dragMaterial.material;
            let b=true;
            this.getArrrr()            
            for (var i = 0; i < aaa1.length; i++) {
                let ooo=this.modelArray[aaa1[i]].object.obj; 
              
                if(ooo.info.color[key]){
                    if(isNaN(ooo.info.color[key].pri*1)==true){
                        b=false;
                    }
                }else{
                    b=false;
                }

            }
            if(!b)mm=menObject.matRed             

            this.setMat(mm);
              
        }


        this.m=undefined
        this.setMat=function(m){ 
                
            this.m=m;
            if(this.par.idArr==-1){
                this.m=this.par.mO.matNull;
            }
            if(this.vnb)this.vnb.setMat(this.m);            
        }


        this.r_y0=-this.minH/2
        this.r_y1=this.minH/2

        var point={x:0, y:0}
        var point1={x:0, y:0}
        var bbb ,tr      
        this.sety01=function(y0,y1,bool){
            
            bbb=-1
            if(this.y0!=y0 || this.y1!=y1 || bool!=undefined){
                this.y0=y0;
                this.y1=y1;
              
                point=this.corect01(y0,y1) 
                
                if(this.vnb){                                      
                    this.vnb.y0=point.x;
                    this.vnb.y1=point.y;
                    this.r_y0=this.vnb.y0
                    this.r_y1=this.vnb.y1

                    this.vnb.draw(); 
                    
                    tr=this.vnb._height1-this.vnb._height;
                    
                    this.par.rect[5]=this.vnb._height
                    this.par.rect[2]=point.y+tr                   
                    this.par.boxColizi.rectCollisMeshdy.height=this.par.rect[5];
                    this.par.boxColizi.height=this.par.rect[5];                    
                    this.par.boxColizi.sy=this.par.rect[2] //point.y; 
                    this.par.boxColizi._y=this.par.rect[2] //point.y;                   
                }
                bbb=0;
            }
            return bbb      
        }


        var d, yy0,yy1, ddd, df, yy2, yy3, yy4
        this.corect01=function(y0,y1){  
            //yy0=Math.ceil(y0/this.SAH)*this.SAH;
            //yy1=Math.floor(y1/this.SAH)*this.SAH;     
       

          
            ddd=this.getDisy(-y1)

       
            point1.x=this.SAH/2;
            point1.y=point1.x+ddd-this.SAH/2;
            return point1;


/*

            df = Math.floor((ddd-d)/this.SAH/2)*this.SAH-this.SAH/2;           
            
            yy2=yy0+df+this.par.y;            
            yy3=yy0+df
            yy4=yy1-df

            if(this.par.parent)
            if(yy2>this.par.parent.height){
                yy3=this.par.parent.height-this.par.y;
                yy3=Math.floor(yy3/this.SAH)*this.SAH+this.SAH/2                
            }

            yy2=yy1-df+this.par.y;
            if(yy2<0){
                //yy2-=this.SAH*9
               // yy3=this.par.parent.height-this.par.y;
               // yy3=Math.floor(yy3/this.SAH)*this.SAH+this.SAH/2                
            }
    


            point1.x=yy3;
            point1.y=yy4;
            point1.d=d;
            return point1;*/
        }  


        var dds
        this.getDisy=function(_d){  
                   
            dds=0;
            dd=0; 
            for (var j = 0; j < 99; j++) { 
                for (var i = 0; i < this.arrDlina.length; i++) {
                    if(dd+this.arrDlina[i]/10>=_d){                        
                        dd+=this.arrDlina[i]/10;                        
                        return dd;   
                    }                    
                }                
                dd+=this.arrDlina[this.arrDlina.length-1]/10                
            } 

            return dd;    
        }




        this.modelArray=[]
        this.arrDlina=[]
        var s=this.par.object.str[1];

        var aa1=s.split(',')
        for (var i = 0; i < aa1.length; i++) {
            let oo={}
            oo.id=aa1[i]*1;

            oo.object=menObject.getIdObj(oo.id);
            oo.dist=oo.object.obj.num[0]*1 ;  
            this.arrDlina.push(oo.dist)         
            this.modelArray.push(oo);
            
        }

     


      /*  this.modelArray1=this.par.objBase.json.modelArray1
        this.arrDlina=[]
        for (var i = 0; i < this.modelArray1.arrJJ.length; i++) {
            this.arrDlina.push(1*this.modelArray1.arrJJ[i].title)
        }
        this.arrDlina=[122,222]*/
        //var aa=[]
        var objxx
        var aaa=[]
        var aaa1=[]
        var sah,b,dd,dd1,hhh,aaa2,jj
        this.getPrice=function(intColor,idMat){ 
            aaa.length=0;








            //return aaa;  


            if(!this.vnb)return aaa; 
            this.getArrrr()
            
            for (var i = 0; i < aaa1.length; i++) {
                objxx=this.modelArray[aaa1[i]].object.obj
                
                aaa2=menedsherMaterial.getArrOtObj(objxx,idMat)
                
                if(aaa2){
                    aaa2[8]=objxx;
                    aaa2[9]=objxx.id;
                    aaa2[10]=1;
                    aaa2[11]=aaa2[3]*1;
                    aaa.push(aaa2)    
                }
                /*aaa2=menedsherMaterial.getAOO(this.par.objBase.json.modelArray1, idMat, aaa1[i]);
                if(aaa2){
                    aaa2[1]=1;
                    aaa.push(aaa2)                     
                }*/ 
            }

           
            return aaa;  
        }

        this.getArrrr=function(){ 
            aaa1.length=0;
            if(!this.vnb)return
            sah=0;
            dd=0
            hhh=this.vnb._height*10
            for (var j = 0; j < 99; j++) { 
                for (var i = 0; i < this.arrDlina.length; i++) {
                    
                    jj=dd+this.arrDlina[i]
                    
                    if(dd+this.arrDlina[i]>=hhh){
                        sah=i;
                        aaa1.push(sah);
                        j=99999;
                        i=99999;                        
                    }
                    sah=i;
                }
                dd+=this.arrDlina[sah]
                if(j!=99999)aaa1.push(sah)
            }
        }
    }
}















import { XZImage } from './XZImage.js';
import { BKHron } from './BKHron.js';



//Вертикальные хрени
export class VNB2 {
    constructor(par, _arrBlok) { 
        var self=this; 
        this.type = "VNB2";
        this.par=par;
        this.SAH=par.SAH;
        this._visible=false;
        this.content3d=new THREE.Object3D();
        this.par.par.c3dNa.add(this.content3d)
        this.content3d.visible=this._visible;
        this.array=[];
        this._height=115.6
        this._height1=115.6
        this.minH=par.minH;
        this._x=0
        this.content3d.position.y=this.par.oPod
        this.content3d.position.z=0.25   
        this.marker=undefined;
        this.meshS=undefined;
        this.meshF=undefined;
        this.hh=undefined; 
        this.idArr=-1
        this.arrImage=[];
        this.content=new PIXI.Container();
        par.par.content.addChild(this.content);

        this.content1=new PIXI.Container();
        this.content.addChild(this.content1);



        this._y0=-this.minH/2
        this._y1=this.minH/2

        if(_arrBlok)this.arrBlok=_arrBlok;

        var dopHH=3.5
        this.dragCont=function(){
            var zd=2
            if(this.arrImage[0] && this.arrImage[1]){

                this.arrImage[0].height=this.h2+this.arrImage[1].height/2//-this._height//1//-zd;
           
                this.arrImage[1].y=this.h2-this.arrImage[1].height/2
            }           
            par.par.drahShadow();/* */ 
        }



        var l="not.png";
        if(par.par.object.resurs && par.par.object.resurs.array&& par.par.object.resurs.array[0]){
         
            l="resources/data/"+par.par.object.id+"/resources/"+par.par.object.resurs.array[0].name
        }
        // if(par.par.objBase.json.obj3d.json.resurs.array[0]!=undefined)
        //     l=mhbd.getLink(par.par.objBase.json.obj3d.json.resurs.array[0].icon) 

         
        //"not.png"//"resources/data/"+par.par.id+"/resources/"+par.par.object.resurs.array[3].name; 
        this.arrImage[0]=new XZImage(this.content1,0,0,l,function(){                    
            this.x=-this.picWidth/4;
            //this.y=-this.picHeight/4;
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont();
            self.draw()
        });


        l="not.png";
        if(par.par.object.resurs && par.par.object.resurs.array&& par.par.object.resurs.array[1]){
           
            l="resources/data/"+par.par.object.id+"/resources/"+par.par.object.resurs.array[1].name
        }
        // if(par.par.objBase.json.obj3d.json.resurs.array[1]!=undefined)
        //     l=mhbd.getLink(par.par.objBase.json.obj3d.json.resurs.array[1].icon) 

       
        this.arrImage[1]=new XZImage(this.content1,0,0,l,function(){                    
            this.x=-this.picWidth/4;            
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont();
            self.draw()
        });


        
        //277,278,279,280,281,282
 /**/
        self.dragCont();



        
        this.hron=new BKHron(this, 275)//, 1,this.par.par.mO)
        
        this.hron.initHron=function(){            
            self.dragCont();
            self.draw();            
            self.par.par.mO.dragPriceScane();           
        }

        
        

        var hhh
        this.testHH=function(blok){

            hhh=-blok.boxColizi.rectCollisMeshdy.y-blok.yF-blok.boxColizi.rectCollisMeshdy.height/2+this.par.oPod                  
            if(hhh>this.height){                
                this.height=hhh;                
            } 
            if(this.visible==true){
                if(this.array[0]==undefined){
                    this.draw()
                    return
                }
                if(this.array[0].visible==false){
                    this.draw()
                }
            }          
        }


        this.creatMark=function(){
            if(this.marker!=undefined)return;
            if(this.arrBlok[1]==undefined)return;           
            //this.marker = new THREE.Mesh(new THREE.BoxGeometry(5,1,1));
            this.marker=this.arrBlok[1];
            this.marker.position.set(0,0,0)
            this.marker.rotation.x=Math.PI/2
            this.marker.geometry.computeBoundingBox()
            this.hh=this.SAH//this.marker.geometry.boundingBox.max.z-this.marker.geometry.boundingBox.min.z;
         
            if(self.par.material!=undefined){
                this.marker.material=self.par.material;
            }            
            this.draw();            
        }


        this.creat=function(){
            this.creatMark();

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true;                    
                    return this.array[i]
                }
            }
            
            this.array.push(this.marker.clone()); 
            this.content3d.add(this.array[this.array.length-1]) 
           
          

            return this.array[this.array.length-1]
        }


        this.clear=function(){
            this.height=0;
            this.visible = false; 
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;                 
            }
        }

        this.h2=100
        var dragH=-100
        var vv=0;
        var mesh,vv1,vv2,s,vv3;
        this.draw=function(boolHHH){           
            
            this.creatMark();           
     
          
            if(this.marker==undefined)return;
          
            if(this.hron.obj3d==undefined)return;

            this.content3d.position.y=this._y0 
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }  
            vv=0;            
            vv2=-this.SAH/2
             
            for (var i = 0; i < 922; i++) {
                if(this._height<=-vv2){
                    this.content1.position.y=-this._y0-vv2-this.SAH/2
                    break;
                }

                mesh=this.creat() 
                                         
                mesh.position.y=vv2;
                //mesh.position.x=Math.random();
                vv2-= this.SAH; 
                vv3=-vv2-this.SAH                     
            }


            this.hron.clear();
       
            this.h2=-vv3-this.SAH/2
            self.dragCont()
        }


        this.drawTestUp=function(){
            this.draw()
        }

        this.mat
        this.setMat=function(m){
            this.mat=m
            if(this.marker){
                this.marker.material=m;
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].material=m;
            }
        }

        this.aInfo=this.par.par.aInfo;
        
        /*var aNum=[]
        var aaa=this.par.par.objBase.json.modelArray1.arrJJ
        for (var i = 0; i < aaa.length; i++) {
            aNum[i]=aaa[i].title/10;            
        }*/
        var aNum=[10,20]


        this.kolSahArr = new KolSahArr(aNum)
        this.kolSahArr.dopHH = dopHH;        
        this.kolSahArr.arrayParam=aNum


        var pp=0;
        var aaa=[]; 
        var mxP;     

        var sten
        var yy
        var point=new THREE.Vector2()
        var point1=new THREE.Vector2()
        var point2=new THREE.Vector2()
        this.testWord=function(){
            var heiDin=this._height
       
            if(this.par.par.parent==undefined)return 

            sten=this.par.par.parent;
            point.x=this.par.par.boxColizi.position._x+this.x
            point.y=this.par.par.boxColizi.position._y;
            yy=point.y-heiDin;            
            
            
            //ниже плинтуса
            if(yy<0){//this.SAH
                heiDin+=yy
                heiDin=Math.ceil(heiDin/this.SAH)*this.SAH
            }    
            

            //перебераем рексты
            for (var i = 0; i < sten.collision.arrRect.length; i++) {
                if(sten.collision.arrRect[i].parent==undefined)continue;
                if(sten.collision.arrRect[i].parent.idRandom==this.par.par.idRandom) continue;

                point1.x=sten.collision.arrRect[i].rectCollisMeshdy._x;
                point2.x=sten.collision.arrRect[i].rectCollisMeshdy._x+sten.collision.arrRect[i].rectCollisMeshdy.width;
                point1.y=sten.collision.arrRect[i].rectCollisMeshdy._y+sten.collision.arrRect[i].rectCollisMeshdy.height;



                if(point1.y<point.y){
                    if(point.x>point1.x&&point.x<point2.x) {                     
                        point2.y=point.y-point1.y-this.SAH/2;
                        if(heiDin>point2.y) {
                            heiDin=point2.y;
                            heiDin=Math.ceil(heiDin/this.SAH)*this.SAH
                        }                         
                    }                       
                } 
            }

            /*if(point.y-heiDin-this.par.minusPanel <0){                
                heiDin=point.y-0.1 -this.par.minusPanel  
                
            }

            for (var i = 0; i < sten.collision.arrRect.length; i++) {     
                if(sten.collision.arrRect[i].parent==undefined)continue;
                if(sten.collision.arrRect[i].parent.type=="BPieceTop"){
                    if(sten.collision.arrRect[i].parent.idRandom==this.par.par.idRandom){
                        continue;
                    }
                }
                if(sten.collision.arrRect[i].parent.type=="Boki"){                    
                    if(sten.collision.arrRect[i].parent.par!=undefined){
                        if(sten.collision.arrRect[i].parent.par.par!=undefined){                            
                            if(sten.collision.arrRect[i].parent.par.par.idRandom==this.par.par.idRandom){                                
                                continue;
                            }
                        }
                    }
                }

                point1.x=sten.collision.arrRect[i].rectCollisMeshdy._x;
                point2.x=sten.collision.arrRect[i].rectCollisMeshdy._x+sten.collision.arrRect[i].rectCollisMeshdy.width;
                point1.y=sten.collision.arrRect[i].rectCollisMeshdy._y+sten.collision.arrRect[i].rectCollisMeshdy.height;

                if(point1.y<point.y){
                    if(point.x>point1.x&&point.x<point2.x) { 
                        point2.y=point.y-point1.y-2;
                        if(heiDin>point2.y)  heiDin=point2.y;                        
                    }                       
                } 

                heiDin=Math.round(heiDin)   
            }*/
           
             this._height=  heiDin  
        }


        var aa
        this.getPrice=function(a, intColor,idMat){            
            var pn="plus"; 

           for (var j = 0; j < this.kolSahArr.array.length; j++) {                 
                let info=this.kolSahArr.arrInfo[this.kolSahArr.array[j]]
                aa=menedsherMaterial.getAOO(this.par.par.objBase.json.modelArray1, idMat, this.kolSahArr.array[j]);                
                if(aa){
                    aa[1]=1;                   
                }  
                a.push(aa)
            } 

            if(this.kolSahArr.array.length>1){
                for (var j = 0; j < this.kolSahArr.array.length-1; j++) {                    
                    aa=menedsherMaterial.getAOO(this.par.par.objBase.json.modelArray2, idMat);
                    if(aa){
                        aa[1]=1;                       
                    }  
                    a.push(aa)                 
                }
            }
        }

        var hh,yy,yy1
        this.korHHHH=function(){
            hh=this.par.getDisy(this._y1) 
            
         

            this._height=hh// Math.round(this._height1/50)*50

            this.testWord()
        }



        this.hron.init();
    }

    set visible(v) {  
        if(this._visible!=v) {
            this._visible=v;
          
            this.content3d.visible=this._visible;
            this.content.visible=this._visible;
        }                
    }   
    get visible() { return  this._visible;}


    set x(v) {    
        this._x=v 
        this.content3d.position.x=v   
        this.content.position.x=v 
    }   
    get x() { return  this._x;} 


    set y0(v) {   
        if(this._y0!=v ) {
            this._y0=v;
            this._height1=this._y0-this._y1;            
            this.korHHHH();
         
        } 
    }   
    get y0() { return  this._y0;} 

    set y1(v) {   
        if(this._y1!=v ) {
            this._y1=v;
            this._height1=this._y0-this._y1;
            this.korHHHH();
     
        } 
    }   
    get y1() { return  this._y1;} 


    set height(v) {
        

        if(roomBig.boolLoad==true){
            if(v>this._height)this._height=v
        } else{
            this._height=v
        }
         
             
        this.draw();              
    }   
    get height() { return  this._height;} 

    set height1(v) { 
        this._height1=v 
         
        this.draw();              
    }   
    get height1() { return  this._height1;}    


    
    get width() { return  this.visiNisu._width;} 
     
}




export class KolSahArr {
    constructor(arrInfo) {  
        this.type = "KolSahArr";
        var self=this;
        this.arrayParam=[];
        this.arrInfo=arrInfo
        this.value=0;
        this.array=[];
        var vm=0;      
        var kk, kk2; 
        this.num; 
        this.dopHH = 10;


        this.set=function(num){
            this.array=[];
            this.value=0

            this.num=num; 
            let nnn=num+this.dopHH

            kk=nnn/this.arrayParam[this.arrayParam.length-1];
            kk2=Math.floor(kk);

            

            for (var i = 0; i < kk2; i++) {                
                this.array.push(this.arrayParam.length-1)
                this.value+=this.arrayParam[this.arrayParam.length-1];
            }

            if(kk==kk2){//идеально длинными
                return;
            }            
            vm=0;
            for (var i = this.arrayParam.length-1; i >=0; i--) {                
                let pp=   (this.value+this.arrayParam[i]+this.dopHH)                           
                if(pp>=nnn)vm=i
            }            
            this.array.push(vm)
            this.value+=this.arrayParam[vm]; 
               
        }




        var o
        this.toString=function(){
            o={}
            o.num=this.num
            o.array=this.array
            o.value=this.value
            return JSON.stringify(o)
        }
    }
}


