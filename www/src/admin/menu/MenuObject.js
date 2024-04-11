


function MenuObject(menu, fun) {  
    var self=this   
    this.type="MenuObject";
    this.fun=fun;
    this.par=menu;
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.dCont);

    this._width=100;
    this._height=100;
    this._active=false
    if(localS.object.inObj==undefined)localS.object.inObj=false


    this.inObj=localS.object.inObj

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

    this.chekSave=new DCheckBox(this.w, 4,4,"сохронения в бд ",function(){
        self.inObj=this.value;
        localS.object.inObj=self.inObj
        localS.save()
    })
    this.chekSave.value=self.inObj;









    this.mBPic = new MBPic(this.content, this.otstup, this.otstup, function(s, p, p1){        
        if(s=="baseOrig"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/'+p1;            
            php.savePhoto(ll, p, function () {                
                
            }); 
            self.saveTime()
        }
        if(s=="sArray"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/';
            for (var i = 0; i < p.length; i+=2) {
                var lll=ll+p[i+1];                
                php.savePhoto(lll, p[i]);
            } 
            menu.menuBD.redragTime();           
        }
        if(s=="setColor"){
            
        }        
    }) 





    this.mBas=new MBas(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup, function(s){
        if(s=="dragColorGal"){
        
            menuBig.menuBD.dragColorGal()
        }

        aGlaf.save();
        self.saveTime();
    }) 

    this.mMod=new MMod(this.content, this.otstup, 150, function(s){      
        if(s=="drag3DRects"){
           fun(s);
        }
        if(s=="saveKey"){            
            self.saveTime();
        }
        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
        aGlaf.save();
        self.saveTime();
        
    })



    this.mBasLLL=new MBasLLL(this,this.content, this.otstup, 220, function(s){       
        if(s=="drag3DRects"){
           fun(s);
        }
        if(s=="saveKey"){            
            self.saveTime();
        }
        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
        self.saveTime();
    })

    this.mBLOt=new MBLOt(this,this.content, this.otstup, 220, function(s){       
        if(s=="drag3DRects"){
           fun(s);
        }
        if(s=="saveKey"){            
            self.saveTime();
        }
        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
        self.saveTime();
    })


    /*this.mFilt=new MFilt(this,this.content, this.otstup, 220, function(s, p){      
        if(s=="saveKey"){            
            
        }
        self.saveTime();   
    })*/


    this.mBase=new MBase(this,this.content, this.otstup, 220, function(s, p){          
        self.saveTime();   
    })


  

    this.mResurs=new MResurs(this.content, this.otstup, 220, function(s, p){      
        self.saveTime();   
    })    
   
    this.mIndex=new MIndex(this.content, this.otstup, 186, function(s, p){      
        self.saveTime();   
    })

    this.mShadow=new MShadow(this.content, this.otstup, 220, function(s, p){      
        self.saveTime();   
    },this)

    this.mPipes=new MPipes(this.content, this.otstup, 215, function(s, p){      
        self.saveTime();   
    },this)



   /* this.mPRS=new MPRS(this,this.content, this.otstup, 220, function(s, p){    
        if(s=="dragPozition"){
            fun(s,p);
        }

        self.saveTime();   
    })

    this.mText=new MText(this,this.content, this.otstup, 220, function(s, p){          
        self.saveTime();   
    })*/

    this.mIndex.plus(this.mBLOt,"src/admin/icon/info.png");
    this.mIndex.plus(this.mBasLLL,"src/admin/icon/info.png");
    this.mIndex.plus(this.mBase,"src/admin/icon/xz1.png");
    this.mIndex.plus(this.mResurs,"src/admin/icon/i1.png");
    this.mIndex.plus(this.mShadow, this.mShadow.linkNot);
    this.mIndex.plus(this.mPipes, "src/admin/icon/xz1.png");

    //this.mIndex.plus(this.mFilt.dCont,"src/admin/icon/xz2.png")
    //this.mIndex.plus(this.mPRS.dCont,"src/admin/icon/xz3.png")
    //this.mIndex.plus(this.mText.dCont,"src/admin/icon/xz4.png")

    var iii=0
    if(localS.object.MIndex){
        iii=localS.object.MIndex
    }
    this.mIndex.index=iii

    
    this.start= function(){ 
        var b=false;       
        if(this.object==null){      this.object={}; b=true; }
        if(this.object==undefined){      this.object={}; b=true; }           
        if(this.object.id==undefined){   this.object.id=this.obj.id; b=true; }
        if(this.object.title==undefined){this.object.title=this.obj.title; b=true; } 
        if(this.object.key==undefined){  this.object.key=this.obj.key; b=true; } 

        this.cont.visible=true;
        this.mBas.setObjS(this.object, this.obj);

        if(this.object.orig==undefined){  this.object.orig="null"; b=true; } 

        if(this.object.mod==undefined){  this.object.mod={}; b=true; } 
        if(this.object.mod.key==undefined){  this.object.mod.key="n"; b=true; } 
        if(this.object.mod.name==undefined){  this.object.mod.name="n"; b=true; } 
     



        this.mBasLLL.setObj(this.object);
        this.mBPic.setObj(this.object);
        this.mMod.setObj(this.object);
       // this.mFilt.setObj(this.object);
        this.mBase.setObj(this.object);
        this.mBLOt.setObj(this.object);

        this.mShadow.setObj(this.object);
        this.mPipes.setObj(this.object);

        //this.mText.setObj(this.object);
        
        this.par.menuVerh.topRightBut = 0;

        this.fun("open", this.object);

        if(this.mResurs.setObj(this.object)==true){
            b==true
        }

        if(b==true)this.saveTime();
    }




    this.save=function(){               
        var l="../"+aGlaf.resursData+""+this.object.id+"/config.json";       
        aGlaf.php.load({tip:"saveJSON", link:l, text:JSON.stringify(this.object, null,4)},function(e){
            
        });

        if(self.inObj == true){            
            this.obj.obj= this.object;
            aGlaf.save();       
        }        
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save();
        }, 100);
    }


    this.setObj= function(o){ 
        this.obj=o;
        this.object = null;
        this.cont.visible=false;
        var l=php.server+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();; 
        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.object = conf;
                } else self.object = data;              
                self.start(); 
                
                if(self.inObj == true){
                    self.obj.obj= self.object;
                    aGlaf.save();   
                }       
                                 
            },
            error:function function_name(data) {

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
}



