
let pagina = 1;
const next =()=>{
    if (pagina < 1000) {    
        pagina +=1;
        cargaMovie()
    }
    else{
        alert('No hay mas peliculas');
    }
}
const min =()=>{
    if (pagina > 1 ) {
        pagina --;
        cargaMovie()
    }else{
        alert
        ("Nose puede retroceder mas de la pagina 1");
    }
}
const cargaMovie = async() => {
    try {
        let re =  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8d72d8ffc8c1eed694db9cb9d210bfca&language=es-MX&page=${pagina}`);
        if (re.status === 200) {
            let data = await re.json();
            let movie = '';
             data.results.forEach(e => {
                movie += `
                <div class="pelicula">
                <img  class="poster" src="https://image.tmdb.org/t/p/w500/${e.poster_path}"/>
                </div>
                <div style="display:flex;flex-direction:column;">
                <h3 class="titulo">${e.title}</h3>
                <p style="margin:5px"> Fecha de estreno: ${e.release_date}</p>
                <p style="margin:5px"> ${e.overview}</p>
                </div>`
                ;
                  
               document.getElementById('contenedor').innerHTML = movie; 
             });                
        }else if (re.status === 401) {
            console.log('se introdujo mal la api key');
        }
        else if (re.status === 404) {
            console.log('No se encontro la pelicula');
        }
        else{
            console.log('Error desconocido')
        }
    } catch (error) {
        console.log(error)
    }
    }   
    cargaMovie();
