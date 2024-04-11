/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

*/


//крючки
export class SahSuper {
    constructor(par) {    
        var self=this;    
        this.type = "SahSuper";        
        this.par=par;
        this.aH=[];
        this.arrHron;
        this.arrModel=[];
        this._polka=false;
        this._intSah=-1;
        this._intSah1=-1;
        this._intSah=-1; //-1 отсутствие 0 нет пересечений 1 пересекаеться с другой
        this._intSah1=-1;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);      
        this.array=[];        
        this.bool=false;
        this.yF=0;
        this.ySMin=0;
        this.kolII=1;
        this.kolJJ=1;
        this.pozII=0;
        this.pozJJ=0;
        this.sahII=0;
        this.sahJJ=0;

        this.arrHron=[];

        this.rect=undefined//{x:0,y:0,w:100,h:100}

        if(this.par.object.str[4]!=undefined){
            if((this.par.object.str[4]+"").length>6){
                this.bool=true;
            }
        }
          
        if(this.bool==false){
            return;
        }

        this.aroundButton=this.par.mO.par.aroundButton;

        var a=this.par.object.str[4].split(',');
        var ab1=this.par.object.str[4].split('|')
        var ab=ab1[1].split(',');
        var b,b1
        b1=true;
        let idR=-2
       
        if(ab1[2]!=undefined&&ab1[2]=="1"){
           
            idR=-1
        }
   


        var objbb
        for (var i = ab.length-1; i >=0; i--) {
            objbb=this.par.mO.getIdObj(ab[i]); 

            if(this.par.mO.isIdPrice(objbb.id)==false){

            //if(this.par.mO.getInTEXT(objbb.id,"NA")==true)  { 

                ab.splice(i,1)
            }
            
        }



        let bb3=false
        for (var j = 0; j < ab.length; j++) {
            b=true;
            if(this.par.mO.isIdPrice(ab[j])==true){
                bb3=true;
                this.par.aa.push("mod_"+ab[j])                
                if(idR!=-2)idR=ab[j]*1;
            }
            
        } 

        if(bb3!=false){
            if(idR==-2)this.par.aa.push("mod_clear_"+this.par.id)
            if(idR>0)this.par.aa.push("mod_clear_"+idR)    
        }
        




        this.pozII=a[0]*1;
        this.pozJJ=a[3]*1;

        this.sahII=a[1]*1;
        this.sahJJ=a[4]*1;

        this.kolII=a[2]*1;
        this.kolJJ=a[5]*1;
        this.zz=a[6]*1;
        this.arrBool=[];

        if(idR>0){

            let oo=this.par.mO.getIdObj(idR)
            if(oo){
                this.rect={x:0,y:0,w:100,h:100}
                this.rect.x=this.pozII+oo.obj.mod.r[0];
                let f=this.sahII*(this.kolII-1)+oo.obj.mod.r[3]
                this.rect.w=f-this.rect.x;

                this.rect.y=this.pozJJ+oo.obj.mod.r[2]+oo.obj.mod.r[5]/2;
                this.rect.h=oo.obj.mod.r[5];                                         
            }
        }




