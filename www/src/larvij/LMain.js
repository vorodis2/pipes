
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


главный класиик, стартует основное, грузит конфиг
*/

import { Glaf } from './Glaf.js';

import { LocalStorage } from '../localStorage/LocalStorageE6.js';
import { Php } from '../php/PhpE6.js';
import { TStyle } from '../t3d/TStyle.js';


/*
fun на индекс, хз может апи, вырубает пердзагрущик
plus окнчание для большинства загрузок, и хронитель версии
tip =0 если 1 то обрезаеться функции с php для локальной версии
*/


export class LMain  {
  	constructor(fun,plus,tip) {  		
  		this.type="LMain";
  		this.plus=plus;
  		var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";  	
  		var self=this;
  		this.csvConfig=undefined;
  		this.csvConfigArray=undefined;
		this.glaf=null;
		this._width=100;
		this._height=100;
		this.fun=fun
		self.resolution=1
		self.objectBase=null
		self.confText=null 

		window.main=this;
        this.localStorage = undefined;

        this.php=new Php()
        window.tStyle= new TStyle();

        dcmParam.mobile=false;
        if(dcmParam.isMobile.any()!=null)dcmParam.mobile=true;

        if(dcmParam.mobile==false){
			let r = navigator.userAgent.match(/iPhone|iPad|iPod/i);			
	        if(r==null ){	
       	
	            if(navigator.userAgent.match(/Mac OS/i)!=null){

	                if(window.matchMedia("(any-pointer:coarse)").matches==true){

	                    dcmParam.mobile=true
	                }
	            }
	        }
		}


        this.tip=0//веб версия
        //if(tip!=undefined)this.tip=tip
        var ddCont=new DCont(document.body)
        this.panel=new DPanel(ddCont)
        this.panel.visible=false


		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  	

        this.sParam={
        	glowColor:'#000000',
        	glowSah:0,
        	bBackground:true,
        	width:170,
        	color:"#c7edfc",
        	color1:"#e2e7ed",
        	colorText:"#010101",
        	colorText1:"#424242",
        	sahColor:-25,
        	fontFamily:"SFUIDisplay-Bold",
        	fontFamily1:"SFUIDisplay-Light",
        	borderRadius:0,
        	borderRadius1:32,
        	fontSize:20,
        	fontSizeLittel:11,
        	whL:47,
        	whInput:32,
        	otstupL:5,
        	otstupL1:0,
        	otstupL2:10,
        	scalePic:1,
        	//vusot:47
        }

		//создание сцены
  		this.start = function () {	   
			var t = new PIXI.ticker.Ticker();
			t.minFPS = 50;
			t.add(this.tick, this);
			t.start();            
            this.localStorage = new LocalStorage(null, "larvij_v21");
            window.localS=this.localStorage
            
            let ol=window.localS.object
            let bb=false;

            if(ol.sParam==undefined){
            	bb=true;
            	ol.sParam={}
            }
            for (var s in this.sParam) {
            	if(ol.sParam[s]==undefined){
            		ol.sParam[s] = this.sParam[s];
            		bb=true;
            	}            	
            }           
           
        	dcmParam.fontFamily = ol.sParam.fontFamily;
        	dcmParam.colorText1 = ol.sParam.colorText1;
        	
			if(bb)this.localStorage.save()



            this.fina()
        	this.dragParam();

		};

		this.dragParam = function () { 
			for(var s in  window.localS.object.sParam){
				//dcmParam[s]=window.localS.object.sParam[s]
			}
			dcmParam.fontFamily = window.localS.object.sParam.fontFamily;

			dcmParam.colorText1 = window.localS.object.sParam.colorText1;
			self.panel.visible=window.localS.object.sParam.bBackground;
			
        	self.panel.color=dcmParam.compToHexArray(dcmParam.hexDec(localS.object.sParam.color1), localS.object.sParam.sahColor*2);
			
			self.glaf.dragParam();
		}

		//188,189,190,191,192,193

		//стартуем дальше
        this.fina = function () {            	
			self.glaf=new Glaf(self);
	
						
			fun("init");

			setTimeout(function() {
				self.glaf.menuDiv.menuSave.testId()
			}, 100);
		}

		//тик размит надва
		var b=true
		this.tick = function () {
			b=!b;
			if(b==true)return			
			TWEEN.update();	
			if (self.glaf) {
				self.glaf.update();
			}			
		}

		//Маштабим окна 
		this.scale=1;
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
			this.panel.width=w
			this.panel.height=h

  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}