function MIndex(c,x,y,f) { 
    var self=this
    this.otstup=2;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;

    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;

    this.height=20;
    this.panel.height=28;
    this.array=[]    
    this.plus=function(c,l){
        this.button=new DButton(this.panel, this.otstup+(this.otstup+this.height)*this.array.length, this.otstup," ", function(b){
            

            self.index=this.ii

            localS.object.MIndex=this.ii
            localS.save()

        },l);
        this.button.image.alpha=0.35

        this.button.c=c;
        this.button.ii=this.array.length
        this.button.width=this.button.height=this.height

        this.array.push(this.button)
        this._index=-1;
        this.index=0;

       

    }




    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){
            
                this._index=value;
                for (var i = 0; i < this.array.length; i++) {
                    if(i==value){
                        this.array[i].alpha=0.5
                        this.array[i].c.dCont.visible=true
                        this.array[i].c.visible=true
                        
                    }else{
                        this.array[i].alpha=1
                        this.array[i].c.dCont.visible=false
                        this.array[i].c.visible=false
                    }
                }
            }           
        },
        get: function () {
            return this._index;
        }
    });
}



function MMod(c,x,y,f) {  
    var self=this;   
    this.type="MMod";
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
    this.array=["fbx","3ds","gltf","glb"];

    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;


    this.button=new DButton(this.panel, this.otstup, this.otstup,"load fbx", function(b){
        if(b!=undefined){            
            self.save3d();
        }
        self.fun()
    });
    this.button.startFile();  


    this.bClose=new DButton(this.panel, this.panel.width-this.otstup*2-this.button.height, this.otstup,"x", function(b){

        self.o.mod.name="n";
        self.button.text="null load";
        self.o.mod.key="n";
        self.killDir();
        self.fun("saveKey");        
    });
    this.bClose.width=this.bClose.height;
    this.button.width= this.bClose.x-this.otstup*2;
    

    var sah=this.bClose.height + this.otstup + this.otstup;

    
    this.files;
    this.sss=0;
    this.li="0";
    this.save3d=function(){
        var files=self.button.files;
        var a=[];
        var p=-1;
        var k='';
        for (var i = 0; i < files.length; i++) {           
            a=files[i].name.split(".");
            for (var j = 0; j < this.array.length; j++) {
                if(a[a.length-1].toLowerCase()==this.array[j]){
                    p=i;
                    k=this.array[j];
                }
            }
        }

        if(p==-1) return;



        this.o.mod.name=files[p].name;
        this.button.text=this.o.mod.name;
        this.o.mod.key=k;
        this.sss=0;
        this.files=files;
        this.killDir(this.saveF);



    }  


    this.saveF=function(){
        var l='../'+aGlaf.resursData + self.o.id+"/mod/";
        self.li=l;


        php.load({tip: 'mkdir', dir: l}, function (e) {             
            php.load({tip: 'mkdir', dir: '../'+aGlaf.resurs+'tmp/'}, function (e) { 
                self.saveFile();
            });
        })        
        self.fun("saveKey");        
    }

 /*   function uploadFile(file, dest) {
        let serverURL = php.server + "src/phpBase.php";
        let data = new FormData();
        data.append('tip', 'saveFile');
        data.append('file', file);
        data.append('dest', dest);

        trace(serverURL)    

        return $.ajax({
            url: serverURL,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post'
        });
    }
*/






    this.saveFile=function(){
       /* trace(self.files[self.sss])
        
        uploadFile(self.files[self.sss],self.files[self.sss].name)


        return;*/
        var ll=php.server+"src/upload.php";
        var form_data = new FormData();

        var size=(self.files[self.sss].size/1024*0.001)

        form_data.append('file', self.files[self.sss]); 

        if(size>2){

            aGlaf.menu.mInfo.setFun(
            "Обьект больше 2 метров",
            "Из за того что обьект здоровый, более 2 метров, скорее всего php не сможет передвть, нужно ручками перекинуть в "+aGlaf.resursData + self.o.id+"/mod/")
            


             /*self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){ 
                        var id=self.grtMaxPlus()
                        php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                                var o={id:id, title:id, name:"xz",key:"o_"+id}
                                self.objectBase.bd.unshift(o);                    
                                aGlaf.save();
                                self.reDrag();               
                            });
                        })
                    }
                ); */  
        }
              
        $.ajax({
            url: ll,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(php_script_response){
                if(self.sss>=self.files.length-1){
                    self.saveFile1()
                }else{
                    self.sss++;
                    self.saveFile();
                }
            }
        });
    }

    this.saveFile1=function(){
       
        var llll='../'+aGlaf.resurs+'tmp/';
        var llllll='../'+aGlaf.resursData + self.o.id + '/mod/'//+self.files[self.sss].name;
        
        php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
            php.load({tip: "removeDirRec", dir: llll, }, function (e) { 
                self.fun("saveKey");
                setTimeout(function() {
                   self.fun("reDrahObj"); 
                }, 400);
                
            })            
        })       
    }




    this.killDir=function(f){
        var l='../'+aGlaf.resursData + this.o.id+"/mod/";
        php.load({tip: "removeDirRec", dir: l, }, function (e) { 
            //self.fun("reDrahObj")
            if(f)f()
        })
    }




    this.drag=function(){
        for (var i = 0; i < self.o.mod.r.length; i++) {            
            self.o.mod.r[i] = self.ar[i].text*1;
            self.o.mod.r1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }

    this.height=this.panel.height=sah

    this.setObj= function(o){         
        this.o=o;  
        if(this.o.mod.name=="n"){
            this.button.text="null load";
        }else{
            this.button.text=this.o.mod.name;
        }
    }
}