        for (var i = 0; i < this.kolII; i++) {
            this.arrBool[i]=[]
            for (var j = 0; j < this.kolJJ; j++) {
                this.arrBool[i][j]=new BoxSS(this, i, j);                
                this.arrBool[i][j].x=this.pozII+this.sahII*i;
                this.arrBool[i][j].y=-(this.pozJJ+this.sahJJ*j);
                this.content3d.position.z=this.zz;               
            }
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }
            for (var i = 0; i < this.kolII; i++) {           
                for (var j = 0; j < this.kolJJ; j++) {
                    this.arrBool[i][j].bool=0
                }
            }
            if(this.rect!=undefined){
                this.par.yS=0;
            }


        }  


        this.getO3D=function(o){           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    if(this.array[i].object.id==o.id){
                        return this.array[i];
                    }
                }                
            }
            
            var oo=new THREE.Object3D()
            var link="resources/data/"+o.obj.id+"/mod/"+ o.obj.mod.name   
            oo.object=o;   
                    
            this.par.mO.getModel(link, o.obj.mod.key,function(o){                
                oo.add(o);                
                self.par.dragMaterial.setC3d( o, link)               
                o.position.z=-oo.object.obj.mod.r[1];
                o.position.x=-oo.object.obj.mod.r[0];
                o.position.y=oo.object.obj.mod.r[2]+oo.object.obj.mod.r[5]/2;
               // self.par.recurcChild(o);                               
                self.par.fun("visi3d");

            });            
            oo.idObj=o.obj.id;
            this.array.push(oo);            
            return oo;            
        }


        var aa;
        this.aaSob=function(s,p){                       
            aa=s.split("_");           
            if(aa[0]=="mod"){               
                return this.getObjSob(aa[1]);
            }
            return false
        }


        this.objObj={}
        var o3d
        this.getObjSob=function(s){
            
            if(s=="clear"){
                this.clear()
                return false
            }
            if(this.rect!=undefined){                
                if(this.par.isBoxParent({
                    x:self.par.boxColizi.rectCollisMeshdy.x+self.par.boxColizi.rectCollisMeshdy.width/2+self.rect.x,
                    y:self.par.boxColizi.rectCollisMeshdy.y-self.par.hrenNiz.rect.y,
                    w:self.rect.w,
                    h:self.rect.h
                },[self.par.idArr]) !=null){                    
                    return "Для установки аксессуара недостаточно свободного места.";
                }

            }

            if(this.objObj[s]==undefined)this.objObj[s]=this.par.mO.getIdObj(s)
            
            
            var a=this.getPosit(this.objObj[s]); 

            if(a.length!=0){
                for (var i = 0; i < a.length; i++) {
                    o3d=this.getO3D(this.objObj[s]);                    
                    this.objObj[s].kol=kool
                    this.content3d.add(o3d)
                    o3d.position.x=a[i].box.x;
                    o3d.position.y=a[i].box.y;
                    o3d.ii=a[i].box.ii;
                    o3d.jj=a[i].box.jj;
                    o3d.visible=true;  
                }
                if(this.rect)this.par.yS=(this.rect.h);
                
                this.par.fun("visi3d");
            } 





            return false          
        }


        var kool
        this.getPosit=function(o){ 
                   
            var r=[]
            var a=o.obj.str[0].split(",")
            var kol=a[0]*1
            kool=kol
            var iii=a[1]*1
            var jjj=a[2]*1
            var id=o.obj.id;

            for (var ii = 0; ii < kol; ii++) {
                var o={id:id};
                for (var i = 0; i < this.kolII; i++) {
                    for (var j = 0; j < this.kolJJ; j++) {                        
                        if(this.arrBool[i][j].bool==0){                            
                            var b=true;
                            for (var ei = 0; ei< iii; ei++) {
                                if(this.arrBool[i+ei]!=undefined){
                                    for (var ej = 0; ej < jjj; ej++) {
                                        if(this.arrBool[i+ei][j+ej]!=undefined){
                                            if(this.arrBool[i+ei][j+ej].bool==0){
                                                this.arrBool[i+ei][j+ej].bool=2;
                                            }
                                            else{                                                
                                               b=false;
                                            }
                                        }else{                                            
                                            b=false;   
                                        }
                                    }
                                }else{                                  
                                    b=false; 
                                }                                
                            }
                            if(b==true){                                
                                o.i=i;
                                o.j=j;
                                o.box=this.arrBool[i][j];
                                i=j=99999;
                            }
                        }
                    }
                }
                if(o.i==undefined){
                    r=[]
                    break;
                }else{
                    r.push(o)
                }                
            }  


            if(r.length!=0){
                for (var i = 0; i < r.length; i++) {
                    for (var ei = 0; ei< iii; ei++) {
                        if(this.arrBool[r[i].i+ei]!=undefined){
                            for (var ej = 0; ej < jjj; ej++) {
                                if(this.arrBool[r[i].i+ei][r[i].j+ej]!=undefined){
                                    this.arrBool[r[i].i+ei][r[i].j+ej].bool=1
                                }
                            }
                        }
                    }
                }
            }
            this.drag2()
            return r
        }


        this.drag2=function(){   
            for (var i = 0; i < this.kolII; i++) {
                for (var j = 0; j < this.kolJJ; j++) {
                    if(this.arrBool[i][j].bool==2){
                        this.arrBool[i][j].bool=0
                    }
                }
            }
        }
        

        this.funDragColor2=function(){               
           
        }

        var strXZ, aaa, aaa1; 
        var oobb={}       
        this.getPrice=function(a, intColor, idMat){
            for(var s in this.objObj){
                oobb[s]=0;
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==true){
                    oobb[this.array[i].idObj]++;
                }
            }            
            for(var s in oobb){
                if(oobb[s]!=0){
                    var k=Math.round(oobb[s]/this.objObj[s].kol);
                    aaa = menedsherMaterial.getArrOtObj(this.objObj[s].obj, idMat, intColor) 
                    //aaa=[];                     
                    //this.parsArr(this.objObj[s].obj.plus, aaa)           
                    aaa[9]=this.objObj[s].obj.id;
                    aaa[8]=this.objObj[s].obj;                    
                    for (var i = 0; i < k; i++) {
                        a.push(aaa)
                    }                                      
                }                
            }
        }


        this.setOS=function(o){
            if(this.objObj[o.id]==undefined)this.objObj[o.id]=this.par.mO.getIdObj(o.id)
            o3d=this.getO3D(this.objObj[o.id]); 
            this.content3d.add(o3d)
            o3d.position.x=o.x;
            o3d.position.y=o.y;
            o3d.ii=o.ii;
            o3d.jj=o.jj;
            o3d.visible=true; 

            var a=this.objObj[o.id].obj.str[0].split(",")
            var kol=a[0]*1
            var iii=a[1]*1
            var jjj=a[2]*1
            this.objObj[o.id].kol=kol
            for (var ei = 0; ei< iii; ei++) {
                if(this.arrBool[o3d.ii+ei]!=undefined){
                    for (var ej = 0; ej < jjj; ej++) {
                        if(this.arrBool[o3d.ii+ei][o3d.jj+ej]!=undefined){
                            this.arrBool[o3d.ii+ei][o3d.jj+ej].bool=1
                        }
                    }
                }
            }
        }


        this.getObj = function(){
           if(this.array.length==0)return null;  
            var a=[] 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==true){
                    var o={}
                    o.x=Math.round(this.array[i].position.x*100)/100;
                    o.y=Math.round(this.array[i].position.y*100)/100;
                    o.z=Math.round(this.array[i].position.z*100)/100;
                    o.ii=this.array[i].ii;
                    o.jj=this.array[i].jj;
                    o.id = this.array[i].idObj;
                    a.push(o)
                }
            }                
            return a;            
        }

    
        this.setObj = function(a){ 
            if(a==null) return;                    
            this.clear();
            for (var i = 0; i < a.length; i++) {
                this.setOS(a[i]);
            }
        } 


        this.parsArr=function(a, a1){
            for (var i = 0; i < a.length; i++) {
                a1[i]=a[i]
            }
        }    
    } 
}