  		this.redactorCSVObj = function(){ 

  			var k=new KlassCSVObj(self.csvConfig,self.objectBase);  			
  			if(self.confText.prosentSCV!=undefined)k.prosentSCV=self.confText.prosentSCV/100;  			
  			k.init();

  			self.csvConfigArray=k.csvConfigArray;
  		}

  		this.setPrice = function(date){
  			new KlassPrice(date, self.objectBase)

  		}


  		this.startText = function(){  
  			//грузим текстовый фаил
  			let link="resources/configText.json"+this.plus;
  			if(this.php.key!=null){  				
  				link="users/"+this.php.key+"/configText.json"+this.plus+"&"+Math.random();
  			}
	  		

	  		$.ajax({
	            url: link,
	            success: function function_name(data) {                         
	                if(typeof data === "string") {
						var conf = JSON.parse(data)
						self.confText = conf;
					} else self.confText = data;
					
					self.tip=0
					if(self.confText.buy!=undefined)if(self.confText.buy==false)self.tip=1

					//self.tip=1	
					self.startCSV();	                                
	            },
	            error:function function_name(data) {
	                console.log("Что то случилось с конфигом")
	            }
	        });
  		}


  		this.startCSV = function(_linkUrl){  
  			//грузим текстовый фаил
  			let link="resources/csvConfig.csv"+this.plus;
  			if(this.php.key!=null){
  				let b=true;
  				if(self.confText.mainSCV!=undefined&&self.confText.mainSCV==true)b=false;  				
  				if(b)link="users/"+this.php.key+"/csvConfig.csv"+this.plus+"&"+Math.random();

  			}
  			
	  		$.ajax({	  			
	            url:link,
	            success: function function_name(data) {
					self.csvConfig = data;
					self.redactorCSVObj();
					self.startCSV2();		                                
	            },
	            error:function function_name(data) {
	                console.log("Что то случилось с конфигом")
	                self.startCSV2();	
	            }
	        });
  		}
  		//this.boolPrice=false
  		this.startCSV2 = function(){ 
  			let link=null;
  			if(getURLParameters("price")!=undefined)link=getURLParameters("price")+"?"+Math.random();
  			
  			if(link!=null){
  				//http://localhost:8080/?price=resources/price.txt
  				$.ajax({	  			
		            url:link,
		            success: function function_name(data) {						
						self.setPrice(data)
						self.start();		                                
		            },
		            error:function function_name(data) {
		                console.log("Что то случилось с конфигом")
		                self.start();	
		            }
		        });
		        return
  			}

  			self.start();
  		}


  		this.сhangesSave= function(object){  
  			 			
  			self.glaf.menuDiv.menuSave.сhangesSave=true;
  		}
  		this.setObj = function (object) {
  			
  			if(object && object.fontFamily1!=undefined){

  				for (var s in object) {
	            	if(localS.object.sParam[s]!==undefined){
	            		localS.object.sParam[s] = object[s];
	            		
	            	}            	
	            }

	            self.dragParam()
	            return
  			}
  			self.glaf.setObj(object);            
        } 
        this.setObjectsJSON = function (object) {
        	
        	let b

        	for (var i = 0; i < object.array.length; i++) {        		
        		b=this.csvConfigArray.length;
        		for (var j = 0; j < this.csvConfigArray.length; j++) {
        			if(object.array[i].id == this.csvConfigArray[j].id){
        				
        				b=j;
        			}
        		}
        		this.csvConfigArray[b]=object.array[i];      		
        	}

        	for (var i = 0; i < this.objectBase.bd.length; i++) {
	            for (var j = 0; j < this.csvConfigArray.length; j++) {                             
	                if(this.objectBase.bd[i].id+""==this.csvConfigArray[j].id){

	                    this.objectBase.bd[i].obj.info=this.csvConfigArray[j]
                   
	                }
	            }            
	        }
        }
        

  		
  		var ll="resources/config.json"+this.plus;
  		
  		//грузим базовый фаил
  		$.ajax({
            url: "resources/config.json"+this.plus,
            success: function function_name(data) {                         
                if(typeof data === "string") {
					var conf = JSON.parse(data)
					self.objectBase = conf;
				} else self.objectBase = data;		
				
				//self.startCSV();	  			
				self.startText();	                                
            },
            error:function function_name(data) {
                console.log("Что то случилось с конфигом")
            }
        }); 

