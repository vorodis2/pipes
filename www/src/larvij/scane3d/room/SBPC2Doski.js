
export class SBPC2Doski  {
    constructor(par) {         
        this.type="SBPC2Doski";
        var self=this;

        this.par=par;

        this.array=[]
        this.content3d = new THREE.Object3D(); 
        par.content3d.add(this.content3d);
     

        var dosk
        this.getDosk=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false)return this.array[i];
            }

            dosk = new Doska(this);
            dosk.idArr=this.array.length
            this.array.push(dosk);
            return dosk;
        } 

        this.clear=function(){
            for (var i = this.array.length - 1; i >= 0; i--) {
                this.array[i].clear()
            }            
        }  

        this.inDost=function(arr){
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==true){
                    arr.push(this.array[i])
                }
            }
        }



        var box
        this.getHH=function(h){
            if(h){//если знаем размеры
                for (var i = 0; i < this.arrBlok.length; i++) {
                    if(this.arrBlok[i].y==h){
                        this.arrBlok[i].active=true;                
                        return this.arrBlok[i];
                    }
                }

                for (var i = 0; i < this.arrBlok.length; i++) {
                    if(this.arrBlok[i].active==false){
                        this.arrBlok[i].active=true; 
                        this.arrBlok[i].y= h             
                        return this.arrBlok[i];
                    }
                }
            }else{
                for (var i = 0; i < this.arrBlok.length; i++) {
                    if(this.arrBlok[i].active==false){
                        this.arrBlok[i].active=true;
                        return this.arrBlok[i];
                    }
                }
            }



            box=new Blok(this)

            if(h)box.y=h

            box.idArr=this.arrBlok.length
            this.arrBlok.push(box)
            return box;
        }

        this.pause=false
        this.arrBlokDin=[]; 
        this.arrBlok=[]; 
        var ch,yy,blok,yy1
        this.drag=function(){  
            if(this.pause!==false)return
            this.clear();

            for (var i = this.arrBlok.length - 1; i >= 0; i--) {//чистим хроны
                this.arrBlok[i].clear();
            }

            //наполняем блоки на одной высоте
            for (var i = 0; i < this.par.children.length; i++) {              
                if(this.par.children[i].type=='BPieceC2'){                    
                    ch=this.par.children[i].children;
                    
                    for (var j = 0; j < ch.length; j++) {
                        if(ch[j].notPolka===true)continue

                        yy1=Math.round((ch[j].content3d.position.y+this.par.children[i].content3d.position.y)*10)/10;

                        yy=Math.round((ch[j].y+this.par.children[i].y)*10)/10;                    

                        blok=this.getHH(yy);
                        blok.add(ch[j]);                        
                    }
                }
            }

            
            this.arrBlokDin.length=0

            for (var i = 0; i < this.arrBlok.length; i++) {                
                if(this.arrBlok[i].active==true){
                    
                    if(this.arrBlok[i].array.length>1){
                        this.arrBlokDin.push(this.arrBlok[i])                   
                        
                    }
                }
            }
            
            for (var i = 0; i < this.arrBlokDin.length; i++) { 



                this.dragBlok(this.arrBlokDin[i])
            }   


            if(this.par.upDubag)this.par.upDubag()
          
        } 

        this.minDist=20;
        this.maxDist=90;


     


        var doska, sah, sah1,ww,ss,ds;
        this.dragBlok=function(blok){
            

            let bb=true;

            for (var i = 0; i < blok.array.length; i++) {
                if(blok.array[i].parent==undefined){
                    bb=false
                }
            }
        
            if(bb==false)return
            
            blok.array.sort(compare);

            

            //return   
              
            ds=blok.array[0].rect[4]
            sah=0;    
            sah1=0;

            
            for (var i = 1; i < blok.array.length; i++) {
                


                if(this.isXXY(blok.array[i-1],blok.array[i],blok.y)==false){//да есть разрыв  
                    if(sah1!=0){ 
                        if(ds<blok.array[i].rect[4])ds=blok.array[i].rect[4];

                        ww=blok.array[i-1].parent.x-blok.array[i-1-sah1].parent.x;                        
                        
                        if(ww>this.minDist){
                            doska=this.getDosk();
                            doska.setXYW(
                                blok.array[i-sah1-1].parent.x,
                                blok.y,
                                ww,
                                ds
                            )                        
                            doska.life = true;
                            sah1=0
                            ds=11
                            doska.blok=blok
                        }

                        continue;
                    }
                }else{
                    if(ds<blok.array[i].rect[4])ds=blok.array[i].rect[4];
                    sah1++; 
                }
            }
            if(sah1!=0){  
                if(ds<blok.array[i-1].rect[4])ds=blok.array[i-1].rect[4];                      
                ww=blok.array[i-1].parent.x-blok.array[i-1-sah1].parent.x 
                
                if(ww>this.minDist){               
                    doska=this.getDosk();
                    doska.setXYW(
                        blok.array[i-sah1-1].parent.x,
                        blok.y,
                        ww,
                        ds
                    )                        
                    doska.life = true;
                    sah1=0 
                    doska.blok=blok 
                }             
            }
        } 
        var dd,as, p,p1, p2,p3,bb
        this.isXXY=function(bx,bx1,y){ 
            dd=bx1.parent.x-bx.parent.x;
            if(dd>this.maxDist){                
                return false;
            }


            if(bx.parent.parent){                
                
                as=bx.parent.parent.children

                for (var i = 0; i < as.length; i++) {  
                    if(as[i].type!=='BPieceC2'){

                        if(as[i].boxColizi && as[i].boxColizi.height>22){

                            p=as[i].boxColizi.rectCollisMeshdy.y;
                            p1=as[i].boxColizi.rectCollisMeshdy.y+as[i].boxColizi.height;

                            if(y>=p && y<=p1 ){

                                p2=as[i].boxColizi.rectCollisMeshdy._x
                                p3=as[i].boxColizi.rectCollisMeshdy._x+as[i].boxColizi.rectCollisMeshdy.width

                                
                                bb=this.testLineXZ2(
                                    p2,
                                    p3,
                                    bx.parent.x,
                                    bx1.parent.x
                                    
                                )

                                if(bb){
                                    
                                    return false;
                                }
                            }
                        } 
                    }
                }
            }
            


            return true;
        }

        //сверяем две полосы
        this.testLineXZ2=function(ps,pf,ps1,pf1){            
            if(ps1>=ps &&ps1<=pf)return true;
            if(ps>=ps1 &&ps<=pf1)return true;
            return false;
        }


        function compare(a, b) {
            return a.parent.x - b.parent.x;
        } 


    }
}

