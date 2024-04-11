
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



галереи с лева
*/


//достроеный класс галерий
export class GalleryXZ extends DGallery {
    constructor(dCont, x, y, fun) { 
        super();    

        this._fontSizeLittel=localS.object.sParam.fontSizeLittel;
        this._fontFamily1=localS.object.sParam.fontFamily1;
        this._borderRadius=localS.object.sParam.borderRadius;
        this._otstup=localS.object.sParam.otstupL;

        this._glowColor=localS.object.sParam.glowColor
        this._glowSah = localS.object.sParam.glowSah


        this.indexOld=-1;
        this.whPic=64;
        this.finalLink="64.png"
        this.type="GalleryXZ";
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        var self=this;
        this.fun=fun;
        this.intText=0;
        this.otstupBlok=undefined
        this.panelH=0;
        this.sahColor=0
        this._bLink=null;
        this._bLink1=null;

        this.but=null;
        this.but1=null;
        this._boolScale=0
        this.cursor =null;

        this.color_1=null; 
        this.color1_1=null;  

        this.funDragOwer=undefined
        this.object=undefined;
        this.sahDelta=40

        // Функция клика по иконке
        this.downBtn = function () {            
            self.index = this.idArr;
            self.obj = self.array[this.idArr].object;
            if (self.fun) self.fun();
        };

        this.createZamen=function(){ 
            var r=new BoxXZ(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }

        this.postDraw=function(){
            if(this.but!=null)  {                
                this.but.visible=this.scrollBarV.visible;
            }  
            if(this.but1!=null)  {                
                this.but1.visible=this.scrollBarV.visible;
                this.but1.y=this.height-this.but1.height;
            } 
        }
        this.tween = new TWEEN.Tween(this.content);


        this.bf=function(){
            var v= self.content.y
            if(this.idArr==0)v+=self.heightPic
            if(this.idArr==1)v-=self.heightPic   
            //if(v>1)v=1
            if(v>0)v=0
            var vv=self.height-self.scrollBarV.heightContent
                 
            if(v<vv)v=vv

            self.tween.to({y:v},500).start();
        }
        this.loadPPP=function(){
            let s= 16/this.image.picHeight;
            this.height=this.image.picHeight;
            this.width=this.image.picWidth;

            //this.height=this.image.picHeight*(self.width/this.image.picWidth)
            this.x=(self.width-this.width)/2
            self.draw()
        }

        var bat
        // новый массив обьектов
        this.start = function (_array) {
            
            this.clear();
            this.arrayObj = _array;
            for (var i = 0; i < this.arrayObj.length; i++) {
                bat = this.createDrawBox(this.arrayObj[i]);
                bat.visible = true;
                bat.object11 = this.arrayObj[i];
                bat.idArr = this.array.length;
                this.array.push(bat);
            }
            this.draw();
            if (this.array.length != 0) {
                self.sahLoad = 0;
                this.sahRendom = Math.round(Math.random() * 10000);
                self.array[self.sahLoad].sahRendom = this.sahRendom * 1;
                this.funLoad();
            }
            
        };

        this.div.removeEventListener('mousewheel', this.mousewheel)

        // прокрутка колесом мышки
        var hhh, www;
        this.mousewheel = function (e) {
            
            if (self.kolII <= self.array.length) {
                hhh = (self.heightPic + self.otstup) * (Math.ceil(self.array.length / self.kolII)) - self._height;
                www = (self.widthPic + self.otstup) * self.kolII - self._width;
            } else {
                hhh = self.heightPic + self.otstup - self._height;
                www = (self.widthPic + self.otstup) * self.array.length - self._width;
            }

            /*var p=e.deltaY*-1;
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)p=1;
                else p=-1;
            }*/

            var delta=-1;
            var p=e.delta
            if(e.wheelDelta==undefined){
                p=e.wheelDelta
            }

            if(e.delta)if(e.delta<0)delta=1;
            if(e.deltaY)if(e.deltaY<0)delta=1;
            if(e.detail)if(e.detail<0)delta=1;

            
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)delta=-1;
                else delta=1;
            }


            p=delta;
            if(e.detail!=0)p*=-1;




            if (self.scrollBarV.visible) {
                if (p < 0) {
                    if (self.content.y >= 0) {
                        self.content.y = 0;
                        //self.scrollBarV.value = 0;
                    } else {
                        //self.scrollBarV.value -= self.sahDelta;
                        self.content.y += self.sahDelta;
                    }
                } else {
                    if (self.content.y <= -(hhh + self.otstup)) {
                        self.content.y = -(hhh + self.otstup);
                        //self.scrollBarV.value = hhh;
                    } else {
                        //self.scrollBarV.value += self.sahDelta;
                        self.content.y -= self.sahDelta;
                    }

                }

                //
            } else if (self.scrollBarH.visible) {
                if (p < 0) {
                    if (self.content.x >= 0) {
                        self.content.x = 0;
                        //self.scrollBarH.value = 0;
                    } else {
                        //self.scrollBarH.value -= self.sahDelta;
                        self.content.x += self.sahDelta;
                    }
                } else {
                    if (self.content.x <= -(www + self.otstup)) {
                        self.content.x = -(www + self.otstup);
                        //self.scrollBarH.value = www;
                    } else {
                        //self.scrollBarH.value += self.sahDelta;
                        self.content.x -= self.sahDelta;
                    }
                }
            }
            //self.koreckScrol();
            self.scrolPos(true)
            self.dragIE();
        };
        this.div.removeEventListener('mousewheel', this.mousewheel)
        this.div.addEventListener('mousewheel', this.mousewheel)
        this.div.addEventListener("DOMMouseScroll", this.mousewheel);
        