  		function getURLParameters(paramName){
	        var sURL = window.document.URL.toString();
			var arrParams = sURL.split("/");  			    		
	        if (sURL.indexOf("?") > 0) {
				var arrParams = sURL.split("?");
	        	var arrURLParams = arrParams[1].split("&");
	       	 	var arrParamNames = new Array(arrURLParams.length);
	        	var arrParamValues = new Array(arrURLParams.length);
	            arrParams = sURL.split("?");
	            arrURLParams = arrParams[1].split("&");
	            arrParamNames = new Array(arrURLParams.length);
	            arrParamValues = new Array(arrURLParams.length);
	            var i = 0;
	            for (i = 0; i < arrURLParams.length; i++) {

	                var sParam =  arrURLParams[i].split("=");
	                arrParamNames[i] = sParam[0];
	                if (sParam[1] != "")
	                    arrParamValues[i] = unescape(sParam[1]);
	                else
	                    arrParamValues[i] = null;
	            }
	            for (i=0; i<arrURLParams.length; i++) {
	                if (arrParamNames[i] == paramName) {
	                    return arrParamValues[i];
	                }
	            }
	            return null;
	        }
  	  	}


  	}
}

export class KlassPrice  {
  	constructor(date,oB) {  		
  		this.type="KlassPrice";
  		var self=this;
  		var o={}
  		var a=date.split("\n")
  		for (var i = 0; i < a.length; i++) {
  			let aa=a[i].split(";")
  			if(aa[0]=="")continue
  			if(aa[0]=="//")continue
  			if(aa[0]=="continue")continue	
  			if(aa[0]=="return")break	
  			o[aa[0]]=aa	  			
  		}

  		var s
  		for (var i = 0; i < oB.bd.length; i++) {
  			if(oB.bd[i].obj!=undefined){
  				if(oB.bd[i].obj.info!=undefined){
  					if(oB.bd[i].obj.info.color!=undefined){
  						for (s in oB.bd[i].obj.info.color) {
  							oB.bd[i].obj.info.color[s].pri="нет в наличии"
  						}
  					}

					

  				}  				
  			}
  		}
  		//L9707CH-300;31;L9707CH-300XZ;хромXZ;размерXZ;текстXZ;
  		var key
  		for (var i = 0; i < oB.bd.length; i++) {
  			if(oB.bd[i].obj!=undefined){
  				if(oB.bd[i].obj.info!=undefined){
  					if(oB.bd[i].obj.info.color!=undefined){
  						for (s in oB.bd[i].obj.info.color) {
  							key=oB.bd[i].obj.info.color[s].art
  							if(o[key]!=undefined){
  							

  								if(o[key][1])oB.bd[i].obj.info.color[s].pri=o[key][1]
  								if(o[key][2])oB.bd[i].obj.info.color[s].niz2=o[key][2]
  								if(o[key][3])oB.bd[i].obj.info.color[s].niz=o[key][3]
  								if(o[key][4])oB.bd[i].obj.info.color[s].niz4=o[key][4]
  								if(o[key][5])oB.bd[i].obj.info.color[s].niz5=o[key][5]
  							}
  						}
  					}
  				}
  			}
  		}


  			
	}
}