function MBLOt(p,c,x,y,f) { 
 var self=this   
    this.type="MBLOt";
    self.fun=f
    this.par=p
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

    this.keyName="iNum";
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
 
    var kolObj=4;
    var kolObj2=6;


    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < kolObj; i++) {
            if(this.aBool[i].value==true) this.o.bool[i]=1;
            else this.o.bool[i]=0;
        }
        for (var i = 0; i < kolObj; i++) {
            this.o.num[i]=this.aNum[i].value*1;        
        }
        for (var i = 0; i < kolObj2; i++) {
            this.o.str[i]=this.aStr[i].value;          
        }
        for (var i = 0; i < 5; i++) {            
            this.o.plus[i]=this.ap[i].value           
        }
        for (var i = 0; i < 5; i++) {            
            this.o.plus1[i]=this.ap1[i].value           
        }
        self.fun();
    }    

             
     



    this.dragOt=function(){
        if(this.o[this.keyName]!=undefined)if(this.o[this.keyName].active==false){
            delete this.o[this.keyName]
        }
        

        for (var i = 0; i < kolObj; i++) {
            if(this.o.bool[i]==0) this.aBool[i].value=false;
            else this.aBool[i].value=true;
        }


        for (var i = 0; i < kolObj; i++) {
            this.aNum[i].value=this.o.num[i];           
        }       




        for (var i = 0; i < kolObj2; i++) {
            if(this.o.str[i]==undefined)this.o.str[i]="0"
            this.aStr[i].value=this.o.str[i];           
        }

        for (var i = 0; i < 5; i++) {
            if(this.o.plus[i]==undefined)this.o.plus[i]="0"
            this.ap[i].value=this.o.plus[i];           
        }
        for (var i = 0; i < 5; i++) {
            if(this.o.plus1[i]==undefined)this.o.plus1[i]="0"
            this.ap1[i].value=this.o.plus1[i];           
        }

       


        this.sPriority.value=self.o.priority;
        this.sBagY.value=self.o.bagY;
        
        for (var i = 0; i < this.o.mod.r.length; i++) {
            this.ar[i].value=Math.round(this.o.mod.r[i]*1000)/1000
            this.ar1[i].value=Math.round(this.o.mod.r1[i]*1000)/1000
        }
    }


    var w=70;
    var ss=0;   

    ////////////////////////////////////////////////
    this.dragR=function(){

        for (var i = 0; i < self.o.mod.r.length; i++) {            
            self.o.mod.r[i] = self.ar[i].text*1;
            self.o.mod.r1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }



    var sahPlus=24;
    var w=(this.panel.width-this.otstup*2)/6-this.otstup;
    this.ar=[];    


    for (var i = 0; i < 6; i++) {
        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar[i].height=20;
        this.ar[i].idArr=i;
        this.ar[i].width=w; 
        this.ar[i].fontSize=10; 
        this.ar[i].okrug=1000
        this.ar[i].setNum(0.1);
    }
    sah+=20+this.otstup;

    this.ar1=[];
    for (var i = 0; i < 6; i++) {
        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar1[i].height=20;
        this.ar1[i].idArr=i;
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=10;
        this.ar1[i].okrug=1000   
        this.ar1[i].setNum(0.1);  
    }
    sah+=20+this.otstup;

    this.buttonRect=new DButton(this.panel,this.otstup, sah, "get rect",function(){        
        var a=aGlaf.s3d.sMod.getRect();  
              
        if(a[0]==Infinity){
            for (var i = 0; i < 6; i++) {
                self.o.mod.r[i] = self.ar[i].text= 0;
                self.o.mod.r1[i] = self.ar1[i].text= 0;
            } 
        }else{
            for (var i = 0; i < 6; i++) {
                self.o.mod.r[i] = self.ar[i].text= Math.round(a[i]*1000)/1000;
                self.o.mod.r1[i] = self.ar1[i].text= Math.round(a[i]*1000)/1000;
            } 
        }
        
        self.fun("drag3DRects"); 
        self.fun("saveKey"); 
    })
    this.buttonRect.width=186;
    this.buttonRect.height=20;
    sah+=this.buttonRect.height+this.otstup*2;



    //////////////////////////////////////////


    
    w=70;

    this.lbool=new DLabel(this.panel,this.otstup,sah+9,"bool");
    this.aBool=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aBool[i]=new DCheckBox(this.panel,45+i*37, sah,i+" ",this.drag);
        this.aBool[i].idArr=i
        this.aBool[i].width=w;
        ss++
        if(ss==4){
           ss=0;
           sah+=sahPlus;
        }
    }

    sah+=this.otstup;
   // sah+=sahPlus;


    this.lnum=new DLabel(this.panel,this.otstup,sah+9,"num");
    this.aNum=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aNum[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,"0",this.drag);
        this.aNum[i].idArr=i
        this.aNum[i].width=w;
        this.aNum[i].height=sahPlus-2;
        ss++
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }

    this.lstr=new DLabel(this.panel,this.otstup,sah+9,"str");
    this.aStr=[];
    ss=0
    for (var i = 0; i < kolObj2; i++) {
        this.aStr[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,i+" ",this.drag);
        this.aStr[i].idArr=i
        this.aStr[i].width=w;
        this.aStr[i].height=sahPlus-2;
        ss++;
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    } 

    

    this.sBagY=new DSliderBig(this.panel, 2, sah, function(){
        self.o.bagY=this.value;
        self.dragOt();
        self.fun();
    }, "bagY", -100, 100);
    this.sBagY.okrug=100;
    this.sBagY.width=this.panel.width-8

    sah+=50


    this.sPriority=new DSliderBig(this.panel, 2, sah, function(){
        self.o.priority=this.value;
        self.dragOt();
        self.fun();
    }, "priority", 0, 100);
    this.sPriority.okrug=1;
    this.sPriority.width=this.panel.width-8;

    sah+=50

    this.ap=[];
    let kp=5
    ss=0
    w=(this.panel.width-20)/kp
    for (var i = 0; i < kp; i++) {
        this.ap[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.drag);
        this.ap[i].idArr=i
        this.ap[i].width=w;
        this.ap[i].height=sahPlus-2;        
    } 
    sah+=26

    this.ap1=[];

    for (var i = 0; i < kp; i++) {
        this.ap1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.drag);
        this.ap1[i].idArr=i
        this.ap1[i].width=w;
        this.ap1[i].height=sahPlus-2;        
    } 
    sah+=26

    this.height=this.panel.height=sah+this.otstup;



   
    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
           //this.o[this.keyName].active=true; 
            this.o[this.keyName].rect=[0,0,0,0,0,0];
            this.o[this.keyName].rect1=[0,0,0,0,0,0];
            this.o[this.keyName].bool=[0,0,0,0];
            this.o[this.keyName].num=[0,0,0,0];
            this.o[this.keyName].str=["0","0","0","0"];
        }else{
            delete this.o[this.keyName]
            /*this.o[this.keyName].active=false;
            delete this.o[this.keyName].rect;
            delete this.o[this.keyName].rect1;
            delete this.o[this.keyName].bool;
            delete this.o[this.keyName].num;
            delete this.o[this.keyName].str;*/
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }

   /* this.batACreat=new DButton(this.dCont, this.otstup, this.otstup,"создать инфу",function(){
        if(self.panel.visible==true){
            self.par.par.mInfo.setFun("Очистка инфы","Информация будет удолена безвозвратно",function(){              
                self.batACreat.text="создать инфу" 
                self.panel.visible=false; 
                self.creat(false)               
            }
        );                   
        }else{
            self.creat(true)
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }
    })
    this.batACreat.width=186 */

    this.panel.y=-4

   





    this.setObj= function(o){       
        this.o=o;
        
        let b=false
        if(this.o.bool==undefined){
            b=true
            this.o.bool=[0,0,0,0]
            this.o.num=[0,0,0,0]
            this.o.str=["0","0","0","0"]
            this.o.mod.r=[0,0,0,0,0,0];
            this.o.mod.r1=[0,0,0,0,0,0];
        }

        //self.o.priority

        if(self.o.priority==undefined){
            self.o.priority=100
            b=true
        }
        if(self.o.bagY==undefined){
            self.o.bagY=0
            b=true
        }

        trace(self.o)
        if(self.o.plus==undefined){
            self.o.plus=["0","0","0","0","0"]
            self.o.plus1=["0","0","0","0","0"]
            b=true
        }

        if(b==true)self.fun("saveTime"); 


        

        /*if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={active:false} 
            self.fun("saveTime"); 
            return
        }*/
        this.dragOt();       
    }


}










