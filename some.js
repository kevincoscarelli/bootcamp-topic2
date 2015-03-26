

//CREACION DE EVENTOS CUSTOM QUE CORRESPONDEN A PLAY Y STOP.
var playing = new Event('playing');
var stopped = new Event('stopped');

//CLASE OBSERVER QUE ESCUCHA A LOS EVENTOS DESPACHADOS POR
//Movie.play() Y Movie.stop().
function MovieObserver(evento, movie){
	var self = this;
	this.evento = evento;
	this.movie = movie;

	document.addEventListener(this.evento, function(){
		if(self.evento == 'playing'){
			console.log('Currently playing "' + self.movie.title + '".');
		} else if(self.evento == 'stopped'){
			console.log('"' + self.movie.title + '" stopped.');
		}
		
	}, false);

	MovieObserver.prototype.constructor = MovieObserver;
}

//CLASE Movie QUE RECIBE TITULO, DIRECTOR Y AÑO.
function Movie(movtitle, movdirector, movyear){
	var self = this;
	this.title = movtitle;
	this.director = movdirector;
	this.year = movyear;

	//INSTANCIAS DEL OBSERVER QUE CREAN LOS EVENT HANDLERS DE
	//playing Y stopped.
	var player = new MovieObserver('playing', this);
	var stopper = new MovieObserver('stopped', this);

	this.play = function(){
		document.dispatchEvent(playing);
	};

	this.stop = function(){
		document.dispatchEvent(stopped);
	};

	//GETTER QUE DEVUELVE DATOS DE LA PELICULA.
	Object.defineProperty(this, 'getAttributes',{
		get: function() {
			console.log("The current movie is '" + this.title +
				"', directed by " + this.director + " in the year " + 
				this.year + ".");
		}
	});

	//SETTER DEL TITULO.
	Object.defineProperty(this, 'setTitle', {
		set: function(titulo) {
			this.title = titulo;
		}
	});

	//SETTER DEL DIRECTOR.
	Object.defineProperty(this, 'setDirector', {
		set: function(dire) {
			this.director = dire;
		}
	});

	//SETTER DEL AÑO.
	Object.defineProperty(this, 'setYear', {
		set: function(anio) {
			this.year = anio;
		}
	});

	Movie.prototype.constructor = Movie;

}





var movie1 = new Movie('Blade Runner', 'Ridley Scott', '1900');

movie1.getAttributes;
movie1.setYear = '1982';
movie1.play();