document.addEventListener('DOMContentLoaded', () => {
    const foto = document.getElementById('fotoBebe');
    const marco = document.getElementById('marcoFoto');
    const pantalla = document.getElementById('pantalla-carga');
    const btnAbrir = document.getElementById('btn-abrir');
    const spinner = document.querySelector('.spinner');
    const mensaje = document.getElementById('mensaje-carga');
    const musica = document.getElementById('musica-fondo');

    // Lógica para la Fotografía
    function checkFoto() {
        if (foto.complete && foto.naturalWidth > 0) marco.classList.remove('sin-foto');
        else marco.classList.add('sin-foto');
    }
    foto.addEventListener('load', () => marco.classList.remove('sin-foto'));
    foto.addEventListener('error', () => marco.classList.add('sin-foto'));
    checkFoto();

    // Lógica para la Pantalla de Carga
    setTimeout(() => {
        const corazon = document.querySelector('.corazon-carga');
        if(corazon) corazon.style.display = 'none'; // Ocultamos el corazón
        mensaje.style.display = 'none';
        btnAbrir.style.display = 'inline-block';
    }, 2000);

    function lanzarConfeti() {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.innerHTML = '★';
            star.className = 'particula';
            star.style.left = Math.random() * 100 + 'vw';
            const duracion = 3 + Math.random() * 2;
            star.style.animation = `flotar ${duracion}s linear forwards`;
            star.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(star);
            setTimeout(() => star.remove(), duracion * 1000);
        }
    }

    // Acción al presionar Abrir
    btnAbrir.addEventListener('click', () => {
        if (musica) {
            musica.volume = 0.5;
            musica.play().catch(e => console.warn("Audio bloqueado"));
        }

        // Animación de textos optimizada
        const elementosTexto = document.querySelectorAll('.fade-in-up');
        elementosTexto.forEach((el, index) => {
            // El nombre aparece rápido, los demás aparecen con retraso
            let retardo = el.classList.contains('nombre-animado') ? 100 : (index * 400 + 500);
            
            setTimeout(() => {
                el.classList.add('visible');
            }, retardo);
        });

        lanzarConfeti();
        pantalla.classList.add('abrir-libro');
        
        setTimeout(() => {
            pantalla.style.display = 'none';
        }, 1200);
    });
});