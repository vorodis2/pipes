

function MatObject(menu, fun) {  
    var self=this   
    this.type="MatObject";
    this.fun=fun;
    this.par=menu;
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.dCont);
    this.objDin=undefined;
    this._width=100;
    this._height=100;
    this._active=false

    this.obj=undefined;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){

    }}


    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;

    this.mBPic=new MBPic(this.content, this.otstup, this.otstup, function(s, p, p1){        
        if(s=="baseOrig"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/'+p1;            
            php.savePhoto(ll, p, function () {                
                
            }); 
            self.saveTime()
        }
        if(s=="sArray"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/';
            for (var i = 0; i < p.length; i+=2) {
                var lll=ll+p[i+1]
                
                php.savePhoto(lll, p[i]);
            } 
            menu.menuBD.redragTime();           
        }        
    })

    this.basMat=new MBasMat(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup, function(s,p){
        aGlaf.save();
        self.saveTime();
    }) 
        
    this.matGl=new MatGl(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup+this.basMat.height, function(s,p){        
       
       /* aGlaf.save();
        self.saveTime()*/
    },this) 


    this.korekt=new KorektMaterial(this,this.content, this.otstup, this.matGl.y+this.matGl.height+this.otstup-38, function(s,p){        
        
        if(s=="saveObj"){
            self.saveTime()
            return
        }

        fun(s,p);
       /* aGlaf.save();
        self.saveTime()*/
    })

    this.mResurs=new MResurs(this.content, this.widthBig*2+this.otstup*4, -32, function(s, p){      
        self.saveTime();   
    })   

    this.matGl.setTHIS(this)  


/*
    this.mBasLLL=new MBasLLL(this.content, this.otstup, this.mBas.y+this.mBas.height+this.otstup, function(s){      
        self.saveTime()
    })

    this.mMod=new MMod(this.content, this.otstup, this.mBasLLL.y+this.mBasLLL.height+this.otstup, function(s){      
        if(s=="drag3DRects"){
           fun(s)
        }

        if(s=="saveKey"){
            self.saveTime();
        }

        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
    })
*/

    this.clearMat= function(){ 
        self.par.mInfo.setFun("Чистим матерьял","Все параметры матерьяла будут преведены в изночальное состояние, то есть все будет удалено",
            function(){              
              
                var s=self.object.obj.type
                self.object.obj={type:s};
                self.korekt.objGlaf=undefined
                self.start()
               // self.setObj(self.obj)
                //self.start()
                self.save()
            }
        );
    }

    //var o={id:id, title:id, name:"xz",key:"o_"+id}
    this.start= function(){ 
        var b=false; 
         
        if(this.object==null){              this.object={}; b=true; }
        if(this.object==undefined){         this.object={}; b=true; }           
        if(this.object.id==undefined){      this.object.id=this.obj.id; b=true; }
        if(this.object.title==undefined){   this.object.title=this.obj.title; b=true; } 
        if(this.object.key==undefined){     this.object.key=this.obj.key; b=true; } 


        this.cont.visible=true;
        this.index=0;
        this.korekt.objOld=undefined

        if(this.object.obj==undefined){  this.object.obj={}; b=true; } 
        if(this.object.mirro==undefined){  this.object.mirro=false; b=true; } 


        this.korekt.setObj(this.object);
        
        
        this.matGl.setKey(this.object.key);
          
       
        /*this.mBas.setObjS(this.object, this.obj)


        if(this.object.bool==undefined){  this.object.bool=[0,0,0,0]; b=true; } 
        if(this.object.num==undefined){  this.object.num=[0,0,0,0]; b=true; } 
        if(this.object.str==undefined){  this.object.str=["0","0","0","0"]; b=true; } 

        if(this.object.orig==undefined){  this.object.orig="null"; b=true; } 

        if(this.object.mod==undefined){  this.object.mod={}; b=true; } 
        if(this.object.mod.key==undefined){  this.object.mod.key="n"; b=true; } 
        if(this.object.mod.name==undefined){  this.object.mod.name="n"; b=true; } 
        if(this.object.mod.r==undefined){  this.object.mod.r=[0,0,0,0,0,0]; b=true; } 
        if(this.object.mod.r1==undefined){  this.object.mod.r1=[0,0,0,0,0,0]; b=true; } 

        //mod.r1


        this.mBasLLL.setObj(this.object);
        
        this.mMod.setObj(this.object);

       // this.fun("open", this.object)//openMat*/

        this.mBPic.setObj(this.object);
        this.basMat.setObjS(this.object,this.obj)

        if(this.mResurs.setObj(this.object)==true)b=true

        if(b==true)this.saveTime();
    }

