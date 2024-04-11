/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок тумба
*/



//Двери для шрафов

export class BTBoxDinDoor{
    constructor(par) {
        var self = this;
        this.type = "BTBoxDinDoor";
        this.par = par;
        this._active = false;
        this._indexW = 0;

        this.aObj = undefined
        this._indexVubor = 0;
        this.array = []
        this.objObj = undefined;

        this.btRushka = new BTRushka(this)//управление ручками


        this.setActive = function(s) {
            self.active = true;
        }


        this.init = function() { 
                    
            if (this.par.object.str[1].length > 2) {
                let a = this.par.object.str[1].split(",");
                for (var i = 0; i < a.length; i++) {
                    let ooo = new BVDBlok(this, this.par.mO.getIdObj(a[i]), this.par.wN[i])
                    if (i == this._indexW) {
                        this.aObj = ooo;
                        this.aObj.active = true
                    }
                    ooo.idArr = i
                    this.array.push(ooo)
                }
            }
        }
        this.init();


        this.getPrice = function(intColor, idMat, arr) {

            this.btRushka.getPrice(intColor, idMat, arr)            
        }     


        this.getObj = function() {
            var obj = {}
            obj.id = this.aObj.getId()
            obj.idR = this.btRushka.getId()
            obj.bScal = this.aObj.bScal;
            return obj;
        }

        this.setObj = function(obj) {
            if (obj == undefined) return
            this.aObj.bScal = obj.bScal
            this.aObj.setId(obj.id)
            this.btRushka.setId(obj.idR)
        }
    }


    set active(v) {
        if (this._active != v) {
            this._active = v;
        }
    }
    get active() { return this._active; }


    set indexW(v) {
        if (this._indexW != v) {
            this._indexW = v;
            let dInd = this.aObj.index
            for (var i = 0; i < this.array.length; i++) {
                if (i == this._indexW) {
                    this.array[i].active = true
                    this.aObj = this.array[this._indexW]
                } else {
                    this.array[i].active = false
                }
            }
            if (dInd != -1) {
                if (this.aObj.array[dInd] == undefined) {
                    dInd = this.aObj.array.length - 1
                }
            }
            this.aObj.index = dInd;
            this.btRushka.drag();
            visi3D.intRend = 1;
        }
    }
    get indexW() { return this._indexW; }
}


///управление ручками
export class BTRushka {
    constructor(par) {
        var self = this;
        this.type = "BTRushka";
        this.par = par;
        this._index = 0;
        this.arrThree = this.par.par.mO.objectBase.three[3].array;
        this.strDoor = ''
        this.array = [];
        for (var i = 0; i < this.arrThree.length; i++) {
            this.array.push(new BTRHron(this, this.arrThree[i].id))
            this.array[i].idArr = i

            this.strDoor += this.array[i].link + ",";
        }
        this.strDoor = this.strDoor.substr(0, this.strDoor.length - 1)


        this.clear = function() {
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear();
            }
        }


        this.b2 = null;
        var bb, _b2, bh, c3d, b3
        this.drag = function() {
            this.clear();
            bb = false;
            _b2 = this.getActPar();
            this.b2 = _b2
            if (_b2 == null) return;            
            for (var i = 0; i < this.b2.array.length; i++) {
                bh = this.array[this._index];
                c3d = bh.get()
                if (c3d == null) {
                    return
                }
                b3 = this.b2.array[i]
                b3.cont3dMark.add(c3d)
            }
            this.par.par.mO.dragPriceScane();
            visi3D.intRend = 1;
        }


        var hrom
        this.getActPar = function() {
            let r = null
            if (this.par.aObj && this.par.aObj.index != -1) {
                hrom = this.par.aObj.array[this.par.aObj.index]
                r = this.par.aObj.array[this.par.aObj.index]
            }
            return r;
        }


        this.getId = function() {
            let r = -1
            if (this.array[this._index] != undefined) {
                r = this.array[this._index].id;
            }
            return r
        }


