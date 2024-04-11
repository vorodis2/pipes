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


//Подложка под Локол Хорон
export function LocalStorage(fun,_key) {
	this.fun = fun;
	var self = this;
	this.object;
	this.key = _key||'shirt';
	this.object; // тут храняться все данные с localStorage
	var b;
	// инициализация localStorage
	this.initLoad=function() {
		b=true;
		this.object = window.localStorage[this.key];
		if(this.object == "undefined")b=false;
		if(this.object == undefined)b=false;
		
		// проверка пуст ли  localStorage
		if(b == false) {
			this.object = this.getStartObj(); // если localStorage пуст, записываем обьект с функции getStartObj
		}else {
			this.object = jQuery.parseJSON(this.object); // если localStorage не пуст записываем содержимое предварительно
		}	
		if(this.fun)self.fun();
	}
	
	// если localStorage пуст, записываем обьект
	this.getStartObj = function() {
		/*var obj = {
			activ:false,
			dubag:false,
			menu:{},
			xz:{}
		};*/
		return {}//obj;
	}

	// сохраняем в localStorage данные
	this.save = function() {		
		window.localStorage[this.key] = JSON.stringify(self.object);
	}

	// сохраняем в localStorage данные
	this.clear = function() {
		window.localStorage[this.key] = undefined;
	}
	self.initLoad();
	//setTimeout(function() {self.initLoad();}, 1);
		
}



