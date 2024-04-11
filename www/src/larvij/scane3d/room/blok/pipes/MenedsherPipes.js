
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

мненеджер разруливает процессы драгов и хронит дерево




*/



export class MenedsherPipes  {
    constructor(par, fun) {         
        this.type="MenedsherPipes";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.par=par;

        this.dMenu=undefined          


        this.setObject = function(o){
            

            if(self.dMenu){
                self.dMenu.setObject(o)
              
            }

        }




        this.init = function(){
            if(glafBig.debug){
                setTimeout(function() {
              
                    self.dMenu=new MPDebag(self)
                }, 1);
            }
            
        }


        this.init()

    }
}


export class MPDebag  {
    constructor(par, fun) {         
        this.type="MPDebag";
        var self=this;
      
        this.fun=fun;
        this.par=par;
        this.dCPipes = window.dDebug.dCPipes

        this.w=new DWindow(this.dCPipes, this.otstup, this.otstup,"Object");

        this.w.dragBool=false;
        this.w.hasMinimizeButton=false;
        this.w.width=this.widthBig;   

        var otstup=2;
        var wh=28

        this.aDiam=[]
        this.init = function(){   
      
            let ent
            let a=main.objectBase.bd
            for (var i = 0; i < a.length; i++) {
                if(a[i] && a[i].obj && a[i].obj.pipes && a[i].obj.pipes.array && a[i].obj.pipes.array.length!=0){
                    
                    let a1=a[i].obj.pipes.array
                    for (var j = 0; j < a1.length; j++) {
                        let oo={
                            id:a[i].id,
                            idEnt:j,                            
                            type:a1[j].type,
                            diameter:a1[j].diameter,
                            o:a1[j],

                        }
                        this.aDiam.push(oo)
                    }                    
                }
            }       
        }
        this.init()

        this.getEntArr = function(objPars){  
            let a=[]
            let bb=false
            for (var i = 0; i < this.aDiam.length; i++) {
                bb=true
                for(let s in objPars){
                    if(objPars[s]!==this.aDiam[i][s])bb=false
                }
                if(bb)a.push(this.aDiam[i])

            }            
            return a
            
        }



        this.object;
        this.setObject = function(o){            
            this.object=o

            let b=false;
            if(o&&o.type=="BPipe")  b=true;       


            if(b){ 
                if(o.type=="BPipe")  b=true;            
                this.dragObj()
            }else{
                
            } 
            this.w.visible=b;          
        }

        var arr=[]


        this.dragObj = function(){           
            let y=otstup;
            for (var i = 0; i < arr.length; i++) {
                arr[i].dCont.visible=false;
            }

            for (var i = 0; i < this.object.aEntr.length; i++) {
                if(arr[i]==undefined){
                    arr[i]=new MPBox(this, function(s,p){
                        trace(s,p,this.object)                   
                    })
                }

                let ma=arr[i];
                ma.setObj(this.object.aEntr[i])
                ma.dCont.y=y
                ma.dCont.visible=true
                y+=ma.height+otstup


            }
            this.w.height=32+y;
        }





    }
}




function MPBox(par,fun) {  
    var self=this   
    this.type="MPBox";
    this.fun=fun;
    this.par=par
    this.idArr=-1
    this.otstup=2;
    this.wh=28;
    this.height=44
    this.dCont=new DCont(par.w.content);
    this.dCont.x=this.otstup;


    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=par.w.width-this.otstup*2



    let yy=this.otstup

    var dLd=new DLabel(this.panel, 2,yy,"xxzz")
    dLd.fontSize=10


   /* var bbb=new DButton(this.panel,  this.panel.width -this.otstup*2 -10,yy,"x",function(){
        self.fun('kill',self.idArr )
       
    })
    bbb.width=bbb.height=10;*/

    yy+=this.otstup+this.wh/2

    let www=64
    this.gallery=new DGallery(this.panel, this.otstup, yy,function(){  


        if(self.gallery.activMouse==false) return     
        let o=this.array[this.index].object
        let o1=o.o 
        let ob=self.par.par.par.menedsherObject.getIdObj(o1.id)  
        let blok=self.par.par.par.menedsherObject.getBlok(ob.obj)

        trace("!!!!",o)
        self.object.addEnt(blok.aEntr[o.o.idEnt]);
        self.dragBut()

    });
    this.gallery.height=this.otstup*2+www;
    this.gallery.width=444;
    this.gallery.widthPic=www
    this.gallery.heightPic=www
    this.gallery.kolII=7777


    yy+=this.otstup+this.gallery.height


    var bbb=new DButton(this.panel,  this.otstup,yy," ",function(){
        //self.fun('kill',self.idArr )
        trace(self.par.par.par)
        trace(self.dinEnt.par)
        
        self.dinEnt.par.mO.par.setBlokStart(self.dinEnt.par)
       // self.dinEnt.par.mO.korektActiv(self.dinEnt.par)

        //korektActiv
    })
    bbb.width=bbb.height=www;
    bbb.activMouse=false
    var dLd1=new DLabel(this.panel, www+2,yy,"not")
    dLd1.fontSize=10
    dLd1.width=333

    var slid=new DSliderBig(this.panel, www+2,yy+12,function(){
        self.object.ent1.rotation = this.value*Math.PI/180
        visi3D.intRend=1
    },"rotation",0,360)
    slid.width=200
    slid.mobile=true
    slid.height=24
    slid.okrug=1
    yy+=this.otstup*2+www


    this.height=yy    
    this.panel.height= this.height


    this.object



    this.setObj= function(o){         
        this.object=o; 
        dLd.text=this.object.par.idArr+' / '+this.object.idArr
        let type=0;
        if(!o.obj.type)type=1;
        else{
            if(o.obj.type==1)  type=0;  
        }

        let arr=this.par.getEntArr({diameter : o.obj.diameter, type : type})

        let aNa=[]
        for (var i = 0; i < arr.length; i++) {
            let od={}
            od.src="resources/data/"+arr[i].id+"/64.png"
            od.title=arr[i].id+" / "+arr[i].idEnt
            od.o=arr[i]
            aNa[i]=od
        }
        let ww=aNa.length*(this.otstup+www)+this.otstup

        this.gallery.start(aNa)
        this.gallery.width=ww;
        for (var i = 0; i < this.gallery.array.length; i++) {
            this.gallery.array[i].label.visible=true;
        }

        this.panel.width=this.gallery.width+this.otstup*2

        this.dragBut();
    }

    this.dinEnt
    this.dragBut= function(){
        let b=true
        let ent=this.object.ent
        this.dinEnt=null
        slid.visible=false
        if(this.object.ent1!=null){
            ent=this.object.ent1
            b=false
        }

        if(ent==null){
            bbb.activMouse=false;
            dLd1.text='not'
            if(bbb.image)bbb.image.visible=false
            this.gallery.activMouse=true    
            return
        }
        this.dinEnt=ent
        bbb.activMouse=true;
        
        if(b==false){
            this.gallery.activMouse=false
            slid.visible=true
            slid.value = ent.rotation*180/Math.PI
        }else{
            this.gallery.activMouse=true
            
        }
        
        let id=ent.par.object.id
        dLd1.text="id:"+id+' / '+ent.idArr+" / "+b+" / idArr: "+ent.par.idArr
        let src="resources/data/"+id+"/64.png"
        bbb.link=src
        bbb.image.visible=true






    }




}