export class Blok  {
    constructor(par) {
        this.par=par
        this.active=true;
        this.array=[]
        this.delph=33
        this.y=0;

        this.clear=function(){
            this.active=false;
            this.array.length=0
        }

        var dd=0
        this.add=function(obj){
            this.array.push(obj);
/*
            dd=0
            for (var i = 0; i < this.array.length; i++) {
                if(dd<this.array[i].rect[4]){
                    dd = this.array[i].rect[4]
                }                
            }
            this.delph=dd */          
        }
    }
}



export class Doska  {
    constructor(par) {         
        this.type="Doska";
        var self=this;
        this.blok


        this.par=par;
        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        this.kolShtuk=-1;//для расчета в пдф
        this.ot=5;


        if(glafBig.debug)this.content3d.add(new THREE.AxesHelper(20));
        var mO=par.par.par.menedsher.menedsherObject
        
        this.doBut=new DOBut(this)

        this.mesh=new THREE.Mesh(mO.gBox,mO.matNull)
        this.mesh.position.set(0,0.75,3)
        this.content3d.add(this.mesh)

        this._life=false;
        this.content3d.visible=this._life
        this.width=100;
        this.depth=100;


        this.clear=function(){
            this.life=false;            
        }

        this.setXYW=function(x,y,w,d){   
            this.width=Math.round(w);
            this.depth=Math.round(d);          
            this.content3d.position.set(x,y,d/2);

            this.mesh.position.x=w/2
            this.mesh.scale.set(w+this.ot*2,1,d);
            this.doBut.drah()
        }     
    }


    set life(v) {
        if(this._life!=v){
            this._life = v;      
            this.content3d.visible=v;
            if(this._life){
                visi3D.addChildMouse(this.doBut.content3d)
            }else{
                visi3D.removeChildMouse(this.doBut.content3d)
            }
        }       
    }   
    get life() { return  this._life;}
}

export class DOBut  {
    constructor(par) {         
        this.type="DOBut";
        var self=this;
        this.idRandom=Math.random()
        this.par=par;
        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        this.content3d.blok=this
        var o=menObject.getIdObj(293).obj
        this.notBlok=true;
       
        this.linkMod = "resources/data/" + o.id + "/mod/" + o.mod.name;
       
        menObject.getModel(this.linkMod, o.mod.key, function(c3d) {
            
            self.content3d.add(c3d)

            if(self.drah)self.drah()
        })

        var array

        this.setXY=function(x,y){ 
            
            array=this.par.blok.array
            
            let bool=true;
            for (var i = 0; i < array.length; i++) {
                if(array[i].isY(y)==false){
                    bool=false
                }
            }
            
            if(bool==true){
                this.par.blok.par.pause=true
                for (var i = 0; i < array.length; i++) {
                    array[i].setXY(array[i].parent.x, y)
                   /* if(array[i].isY(y)==false){
                        bool=false
                    }*/
                }
                let yy=array[0].y+array[0].parent.y;
                let yy1=Math.round(yy/array[0].SAH)*array[0].SAH; 

                this.par.blok.y=yy1
                this.par.content3d.position.y=yy1

                this.par.blok.par.pause=false
            }
        }

        this.clear=function(){ 
          
        }

        this.drah=function(){   
           

            this.content3d.position.x=this.par.width/2;
            this.content3d.position.z=this.par.depth/2+3;
        }


        this.getObj=function(){ 
            let o={}
            return o
        }


    }
}

