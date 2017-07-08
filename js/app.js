var Calculadora = {
	init: function(){
		this.iniciarVariables()
		this.reinicioDisplay()
	},
	iniciarVariables: function(){
		var self = this
		var classname = document.getElementsByClassName("tecla");

 
	 for (var i = 0; i < classname.length; i++) {
	    (function () { 
	        var boxa = classname[i].id; 
	        if(boxa!='mas'){
	        classname[i].addEventListener("mouseover", function() {  self.mouseover(boxa); }, false);
	         classname[i].addEventListener("mouseout", function() {  self.mouseout(boxa); }, false);   
	     }
	    }()); // immediate invocation
	}
	 for (var f = 0; f < classname.length; f++) {
	    (function () { 
	        var boxa2 = classname[f].id; 
	       if(!isNaN(boxa2)){
	         classname[f].addEventListener('click', function() { self.agregarValor(boxa2);false });
	   }
	    }());  
	}
		 
	 
		document.getElementById('on').addEventListener('click', function() { self.reinicioDisplay()	})

		document.getElementById('punto').addEventListener('click', function() { self.anadirPunto()	})

		document.getElementById('sign').addEventListener('click', function() { self.anadirSigno()  })

		document.getElementById('mas').addEventListener('click', function() { self.agregarOperacion('1') })

		document.getElementById('menos').addEventListener('click', function() { self.agregarOperacion('2')	})

		document.getElementById('por').addEventListener('click', function() { self.agregarOperacion('3') })

		document.getElementById('dividido').addEventListener('click', function() { self.agregarOperacion('4')})

		document.getElementById('igual').addEventListener('click', function() { self.operacionIgual()})
	},
	mouseover: function(valor){ 
		document.getElementById(valor).style.width = "75px";
		document.getElementById(valor).style.margin = "0 3px 0 0"; 
	},
	mouseout: function(valor){
		document.getElementById(valor).style.width = "80px";
		document.getElementById(valor).style.margin = "0 -3px 0 0";

	},
	validarNumeroDigitos: function(valor){
		var valor = String(valor);
		return valor.substring(0, 8)
	},
	agregarValor: function(valor){
		var self = this
		var elemento = document.getElementById('display')

		if(sessionStorage.result==1){
			elemento.innerHTML = valor;
			sessionStorage.result=0
		}else{
			if(elemento.innerHTML=='0'){
				elemento.innerHTML = valor;
			}else{
				var displayNew = elemento.innerHTML+valor
				var displayOptimo = self.validarNumeroDigitos(displayNew)
				elemento.innerHTML = displayOptimo;
			}
		}
	},
	reinicioDisplay: function(){
		document.getElementById('display').innerHTML = '0';

		sessionStorage.valor = 0;
		sessionStorage.operacion = 0; 
		sessionStorage.result = 0;
		sessionStorage.ultimoResultado = 0
		sessionStorage.operacionActiva = 0
		sessionStorage.valorGuardado = 0
		sessionStorage.countOperadorIgual =0
	},
	anadirPunto: function(){
		var self = this
		var elemento = document.getElementById('display')
		if(elemento.innerHTML.indexOf('.')<0){
			var displayNew = elemento.innerHTML+'.';
			var displayOptimo = self.validarNumeroDigitos(displayNew)
			elemento.innerHTML = displayOptimo;
			
		}
	},
	anadirSigno: function(){
		var elemento = document.getElementById('display')
		if(elemento.innerHTML.indexOf('-')<0 && elemento.innerHTML!='0' && elemento.innerHTML!=''){
			
			document.getElementById('display').innerHTML = '-'+elemento.innerHTML;
		}else if(elemento.innerHTML!=0 && elemento.innerHTML!=''){
			
			document.getElementById('display').innerHTML = elemento.innerHTML.substring(1);
		}
	},
	agregarOperacion: function(valor){
		var self = this
		var elemento = document.getElementById('display')

		var valorDisplay = Number(elemento.innerHTML)
		var valorOperacion = valor

		if(sessionStorage.result==1){
			sessionStorage.valor = sessionStorage.ultimoResultado
			sessionStorage.result = 0
		}else{
			if(sessionStorage.operacionActiva=='1'){
				sessionStorage.valor = self.resultado(sessionStorage.valor, valorDisplay, sessionStorage.operacion, 1)
				sessionStorage.result = 0

			}else{
				sessionStorage.valor = Number(valorDisplay);
			}
		}

		if(valorDisplay!=''){
			sessionStorage.valorGuardado = Number(valorDisplay);
		}
		
		sessionStorage.countOperadorIgual = 0
		sessionStorage.operacionActiva = 1;
		sessionStorage.operacion = valorOperacion;
		elemento.innerHTML = '';
		
	},
	operacionIgual: function(){
		var self = this
		var elemento = document.getElementById('display');

		var valorDisplay 	= sessionStorage.valor
		var valorOperacion 	= sessionStorage.operacion
		var valorDisplayNew	= elemento.innerHTML

		if(valorDisplayNew==''){
			valorDisplayNew = sessionStorage.valorGuardado
		}else if(valorDisplayNew!='' && sessionStorage.countOperadorIgual==0){
			sessionStorage.valor = valorDisplayNew
			sessionStorage.countOperadorIgual = 1
		}
	
		elemento.innerHTML = self.resultado(valorDisplay, valorDisplayNew, valorOperacion, 0)
	},
	resultado: function(valor1, valor2, operacion, tipo){

		var self = this

		switch(operacion){
			case '1':
				var resultado = (Number(valor1)+Number(valor2))
				break;
			case '2':
				var resultado = (Number(valor1)-Number(valor2))
				break;
			case '3':
				var resultado = (Number(valor1)*Number(valor2))
				break;
			case '4':
				var resultado = (Number(valor1)/Number(valor2))
				break;
		} 

		resultadoValidado = self.validarNumeroDigitos(resultado);
		sessionStorage.operacionActiva = tipo
		sessionStorage.result = 1
		sessionStorage.ultimoResultado = resultadoValidado
		return resultadoValidado;
	}
}

Calculadora.init()
