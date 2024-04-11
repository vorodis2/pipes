/**
* Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
* Разработчик и владелец данного кода Сидоров Евгений vorodis2:
* The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
* Developer and owner of this code Sidorov Evgeniy vorodis2
* contacts:
* site: vorodis2
* mail: vorodis2@gmail.com
* skype: vorodis2
* phone: +380951026557
*/


export class Param  {
///Основные параметры прилдожения мигрируют, не писать сюда ничего!!!!!!
  	constructor() {  		
  		this.type="Param";  	
        this.param={}  

        this.param.color="#008cba";
        this.param.colorFont="#ffffff";
        this.param.color1="#999999";
        this.param.colorActive="#f28044";

        this.param.otstup=5;
        this.param.otMy=10;

        this.param.wh=40;
        this.param.wh2=32;
        this.param.wb=150;
        this.param.sizeBase=292;
        this.param.sizeBase2=200;
        
        this.param.mobile=false
        this.param.whb=32;
        this.param.whCr=840;

        
        

        this.param.fontSize=16;
        this.param.fontSize1=24;
        this.param.fontSizeLittel=10;
   
        this.param.debug=false

        
        this.param.bRadius=24;


        this.param.whPic=256;
        this.param.kolVolid=10;


        this.param.fontFamily="Montserrat"
        this.param.maxW=350
        this.param.maxH=350

        this.param.borderRadius = 0;
        this.param.glowColor="#979797"
        this.param.glowSah=0




        this.param.host = "https://xz.ru/";
        this.param.server=this.param.host+"api/v1/";
        this.param.serverNa = this.param.host + "www/";

        this.param.nameLS="___credentials2"        

        this.param.version_reliz=1;
        this.param.version_dev=8;
        this.param.versi="v "+this.param.version_reliz+".0"+this.param.version_dev;
        
        this.param.token=null;
        
        this.param.objects3d=undefined;
        this.param.materials=undefined;
        this.param.textures=undefined;
        this.param.objectBase=undefined;
        this.param.scenes3d=undefined;


        this.param.arrayName=[
            "objects3d",
            "materials",
            "textures",
            "scenes3d",
            "materials_sorts",
            "objects3d_sorts",
            /*"group","group1","group2","group3","langs","auth/users"*/
        ]; 

        

        this.param.parentId=0;
        this.param.simMani="₽"
        this.param.objectBase={}


       

        this.param.langs = ['ru','en'];           
    }
}

