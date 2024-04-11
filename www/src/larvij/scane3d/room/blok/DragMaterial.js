/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок окно
*/

///Узновалка матерьялов
export class DragMaterial  {
    constructor(par) {
        this.type = "DragMaterial";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        this.uuid=calc.generateRendom(1)
        this.par=par; 
        this.array=[]
        this.boolAllDrawing=false
        this.material=undefined

        this.dragColor=function(material){  
            this.material =  material;
            for (var i = 0; i < this.array.length; i++) {
               
                this.dragDmC3d(this.array[i],this.material)
            }           
        }

        this.dragDmC3d=function(dmC3d,mat){
            if(mat==undefined)return;           
            dmC3d.dragColor(mat)
        }


        this.setC3d=function(c3d, _id, boolAllMat){
            let id=null;
            
            if(isNaN(_id*1)==false){
                id=_id;
            }else{
                if(typeof _id =="string"){                   
                    if(_id.indexOf("resources/data/")!=-1){
                        let a=_id.split("resources/data/")
                   
                        let a1=a[1].split("/")
                        if(isNaN(a1[0]*1)==false){
                            id=a1[0]*1;
                        }
                    }
                }
            }
            if(id==null){
                return
            }
          
            let dmC3d=new DMatC3d(this);
            dmC3d.setC3d(c3d, id, boolAllMat)
            this.array.push(dmC3d)
       
            this.dragDmC3d(dmC3d, this.material)

            return dmC3d; 
        }
    }    
}



export class DMatC3d  {
    constructor(par) {
        this.type = "DMatC3d";
        var self=this;
        this.par=par; 
        this.array=[];
        

        this.id=null;
        this.c3d=null;

        this._material=undefined;

        this.sah=0

        this.oIC=null;
        this.object=null;
        
        
        this.oInfo=null
        this.bool=false
        var mDin 
        this.dragColor=function(material){  
            this._material=  material;
         
            if(!this._material)return
            if(!this._material.idObj)return

          
            if(this.par.par.idArr==-1){                
                if(this.sah==0){
                    for (var i = 0; i < this.array.length; i++) {
                        this.array[i].dragColor(this.par.par.mO.matNull,false)  
                    }
                    this.sah++                    
                }
                return 
            }
            

            mDin=this._material 
            this.bool=false;
            this.oInfo=null;
           
            if( this.oIC && this.oIC[this._material.idObj.id] && isNaN(this.oIC[this._material.idObj.id].pri)===false){  
                this.bool=true;
                this.oInfo=this.oIC[this._material.idObj.id];

            }else{
                mDin=this.par.par.mO.matBTBDV
            }
            if(this.id==65){
                
                this.bool=false
            }

            for (var i = 0; i < this.array.length; i++) {

                this.array[i].dragColor(mDin,this.bool)  
            }
            

   
        }

        this.boolAllMat=false;

        this.setC3d=function(_c3d, _id, boolAllMat){
            this.id=_id;
            this.c3d=_c3d;
            this.boolAllMat=boolAllMat;
            this.oIC=null;
            this.object=this.par.par.mO.getIdObj(this.id)

            if(this.object && this.object.obj && this.object.obj.info&&this.object.obj.info.color){
                this.oIC=this.object.obj.info.color
            }
            

            this.parsO3d(_c3d)            
        }

        this.setId=function(_id){
            this.id=_id

            this.oIC=null;
            this.object=this.par.par.mO.getIdObj(this.id)
            
            if(this.object && this.object.obj && this.object.obj.info && this.object.obj.info.color){
                this.oIC=this.object.obj.info.color
            }
           
        }

        this.parsO3d=function(_c3d){
            if(_c3d.material!=undefined){
                this.array.push(new DMHron(this))
                this.array[this.array.length-1].set(_c3d)
            }
            if(_c3d.children)
            for (var i = 0; i < _c3d.children.length; i++) {
                this.parsO3d(_c3d.children[i])
            }
        }

    }
}

export class DMHron  {
    constructor(par) {
        this.type = "DMHron";
        var self=this;
        this.par=par
        this.c3d=null;
        this.material=undefined

        this.bBase=false
        this.set=function(c3d){
            this.c3d=c3d



            this.materialOld=c3d.material;

            if(this.par.boolAllMat!==undefined){
                this.bBase=this.par.boolAllMat;

            }



            if(this.materialOld.name.indexOf('m_base')!=-1){//базовый обьект  
            //if(this.materialOld.name=='m_base'){//базовый обьект     
                if(this.materialOld.name!=="m_base_xz"){
                    this.bBase=true;
                } 
                
            }else{

            }
        }
        this.zamenaMat=function(c){
                       
            this.par.par.par.mO.geterMat.get(c.material.name,function(mat){                
                if(mat!=null){
                    c.material=mat
                }
            },true);
        } 


        this.dragColor=function(material, bool){    

            if(this.par.par.boolAllDrawing==true){

                bool=false
            }


            this.dragColorC3d(this.c3d,material, bool)
            /*if(bool==false){//хрени нет
                if(this.c3d.material.uuid!=material.uuid)this.c3d.material=material
            } else{//есть
               
                if(this.bBase==true){//часть меняеться
                    if(this.c3d.material.uuid!=material.uuid)this.c3d.material=material    
                }else{//статична
                    if(this.c3d.material.uuid!=this.materialOld.uuid)this.c3d.material=this.materialOld
                }
            }*/           
        }

        this.dragColorC3d=function(c3d, material, bool){            
             
            if(c3d.material!=undefined){
                //c3d.material=material 
                if(bool==false){//хрени нет
                    if(c3d.material.uuid!=material.uuid)c3d.material=material
                } else{//есть
                   
                    if(this.bBase==true){//часть меняеться
                        if(c3d.material.uuid!=material.uuid)c3d.material=material    
                    }else{//статична
                        
                        if(c3d.material.uuid!=this.materialOld.uuid){
                            c3d.material=this.materialOld
                        }
                    }
                } /**/ 
            }
            if(c3d.children && c3d.children.length!=0){
                for (var i = 0; i < c3d.children.length; i++) {
                    this.dragColorC3d(c3d.children[i],material, bool)
                }
            }
                     
        }



    }
}