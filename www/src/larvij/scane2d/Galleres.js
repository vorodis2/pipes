/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



галереи с лева
*/
import { GalleryXZ } from './GalleryXZ.js';


export class Galleres {
    constructor(glaf, fun) {
        this.type = "Galleres";
        var self = this;
        var key = "© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";
        this.par = glaf;
        this.fun = fun;
        this.dC = new DCont(glaf.dCont);
        this.dCont = new DCont();
        this.dC.add(this.dCont);
        this._colorBool = false;
        this.verhH = 0;
        this.dC.y = this.verhH
        this.widthBig = window.localS.object.sParam.width
        this.otstup = localS.object.sParam.otstupL;

        this._sahMenu = glaf._sahMenu;
        this._scale = 1
        this._index = -1;
        this.object = null;
        this.objectBase = glaf.main.objectBase;
        this._width = 100
        this._height = 100
        this._boolFinDrag = false
        this.array = undefined
        this.gallery
        this.indexOld2 = 0
        var oo;
        this.boolScale = false;

        this.linkF = "original.png" //"256.png"//

        if (tStyle.glaf.debug == true) {
            //this.linkF = "256.png" //
            //this.boolScale=true;
        }


        this.clik111 = function() {
            if (dcmParam.mobile == true) {
                self.openG2()
            }

        }

        this.drag111 = function() {
            if (dcmParam.mobile == true) {
                self.array[3].visible = false;
                return;
            }
            var o = self.gallery[0];
            var l = self.getLink(o.obj)
            self.par.dragPic.start(32, l, o);
            self.fun("startObj", o);
        }
        this.clik1 = function() {

        }
        this.drag1 = function() {
            oo = self.gallery.array[self.gallery.index].object;

            if (oo.obj)
                if (oo.obj.title) {
                    if (oo.obj.title == "niz") { //замена на пол                    
                        self.fun("idNiz", oo.id);

                        return
                    }
                    if (oo.obj.title == "sten") { //замена на пол
                        self.fun("idSten", oo.id);

                        return
                    }
                }

            var o = self.gallery.array[self.gallery.index].object;
            var l = self.getLink(o.obj)
            self.par.dragPic.start(32, l, o);
            self.fun("startObj", o);
        }

        this.clik2 = function() {
            self.indexOld2 = self.gallery.index
            self.fun("idColor", self.gallery.array[self.gallery.index].object.id);
        }
        this.drag2 = function() {
            var o = self.gallery.array[self.gallery.index].object;
            var l = self.par.resursData + "" + o.id + this.linkF;
            self.par.dragPic.start(32, l, o);
            self.gallery.index = self.indexOld2;
        }


        this.openG2 = function() {

            if (this.array[3].visible == false) {
                var y = this.array[1].y;
                y += this.array[1].content.y + this.array[1].array[this.array[1].index].y
                self.openGal(y, this.array[1].array[this.array[1].index].object.array)
            } else {
                this.array[3].visible = false;
                self.boolFinDrag = false;
            }
        }


        this.getLink = function(o) {
            var r = "resources/data/" + o.id + "/100.png"
            if (o.resurs)
                if (o.resurs.array)
                    if (o.resurs.array.length != 0) {

                        for (var i = 0; i < o.resurs.array.length; i++) {
                            if (o.resurs.array[i].b != undefined) {
                                if (o.resurs.array[i].i == "icon") {
                                    r = "resources/data/" + o.id + "/resources/" + o.resurs.array[i].name;
                                    break;
                                }
                            }
                        }
                    }
            return r
        }

        this.tween = new TWEEN.Tween(this.dC);
        this.dC.x = -(this.widthBig * 1.75)
        this.menuActiv = function(bool, time) {
            var xx = 0;
            if (bool == true) xx = -(this.widthBig * 1.75)
            this.tween.stop();
            this.tween.to({ x: xx }, time).start();
        }


        this.down = function() {

            if (this.idArr == 0) {
                self.index = this.index;
                self.array[3].visible = false;
                self.boolFinDrag = false;
            }
            if (this.idArr == 1) {
                if (dcmParam.mobile == true) {
                    self.gallery = this;
                    self.array[3].visible = false;
                    self.boolFinDrag = false;

                    //self.gallery=this.array[this.index].object.array;
                    self.par.dragPic.testDrag(5, self.clik111, self.drag111);
                    return;
                }


                if (this.array[this.index].object.array.length != 0) {
                    self.gallery = this.array[this.index].object.array;
                    self.par.dragPic.testDrag(15, self.clik111, self.drag111);
                    if (dcmParam.mobile == true) self.openG2()

                    return;
                }

                self.gallery = this;
                self.par.dragPic.testDrag(15, self.clik1, self.drag1);
                self.array[3].visible = false;
                self.boolFinDrag = false;
            }

            if (this.idArr == 2) {
                self.gallery = this;
                self.par.dragPic.testDrag(15, self.clik2, self.drag2);
                self.array[3].visible = false;
                self.boolFinDrag = false;
            }

            if (this.idArr == 3) {
                self.gallery = this;
                self.drag1()
                self.boolFinDrag = false;
                self.array[3].visible = false;
            }
        }


        var bbbb;
        this.overXZ = function() {
            if (this.object == undefined) return
            bbbb = false;
            if (this.object.array.length != 0) bbbb = true;
            if (bbbb == false) {
                self.array[3].visible = false;
                self.boolFinDrag = false;
            } else {
                var y = self.array[1].y;
                y += self.array[1].content.y + this.y

                self.openGal(y, this.object.array)
            }
            for (var i = 0; i < self.array1Bat.length; i++) {
                if (this.idArr != self.array1Bat[i].idArr) {
                    self.array1Bat[i].finalColor()
                }
            }
        }


        this.openGal = function(y, a) {
            self.array[3].visible = true;
            self.array[3].start(a);
            if (y < localS.object.sParam.otstupL1) y = localS.object.sParam.otstupL1
            self.array[3].y = y;
            self.array[3].height = self.array[3].scrollBarV.heightContent;
            if (y + self.array[3].height > self._height / self._scale) {
                self.array[3].y = self._height / self._scale - self.array[3].height;
                if (self.array[3].y < 0) self.array[3].y = 0;
            }
            self.boolFinDrag = true;
        }


        this.otrezatBool = function(ooo) {
            if (ooo.array != undefined && ooo.array.length) {
                for (var i = ooo.array.length - 1; i >= 0; i--) {
                    let bbtb = false
                    if (ooo.array[i].bool == undefined) ooo.array[i].bool = true
                    if (ooo.array[i].bool == false) bbtb = true
                    if (bbtb == true) {
                        ooo.array.splice(i, 1)
                    } else {
                        this.otrezatBool(ooo.array[i])
                    }
                }
            }
        }
        this.mO = this.par.scane3d.room.menedsher.menedsherObject
    
        this.otrezatPrice = function(ooo, sah) {
            return

            if (ooo.array && ooo.array.length != 0) {
                for (var i = ooo.array.length - 1; i >= 0; i--) {
                    let bb3 = this.otrezatPrice(ooo.array[i], sah + 1)
                    if (bb3 == true) {
                        ooo.array.splice(i, 1)

                    }
                }
                if (ooo.array.length == 0) return true

            } else {
                if (this.isPPPP(ooo.id) == true) return true
            }


            return false
        }

        this.isPPPP = function(id) {
            let iid = id * 1;
            if (iid == 249) iid = 238
            if (iid == 248) iid = 238
            if (iid == 237) iid = 238

            let oxz1 = this.mO.objB2[iid]

            if (oxz1 && oxz1.obj && oxz1.obj.str[0] && (oxz1.obj.str[0] == "BTBoxVstavka" || oxz1.obj.str[0] == "BTBoxDin")) {
                let asd = oxz1.obj.str[1].split(",")

                for (var i = asd.length - 1; i >= 0; i--) {
                    let bfd = this.isPPPP(asd[i])
                    if (bfd == true) return true

                }

                return false
            }


            if (oxz1 && oxz1.obj && oxz1.obj.info && oxz1.obj.info.color) {
                let oxz = this.mO.isIdPrice(iid);
                if (oxz == false) {




                    return true
                }
            }

            return false
        }




        this.arrayBD = []
        this.array1Bat = []
        //this.wh0=60 
        this.init = function() {
            if (this.array != undefined) return;
            this.array = []
            //0 главная ветка 
            this.otrezatBool(this.objectBase.three[0])

            this.otrezatPrice(this.objectBase.three[0], 0)
            this.arrayBD = this.objectBase.three[0].array;

            /* var a=[]
             for (var i = 0; i < aa.length; i++) {
                 if(aa[i].bool==undefined)aa[i].bool=true                
                 if(aa[i].bool==true){ 
                     a.push(aa[i]);
                 }                
             }
             this.arrayBD=a */
            if (this.arrayBD.length == 0) return



            var b = true
            for (var i = 0; i < 4; i++) {
                b = true
                this.array[i] = new GalleryXZ(this.dCont, 0, 0, this.down)
                this.array[i].idArr = i;
            }



            this.array[0].kolII = 1;
            /*
                        this.array[0].widthPic=75+2;
                        this.array[0].heightPic=75+2;
                        this.array[0].width=this.otstup*2+77;
                        this.array[0].height=this.otstup+(77+this.otstup)*this.arrayBD.length;
                        this.array[0].x=this.widthBig;
                        this.array[0].y=-this.otstup;*/

            this.array[0].otstup = this.otstup;
            this.array[0].finalLink = this.linkF
            
            this.array[0].start(this.arrayBD);
            
            this.array[0].panel.visible = false

            //1 подветка            
            this.array[1].kolII = 1;
            /* this.array[1].widthPic=this.widthBig;
             this.array[1].heightPic=this.widthBig;
             this.array[1].width=this.widthBig;
             this.array[1].height=this.widthBig;
             this.array[1].x=0;
             this.array[1].y=this.otstup+100;
             */
            this.array[1].boolPositScrol = false
            this.array[1].scrollBarV.alpha = 0.5
            this.array[1].finalLink = this.linkF;
            this.array[1].whPic = 128;
            this.array[1].otstup = 0;
            this.array[1].intText = 1;
            this.array[1].funOver = this.overXZ;
            this.array[1].bLink = "resources/image/x8.png";
            this.array[1].bLink1 = "resources/image/x9.png";
            // this.array[1].boolScale=this.boolScale;
            this.array[1].bmd = true
            this.array[1].color = "#e2e7ed"
            this.array[1].color1 = "#e2e7ed"
            this.array[1].color_1 = "#DCF1FA"
            this.array[1].color1_1 = "#DCF1FA"
            this.array[1].panel.alpha = 0

            this.array[1].funDragOwer = function(box) {
                self.array1Bat.push(box)
            };
            this.array[2].panel.visible = false
            this.array[2].visible = false;


            this.index = 0;




            //выподание группы
            this.array[3].kolII = 2;

            /* this.array[3].widthPic=122;
             this.array[3].heightPic=122;
             this.array[3].width=(122+this.otstup*4)*2;
             this.array[3].height=122*2+this.otstup*3;*/
            //this.array[3].panelBool = true;
            this.array[3].visible = false;
            this.array[3].boolPositScrol = false;
            this.array[3].scrollBarV.alpha = 0.5;
            this.array[3].whPic = 128;
            this.array[3].otstup = this.otstup;
            this.array[3].finalLink = this.linkF
            this.array[3].intText = 2;
            this.array[3].otstupBlok = 0;
            this.array[3].x = self.widthBig;
            //this.array[3].boolScale=this.boolScale;
            this.array[3].cursor = 'pointer';

            this.array[3].color = "#c7edfc";
            this.array[3].color1 = "#c7edfc";
            this.array[3].color1_1 = "#DCF1FA";
            this.array[3].panel.visible = false;

            this.dragParam()
        }



        this.reDrag = function() {
            if (this.array.length == 0) return
            if (this._colorBool == true) {
                this.array[1].y = localS.object.sParam.otstupL1;
            } else {
                this.array[1].y = localS.object.sParam.otstupL1;
            }

            var hh = this._height / this._scale - this.verhH - this.array[1].y //-this.otstup;
            if (hh > this.array[1].scrollBarV.heightContent) hh = this.array[1].scrollBarV.heightContent
            this.array[1].height = hh - localS.object.sParam.otstupL1 * 2;
        }



        var sp, xx, yy, bb
        this.mmmm = function(e) {
            if (dcmParam.mobile == false) {
                if (sp == undefined) {
                    sp = {
                        x: e.clientX,
                        y: e.clientY,
                        x1: self.xx,
                        y1: self.yy
                    };
                    self.fun("start")
                }
                xx = e.clientX;
                yy = e.clientY;
            }
            bb = false;

            if (xx > (self.widthBig + self.array[3].width) * self._scale) {
                bb = true;
            }
            if (yy < self.array[3].y * self._scale) {
                bb = true;
            }
            if (yy > (self.array[3].y + 170) * self._scale)
                if (yy > (self.array[3].y + self.array[3].height) * self._scale) {
                    bb = true;
                }
            if (bb == true) {
                self.boolFinDrag = false
                self.array[3].visible = false;
                for (var i = 0; i < self.array1Bat.length; i++) {
                    self.array1Bat[i].finalColor()
                }
                self.array1Bat = []
            }
        }


        this.funFinDrag = function() {
            if (this._boolFinDrag == true) {
                document.addEventListener("mousemove", self.mmmm);
            } else {
                document.removeEventListener("mousemove", self.mmmm);
            }
        }


        this.sizeWindow = function(w, h, s) {
            this._width = w;
            this._height = h;
            this._scale = s;
            this.reDrag();
        }

        this.dragParam = function() {
            /*this.array[1].color="#e2e7ed"
            this.array[1].color1="#e2e7ed"
            this.array[1].color_1="#DCF1FA"
            this.array[1].color1_1="#DCF1FA"*/
            

            this.array[1].sahColor = localS.object.sParam.sahColor
            this.array[1].color = localS.object.sParam.color; //"#e2e7ed"            
            this.array[1].color1 = localS.object.sParam.color1;

            this.array[0].sahColor = localS.object.sParam.sahColor
            this.array[0].color = localS.object.sParam.color; //"#e2e7ed"            
            this.array[0].color1 = localS.object.sParam.color1;

            this.array[2].sahColor = localS.object.sParam.sahColor
            this.array[2].color = localS.object.sParam.color; //"#e2e7ed"            
            this.array[2].color1 = localS.object.sParam.color1;


            this.array[3].sahColor = localS.object.sParam.sahColor
            this.array[3].color1 = localS.object.sParam.color;
            this.array[3].color = dcmParam.compToHexArray(dcmParam.hexDec(localS.object.sParam.color), -localS.object.sParam.sahColor * 2);


            for (var i = 0; i < this.array.length; i++) {
                this.array[i].fontSizeLittel = localS.object.sParam.fontSizeLittel;
                this.array[i].fontFamily1 = localS.object.sParam.fontFamily1;
                this.array[i].borderRadius = localS.object.sParam.borderRadius;
            }

            this.otstup = localS.object.sParam.otstupL;
            this.widthBig = localS.object.sParam.width;

            let www = this.widthBig / 2
            this.array[0].widthPic = www;
            this.array[0].heightPic = www;

            this.array[0].otstup = this.otstup
            this.array[0].width = this.otstup * 2 + www;
            this.array[0].height = this.otstup * 2 + (this.array[0].width) * this.arrayBD.length;
            this.array[0].y = localS.object.sParam.otstupL1;
            this.array[0].x = self.widthBig + localS.object.sParam.otstupL1;


            this.array[1].otstup = localS.object.sParam.otstupL1
            this.array[1].width = this.widthBig + localS.object.sParam.otstupL1 * 2 + 2;
            this.array[1].widthPic = this.widthBig;
            this.array[1].heightPic = this.widthBig;
            this.array[1].y = localS.object.sParam.otstupL1;



            this.array[2].x = self.widthBig + localS.object.sParam.otstupL1;


            www = this.widthBig / 1.25
            this.array[3].widthPic = www;
            this.array[3].heightPic = www;
            this.array[3].otstup = this.otstup
            this.array[3].width = this.otstup * 3 + www * 2;
            this.array[3].x = self.widthBig + localS.object.sParam.otstupL1;


            this.array[0].boolScale = localS.object.sParam.scalePic;
            this.array[1].boolScale = localS.object.sParam.scalePic
            this.array[2].boolScale = localS.object.sParam.scalePic
            this.array[3].boolScale = localS.object.sParam.scalePic

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].glowSah = localS.object.sParam.glowSah
                this.array[i].glowColor = localS.object.sParam.glowColor
            }


            this.reDrag();

        }

        this.init();
    }



    set boolFinDrag(value) {
        if (this._boolFinDrag != value) {
            this._boolFinDrag = value;

            this.funFinDrag();
        }
    }
    get boolFinDrag() { return this._boolFinDrag; }


    set colorBool(value) {
        if (this._colorBool != value) {
            this._colorBool = value;
            this.reDrag();
        }
    }
    get colorBool() { return this._colorBool; }


    set index(value) {
        if (this._index != value) {
            this._index = value;
            this.object = null;
            for (var i = 0; i < this.arrayBD.length; i++) {
                if (i == this._index) {
                    this.object = this.arrayBD[i];
                    break;
                }
            }
            this._colorBool = true;
            this.array[0].index = this._index;

            this.array[1].start(this.object.array);
            this.reDrag();
        }
    }
    get index() { return this._index; }
}