function MBasLLL(p,c,x,y,f) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.par=p
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

    this.keyName="iNum";
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
 
    var kolObj=4;


    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < kolObj; i++) {
            if(this.aBool[i].value==true) this.o[this.keyName].bool[i]=1;
            else this.o[this.keyName].bool[i]=0;
        }
        for (var i = 0; i < kolObj; i++) {
            this.o[this.keyName].num[i]=this.aNum[i].value*1;        
        }
        for (var i = 0; i < kolObj; i++) {
            this.o[this.keyName].str[i]=this.aStr[i].value;          
        }


        self.fun()
    }    

             
     



    this.dragOt=function(){
        if(this.o[this.keyName]!=undefined)if(this.o[this.keyName].active==false){
            delete this.o[this.keyName]
        }
        if(this.o[this.keyName]==undefined){
            self.batACreat.text="создать инфу" 
            self.panel.visible=false;   
            return
        }else{
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }

        for (var i = 0; i < kolObj; i++) {
            if(this.o[this.keyName].bool[i]==0) this.aBool[i].value=false;
            else this.aBool[i].value=true;
        }


        for (var i = 0; i < kolObj; i++) {
            this.aNum[i].value=this.o[this.keyName].num[i];           
        }       




        for (var i = 0; i < kolObj; i++) {
            if(this.o[this.keyName].str[i]==undefined)this.o.str[i]="0"
            this.aStr[i].value=this.o[this.keyName].str[i];           
        }

        
        for (var i = 0; i < this.o[this.keyName].rect.length; i++) {
            this.ar[i].value=this.o[this.keyName].rect[i]
            this.ar1[i].value=this.o[this.keyName].rect1[i]
        }
    }


    var w=70;
    var ss=0;   

    ////////////////////////////////////////////////
    this.dragR=function(){

        for (var i = 0; i < self.o.iNum.rect.length; i++) {            
            self.o.iNum.rect[i] = self.ar[i].text*1;
            self.o.iNum.rect1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }



    var sahPlus=24;
    var w=(this.panel.width-this.otstup*2)/6-this.otstup;
    this.ar=[];    


    for (var i = 0; i < 6; i++) {
        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar[i].height=20;
        this.ar[i].idArr=i;
        this.ar[i].width=w; 
        this.ar[i].fontSize=10; 
        this.ar[i].okrug=1000
        this.ar[i].setNum(0.1);

    }
    sah+=20+this.otstup;

    this.ar1=[];
    for (var i = 0; i < 6; i++) {
        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar1[i].height=20;
        this.ar1[i].idArr=i;
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=10;
        this.ar1[i].okrug=1000   
        this.ar1[i].setNum(0.1);  
    }
    sah+=20+this.otstup;

    this.buttonRect=new DButton(this.panel,this.otstup, sah, "get rect",function(){        
        var a=aGlaf.s3d.sMod.getRect();        
        if(a[0]==Infinity){
            for (var i = 0; i < 6; i++) {
                self.o[self.keyName].rect[i] = self.ar[i].text= 0;
                self.o[self.keyName].rect1[i] = self.ar1[i].text= 0;
            } 
        }else{
            for (var i = 0; i < 6; i++) {
                self.o[self.keyName].rect[i] = self.ar[i].text= Math.round(a[i]*1000)/1000;
                self.o[self.keyName].rect1[i] = self.ar1[i].text= Math.round(a[i]*1000)/1000;
            } 
        }
        
        self.fun("drag3DRects"); 
        self.fun("saveKey"); 
    })
    this.buttonRect.width=186;
    this.buttonRect.height=20;
    sah+=this.buttonRect.height+this.otstup*2;



    //////////////////////////////////////////


    
    w=70;

    this.lbool=new DLabel(this.panel,this.otstup,sah+9,"bool");
    this.aBool=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aBool[i]=new DCheckBox(this.panel,45+i*37, sah,i+" ",this.drag);
        this.aBool[i].idArr=i
        this.aBool[i].width=w;
        ss++
        if(ss==4){
           ss=0;
           sah+=sahPlus;
        }
    }

    sah+=this.otstup;
   // sah+=sahPlus;


    this.lnum=new DLabel(this.panel,this.otstup,sah+9,"num");
    this.aNum=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aNum[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,"0",this.drag);
        this.aNum[i].idArr=i
        this.aNum[i].width=w;
        this.aNum[i].height=sahPlus-2;
        ss++
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }

    this.lstr=new DLabel(this.panel,this.otstup,sah+9,"str");
    this.aStr=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aStr[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,i+" ",this.drag);
        this.aStr[i].idArr=i
        this.aStr[i].width=w;
        this.aStr[i].height=sahPlus-2;
        ss++;
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }   

    this.height=this.panel.height=sah+this.otstup;



   
    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
           //this.o[this.keyName].active=true; 
            this.o[this.keyName].rect=[0,0,0,0,0,0];
            this.o[this.keyName].rect1=[0,0,0,0,0,0];
            this.o[this.keyName].bool=[0,0,0,0];
            this.o[this.keyName].num=[0,0,0,0];
            this.o[this.keyName].str=["0","0","0","0"];
        }else{
            delete this.o[this.keyName]
            /*this.o[this.keyName].active=false;
            delete this.o[this.keyName].rect;
            delete this.o[this.keyName].rect1;
            delete this.o[this.keyName].bool;
            delete this.o[this.keyName].num;
            delete this.o[this.keyName].str;*/
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }

    this.batACreat=new DButton(this.dCont, this.otstup, this.otstup,"создать инфу",function(){
        if(self.panel.visible==true){
            self.par.par.mInfo.setFun("Очистка инфы","Информация будет удолена безвозвратно",function(){              
                self.batACreat.text="создать инфу" 
                self.panel.visible=false; 
                self.creat(false)               
            }
        );                   
        }else{
            self.creat(true)
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }
    })
    this.batACreat.width=186 
    this.panel.y=34

   





    this.setObj= function(o){       
        this.o=o;
        trace(o)

        /*if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={active:false} 
            self.fun("saveTime"); 
            return
        }*/
        this.dragOt();       
    }



}














