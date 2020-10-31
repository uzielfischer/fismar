const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
})

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes_cargadas');

    //agregamos los litenner de las categorias de las imagenes
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) =>{
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    //barra de busqueda
    document.querySelector('#bar_busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter( (items) => items.getElement().dataset.etiqueta.includes(busqueda) );
    });

    //overlay popup
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .items img').forEach((elemento) => {
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //evenListener btn de cerrar
    document.querySelector('#btn_cerrar_popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    }); 

    //evenlistener del overlay
    overlay.addEventListener('click', () => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});

