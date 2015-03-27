
function extend(destination, source){
	for(var k in source){
		if(source.hasOwnProperty(k)){
			destination[k] = source[k];
		}
	}
	return destination;
};

Object.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};

var movieApp = (function(){
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
	//MIXIN SOCIAL.
	var Social = function(){
		this.share = function(friendName){
			console.log('You just shared ' + this.prototype.title + ' with ' + friendName + '.');
		},
		this.like = function(){
			console.log('You like ' + this.prototype.title + '.');
		}
		return this;
	}

	//CLASE Movie QUE RECIBE TITULO, DIRECTOR Y AÑO.
	function Movie(movtitle, movdirector, movyear){
		var self = this;

		this.prototype = {
			title: movtitle,
			director: movdirector,
			year: movyear
		}


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
				console.log("The current movie is '" + self.title +
					"', directed by " + self.director + " in the year " + 
					self.year + ".");
			}
		});

		//SETTER DEL TITULO.
		Object.defineProperty(this, 'setTitle', {
			set: function(titulo) {
				self.title = titulo;
			}
		});

		//SETTER DEL DIRECTOR.
		Object.defineProperty(this, 'setDirector', {
			set: function(dire) {
				self.director = dire;
			}
		});

		//SETTER DEL AÑO.
		Object.defineProperty(this, 'setYear', {
			set: function(anio) {
				self.year = anio;
			}
		});
		Movie.prototype.constructor = Movie;
	}
	//LE AGREGO EL MIXIN A MOVIE.PROTOTYPE.
	Social.call(Movie.prototype);


	function DownloadableMovie(peli){
		console.log(peli.getName());
		var name = peli.getName();
		if(name == "Movie"){
			extend(this, peli.prototype);

			this.download = function(){
				console.log('Downloading ' + this.title + '...');
			}
		} else {
			throw new Error('Argument not a Movie.');
		}
	}
	

	var movie1 = new Movie('Blade Runner', 'Ridley Scott', '1900');

	movie1.getAttributes;
	movie1.setYear = '1982';
	movie1.play();
	movie1.share('Juan Patricio');
	movie1.like();

	var descargable = new DownloadableMovie(movie1);
	console.log(descargable);

	descargable.download();
})();