        this.dragBut=function(){
            if(this.but!=null){
                this.but.borderRadius=this._borderRadius
                //this.but.color=this.color1
                //this.but.alpha=0.7
            }
            if(this.but1!=null){
                this.but1.borderRadius=this._borderRadius
    
                //this.but1.color=this.color1
                //this.but1.alpha=0.7
            }
        }

    }

    set bLink(value) {      
        if (this._bLink == value) return;      
        this._bLink = value;
      
        this.but=new DButton(this.content1,0,0," ",this.bf,this._bLink)
        this.but.funLoadImag=this.loadPPP;
        this.but.width=this.width-this.otstup*2;
        this.but.idArr=0
        this.but.borderRadius=this._borderRadius
        this.but.color=this.color1
        this.dragBut()
        this.but.boolFond=false;


    }
    get bLink() { return  this._bLink;}  


    set bLink1(value) {      
        if (this._bLink1 == value) return;      
        this._bLink1 = value;
        this.but1=new DButton(this.content1,0,0," ",this.bf,this._bLink1)
        this.but1.funLoadImag=this.loadPPP;
        this.but1.width=this.width-this.otstup*2;
        this.but1.idArr=1
        this.but1.boolFond=false;
        this.dragBut()
    }
    get bLink1() { return  this._bLink1;}  



    set boolScale(value) {      
        if (this._boolScale === value) return;
         
        this._boolScale = value;
        for (var i = 0; i < this.arrayKesh.length; i++) { 
              
            this.arrayKesh[i].boolScale = value;
        }  
    }
    get boolScale() { return  this._boolScale;} 



    set index(value) {
        if (this.array[value] != undefined) {
            this.korektPoIndex(value);
        }
        if (this._index == value) return;
        this.indexOld = this._index;
        this._index = value;

        for (var i = 0; i < this.array.length; i++) {
            if (this._index == i) this.array[i].activ = true;
            else this.array[i].activ = false;
        }       
    }
    get index() { return  this._index;}


    set color(value) {        
        if (this._color == value) return;        
        this._color = value;
        this.color_1=dcmParam.compToHexArray(dcmParam.hexDec(this._color), this.sahColor/2);
        this.color1_1=dcmParam.compToHexArray(dcmParam.hexDec(this._color), this.sahColor);
       
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            
            this.arrayKesh[i].color_1=this.color_1;
            this.arrayKesh[i].color1_1=this.color1_1;
            this.arrayKesh[i].color = this._color;
        }       
    }
    get color() { return  this._color;}

    set color1(value) {        
        if (this._color1 == value) return;        
        this._color1 = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].color1 = this._color1;
        }   
        this.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -this.sahColor);    
        this.dragBut()
    }
    get color1() { return  this._color1;}

    set color1(value) {        
        if (this._color1 == value) return;        
        this._color1 = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].color1 = this._color1;
        }   
        this.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(this._color1), -this.sahColor);    
        this.dragBut()
    }
    get color1() { return  this._color1;}

    set glowColor(value) {        
        if (this._glowColor == value) return;        
        this._glowColor = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].glowColor = this._glowColor;
        }
    }
    get glowColor() { return  this._glowColor;}
    
    set glowSah(value) {        
        if (this._glowSah == value) return;        
        this._glowSah = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].glowSah = this._glowSah;
        } 
    }
    get glowSah() { return  this._glowSah;} 




    set fontSizeLittel(value) {        
        if (this._fontSizeLittel == value) return;    
           
        this._fontSizeLittel = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].fontSizeLittel = this._fontSizeLittel;
        }  

    }
    get fontSizeLittel() { return  this._fontSizeLittel;}


    set fontFamily1(value) {        
        //if (this._fontFamily1 == value) return;        
        this._fontFamily1 = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].fontFamily1 = this._fontFamily1;
        }       
    }
    get fontFamily1() { return  this._fontFamily1;}

    set borderRadius(value) {        
        if (this._borderRadius == value) return;        
        this._borderRadius = value;
        for (var i = 0; i < this.arrayKesh.length; i++) {          
            this.arrayKesh[i].borderRadius = this._borderRadius;
        }  
        this.dragBut()  
    }
    get borderRadius() { return  this._borderRadius;}    
}
/*
this.array[i].fontSize=localS.object.sParam.fontSizeLittel;
                this.array[i].fontFamily1=localS.object.sParam.fontFamily1;
                this.array[i].borderRadius=localS.object.sParam.borderRadius;
*/



