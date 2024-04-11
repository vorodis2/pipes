



function MenuScene(menu, fun) {  
    var self=this   
    this.type="MenuScene";
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

    this.obj=undefined;
    this.objectBase=this.par.objectBase;

    this.w=new DWindow(null, this.otstup, this.whv,"MenuScene");
    this.w.width=this.widthBig*2+this.otstup;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;


    this.panel=new DPanel(this.w,this.otstup,this.otstup+32);
    this.panel.width=150;

    this.sceneSB=new SceneSB(this.par.par.visi3D);
    //this.par.par.visi3D.utility.debug = true; 


    this.panel1=new DPanel(this.w,this.panel.width+this.otstup*2,32+this.otstup); 
    this.panel1.width=this.widthBig*2-this.otstup*2-this.panel.width

    this.settings=new DSettings(this.panel1);
    this.settings.content.x=this.otstup;
    this.settings.content.y=this.otstup;
    this.settings.width=this.panel1.width-this.otstup*2;


   




    this.setParam = function (o,o1) {
        for(var s in o){
            o1[s]=o[s]
        }
    }


    this.object;

    this.setObj = function () {
        var b = false;
        if(this.objectBase.scene==undefined){
            b=true;
            this.objectBase.scene = {};

        }
       
        this.object = {}//this.objectBase.scene;


        

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (this.object[this.sceneSB.array[i].name] === undefined) {
                this.object[this.sceneSB.array[i].name] = {};
                if (this.objectBase.scene[this.sceneSB.array[i].name] === undefined) {                    
                    this.objectBase.scene[this.sceneSB.array[i].name] = {};
                }else{
                    this.setParam(this.objectBase.scene[this.sceneSB.array[i].name], this.object[this.sceneSB.array[i].name])
                }

                //b=true;
            } 
            
            this.sceneSB.array[i].setBasa(this.object[this.sceneSB.array[i].name]);
        }

        if(b==true){           
          self.save();            
        }
       // this.par.par.visi3D.utility.debug = true;

       this.par.par.visi3D.alwaysRender = true; 
    }
    
    
    this.save=function(){
       

       
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            

            this.setParam(this.object[this.sceneSB.array[i].name], this.objectBase.scene[this.sceneSB.array[i].name] )

 

        }

        aGlaf.save();

    }
    this.setObj();
    //-----------------------------------------------------------------------



    this.ddd=function(){
        
        self.openI(this.idArr)
    }
    var ss=this.otstup;
    this.arrBut=[]
    var bb
    for (var i = 0; i < this.sceneSB.array.length; i++) {
        bb=new DButton(this.panel,this.otstup,ss,this.sceneSB.array[i].name,this.ddd )
        bb.idArr=i;
        bb.width=this.panel.width-this.otstup*3
        this.arrBut.push(bb);
        ss+=bb.height+this.otstup;
    }
    this.panel.height=ss+this.otstup;