function MBas(c,x,y,f) {  
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
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
    this.lId=new DLabel(this.panel,this.otstup,sah)
    sah+=sahPlus;

    this.ltitle=new DLabel(this.panel,this.otstup,sah,"title")
    this.ititle=new DInput(this.panel,30,sah-12,"title",function(){
        self.o.title=this.value;
        self.o1.title=this.value;
        self.fun()
    })
    this.ititle.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;

    this.lkey=new DLabel(this.panel,this.otstup,sah,"key")
    this.ikey=new DInput(this.panel,30,sah-12,"key",function(){
        self.o.key=this.value;
        self.o1.key=this.value;
        self.fun()
    })
    this.ikey.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;




    this.buttonColor=new DButton(this.panel,this.panel.width-16-4,this.otstup,"",function(base64){
        
        if(self.dColor.visible==true){

            self.o1.c=undefined
            delete self.o1.c
            self.fun()
            self.dColor.visible=false;
        }else{

            self.dColor.value="#000000";
            self.dColor.visible=true;
            self.o1.c=self.dColor.value
            self.fun()
        }

    },'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEhUlEQVRYR+2VbUhbZxTHz3NvvPGaaGJ8YS4FBw0IE8ThvBCiSUSkLajZOty06gc7cWxCmSxzpon4Eq1xrbDVgXXttDBWKyL4ZVVY19ybD3Nskw1GdTJmlMa6F2uiTa/JTbzPCCjsgy9X/SCDPl+f8/zP7/zvOeciOOGDTjg/PAf4/ztgNptTAeAdjPHfHMfdPGxPHcsBg8GQKJPJRhFC57YTt7Is23UYiCMDxCrHGA8mnXrpzKOLDqz68QGFpkYiANDGsmyfVIgjAZjNZjUA3FUqlUabsye8fOrlxNtXu0WNjOAf/8AliNHIxyzLOqRAHBqAYZgUmqYHNBrNWZvNFsnPz1f3PY6iO08iW78S8aT+t+8E2WAHEQ2Hez0eT+tBEIcC0Ov1GoqiRlQqlcHpdEZycnJUAIACWwD+LYDLywDjPMbnVv/YDHa9R4rRyAssywb2g5AMsJ38BgC8Ybfbl0tKSrQAQPxX/P1HAJ9uAJx/6ObXBjoTMMa/A8Awx3FXASC6G4gkgIKCgmSSJO8qFApTJBKRMQwTsNvtNE3TCTui/BZAxjzA6cBKKKXzbSpOodx6se7Dp97rDjoaDrV6PJ5dG1MSgNlsrsYYD/X09PyTkZEhtrS0aLKzs9etVmsSTdPKGMT9dQDLooCLR69tRSICCBcuRR9QmvjX7n3OB+6NCCzLJh/ZgaKiIgPG+GuLxSI0NjYmLSwsPHU4HAlZWVmbdrtdHh9PKy+tAPz5y0x4LRRG5w168hUFQr3ffr+2+YVLEV73N3k8nsEjA8QeGo3GcoIgbtXX1/PV1dWZXq/X19zcrMnJyQl8YLWqrwXphLhnYaE4VU69miCKExMTT/r7+5NFUezyeDxOABCPBRB7bDKZLsvl8o6pqSmMEIqbn59fbWtro3U6XcjaYqOUCkWiDIE4Nja2Mjw8rOZ5vlUQhBvT09Obe02CpB7Q6/V0XFycniTJWwzDKF0uV9qO4NLSkq+pqSk1NzfXb7VaVZOTk8H+/v7YouriOC5W+b7nQIDCwsI0giBcCKG3LBbLs7q6Otrv9wsTExOqzMzMzdLSUpnX6w22t7fTarVaWFxclPM83xkMBj+bmZnhjwNAGo3GMwihL7VabXxHR8eKTqc7HQqFNiorK8n19XU/AKgqKioC9fX16UNDQ8Lo6CiFMe7kOO7KQYl37nd1QKfTybVarVMul18sKyuLVlVV0SkpKYnRaDTU3d0ddLvdSwih1zHGeoTQ9by8PNns7CzN8/yVYDD4iZTK9wUwGo0XCIL4yuFw/JWXl5dG0zSiKAq53e4Nl8slFwShjOO4b2IihYWFxSRJ9omiOLDXqB16FZtMpl6CIJrHx8cDNTU1dHl5eaS2tjbc0NBA+Hy+mxzHfSTV4oPidv0EZrM59it1Tk5Orvp8PjE9PZ2y2Wzk7OzsQwAoY1l29SBhqfe7AhgMhmyZTHafYZh4hmGS5ubmNliWJUVRfJNl2Smp4lLi9hzD7fG7DQBnEUI/Y4zf5TjuJwDAUoSlxhy4B6QKHTXuOcBzB07cgX8B+4HTMGa/rP4AAAAASUVORK5CYII=')
    this.buttonColor.width=16;
    this.buttonColor.height=16;
    this.buttonColor.panel1.alpha=0.2
    this.buttonColor.panel.visible=false


    this.dColor=new DColor(this.panel,this.panel.width,this.otstup,"",function(base64){        
        self.o1.c=this.value
        self.fun("dragColorGal");

        
    });
    this.dColor.width=150


    this.setObjS= function(o, o1){ 

        this.o=o;
        this.o1=o1;

        this.lId.text="id: "+o.id;
        this.ikey.text=o.key;
        this.ititle.text=o.title;

        if(o1.c==undefined){

            this.dColor.value="#000000";
            this.dColor.visible=false;
        } else{

            this.dColor.value=o1.c;
            this.dColor.visible=true;
        }  
    }
}