export class KlassCSVObj  {
  	constructor(csvConfig,objectBase) {  		
  		this.type="KlassCSVObj";
  		var self=this;
  		this.prosentSCV=1.0;
  		this.objectBase=objectBase
  		this.csvConfigArray
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

	    //КИРИЛИЦА!!!!!!!!!!!!!!!!!!!!
	    ///////////////////////////////
	    var es='й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|Й|Ц|У|К|Е|Н|Г|Ш|Щ|З|Х|Ъ|Ф|Ы|В|А|П|Р|О|Л|Д|Ж|Э|Я|Ч|С|М|И|Т|Ь|Б|Ю';
	    var es1='Ð¹|Ñ|Ñ|Ðº|Ðµ|Ð½|Ð³|Ñ|Ñ|Ð·|Ñ|Ñ|Ñ|Ñ|Ð²|Ð°|Ð¿|Ñ|Ð¾|Ð»|Ð´|Ð¶|Ñ|Ñ|Ñ|Ñ|Ð¼|Ð¸|Ñ|Ñ|Ð±|Ñ|Ð|Ð¦|Ð£|Ð|Ð|Ð|Ð|Ð¨|Ð©|Ð|Ð¥|Ðª|Ð¤|Ð«|Ð|Ð|Ð|Ð |Ð|Ð|Ð|Ð|Ð­|Ð¯|Ð§|Ð¡|Ð|Ð|Ð¢|Ð¬|Ð|Ð®'
	    var aa, aa1,bb
	    this.testStr = function(str){  
	        var r=null
	        if(aa==undefined){
	            aa=es.split("|")
	            aa1=es1.split("|")
	        }
	        
	        for (var i = 0; i < aa1.length; i++) {
	            if(str.indexOf(aa1[i])!=-1){
	                r=''
	                break;
	            }
	        }
	        if(r!=null){
	           r= this.testStr2(str)
	        }
	        return r;
	    }

	    var aaw,sw
	    this.testStr2 = function(str){        
	        var r=str;            
	        for (var i = 0; i < aa1.length; i++) {
	            if(r.indexOf(aa1[i])!=-1){
	                aaw=r.split(aa1[i]);
	                r=''
	                
	                for (var j= 0; j < aaw.length; j++) {
	                    if(j==0){
	                        r+=aaw[j]
	                    }else{
	                        r+=aa[i]+aaw[j]
	                    }
	                }
	            }
	        }
	        return r;
	    }

	    this.korektText=function(s){
	        
	        let str=this.testStr(s);
	        self.par.par.menuVerh.novaZamena(str); 
	    }




	    var ar,a
	    var sah
	    this.bigZamena=function(_str){        
	       	
	       	var str=this.testStr(_str)
	

	       	a=_str.split("\n")        
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

        
			for (var i = 0; i < ddd.length; i++) {
				if(ddd[i].length<2){
					ddd.splice(i,1)
					i=0
				}
			}

	    

	        this.nz1(ar,ddd)


	       /* for (var i = 1; i < a.length; i++) {
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
	        this.bigZamena1(ar);*/
	    }


	    this.objectBase
	    var arrxz=[]
	    this.nz1=function(arr,ddd){ 
	       	
	        arrxz=[];
	        var array=[];
	        for (var i = 0; i < arr.length; i++) {	        	
	        	if(arr[i][0]=="colorNew"){
	        		let ddddd=[]
	        		for (var j = 0; j < arr[i].length; j++) {
	        			if(arr[i][j].indexOf("m_")!=-1){
	        				ddddd.push(arr[i][j])
	        			}
	        		}	        		
	        		ddd=ddddd;
	        	}	        	

	            let o={};  
	            o.id=arr[i][0];          
	            o.text=arr[i][1];
	            o.size=arr[i][2];

	            
				if(arr[i][3].length==0)o.mass=100
	            else o.mass=arr[i][3]*1
	            
	            if(arr[i][4].length==0)o.volume=0.1
	            else o.volume = arr[i][4]*1
	            
	            	
	            o.color={};
	            o.array=[]
	            let sah=0;
	            for (var j = 0; j < ddd.length; j++) {       
	                o.array[j]={id:ddd[j]}
	                let jj=5+j*4
	                o.color[ddd[sah]]={}
	                //o.color[ddd[sah]].id=arr[i][0];
	                o.color[ddd[sah]].art=arr[i][jj];

	                o.color[ddd[sah]].pri=Math.round(arr[i][jj+1]*self.prosentSCV);
	                if(isNaN(o.color[ddd[sah]].pri))o.color[ddd[sah]].pri=arr[i][jj+1]

	                o.color[ddd[sah]].niz=arr[i][jj+2];
	                o.color[ddd[sah]].xz=arr[i][jj+3];
	                sah++;
	            }
	            array.push(o);
	           


	            for (var j = 0; j < this.objectBase.bd.length; j++) {
	                if(arr[i][0]*1==this.objectBase.bd[j].id){                    
	                    arrxz.push(this.objectBase.bd[i].obj)
	                }
	            }
	        }
	        
	        
	        for (var i = 0; i < this.objectBase.bd.length; i++) {
	            for (var j = 0; j < arr.length; j++) { 
	            	                          
	                if(this.objectBase.bd[i].id+""==arr[j][0]){	                	
	                    this.objectBase.bd[i].obj.info=array[j];
	                    arrxz.push(this.objectBase.bd[i].obj)
	                    
	                }
	            }            
	        }
	        this.csvConfigArray=array;
	        var o={
	        	info:"возможно что то будет, но пока не важно",
	        	array:this.csvConfigArray
	        }

	        
	    }
	    this.init=function(){
	    	this.bigZamena(csvConfig)
	    }	    	   
  	}
}
