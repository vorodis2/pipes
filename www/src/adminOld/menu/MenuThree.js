



function MenuThree(menu, fun) {  
    var self=this   
    this.type="MenuThree";
    this.par=menu;
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;
    this.dCont=new DCont(this.par.dCont);

    this._width=100;
    this._height=100;
    this._active=false
    this._index=-1;
    this._iOld=-1;
    this._arrayOld=[];
    this._iArr=this.objectBase.three;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){

    }}
    this.initBool=false;

    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;




    this.gallery=new GalleryXZ(this.w, this.otstup ,32,function(){
        trace(this.index)
        self.index=this.index;
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;

    

    this.par.dragPic.addDCont(this.w,function(o,l){        
        self.setObj(o)
    });




    this.setObj= function(o){        
        if(this._active==false)return
        var obj={id:o.id, title:o.id, array:[]}
        this._iArr.unshift(obj);        
        this.gallery.start(this._iArr);
        aGlaf.save();
    }

    this.nazad=function(){
        if(self._arrayOld.length==0){
            self.ab[0].alpha=0.5;
            self._index=-1;
            self._iOld=-1;
            self._arrayOld=[];
            self._iArr=self.objectBase.three;
            self.gallery.start(self._iArr);
            return;
        }
        a=self.objectBase.three;            
        for (var i = 0; i < self._arrayOld.length; i++) {                
            a=a[self._arrayOld[i]].array;                
            if(i==self._arrayOld.length-1){
                self._iArr=a;
                self.gallery.start(self._iArr);
                self._arrayOld.splice(i,1)
            }
        } 

    } 

    var a=[];
    this.down=function(){
        if(this.idArr==0){//nazad
            self.nazad()                                
        }
        if(this.idArr==1){//убиваем            
            
            self.par.mInfo.setFun("Удаление ветки дерева","Обьект/ветка будет удален из бд, окуратно!!!",
                function(){ 

                    var a=self.index;
                    self._index=-1;                    
                    var b=self._iArr.splice(a,1);            
                    self.gallery.start(self._iArr);                  
                    self.index=a;
                    aGlaf.save();
                }
            );

        }
         if(this.idArr==2){//<<<<<<            
            var a=self.index;
            if(a>0) {
               var b=self._iArr.splice(a,1);
                self._iArr.splice(a-1,0,b[0])
                
                self.gallery.start(self._iArr);
                aGlaf.save();                   
                self.index=a-1; 
            }                      
        }

        if(this.idArr==3){//>>>>>>            
            var a=self.index;
            if(a<self._iArr.length-1&&a!=-1) {
                var b=self._iArr.splice(a,1);
                self._iArr.splice(a+1,0,b[0])
                aGlaf.save();                    
                self.gallery.start(self._iArr);                  
                self.index=a+1; 
            }                     
        }
    }

    var b;
    var ww=28;
    this.ab=[]
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(this.otstup+ww)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
        b.width=ww;
        b.height=ww; 
        if(i==0){
            b.text="<<";
            b.color="#ff0000"
            b.alpha=0.5;
        }
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
        this.ab.push(b)
    }



    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup; 
        this.gallery.height=this.w.height-32;       
    }



   Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.rect.visible=value;
                if(value==true){
                    this.dCont.add(this.w)
                    if(this.initBool==false){
                        this.initBool==true
                        this.gallery.start(this._iArr);
                    }
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
            if(this._index!=value){
                this._index=value;
                this.gallery.index=value;
            }else{                
                if(this.gallery.array[value]!=undefined){     
                    this.ab[0].alpha=1;
                    if(this._iOld!=-1){
                        this._arrayOld.push(this._iOld);
                    }
                    this._iOld= this._index;                    
                    this._iArr = this.gallery.array[value].object.array;                    
                    this.gallery.start(this._iArr);
                    this._index=-1
                }
                
            }           
        },
        get: function () {
            return this._index;
        }
    });

}