function MBasPlus(c,x,y,f) {  
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
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;

    this.window=new DPanel(this.dCont, 200, -100)
    this.window.width=100;
    this.window.height=100



    this.sBagY=new DSliderBig(this.window.content, 2, 2, function(){
        self.o.bagY=this.value;
        self.dragOt();
        self.fun();
    }, "bagY", -100, 100);
    this.sBagY.okrug=100;
    this.sBagY.width=this.window.width-4




    this.sPriority=new DSliderBig(this.window.content, 2, 50, function(){
        self.o.priority=this.value;
        self.dragOt();
        self.fun();
    }, "priority", 0, 100);
    this.sPriority.okrug=1;
    this.sPriority.width=this.window.width-4



  

    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < this.aStr.length; i++) {
            this.o.plus[i]=this.aStr[i].value;          
        }
        for (var i = 0; i < this.aStr1.length; i++) {
            this.o.plus1[i]=this.aStr1[i].value;          
        }
        self.fun();
    }

    this.dragOt=function(){
        for (var i = 0; i < this.o.plus.length; i++) {
            this.aStr[i].value=this.o.plus[i];           
        }
        for (var i = 0; i < this.o.plus1.length; i++) {
            this.aStr1[i].value=this.o.plus1[i];           
        }
        
        this.sPriority.value=this.o.priority;
        this.sBagY.value=this.o.bagY;
    }



    this.aStr=[];   
    var w=100;
    var ss=0; 
    this.plusss= function(text){  
        this.lstr=new DLabel(this.panel,this.otstup,sah+9,text);
        this.aStr[ss]=new DInput(this.panel,this.widthBig-w-this.otstup*5, sah,"null",this.drag);
        this.aStr[ss].idArr=ss
        this.aStr[ss].width=w;
        ss++;
        sah+=sahPlus;
    }


    this.plusss("артикул");
    this.plusss("название");
    this.plusss("размер");
    this.plusss("цена Бел");
    this.plusss("цвет");
    this.height=this.panel.height=sah+this.otstup;


    this.aStr1=[];   
    
    ss=0; 
    sah=0;
    this.plusss1= function(text){         
        this.aStr1[ss]=new DInput(this.panel, 110+this.widthBig-w-this.otstup*5, sah+this.otstup,"null",this.drag);
        this.aStr1[ss].idArr=ss;
        this.aStr1[ss].width=w;
        ss++;
        sah+=sahPlus;
    }


    this.plusss1("артикул");
    this.plusss1("название");
    this.plusss1("размер");
    this.plusss1("цена Бел");
    this.plusss1("цена Бел");


    this.setObj= function(o){       
        this.o=o;
        if(this.o.plus==undefined){
            this.o.plus=["данные","данные","данные","1000","xz"];
            self.fun();
        }
        if(this.o.plus1==undefined){
            this.o.plus1=["данные","данные","данные","1000","xz"];
            self.fun();
        }

        if(this.o.priority==undefined){
            this.o.priority=0;
            self.fun();
        }  
        if(this.o.bagY==undefined){
            this.o.bagY=0;
            self.fun();
        }  
              
        this.dragOt();
    }



}

function MPipes(dCont, _x,_y,fun, par) {  
    var self=this   
    this.type="MPipes";
    this.fun=fun;
    this.par=par

    this.otstup=aGlaf.otstup;
    this.wh=28;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig-8;
   
    this.dCont=new DCont(dCont);
    this.dCont.x=_x;
    this.dCont.y=_y;

    this._visible=true

    this.array=[];

    this.panel=new DPanel(this.dCont, this.otstup, this.otstup);
    this.panel.width=this.widthBig;

    this.panel1=new DPanel(this.panel, this.otstup, this.otstup);
    this.panel1.width=this.panel.width-this.otstup*2
    this.panel1.height=this.wh+this.otstup*2

    this.bp=new DButton(this.panel1, this.otstup,this.otstup,'+',function(){
        let o={
            position:{
                x:0,
                y:0,
                z:0
            },
            rotation:{
                x:0,
                y:0
            },    
            diameter:20,
            type:0
        }
        self.object.pipes.array.push(o);
        self.drag();
        self.fun()       
    })
    this.bp.width=this.bp.height=this.wh



    self.object;
    this.setObj= function(o){         
        this.object=o;         
        if(this.object.pipes==undefined){
            this.object.pipes={array:[]}
        }
        this.drag();
    }


    this.clear= function(o){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dCont.visible = false
        }
    }


    this.drag = function(o){
        this.clear()
        let yy=this.wh+this.otstup*4;
        for (var i = 0; i < this.object.pipes.array.length; i++) {
            if(this.array[i]==undefined) {
                this.array[i]=new MPBox(this, function(s,p){
                    
                    if(s=='save')fun()
                    if(s=='kill'){
                        self.object.pipes.array.splice(p,1)
                        self.drag()
                        fun()
                    }
                })
                this.array[i].idArr=i
            }   

            let ab=this.array[i]
            ab.setObj(this.object.pipes.array[i])
            ab.dCont.y=yy;
            ab.dCont.visible=true;
            yy+=this.array[i].height+this.otstup;           
        }

        


        this.panel.height=yy;
    }



}
function MPBox(par,fun) {  
    var self=this   
    this.type="MPBox";
    this.fun=fun;
    this.par=par
    this.idArr=-1
    this.otstup=aGlaf.otstup;
    this.wh=28;
    this.height=44
    this.dCont=new DCont(par.panel);
    this.dCont.x=this.otstup;


    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=par.panel.width-this.otstup*2



    let yy=this.otstup

    new DLabel(this.panel, 5,yy,"диаметр:").fontSize=10
    var dLd=new DLabel(this.panel, 50+5,yy,"xx")
    dLd.fontSize=10

    new DLabel(this.panel, 80,yy,"тип:").fontSize=10

    var bbb=new DButton(this.panel,  this.panel.width -this.otstup*2 -10,yy,"x",function(){
        self.fun('kill',self.idArr )
       
    })
    bbb.width=bbb.height=10;


    let bs=new DButtons(this.panel, 100,yy,["0",'1'],function(){
        self.object.type=this.index
        self.fun('save')
    })
    bbb.wh = 16;

    

   // bs.array[0].link='resources/data/304/64.png'
   // bs.array[1].link='resources/data/305/64.png'
    for (var i = 0; i < bs.array.length; i++) {
        bs.array[i].width=bs.array[i].height=bbb.wh
        bs.array[i].x=i*(bbb.wh+2)
    }


    yy+=this.otstup+this.wh/2

    var ww=44
    var ad=[]
    var sa=["x","y","z" ]
    var saO={}
    for (var i = 0; i < 3; i++) {
        let inp=new DInput(this.panel, 50+(this.otstup+ww)*i,yy,'',function(){
            ooo[this.title1][this.title]=this.value;
            self.fun('save')
        } )
        inp.title=sa[i]
        inp.title1="position"
        inp.width=ww;
        inp.height=this.wh/2
        inp.fontSize=10
        saO[sa[i]]=inp
        inp.setNum(0.1)
    } 
    new DLabel(this.panel, 5,yy,"позиция").fontSize=10

    yy+=this.otstup+this.wh/2

    var saO1={}
    for (var i = 0; i < 2; i++) {
        let inp=new DInput(this.panel, 50+(this.otstup+ww)*i,yy,'',function(){
            ooo[this.title1][this.title]=this.value;
            self.fun('save')
        } )
        inp.title=sa[i]
        inp.title1="rotation"
        inp.width=ww;
        inp.height=this.wh/2
        inp.fontSize=10
        saO1[sa[i]]=inp
        inp.setNum(0.1)
    } 
    new DLabel(this.panel, 5,yy,"угол").fontSize=10


    yy+=this.otstup+this.wh/2
    this.height=yy    
    this.panel.height= this.height


    this.object
    var ooo
    this.setObj= function(o){ 
        ooo=o
        this.object=o

        if(o.type==undefined)o.type=0

        for(let s in o.position){
            saO[s].value=o.position[s]        
        }

        for(let s in o.rotation){
            saO1[s].value=o.rotation[s]        
        }
        dLd.text="Ø"+o.diameter
        bs.index=o.type
    }





}