/**/

    this.save=function(){  
        this.object.key=this.object.obj.type;
        if(this.objDin!=undefined){
            if(this.objDin.key!=this.object.obj.type){
                this.objDin.key=this.object.obj.type;
                aGlaf.save()
            }
        }
        var s=   JSON.stringify(this.object, null,4)


        var l="../"+aGlaf.resursData+""+this.object.id+"/config.json";       
        aGlaf.php.load({tip:"saveJSON", link:l, text:s},function(e){
            
        });      
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        trace("::::saveTime")
        setTimeout(function() {
            if(self.sah==s)self.save()
        }, 100);
    }


    this.setObj= function(o){ 
        this.obj=o;
        this.object = null;
        this.cont.visible=false;

       // var l="../"+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();

        var l=php.server+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();

        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.object = conf;
                } else self.object = data;              
                self.start();           
                                 
            },
            error:function function_name(data) {
                trace("Что то случилось с конфигом")
                self.start();
            }
        }); 
    }

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;           
    }

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.rect.visible=value;
                if(value==true){
                    this.dCont.add(this.w)
                }else{
                    this.dCont.remove(this.w)
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });


    Object.defineProperty(this, "index", {
        set: function (value) {           
            this._index=value;               
            this.matGl.index=value; 
            this.korekt.index=value; 
        },
        get: function () {
            return this._index;
        }
    });
}



function MatGl(c,x,y,f,par) {  
    var self=this;   
    this.type="MMod";
    self.fun=f
    this.par=par
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
    this.arrayName=[];
    this.o=undefined;
    this.o1=undefined;
    this.y=y
    this.array=["fbx","3ds","gltf"];
    this.par=undefined;
    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    

    this.checkBox=new DCheckBox(this.panel, this.otstup, this.otstup,"mirro",function(){
        self.par.korekt.setMirro(this.value, true)
        /*self.par.object.mirro=this.value;
        self.par.saveTime()*/
    })


    this.bute=new DButton(this.panel, 100-26, this.otstup, "x",function(){
        self.par.clearMat();
    })

    this.bute.width=this.bute.height=this.checkBox.height;


    this.button=new DButton(this.panel, 100, this.otstup, "getPic",function(){
        self.getPic()
    })
    this.button.height=this.checkBox.height
    this.button.width=this.panel.width-this.otstup*2- this.button.x

    this.comboBox=new DComboBox(this.panel, this.otstup, this.otstup+26, ["mirro"],function(){
        self.par.index=this.index;
        self.par.saveTime()
    })
    this.comboBox.width=this.panel.width-this.otstup*3;

    this.height=this.panel.height=this.comboBox.y+this.comboBox.height+this.otstup*2;

    
    this.setTHIS=function(par){
        this.par=par
        this.arrayName=[]
        for (var i = 0; i < this.par.korekt.array.length; i++) {
            this.arrayName.push(this.par.korekt.array[i].name)
        }
        this.comboBox.array=this.arrayName;        
    }

    self.setKey=function(s){         
        for (var i = 0; i < this.comboBox.array.length; i++) {            
            if(this.comboBox.array[i]==s){
                this.comboBox.index=i;
            }
        }

        this.checkBox.value=this.par.object.mirro;
    }  


    self.getPic=function(){        
        var o={}
        o["32"]=aGlaf.s3d.sMaterial.foto(32);
        o["64"]=aGlaf.s3d.sMaterial.foto(64);
        o["100"]=aGlaf.s3d.sMaterial.foto(100);
        o["128"]=aGlaf.s3d.sMaterial.foto(128);
        o["256"]=aGlaf.s3d.sMaterial.foto(256);

        for (var s in o) {
            var ll = '../'+aGlaf.resursData+"" + self.par.object.id + '/'+s+".png";           
            php.savePhoto(ll, o[s], function () { });
            var ll = '../'+aGlaf.resursData+"" + self.par.object.id + '/y'+s+".png";          
            php.savePhoto(ll, o[s], function () { });
        }
                
        self.par.mBPic.button.loadImeg(o["64"]);        
    }








    Object.defineProperty(this, "index", {
        set: function (value) {           
            this._index=value;               
            this.comboBox.index=value;          
        },
        get: function () {
            return this._index;
        }
    });
}



function MBasMat(c,x,y,f) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
    this.o=undefined;
    this.o1=undefined;
    this.y=y


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=37;

    var sah=this.otstup;
    var sahPlus=2;   
    this.lid=new DLabel(this.panel,this.otstup,sah,"id:")
    this.lid.fontSize=10

    this.lid=new DLabel(this.panel,this.otstup,sah+12,"title")
    this.ititle=new DInput(this.panel,50,sah,"title",function(){
        self.o.title=this.value;
        self.o1.title=this.value;
        self.fun()
    })
    this.ititle.width=this.panel.width-50-this.otstup*2
  

   /* this.lkey=new DLabel(this.panel,this.otstup,sah,"key")
    this.ikey=new DInput(this.panel,30,sah-12,"key",function(){
        self.o.key=this.value;
        self.o1.key=this.value;
        self.fun()
    })
    this.ikey.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;*/

    this.setObjS= function(o, o1){ 
        this.o=o;
        this.o1=o1;
        this.lid.text=o.id;        
        this.ititle.text=o.title;
    }
}