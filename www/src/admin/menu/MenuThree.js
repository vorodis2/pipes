



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


    this.panel=new DPanel(this.w, this.otstup ,34,"null",function(){
        self.gallery.array[self._index].object.keyName=this.text;
        aGlaf.save();
    })
    this.panel.width=this.widthBig-this.otstup*2;
    this.panel.visible=false


    this.chek=new DCheckBox(this.panel, this.otstup ,6,"",function(){
        self.gallery.array[self._index].object.bool=this.value;
        aGlaf.save();
    })

    this.input=new DInput(this.panel, 24 ,this.otstup,"null",function(){
        self.gallery.array[self._index].object.keyName=this.text;
        aGlaf.save();
    })
    this.input.width=this.panel.width-this.otstup*4-this.input.x;

    
    

    this.gallery=new GalleryXZ(this.w, this.otstup ,70,function(){

        self.index=this.index;
    })
    this.gallery.width=this.widthBig-this.otstup*2;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;

    this.oldRandom=-1

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
        self.objectBase=self.par.objectBase;
        self._iArr=self.getNazad(self.objectBase.three, self._arrayOld, 0);
        self.gallery.start(self._iArr);
        self._arrayOld.splice(self._arrayOld.length-1,1)
    } 

    this.getNazad=function(array, aS, sah){
        let a=array[aS[sah]].array
        sah++;        
        if(aS.length!=sah){
            a=this.getNazad(a, aS, sah)
        } 
        return a;
    }






    var a=[];
    this.down=function(){
        if(this.idArr==0){//nazad
            self.panel.visible=false

            self.nazad()                                
        }
        if(this.idArr==1){//убиваем 


            function kill (){                            
                var a=self.index;
                self._index=-1;                    
                var b=self._iArr.splice(a,1);            
                self.gallery.start(self._iArr);
                if(a>self.gallery.array.length-1)a=self.gallery.array.length-1;                     
                self.index=a;
                aGlaf.save();
            }

            if(aGlaf.durak==false){
                kill()
                return
            }           

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
            trace(value+"   "+this._index)
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
                    this.panel.visible=false
                } 


            } 

            if(this.gallery.array[this._index]!=undefined){
                let s=false
                if(this.gallery.array[this._index].object.keyName==undefined){
                    this.gallery.array[this._index].object.keyName="null"
                    s=true
                }
                if(this.gallery.array[this._index].object.bool==undefined){
                    this.gallery.array[this._index].object.bool=true
                    s=true
                }
                this.input.text=this.gallery.array[this._index].object.keyName
                this.chek.value=this.gallery.array[this._index].object.bool
                this.panel.visible=true;
                if(s==true)aGlaf.save(); 
            }          
        },
        get: function () {
            return this._index;
        }
    });

}