function MShadow(dCont, _x,_y,fun, par) {  
    var self=this   
    this.type="MShadow";
    this.fun=fun;
    this.par=par

    this.otstup=1//aGlaf.otstup;
    this.wh=28;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig-8;
   
    this.dCont=new DCont(dCont);
    this.dCont.x=_x;
    this.dCont.y=_y;

    this._visible=true
    this.linkNot =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQElEQVRYR8WWXUgUURTH/3d2nd3Zza9U6EtDMjZndtzNiMrQtFIki4h8CKmewqIofAqCIiiC3iQKPx6isBJfKkkiskAS0l6s2WZn1Ye0ol3roUDzo7LdG7u4Uqs7MzuGnqdl9vzP+d1zLvccgiU2YiS/yym0ebzKISPaWI0qgEvkj5snfrT1DQ2NRoUukW8mILWSrBiCTwjALQo0LPg7WfQbpoO50sDA+4VWQfUU0WQh8jObhCwNhGBfNCEBLr6RlUuLAhAnSY8kK9uXDoDSMcnrS106gJi7YRQk7h3Y6HCsoqzZrxY4iNAOWe7vNpo8rIsL4BaFZgC1GsGnJVlh/yuAWxROAfQcQFbrCUxBT3hkXxjWkM2pQEFB/lYmxLSAYL3eiDSEGx5FOa3X/2+/eVvgFoQaMLiXYMBJSVbsCWpU70DkFUzYaKhC8vY/06tTu4QTAGx6A8X4PZJkZb8ebVwAlyhcJsB5PUHm96EvJNlXqqVXmwWMWxSCWgFU/9fRDl3DaCEQWmNbYx9YaBsASukRj9d3N94hNJeK2flvvAyqr+ViAPyz0MSeQwcA/xgge4wX4N+NKmEAl5M/QQhpNApw2f0d++58JG3VGUd/jZnvH+38En5fZk27Ak5nEQh9aRSgqWgS61akwMaa0aUEbu5tHTmWEECBw5HLsOYhIwDWJBMaKuzItkzBP2kC+3s8xNcPmhIC4Hk+hzWRD3oBklgWdvsyEEKQx47iyrUm+G+fQVb1JSx/fgFdXn97VevIgWg8zRZExjNletUALBYLOJs9kjTW2nePo2fwM3ZWiQgOfwVbmodAhxfdg4Hsww++fdIEcAtCHRjUxwa2WjlwNu1ZdTIngKr8tIicLLfBWpkf+T3V2oeHfUOV2gBOoRME5WERx9lg5Ti93Zj166iYADNTHa5mU+T79NsAPvcOx98HoupCt3g2JTVtMwEpA5CRcHYALUXfkJFsjUiZdA5mYSUCT3zI2rhGG0AtYXFxcaGZoaUUpGwGcM5GtJb9jqtbgsiszMet669RmBlCut2CFVnJeMcyU5otMHLiGQ0pKSnZlsr8KrMwwTLBPr6reywLjQd/Y335Bgw89U3zda8sfwCotfxzr1MzGQAAAABJRU5ErkJggg=='
   
    this.array=[];

    this.w=new DWindow(this.dCont, this.otstup, this.otstup,"MShadow");

    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.w.width=this.widthBig;   

    this._otKrai=10;

    this.bitmap= new DBitmapData(2,2)
    this.canvas= document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.smc=undefined;//visi3D.utility.smc
    //this.smc.clear();
    //this.smc.addObj(this._obj3d);

    this._alpha=0.5;

    this.get2=function(n){
        var r=2;
        for (var i = 0; i < 12; i++) {
            r*=2;            
            if(r>n) return r 
        }
        return r 
    }

    this.button=new DButton(this.w.content,this.otstup,this.otstup*2,"",function(){
        var o={};
        o.wh=Math.round(wh);
        o.wh2=self.get2(o.wh);
        o.otKrai=self.otKrai;
        o.alpha=self.alpha;

        


        self.bitmap.width = o.wh2;
        self.bitmap.height = o.wh2;
        self.bitmap.clear()


        var bitmap=self.bitmap
        bitmap.ctx.clearRect(0, 0, bitmap.width, bitmap.height);
        bitmap.ctx.drawImage(self.smc.canvas, 0, 0, self.bitmap.canvas.width, self.bitmap.canvas.height); 
        bitmap.imgData = bitmap.ctx.getImageData(0, 0, bitmap.width, bitmap.height); 
        let a;
        let b=[0,1,222,255];
        for (var i = 0; i < bitmap.width; i++) {
            for (var j = 0; j < bitmap.width; j++) {               
                a=self.bitmap.getPixel(i,j)              

                b[0]=a[0]
                b[1]=a[1]
                b[2]=a[2]
                b[3]=Math.round(a[3]*self._alpha)
                bitmap.setPixel(i, j, b);
            }
        }
        bitmap.upDate();

        let ss=self.bitmap.canvas.toDataURL("image/png");
        let dir='../' + aGlaf.resursData + self.object.id+"/shadow";
        php.load({ tip: 'mkdir', dir: dir }, function (e) {
            bitmap.canvas.toBlob((blob) => {                
                let f=new File([blob], "shadow.png")                
                uploadFile(f,dir+"/shadow.png")
                self.object.shadow=o;
                self.fun();
            }, 'png');
        })

        this._link="sdfasfasdfasdf"      
        this.loadImeg(ss);

    },this.linkNot)
    this.button.width=this.button.height=64;

    this.bClose=new DButton(this.w, 0, this.otstup,"x", function(b){
        self.object.shadow=undefined;
        delete self.object.shadow
        self.setObj(self.object)
        self.fun()       
    });
    this.bClose.width=this.bClose.height=30;
    this.bClose.x=this.w.width-this.otstup-this.bClose.width
   


    
    this.button1=new DButton(this.w.content,this.otstup+66,this.otstup*2,"подогнать",function(){       
        self.redragMod();
    })
    this.button1.width=this.w.width-this.otstup*2-68;

    /*this.chek=new DCheckBox(this.w.content,this.otstup,this.otstup*2+34*3,"вставить",function(){
        
    })*/

    this.slid=new DSliderBig(this.w.content,this.otstup,this.otstup*2+34*2,function(){
        self.otKrai=this.value
    },"otKrai",0,200);
    this.slid.value=  this._otKrai  
    this.slid.okrug=1;
    this.slid.width=this.w.width-this.otstup*2;

    this.slid1=new DSliderBig(this.w.content,this.otstup,this.otstup*2+15+34*3,function(){
        self.alpha=this.value;
    },"alpha",0,1);
    this.slid1.value =  this._alpha;
    this.slid1.width=this.w.width-this.otstup*2;




    this.w.height=32+this.slid1.y+50;


    function uploadFile(file, dest) {
        let serverURL = php.server + "src/phpBase.php";
        let data = new FormData();
        data.append('tip', 'saveFile');
        data.append('file', file);
        data.append('dest', dest);  

        return $.ajax({
            url: serverURL,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post'
        });
    }


    var xywh,wh,rect;
    this.redragMod=function(){
        if(!aGlaf)return
        if(!aGlaf.s3d)return 
        if(!aGlaf.s3d.sMod)return    
        rect=aGlaf.s3d.sMod.getRect(); 
        wh= rect[3];
        if(rect[3]<rect[5]) wh= rect[5];
        wh+= this._otKrai*2; 
        wh=Math.round(wh);  
        xywh=-wh/2;    

        self.smc.clear();
        self.smc.addObj(s3d.c3d);
        
        self.smc.fotoPosition.x=xywh;
        self.smc.fotoPosition.y=xywh;
        self.smc.fotoWH=wh;
        self.smc.opacityMat=self._alpha;
    }






    this.dragSadow=function(){
        visi3D.utility.smc.active=this._visible;
        if(this._visible==true){
            if(this.smc==undefined){
                this.smc=visi3D.utility.smc.smc;
                let pObject=new DParamObject(this.w.content,200,-280,function(){                 
                    visi3D.intRend=1;
                });

                setTimeout(function() {
                    pObject.addObject(self.smc);
                    pObject.w.minimize=true
                    pObject.w.title="Доп. тени"
                    trace("wwwwwwwww",pObject.w)
                }, 10);
            }
        }
    } 


    self.object;
    this.setObj= function(o){         
        this.object=o; 



        if(this._visible==true){
            this.dragSadow()
            this.redragMod()

        } else{         
            
            return;
        }


        if(this.object.shadow!=undefined){
            this.alpha=this.object.shadow.alpha;
            this.otKrai=this.object.shadow.otKrai;
            let dir='../' + aGlaf.resursData + self.object.id+"/shadow/shadow.png";
            this.button._link="sdfasfasdfasdf"; 

            this.button.loadImeg(dir);
        }else{
            if(this.button._link!=this.linkNot)this.button.loadImeg(this.linkNot);
        }

        
    }


    Object.defineProperty(this, "alpha", {
        set: function (value) {            
            if(this._alpha!=value){
                this._alpha=value; 
                this.slid1.value=value; 
                this.redragMod();
                
            }           
        },
        get: function () {
            return this._alpha;
        }
    });

    Object.defineProperty(this, "otKrai", {
        set: function (value) {            
            if(this._otKrai!=value){
                this._otKrai=value; 
                this.slid.value=value; 
                this.redragMod();
                
            }           
        },
        get: function () {
            return this._otKrai;
        }
    });


    Object.defineProperty(this, "visible", {
        set: function (value) {            
            if(this._visible!=value){
                this._visible=value; 
                //this.dCont.visible=value;

                this.dragSadow()
                this.redragMod()
                if(value){
                    if(this.object&&this.object.shadow!=undefined){
                        this.alpha=this.object.shadow.alpha;
                        this.otKrai=this.object.shadow.otKrai;
                        let dir='../' + aGlaf.resursData + self.object.id+"/shadow/shadow.png";
                        this.button._link="sdfasfasdfasdf" 
                        this.button.loadImeg(dir);
                    }
                }
            }           
        },
        get: function () {
            return this._visible;
        }
    });

}
