





function MenuVerh(menu, fun) {  
    var self=this;   
    this.type="Menu";
    this.par=menu;

    this._active=true

    this.whv=this.par.par.whv;
    this.otstup=this.par.par.otstup;
    this.dCont=new DCont(this.par.par.dCont);
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.height=this.whv-this.otstup;
    //this.panel.color=0x79bccc;
    
    /*this.button=new DButton(this.dCont, this.otstup, this.otstup,"load csv", function(s){        
 
        var a=s.split("base64,")       
        var str=window.atob( a[1] )
        self.bigZamena(str)

    });
    this.button.height=this.panel.height-this.otstup*2;
    this.button.startFile("csv");*/ 


    this.buttonDop=new DButton(this.dCont, this.otstup, this.otstup,"++Infa++", function(s){         
        menu.dopInfo.active=!menu.dopInfo.active;

    });
    this.buttonDop.height=this.panel.height-this.otstup*2;



    /////////////////////////////////////////////////
    this.novaZamena=function(str){
        a=str.split("\n")        
        ar=[]

       
        var aea=a[1].split(";")
        var ddd=[];
        for (var i = 5; i < aea.length; i+=4) {           
            ddd.push(aea[i])
        }


        

        var ss        
        for (var i = 2; i < a.length; i++) {
            ss=a[i].split("\r")            
            var aaa=ss[0].split(";")

            if(aaa.length>3){               
                if(aaa[0]!="")ar.push(aaa) 
            }else{
                var aaa=ss[0].split(",")
                if(aaa.length>3){                   
                   if(aaa[0]!="")ar.push(aaa) 
                }
            }            
        }
        this.nz1(ar,ddd)
    }

    this.objectBase
    var arrxz=[]
    this.nz1=function(arr,ddd){ 
        this.objectBase= this.par.par.par.objectBase;
        var array=[];
        for (var i = 0; i < arr.length; i++) {
            let o={}            
            o.text=arr[i][1];
            o.size=arr[i][2];
            o.color={}
            let sah=0;
            for (var j = 5; j < arr[i].length; j+=4) {                
                o.color[ddd[sah]]={}
                o.color[ddd[sah]].art=arr[i][j];
                o.color[ddd[sah]].pri=arr[i][j+1]*1;
                o.color[ddd[sah]].niz=arr[i][j+2];
                o.color[ddd[sah]].xz=arr[i][j+3];
                sah++;
            }
            array.push(o);


            for (var j = 0; j < this.objectBase.bd.length; j++) {
                if(arr[i][0]*1==this.objectBase.bd[j].id){                    
                    arrxz.push(this.objectBase.bd[i].obj)
                }
            }
        }
        
        arrxz=[];
        for (var i = 0; i < this.objectBase.bd.length; i++) {
            for (var j = 0; j < arr.length; j++) {                             
                if(this.objectBase.bd[i].id+""==arr[j][0]){
                    this.objectBase.bd[i].obj.info=array[j];
                    arrxz.push(this.objectBase.bd[i].obj)
                }
            }            
        } 
       
        this.bigZamena2();

    }


    ////////////////////////////////////////////////////








    var ak= 'юбьтимсчяэждлорпавыфъхзщшгнекуцйЮБЬТИМСЧЯЭЖДЛОРПАВЫФЪХЗЩШГНЕКУЦЙ';
    var ak2='þáüòèìñ÷ÿýæäëîðïàâûôúõçùøãíåêóöéÞÁÜÒÈÌÑ×ßÝÆÄËÎÐÏÀÂÛÔÚÕÇÙØÃÍÅÊÓÖÉ';
    function korektKiril(_s){
        var s="";
        var ss
        for (var i = 0; i < _s.length; i++) {
            ss=_s[i];
            for (var j = 0; j < ak2.length; j++) {
                if(ak2[j]==ss){
                    ss=ak[j]
                }
            }
            s+=ss;
        }
        return  s
    }


    var ar,a
    var sah
    this.bigZamena=function(_str){        
        var str=korektKiril(_str)

        a=str.split("\n")        
        ar=[]
        var ss
        for (var i = 1; i < a.length; i++) {
            ss=a[i].split("\r")
            
            var aaa=ss[0].split(";")

            if(aaa.length>3){               
                if(aaa[0]!="")ar.push(aaa) 
            }else{
                var aaa=ss[0].split(",")
                if(aaa.length>3){                   
                   if(aaa[0]!="")ar.push(aaa) 
                }
            }            
        }






        this.bigZamena1(ar);
        sah=0;
        this.bigZamena2();
    }


    this.objectBase
    var arrxz=[]
    this.bigZamena1=function(arr){  
        
        this.objectBase= this.par.par.par.objectBase;
        arrxz=[];

        //var aaaa="id\tОписание (не учитывается)\tАртикул белого\tЦена белого Артикул серого\tЦена серого\n"




        for (var i = 0; i < this.objectBase.bd.length; i++) {
            for (var j = 0; j < arr.length; j++) {                             
                if(this.objectBase.bd[i].id+""==arr[j][0]){
                    this.setObjArr(this.objectBase.bd[i].obj, arr[j])
                    arrxz.push(this.objectBase.bd[i].obj)
                }
            }            
        }

    }


    this.bigZamena2=function(){  
        if(arrxz[sah]==undefined){         // 

            this.par.par.s.save()
            setTimeout(function() {
              
                location.reload()
            }, 1000);
        }else{
            var s=   JSON.stringify(arrxz[sah], null,4)
            var l="../"+aGlaf.resursData+""+arrxz[sah].id+"/config.json";       
            
            aGlaf.php.load({tip:"saveJSON", link:l, text:s},function(e){
                sah++;
                self.bigZamena2()
            });

        }
    }




    this.setObjArr=function(obj, a){
        if(obj)
        if(obj.plus){            
            if(a[1]){
                obj.plus[1]=a[1];
                obj.plus1[1]=a[1];
            }

            if(a[3]){
                obj.plus[0]=a[2];
                obj.plus[3]=a[3];
            }
            if(a[5]){                
                obj.plus1[0]=a[4];
                obj.plus1[3]=a[5];                
            }
        }


    }





    var a=[];
    this.down=function(){      
        self.activMenu(this.idArr)        
    }  


    this.activMenu = function(ii){
        for (var i = 0; i < self.ab.length; i++) {
            self.ab[i].alpha=1;
        }
        self.ab[ii].alpha=0.5;        
        
        if(ii==0){//дерево 
            aGlaf.menu.menuScene.active=false; 
            //aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;                  
            aGlaf.menu.menuThree.active=true;
        }
        if(ii==1){//обьекты   
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;

            aGlaf.menu.menuBD.active=true;               
            aGlaf.menu.menuObject.active=true;
        }
        if(ii==2){//сцена
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;
            aGlaf.menu.menuScene.active=true; 

        }
        if(ii==3){//матерьялы
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;           
            aGlaf.menu.matObject.active=true;
            aGlaf.menu.matBD.active=true;
        }

    }

    setTimeout(function() {
        self.activMenu(1);
    }, 1);
    

    var b;
    var ww=28;
    this.ab=[]
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.panel,aGlaf.widthBig+(this.otstup+ww*3)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
        b.width=ww*3;
        b.height=ww;        
        if(i==0)b.text="three";
        if(i==1)b.text="object";  
        if(i==2)b.text="scene";
        if(i==3)b.text="material";       
        this.ab.push(b)
    }


    this.window=new DWindow(this.panel,600,2,"info",function(){

        if(this.minimize==true){
            this.width=this.height=32;
        }else{
            this.width=350;
            this.height=240;
           
        }
    })
    this.window.dragBool=false;
    this.window.minimize=true;
    this.window.width=this.window.height=32;

    this.label=new DTextArea(this.window.content,5,5," ")
    this.label.width=340;
    this.label.height=200;
    this.label.div.contentEditable=true
    this.label.textAlign="Left"
    this.window.visible=false  


    this.setObjBD=function(_o){        
        if(_o.obj &&_o.obj.info){
            var s=JSON.stringify(_o.obj.info, null, 4)
            this.window.visible=true;
            this.label.text=s;        
           
                
            return
        }

        this.window.visible=false    
    }




    this.sizeWindow = function(w,h){  
        this.panel.width=w;
    }



    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                
                this.panel.visible=value                 
            }           
        },
        get: function () {
            return this._active;
        }
    });
}