export function BoxXZ(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self = this;
    this.whPic=64; 
    this.finalLink="64.png"   
    this.doLink="resources/data/";
    var b;
    this.par=par
    this.intText=_intText;
    this.otstup=this.par.otstup;
    this.panelH=this.par.panelH;
    this.color1=this.par.color1; 

    this.color_1=this.par.color_1; 
    this.color1_1=this.par.color1_1; 

    this._fontSizeLittel=this.par._fontSizeLittel
    this._fontFamily1=this.par._fontFamily1
    this._borderRadius=this.par._borderRadius

    this._glowColor=this.par._glowColor
    this._glowSah =this.par._glowSah  
    
    this.image.glowColor=this._glowColor;
    this.image.glowSah=this._glowSah;

    this.panel.borderRadius=this._borderRadius
    this.funDragOwer=this.par.funDragOwer

    this.cursor  =this.par.cursor; 
    if(this.par.otstupBlok!=undefined){
        this.otstup=this.par.otstupBlok        
    }
    this.image.activMouse=false
    this.label.activMouse=false
    this.label.textAlign="center";
    this.label.fontSize=this._fontSizeLittel; 
    this.label.fontFamily=this._fontFamily1;

    this._boolScale=this.par._boolScale

    this.pPlus=undefined
    if(this.panelH!=0){
        this.pPlus = new DPanel(this.content, 0, this.height-this.panelH);
        this.pPlus.boolLine=false;
        this.pPlus.height = this.panelH+2;
        this.pPlus.width = this._width+4;

        
        this.pPlus.visible= this._activ
        this.panel.alpha=0
        this.pPlus.color1=this.par.color
    }

    if(this.cursor!=null){
        this.panel.div.style.cursor=this.cursor
        this.image.div.style.cursor=this.cursor
        if(this.pPlus)this.pPlus.div.style.cursor=this.cursor
    }

    if(this._activ==false){
        this.panel.color1=this.color1
    }


    this.panel.boolLine=false




    this.aLabel=[]
    for (var i = 0; i < this.intText; i++) {
       /* this.aLabel[i]= new DLabel(this.content, 0, 2+this._fontSizeLittel*i, '');
        //this.aLabel[i].width=200;
    
        this.aLabel[i].fontSize=this._fontSizeLittel; 
        this.aLabel[i].fontFamily=this._fontFamily1;
        this.aLabel[i].textAlign="center";
        this.aLabel[i].activMouse=false*/
    }

    var ww, oo
    this.dtahLoadText = function () {
        if(this.intText==1){
            //this.aLabel[0].width=this._width
            //this.aLabel[0].visible=false;
            if(this.object.obj && this.object.obj.plus) { 

                this.label.visible=true
                this.label.text=this.object.obj.plus[1]
                               
              /*  this.aLabel[0].visible=true;

                this.aLabel[0].text=this.object.obj.plus[1]
                oo=this.aLabel[0].getRect();
                this.aLabel[0].x=0//(this.width-oo.width)/2
                this.aLabel[0].y=this.height-5-oo.height-5;*/
            }            
        }
        if(this.intText==2){

           // this.aLabel[0].width=this._width
           // this.aLabel[0].visible=false;
            if(this.object.obj && this.object.obj.plus) {
                this.label.visible=true
                this.label.text=this.object.obj.plus[1]+"\n"+this.object.obj.plus[2]
                
             /*   this.aLabel[0].visible=true;
                this.aLabel[0].text="@@@@"//this.object.obj.plus[1]+"\n"+this.object.obj.plus[2]
                oo=this.aLabel[0].getRect();
                this.aLabel[0].x=0//(this.width-oo.width)/2
                this.aLabel[0].y=this.height-5-oo.height-5;
*/
            }            
        }
        this.draw()
    }

    var wwp=20;
    this.sahXZ1=0
    var ss, hh ;
    this.draw = function () {
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        hh=this._height-this.panelH
        if(this.panelH!=0)hh-=2
        if (ss > (hh ) / this.image.picHeight)ss = (hh) / this.image.picHeight;
        /*if(this._boolScale==true){
            this.image.x = 0;
            this.image.width=this.image.picWidth*ss;
            this.image.height=this.image.picHeight*ss;        
            this.image.x = (this._width - this.image.picWidth * ss) / 2;
            this.image.y = (this._height - this.image.picHeight * ss) / 2;
            if(this.panelH!=0)this.image.y=this.otstup

        }else{ 
            if(this._boolScale===false){
                this.image.width=this.image.picWidth*this._boolScale;
                this.image.height=this.image.picHeight*this._boolScale;        
                this.image.x = 0
                this.image.y = 0
            } else{*/
                ss=this._boolScale;
                this.image.x = 0;
                this.image.width=this.image.picWidth*ss;
                this.image.height=this.image.picHeight*ss;        
                this.image.x = (this._width - this.image.picWidth * ss) / 2;
                this.image.y = (this._height - this.image.picHeight * ss) / 2;
                if(this.panelH!=0)this.image.y=this.otstup
           // }           
       // }
        let owo=5;

  
        this.sahXZ1=1  
        this.label.width=this._width-owo*2-wwp*2
       
        let yy=this._height - this.label.getRect().height - owo*2-this._borderRadius/3-owo;

        this.label.visible=true
        this.label.x = owo+wwp
        this.label.y = yy//this._height - this.label.curH - this._otstup-this.borderRadius;
        
        this.panel.height=this._height+0.5
        this.panel.width=this._width
        if (this.postDraw) this.postDraw();
    };


    this.getX = function (c2,s) {
        if(s==undefined)s=''
        s+= c2.x+"=" +c2.scale+" ; "  
        if(c2.parent!=undefined) return this.getX(c2.parent,s)
        return s
    }


    this.clear = function () {
        this.visible = false;
        //this.label.visible = false;
        this.boolFL=false;
        //this.image.visible = false;
        if (this.clearIndex) {
            this.activ = false;
        }

    };



    var b,link;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }  

        this.object = _obj;
        link=this.doLink+_obj.id+"/"+this.finalLink;

        /*if(this.intText!=0){
            for (var i = 0; i < this.intText; i++) {
                this.aLabel[i].visible=false;
            }                     
        }*/
        this.label.visible=true    
        if(this.object.obj==undefined){
           $.ajax({
                url: this.doLink+_obj.id+"/config.json",
                success: function function_name(data) {                         
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        self.object.obj = conf;
                    } else self.object.obj = data; 
                    self.dtahLoadText()
                },
                error:function function_name(data) {
                    trace("Что то случилось с конфигом")
                }
            });
        }else{
            self.dtahLoadText()
        }
       
        this.image.visible = true;
        if (this.image.link == link) {
            if (self.funLoad) self.funLoad();
        } else {
            this.image.width = 100;
            this.image.height = 100;
            this.image.link = link;

        }
        this.draw();
    };

    if(dcmParam.mobile==false){
        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        //this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        //this.image.image.removeEventListener("mouseover", this.mouseOver);
    }

    this.mouseOver = function (e) {        
        self.boolOut = false;
        if(self._activ==false){

            if(self.color1_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -30);
            else self.panel.color1=self.color1_1
        }
        else {
            if(self.color_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -30);
            else self.panel.color1=self.color_1
        } 
       
        if (self.funOver) self.funOver(this);
    };

    this.mouseOut = function (e) {        
        if(self.funDragOwer!=undefined) {
            self.funDragOwer(self);
            return
        }
        self.finalColor() 
        if (self.funOut) self.funOut(this);
    }


    this.finalColor = function () {    
           
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;
    }


    if(dcmParam.mobile==false){
        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);
    }

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ == false)this.panel.color=this._color1;
            else this.panel.color=this._color;
        
            if(this.pPlus){
                if(this._activ==false)this.pPlus.visible=false
                else  this.pPlus.visible=true   
            }/**/
            this.label.visible=true

        },
        get: function () {
            return this._activ;
        }
    },

    boolScale: { // активный элемент
        set: function (value) {
            if (this._boolScale == value) return;
            this._boolScale = value;
            this.draw();

        },
        get: function () {
            return this._boolScale;
        }
    },

    
    color: { // цвет обводки
        set: function (value) {
            if (this._color == value) return;
            this._color = value;
            this.draw();
            if(this.finalColor)this.finalColor() 
        },
        get: function () {
            return this._color;
        }
    },  
    color1: { // цвет актива
        set: function (value) {
            if (this._color1 == value) return;
            this._color1 = value;
            
            if(this.finalColor)this.finalColor() 
        },
        get: function () {
            return this._color1;
        }
    },
    lineSize: { // ширина обводки
        set: function (value) {
            if (this._lineSize == value) return;
            this._lineSize = value;
            this.draw();

        },
        get: function () {
            return this._lineSize;
        }
    },
    otstup: { // Отступ
        set: function (value) {
            if (this._otstup == value) return;
            this._otstup = value;
            this.draw();
        },
        get: function () {
            return this._otstup;
        }
    },
    width: { // ширина элемента
        set: function (value) {
            if (this._width == value) return;
            this._width = value;
            this.panel.width = this._width+2;
            if(this.pPlus)this.pPlus.width = this._width+2;
            this.draw();
        },
        get: function () {
            return this._width;
        }
    },
    height: { // высота элемента
        set: function (value) {
            if (this._height == value) return;
            this._height = value;
            this.panel.height = this._height+2;
            if(this.pPlus){
               // this.pPlus.height = this.panelH;
                this.pPlus.y=this._height-this.panelH
            }
            this.draw();
        },
        get: function () {
            return this._height;
        }
    },

    fontSizeLittel: { // высота элемента
        set: function (value) {
            if (this._fontSizeLittel == value) return;
            this._fontSizeLittel = value;
            
            this.label.fontSize=this._fontSizeLittel; 
            for (var i = 0; i < this.aLabel.length; i++) {
                this.aLabel[i].fontSize=this._fontSizeLittel; 
            }
            this.draw()
        },
        get: function () {
            return this._fontSizeLittel;
        }
    },

    fontFamily1: { // высота элемента
        set: function (value) {
            //if (this._fontFamily1 == value) return;
            this._fontFamily1 = value;
            
            this.label.fontFamily=this._fontFamily1; 
            for (var i = 0; i < this.aLabel.length; i++) {
                this.aLabel[i].fontFamily=this._fontFamily1; 
            }
        },
        get: function () {
            return this._fontFamily1;
        }
    },

    borderRadius: { // высота элемента
        set: function (value) {
            if (this._borderRadius == value) return;
            this._borderRadius = value;
            this.panel.borderRadius=this._borderRadius
        },
        get: function () {
            return this._borderRadius;
        }
    },

    glowColor: { // высота элемента
        set: function (value) {
            if (this._glowColor == value) return;
            this._glowColor = value;
            this.image.glowColor=this._glowColor;
        },
        get: function () {
            return this._glowColor;
        }
    },

  
    glowSah: { // высота элемента
        set: function (value) {
            if (this._glowSah == value) return;
            this._glowSah = value;
         
            this.image.glowSah=this._glowSah;
        },
        get: function () {
            return this._glowSah;
        }
    },


});