export class BoxSS {
    constructor(par, i, j) {    
        var self=this;    
        this.type = "BoxSS";
        this.par=par;
        this._bool=0; 
        this.ii=i;
        this.jj=j;

        this._x=0;
        this._y=0;
    }
    set x(v) {
        if(this._x!=v){            
            this._x= v;            
        }       
    }   
    get x() { return  this._x;}

    set y(v) {
        if(this._y!=v){            
            this._y= v; 
        }       
    }   
    get y() { return  this._y;}

    set bool(v) {
        if(this._bool!=v){            
            this._bool= v; 
        }       
    }   
    get bool() { return  this._bool;}
}



/*
import { BKHron } from './BKHron.js';
///крючки
export class SahSuper {
    constructor(par) {    
        var self=this;    
        this.type = "SahSuper";        
        this.par=par;
        this.aH=[];
        this.arrHron;
        this.arrModel=[];
        this._polka=false;
        this._intSah=-1;
        this._intSah1=-1;
        this._intSah=-1; //-1 отсутствие 0 нет пересечений 1 пересекаеться с другой
        this._intSah1=-1;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);      
        this.array=[];        
        this.bool=false;
        this.yF=0;
        this.ySMin=0;
        this.kolII=0;
        this.kolJJ=0;
        this.pozII=0;
        this.pozJJ=0;
        this.sahII=0;
        this.sahJJ=0;

        this.arrHron=[];
        this.rect=undefined
        if(this.par.objBase.json.ido3d6){
            this.bool=true;
        }

        this.getObj = function(){ return []; }    
        this.setObj = function(a){  }
        this.clear = function(){};          
        if(this.bool==false){
            return;
        } 
        
        this.aroundButton=this.par.mO.par.aroundButton;
        var ab=[]


        for (var j = 0; j < this.par.objBase.json.modelArray6.arrJJ.length; j++) {
            ab[j]=this.par.objBase.json.modelArray6.arrJJ[j].id;       
            this.par.aa.push("mod_"+ab[j])
        } 
 
        this.par.aa.push("mod_clear_"+this.par.objBase.json.ido3d6)    

        
        this.arrHron=[]

        var obj6=this.par.objBase.json.obj6;
        
        var sah=0
        this.boolLoad=false
        this.initHron = function(){            
            sah++            
            if(sah<self.arrHron.length)return;   
            var a=[]
            for (var j = 0; j < self.par.objBase.json.modelArray6.array[0].length; j++) {
                a[j]=self.par.objBase.json.modelArray6.array[0][j].id
           
            }

            self.par.mO.getKeyArr("group", a, function(arr){
                for (var i = 0; i < self.arrHron.length; i++) {
                    self.arrHron[i].tovar=arr[i];
                }
                
                self.boolLoad=true; 

                self.drag();
                self.par.fun("visi3d");
                self.par.fun("visi3d");
                self.par.mO.dragPriceScane();
            })

        }






        
        var boolInit=false;    
        this.init= function(){
            if(boolInit==true)return
            boolInit=true;            

            for (var i = 0; i < ab.length; i++) {           
                this.arrHron.push(new BKHron(this, ab[i]*1, 1))//1
            }
            for (var i = 0; i < ab.length; i++) {
                this.arrHron[i].recurcChild = this.par.recurcChild
                this.arrHron[i].init();
            }
        }



        
       

       



        this.clear=function(){
            for (var j = 0; j < self.arrHron.length; j++) {
                self.arrHron[j].clear()
            }
        }  


        this.getO3D=function(o){ 

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    if(this.array[i].object.id==o.id){
                        return this.array[i];
                    }
                }                
            }
            
            var oo=new THREE.Object3D()
            var link="resources/data/"+o.obj.id+"/mod/"+ o.obj.mod.name   
            oo.object=o;   
                    
            this.par.mO.getModel(link, o.obj.mod.key,function(o){                
                oo.add(o);
                o.position.z=-oo.object.obj.mod.r[1];
                o.position.x=-oo.object.obj.mod.r[0];
                o.position.y=oo.object.obj.mod.r[2]+oo.object.obj.mod.r[5]/2;
                self.par.recurcChild(o);                               
                self.par.fun("visi3d");

            });            
            oo.idObj=o.obj.id;
            this.array.push(oo);            
            return oo;            
        }


        var aa;
        this.aaSob=function(s,p){                       
            
            aa=s.split("_");   

            if(aa[0]=="mod"){               
                return this.getObjSob(aa[1]);
            }

            return false
        }


        this.arraySob=[]

        this.objObj={}
        var o3d
        this.getObjSob=function(s){            
            
            if(s=="clear"){
                this.arraySob.length=0;
                this.clear();
                this.drag()
                self.par.mO.dragPriceScane();
                return false;
            }



            
            this.arraySob.push(s);
            this.drag()
            self.par.mO.dragPriceScane();
            return false;     
        }

        
        var iH,id, ii, jj,mesh,ys,kolll,ii1;
        this.drag=function(){
            this.init()
            if(self.boolLoad!=true )return
            //this.par.yS=0;
            ys=0;
            for (var j = 0; j < self.arrHron.length; j++) {
                self.arrHron[j].clear()
            }
            ii=0;
            jj=0;
            mesh=null
            for (var i = 0; i < this.arraySob.length; i++) {
                iH=-1
                id=this.arraySob[i]*1

                

                for (var j = 0; j < self.arrHron.length; j++) {
                    
                    if(self.arrHron[j].object.id == id){                        
                        iH=j;
                        break;
                    }
                }
                if(iH==-1)continue;
                var kk=this.arrHron[iH].tovar.quantity
                for (var k = 0; k < kk; k++) { 
                    kolll=Math.ceil(this.arrHron[iH].object.mod.r[3]/obj6.sah.x);

                    ii1= ii+kolll;
                    if(ii1>=obj6.kol.x){
                        jj++;
                        ii=0;
                        if(jj>=obj6.kol.y){
                            i=j=999999999999
                            break;
                            break;
                        } 
                    }

                    mesh=this.arrHron[iH].get(); 
                    mesh.position.x=obj6.position.x+obj6.sah.x*ii-this.arrHron[iH].object.mod.r[0]//self.pozII+self.sahII*ii//self.par.object.mod.r[0]+sah+j*sah   
                    mesh.position.z=obj6.position.z-this.arrHron[iH].object.mod.r[1]//self.aP1[i].object.mod.r[1];               
                    mesh.position.y=obj6.position.y+obj6.sah.y*jj+(this.arrHron[iH].object.mod.r[2]+this.arrHron[iH].object.mod.r[5]/2)//self.pozJJ+self.sahJJ*jj//- self.par.object.mod.r[2]


                    ii+=kolll;

                    if(ii>=obj6.kol.x){
                        jj++;
                        ii=0
                        if(jj>=obj6.kol.y){
                            i=j=999999999999
                            break;
                            break;
                        }                   
                    } 
                }

            }

            if(obj6.dop.num && obj6.dop.num>0 && mesh!=null)ys=obj6.dop.num;
            

            this.par.yS=ys;

        }




        var kool
        this.getPosit=function(o){ 
                   
            var r=[]
            var a=o.obj.str[0].split(",")
            var kol=a[0]*1
            kool=kol
            var iii=a[1]*1
            var jjj=a[2]*1
            var id=o.obj.id;

            for (var ii = 0; ii < kol; ii++) {
                var o={id:id};
                for (var i = 0; i < this.kolII; i++) {
                    for (var j = 0; j < this.kolJJ; j++) {                        
                        if(this.arrBool[i][j].bool==0){                            
                            var b=true;
                            for (var ei = 0; ei< iii; ei++) {
                                if(this.arrBool[i+ei]!=undefined){
                                    for (var ej = 0; ej < jjj; ej++) {


                                        if(this.arrBool[i+ei][j+ej]!=undefined){
                                            if(this.arrBool[i+ei][j+ej].bool==0){
                                                this.arrBool[i+ei][j+ej].bool=2;
                                            }
                                            else{                                                
                                               b=false;
                                            }
                                        }else{                                            
                                            b=false;   
                                        }
                                    }
                                }else{                                  
                                    b=false; 
                                }                                
                            }
                            if(b==true){                                
                                o.i=i;
                                o.j=j;
                                o.box=this.arrBool[i][j];
                                i=j=99999;
                            }
                        }
                    }
                }
                if(o.i==undefined){
                    r=[]
                    break;
                }else{
                    r.push(o)
                }                
            }  


            if(r.length!=0){
                for (var i = 0; i < r.length; i++) {
                    for (var ei = 0; ei< iii; ei++) {
                        if(this.arrBool[r[i].i+ei]!=undefined){
                            for (var ej = 0; ej < jjj; ej++) {
                                if(this.arrBool[r[i].i+ei][r[i].j+ej]!=undefined){
                                    this.arrBool[r[i].i+ei][r[i].j+ej].bool=1
                                }
                            }
                        }
                    }
                }
            }
            this.drag2()
            return r
        }


        this.drag2=function(){   
            for (var i = 0; i < this.kolII; i++) {
                for (var j = 0; j < this.kolJJ; j++) {
                    if(this.arrBool[i][j].bool==2){
                        this.arrBool[i][j].bool=0
                    }
                }
            }
        }
        

        this.funDragColor2=function(){               
           
        }
       
        var strXZ, aaa, aaa1; 
        var oobb={}       
        this.getPrice=function(a, intColor, idMat){
            if(self.boolLoad!=true )return;

          

            for (var i = 0; i < this.arrHron.length; i++) { 
                for (var j = 0; j < this.arrHron[i].array.length; j++) { 
                    if(this.arrHron[i].array[j].parent!==null){
                        menedsherMaterial.getAOO(self.par.objBase.json.modelArray6, idMat, i, a);
                    }
                }
            }    
        }


        this.setOS=function(o){
            if(this.objObj[o.id]==undefined)this.objObj[o.id]=this.par.mO.getIdObj(o.id)
            o3d=this.getO3D(this.objObj[o.id]); 
            this.content3d.add(o3d)
            o3d.position.x=o.x;
            o3d.position.y=o.y;
            o3d.ii=o.ii;
            o3d.jj=o.jj;
            o3d.visible=true; 

            var a=this.objObj[o.id].obj.str[0].split(",")
            var kol=a[0]*1
            var iii=a[1]*1
            var jjj=a[2]*1
            this.objObj[o.id].kol=kol
            for (var ei = 0; ei< iii; ei++) {
                if(this.arrBool[o3d.ii+ei]!=undefined){
                    for (var ej = 0; ej < jjj; ej++) {
                        if(this.arrBool[o3d.ii+ei][o3d.jj+ej]!=undefined){
                            this.arrBool[o3d.ii+ei][o3d.jj+ej].bool=1
                        }
                    }
                }
            }
        }


        this.getObj = function(){
            return  this.arraySob;      
        }

    
        this.setObj = function(a){ 
            if(a==null) return;
            if(a.length==0) return;
            this.arraySob=a;
            this.drag()
        } 


        this.parsArr=function(a, a1){
            for (var i = 0; i < a.length; i++) {
                a1[i]=a[i]
            }
        }    
    } 
}
*/