        this.setId = function(id) {
            if (id == undefined) return
            let ii = -1;
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].id == id) ii = i
            }
            this.index = ii;
        }


        this.getPrice = function(intColor, idMat, arr) {

            if (this.b2 == null) return
            for (var i = 0; i < this.array.length; i++) {
                
                let bNax=false
                for (var j = 0; j < this.array[i].array.length; j++) {
                    if (this.array[i].array[j].parent != undefined) {

                        let object = this.array[i].object
                        let aa = menedsherMaterial.getArrOtObj(object.obj, idMat, intColor);
                                             
                        if (aa != null) {
                            let ad = [];
                            for (var j = 0; j < aa.length; j++) {
                                ad[j] = aa[j];
                            }
                            ad[6] = "BTRushka";
                            ad[8] = object.obj;
                            ad[9] = object.obj.id;
                            ad[10] = 1;
                            ad[11] = aa[3] * 1;
                            arr.push(ad)
                        }
                        if(isNaN(aa[3]*1)==true)bNax=true
                    }
                }
                this.array[i].colorNax=bNax
            }
            

            for (var i = 0; i < this.b2.array.length; i++) {
                let object = this.b2.object;
                let aa = menedsherMaterial.getArrOtObj(object.obj, idMat, intColor);
                if (aa != null) {
                    let ad = [];
                    for (var j = 0; j < aa.length; j++) {
                        ad[j] = aa[j];
                    }
                    ad[6] = "BTRushka";
                    ad[8] = object.obj;
                    ad[9] = object.obj.id;
                    ad[10] = 1;
                    ad[11] = aa[3] * 1;
                    arr.push(ad);
                }
            }
        }
    }


    set index(v) {
        if (this._index != v) {
            this._index = v;
            this.drag()
        }
    }
    get index() { return this._index; }
}


///Хронитель ручек
export class BTRHron {
    constructor(par, id) {
        var self = this;
        this.type = "BTRHron";

        this.par = par;
        this.idArr = -1;
        this.id = id;
        this.object = this.par.par.par.mO.getIdObj(this.id);
        this.link = "resources/data/" + this.object.id + "/" + this.object.obj.orig
        this.linkMod = "resources/data/" + this.object.id + "/mod/" + this.object.obj.mod.name
        this.key = this.object.obj.mod.key
        this.array = [];

        this._colorNax=false;
        this.matStart=undefined;
        this.poiscMat=function(c3){
            if(this.matStart!=undefined)return
            if(c3.material!=undefined){
                this.matStart=c3.material
                return
            }
            for (var i = 0; i < c3.children.length; i++) {
                this.poiscMat(c3.children[i])
            }
        }


        this.c3dload = undefined
        this.sahInit = 0;
        this.get = function() {
            if (this.sahInit == 1) { //загрузка в процессе
                return null
            }
            if (this.sahInit == 0) { //начинаем загрузку
                this.sahInit = 1;
                this.par.par.par.mO.getModel(this.linkMod, this.key, function(o) {
                    self.sahInit = 2;
                    self.c3dload = o;
                    self.poiscMat(o)
                    self.par.drag();
                })
                return null;
            }
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].parent == undefined) {
                    return this.array[i]
                }
            }
            let c3d = self.c3dload.clone()
            this.array.push(c3d);
            return c3d;
        }

        this.clear = function(obj) {
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].parent != undefined) this.array[i].parent.remove(this.array[i])
            }
        }

        this.setMatNax = function(c3) {
            if(c3.material!=undefined){
                if(this._colorNax==false){
                    if(c3.material.uuid!=this.matStart.uuid)c3.material=this.matStart 
                } else  {
                    if(c3.material.uuid!=this.par.par.par.mO.matBTBDV.uuid) c3.material=this.par.par.par.mO.matBTBDV
                }            
            }
            for (var i = 0; i < c3.children.length; i++) {
                this.setMatNax(c3.children[i])
            }
        }

    }

    set colorNax(v) {
        if (this._colorNax != v) {
            this._colorNax = v;
            for (var i = 0; i < this.array.length; i++) {
                this.setMatNax(this.array[i])                
            }            
            visi3D.intRend = 1
        }
    }
    get colorNax() { return this._colorNax; }


}



//хреновинки с дверями
export class BVDBlok {
    constructor(par, o, w) {
        var self = this;
        this.type = "BVDBlok";
        this.par = par;
        this.w = w;
        this.object = o;
        this._active = false;
        this._index = -1;
        this._bScal = true
        this.strDoor = '';
        this.strRushka = '';

        this.array = []
        this.content3d = new THREE.Object3D();
        this.par.par.c3dNa.add(this.content3d)
        this.content3d.position.z = this.par.par._depth
        this.content3d.visible = this._active
        // var ax = new THREE.AxesHelper(55);
        // this.content3d.add(ax);
        var s = '1;264,263,262';

        if (this.object.obj.str[0] != 0) {
            s = this.object.obj.str[0]
        }
        var a = s.split(";")
        this.kol = a[0] * 1;
        this.strLink = a[1];
        let aa = a[1].split(",");
        for (var i = 0; i < aa.length; i++) {
            let o = this.par.par.mO.getIdObj(aa[i])
            let blok = new BBlok2(this)
            blok.idArr = i;
            blok.setInfo(o, this.w, this.kol);
            this.array.push(blok);
            this.strDoor += blok.link + ",";
        }

        this.strDoor = this.strDoor.substr(0, this.strDoor.length - 1)

        var bbb
        this.draw = function() {
            bbb = this.array[this._index]
            if (!bbb) return;
            this.array[this._index]
        }

        this.getId = function() {
            let r = -1
            if (this.array[this._index] != undefined) {
                r = this.array[this._index].object.id;
            }
            return r
        }


        this.setId = function(id) {
            if (id == undefined) return
            let ii = -1;
            for (var i = 0; i < this.array.length; i++) {
                if (this.array[i].object.id == id) ii = i
            }
            this.index = ii
        }
    }