//-----------------------------------------------------------------------
    var sceneBox
    this.com
    this.funComplit=function(_com){
        self.com = _com;
        
        self.funC22('complit')
        
    }

    this.settings.dinFun = function (_com) {
        

        self.com = this.compFinal;

        self.fun('dinam');
    };


    this.funC22=function(sob){

        if (sob == 'complit') {
            if (this.com.param != undefined) {

                if (this.com.param == 'active') {
                    sceneBox.drahKeys();//обновить всех
                } else {
                    sceneBox.drahKey(this.com.param);// поштучно
                }
            }else {
                console.log('Y komponenta нихера не обьявлен параметр');
            }
            /*if (this.com.param != undefined) {
                if (this.com.param == 'active') {
                    self.array[self.index].drahKeys();// обновить всех
                } else {
                    self.array[self.index].drahKey(this.com.param);// поштучно
                }
            } else {
                console.log('Y komponenta нихера не обьявлен параметр');
            }
            if (self.fun)self.fun();
            self.debugScene.draw();*/

        }
        if (sob == 'dinam') {            
            sceneBox.setValue(this.com.param, this.com.value, true);
        }
        self.save();
    }

    this.openI=function(iii){
       

        for (var i = 0; i < this.arrBut.length; i++) {
            if(i!=iii)this.arrBut[i].alpha=1
            else this.arrBut[i].alpha=0.7
        }




        sceneBox=this.sceneSB.array[iii];
        this.plusComp(sceneBox)


        
        var o = {};
        o.arrComp = [];
        for (var i = 0; i < sceneBox.array.length; i++) {
            o.arrComp.push(sceneBox.array[i].object);
        }

        o.param = this.object[sceneBox.name];
        o.funComplit = this.funComplit;        
        this.settings.setObj(o);   


        this.panel1.height=this.otstup*2+this.settings.finalHeight

    }
    

    this.dradXZ = function () {
/*

       var array=this.arrBut[i]
       
        var o = {};
        o.arrComp = [];
        for (var i = 0; i < this.array[this._index].array.length; i++) {
            o.arrComp.push(this.array[this._index].array[i].object);
        }
        o.param = this.object[this.array[this._index].name];
        o.funComplit = this.funComplit;
        this.settingsBig.setObj(o);*/
    };

    this.plusComp = function (sceneBox) {
        var ccbb, b;
        for (var i = 0; i < sceneBox.array.length; i++) {
            b = true;
            var o = sceneBox.array[i].object;
            var typeParam = o.typeParam;
            var name = o.name;



            for (var j = 0; j < this.settings.arrComp.length; j++) {
                if (this.settings.arrComp[j].name === name) {
                    b = false;
                    break;
                }
            }

            if (b === true) {
                ccbb = true;
                if (o.typeParam === 'DVisualLoader') {
                    ccbb = false;
                    this.settings.addComponent(typeParam, name, {
                        getFile: function (file, fun) {
                            
                            php.load({tip: 'mkdir', dir: '../resources/scane/'}, function (e) {
                                
                                php.load({tip: 'mkdir', dir: '../resources/scane/sky/'}, function (e) {
                                    
                                    self.saveFile('../'+aGlaf.resurs+'/scane/sky/', file, fun,"resources/scane/sky/"+file.name ) 

                                })   
                            })
                            /*php.creatInfo('visualContent', [base64], {}, function (response) {

                                var url = !response.error ? response.data.files[0].url : null;

                                fun(url);
                            });*/
                        },
                        onload: function (isActiv) {
                            //bigMenu.preloaderActiv(isActiv);
                        }
                    });
                }


                if (ccbb != false) {
                    this.settings.addComponent(typeParam, name);
                }
            }
        }
    }

    this.saveFile = function (link, file, fun, linkOk ) {
        var l='../resources/tmp/'
       
        
        php.load({tip: 'mkdir', dir: l}, function (e) {
                      
            var ll=php.server+"src/upload.php";
            var form_data = new FormData();
            form_data.append('file', file); 
              
            $.ajax({
                url: ll,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                   

                    var llll='../'+aGlaf.resurs+'tmp/';
                    var llllll=link;                    
                    php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
                        php.load({tip: "removeDirRec", dir: llll, }, function (e) {    
                            fun(linkOk)                           
                        })           
                    })
                }
            });
        })
    }



       /* this.dradXZ1 = function () {
        var ccbb;
        for (var i = 0; i < this.array[this._index].array.length; i++) {
            b = true;
            var o = this.array[this._index].array[i].object;
            var typeParam = o.typeParam;
            var name = o.name;

            for (var j = 0; j < this.settingsBig.arrComp.length; j++) {
                if (this.settingsBig.arrComp[j].name === name) {
                    b = false;
                    break;
                }
            }
            if (b === true) {
                ccbb = true;

                if (o.typeParam === 'PLPachkaButton3') {
                    this.settingsBig.addComponent(typeParam, name, o.extraParam);
                    ccbb = false;
                }
                if (o.typeParam === 'VisualContentLoader') {

                    this.settingsBig.addComponent(typeParam, name, {
                        getFile: function (base64, fun) {

                            php.creatInfo('visualContent', [base64], {}, function (response) {

                                var url = !response.error ? response.data.files[0].url : null;

                                fun(url);
                            });
                        },
                        onload: function (isActiv) {
                            bigMenu.preloaderActiv(isActiv);
                        }
                    });

                    ccbb = false;
                }

                if (ccbb != false) {
                    this.settingsBig.addComponent(typeParam, name);
                }
            }
        }
    };*/





    this.start= function(){ 
    

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