    set index(v) {
        if (this._index != v) {
            this._index = v;
            for (var i = 0; i < this.array.length; i++) {
                if (v !== i) this.array[i].active = false
                else this.array[i].active = true
            }
            this.draw();
            this.par.btRushka.drag()
            visi3D.intRend = 1
        }
    }
    get index() { return this._index; }


    set active(v) {
        if (this._active != v) {
            this._active = v;
            this.content3d.visible = this._active
            visi3D.intRend = 1
        }
    }
    get active() { return this._active; }


    set bScal(v) {
        if (this._bScal != v) {
            this._bScal = v
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].bScal = this._bScal
            }
            visi3D.intRend = 1
        }
    }
    get bScal() { return this._bScal; }
}


///Хронилеше каждой двери
export class BBlok2 {
    constructor(par) {
        var self = this;
        this.type = "BBlok2";
        this.par = par;
        this.object
        this.link = "null"
        this._active = false
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);
        this.content3d.visible = this._active;
        this.w = 100
        this.array = []
        this.kol = 1
        this._bScal = this.par._bScal
        this.uuid = calc.generateUUID()

        this.setInfo = function(o, w, k) {
            this.w = w;
            this.object = o;
            this.link = "resources/data/" + this.object.id + "/" + this.object.obj.orig
            this.linkMod = "resources/data/" + this.object.id + "/mod/" + this.object.obj.mod.name
            this.key = this.object.obj.mod.key
            this.kol = k
        }


        self.boolLoad = false;
        this.init = function(o) {
            if (self.boolLoad !== false) return;
            self.boolLoad = true;

            let bc3 = new BBlok3(self);
            this.array.push(bc3);
            bc3.bScal = this._bScal;

            if (this.kol >= 2) {
                bc3 = new BBlok3(self);
                bc3.bScal = !this._bScal
                this.array.push(bc3)
            }
        }
    }


    set active(v) {
        if (this._active != v) {
            this._active = v;
            this.content3d.visible = this._active
            this.init();
        }
    }
    get active() { return this._active; }


    set bScal(v) {
        if (this._bScal != v) {

            this._bScal = v;
            if (this.array[0]) this.array[0].bScal = this._bScal
            if (this.array[1]) this.array[1].bScal = !this._bScal
        }
    }
    get bScal() { return this._bScal; }
}


///Хронилеше patch двери
export class BBlok3 {
    constructor(par, c3d) {
        var self = this;
        this.type = "BBlok2";
        this.par = par;
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);
        this.cont3d = new THREE.Object3D();
        this.content3d.add(this.cont3d);

        this.cont3dMark = new THREE.Object3D();
        this.cont3d.add(this.cont3dMark);
        // var ax = new THREE.AxesHelper(15);
        // this.cont3dMark.add(ax);

        this._bScal = true;
        this.rotation = 1;
    

        this.getMark = function(c3d) {
            if (c3d.name && c3d.name.indexOf("marker") != -1) {
                return c3d
            }
            if (c3d.children) {
                for (var i = 0; i < c3d.children.length; i++) {
                    let mm = this.getMark(c3d.children[i])
                    if (mm) return mm
                }
            }
            return null
        }
        let lll=this.par.linkMod
        
        this.par.par.par.par.mO.getModel(this.par.linkMod, this.par.key, function(o) {
            self.cont3dLoad = o;
            self.cont3d.add(self.cont3dLoad);

            self.cont3dLoad.position.x = -self.par.object.obj.mod.r[0]
            let m = self.getMark(self.cont3dLoad)
            if (m) {
                m.visible = false;
                self.cont3dMark.position.copy(m.position)
                self.cont3dMark.position.x = m.position.x + self.cont3dLoad.position.x
                self.cont3dMark.position.y = -m.position.z
                self.cont3dMark.position.z = m.position.y
            }

            self.par.par.par.par.dragMaterial.setC3d(o, lll)
            
        })

      
        this._thickness=self.par.par.par.par._thickness

        this.drag = function() {
            if (this._bScal == true) {
                this.content3d.position.x = -this.par.w / 2+this._thickness;
                this.content3d.scale.x = 1
                this.content3d.rotation.y = -this.rotation
            } else {
                this.content3d.position.x = this.par.w / 2-this._thickness;
                this.content3d.scale.x = -1
                this.content3d.rotation.y = this.rotation
            }
        }
        this.drag()
    }


    set bScal(v) {
        if (this._bScal != v) {
            this._bScal = v;
            this.drag();
        }
    }
    get bScal() { return this._bScal; }
}