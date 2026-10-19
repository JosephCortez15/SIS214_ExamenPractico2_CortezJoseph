
document.addEventListener('DOMContentLoaded', () => {

    const btnTema = document.getElementById('btn-tema');
    const rootElement = document.documentElement;
    const STORAGE_KEY_TEMA = 'app_user_theme_preference';

    const aplicarTema = (tema) => {
        rootElement.setAttribute('data-theme', tema);
        if (btnTema) {
            btnTema.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
        }
    };

    const inicializarTema = () => {
        try {
            const temaGuardado = localStorage.getItem(STORAGE_KEY_TEMA);
            if (temaGuardado) {
                const parsedTema = JSON.parse(temaGuardado);
                aplicarTema(parsedTema.theme);
            } else {
                aplicarTema('light');
            }
        } catch (error) {
            console.error('Error al recuperar configuracion de tema desde localStorage:', error);
            aplicarTema('light');
        }
    };

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const temaActual = rootElement.getAttribute('data-theme') || 'light';
            const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
            
            aplicarTema(nuevoTema);

            try {
                const payload = { theme: nuevoTema, timestamp: Date.now() };
                localStorage.setItem(STORAGE_KEY_TEMA, JSON.stringify(payload));
            } catch (error) {
                console.error('Error al persistir estado en localStorage:', error);
            }
        });
    }

    inicializarTema();

    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.getElementById('menu-principal');

    if (btnMenu && navPrincipal) {
        btnMenu.addEventListener('click', () => {
            const estaActivo = navPrincipal.classList.toggle('activo');
            
            // Mutacion reactiva de la propiedad WAI-ARIA para tecnologias asistivas
            btnMenu.setAttribute('aria-expanded', estaActivo ? 'true' : 'false');
            btnMenu.textContent = estaActivo ? 'Cerrar' : 'Menu';
        });
        navPrincipal.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                if (navPrincipal.classList.contains('activo')) {
                    navPrincipal.classList.remove('activo');
                    btnMenu.setAttribute('aria-expanded', 'false');
                    btnMenu.textContent = 'Menu';
                }
            });
        });
    }

    const PROYECTOS_DATA = Object.freeze([
        {
            id: 1,
            titulo: 'Tienda Deportiva Web',
            descripcion: 'Plataforma web con gestion de inventario, modelado de bases de datos y scripts de interfaz interactivos.',
            tecnologia: 'JavaScript / HTML5 / SQL'
        },
        {
            id: 2,
            titulo: 'Infraestructura de Red SERVITEP',
            descripcion: 'Diseno topologico y direccionamiento corporativo aplicando segmentacion VLSM, enrutamiento y simulacion.',
            tecnologia: 'Cisco Packet Tracer / Redes'
        },
        {
            id: 3,
            titulo: 'Visualizador de Grafos y Arboles (Graphos)',
            descripcion: 'Herramienta interactiva para visualizacion de estructuras de datos no lineales y algoritmos de recorrido.',
            tecnologia: 'React / Flutter / Algoritmos'
        },
        {
            id: 4,
            titulo: 'Plataforma de Streaming A&J Music',
            descripcion: 'Arquitectura multicapa integrando almacenamiento relacional PostgreSQL, Data Warehouse y base NoSQL MongoDB.',
            tecnologia: 'PostgreSQL / MongoDB / Data Warehouse'
        },
        {
            id: 5,
            titulo: 'Optimizador de Rutas y Puzzle A*',
            descripcion: 'Aplicacion movil con captura de imagenes y resolucion automatizada mediante el algoritmo de busqueda A*.',
            tecnologia: 'Flutter / Dart / Algoritmos'
        }
    ]);

    const inputBuscador = document.getElementById('input-buscador');
    const gridProyectos = document.getElementById('grid-proyectos');

    const renderizarProyectos = (listaProyectos) => {
        if (!gridProyectos) return;

        if (listaProyectos.length === 0) {
            gridProyectos.innerHTML = '<p class="estado-ui">No se encontraron proyectos que coincidan con el criterio de busqueda.</p>';
            return;
        }
        const tarjetasHTML = listaProyectos.map(item => `
            <article class="card-proyecto" data-id="${item.id}">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
                <span class="badge-tech">${item.tecnologia}</span>
            </article>
        `).join('');

        gridProyectos.innerHTML = tarjetasHTML;
    };

    if (inputBuscador) {
        inputBuscador.addEventListener('input', (evento) => {
            const termino = evento.target.value.toLowerCase().trim();

            // Tuberia funcional: Filtrado inmutable encadenado con renderizado
            const proyectosFiltrados = PROYECTOS_DATA.filter(proyecto => 
                proyecto.titulo.toLowerCase().includes(termino) ||
                proyecto.descripcion.toLowerCase().includes(termino) ||
                proyecto.tecnologia.toLowerCase().includes(termino)
            );

            renderizarProyectos(proyectosFiltrados);
        });
    }
    renderizarProyectos(PROYECTOS_DATA);

    const formulario = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputMensaje = document.getElementById('mensaje');
    const feedbackExito = document.getElementById('form-exito');

    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorMensaje = document.getElementById('error-mensaje');

    const validarCampo = (input, elementoError, condicion, mensajeFallo) => {
        if (!condicion) {
            input.classList.remove('valido');
            input.classList.add('invalido');
            elementoError.textContent = mensajeFallo;
            return false;
        } else {
            input.classList.remove('invalido');
            input.classList.add('valido');
            elementoError.textContent = '';
            return true;
        }
    };
    if (inputNombre) {
        inputNombre.addEventListener('input', () => {
            validarCampo(
                inputNombre,
                errorNombre,
                inputNombre.value.trim().length >= 3,
                'El nombre debe contener al menos 3 caracteres validos.'
            );
        });
    }

    if (inputCorreo) {
        inputCorreo.addEventListener('input', () => {
            const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            validarCampo(
                inputCorreo,
                errorCorreo,
                regexCorreo.test(inputCorreo.value.trim()),
                'Ingrese un formato de correo electronico corporativo o academico valido.'
            );
        });
    }

    if (inputMensaje) {
        inputMensaje.addEventListener('input', () => {
            validarCampo(
                inputMensaje,
                errorMensaje,
                inputMensaje.value.trim().length >= 10,
                'El cuerpo del mensaje debe contener un minimo de 10 caracteres.'
            );
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const esNombreValido = validarCampo(inputNombre, errorNombre, inputNombre.value.trim().length >= 3, 'El nombre debe contener al menos 3 caracteres.');
            const esCorreoValido = validarCampo(inputCorreo, errorCorreo, regexCorreo.test(inputCorreo.value.trim()), 'Ingrese un correo valido.');
            const esMensajeValido = validarCampo(inputMensaje, errorMensaje, inputMensaje.value.trim().length >= 10, 'El mensaje debe contener al menos 10 caracteres.');

            if (esNombreValido && esCorreoValido && esMensajeValido) {
                if (feedbackExito) {
                    feedbackExito.classList.remove('oculto');
                    feedbackExito.textContent = 'Formulario validado exitosamente. Datos procesados en el cliente.';
                }
                
                formulario.reset();
                [inputNombre, inputCorreo, inputMensaje].forEach(campo => {
                    campo.classList.remove('valido');
                });

                setTimeout(() => {
                    if (feedbackExito) feedbackExito.classList.add('oculto');
                }, 4000);
            }
        });
    }
    const apiLoading = document.getElementById('api-loading');
    const apiError = document.getElementById('api-error');
    const apiSuccess = document.getElementById('api-success');

    const GITHUB_USERNAME = 'JosephCortez15';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`;

    const obtenerRepositoriosGitHub = async () => {
        // Estado 1: Loading activo (peticion en vuelo)
        if (apiLoading) apiLoading.classList.remove('oculto');
        if (apiError) apiError.classList.add('oculto');
        if (apiSuccess) apiSuccess.classList.add('oculto');

        try {
            const respuesta = await fetch(GITHUB_API_URL);
            if (!respuesta.ok) {
                if (respuesta.status === 404) {
                    throw new Error(`Error 404: Usuario de GitHub "${GITHUB_USERNAME}" no encontrado.`);
                } else if (respuesta.status === 403) {
                    throw new Error('Error 403: Limite de peticiones excedido en la API publica de GitHub.');
                } else if (respuesta.status >= 500) {
                    throw new Error(`Error ${respuesta.status}: Fallo interno en los servidores de GitHub.`);
                } else {
                    throw new Error(`Error HTTP no resuelto: Estado ${respuesta.status} (${respuesta.statusText}).`);
                }
            }

            const repositorios = await respuesta.json();

            if (apiSuccess) {
                if (repositorios.length === 0) {
                    apiSuccess.innerHTML = '<p class="estado-ui">El usuario no registra repositorios publicos recientes.</p>';
                } else {
                    apiSuccess.innerHTML = repositorios.map(repo => `
                        <div class="repo-card">
                            <p><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></p>
                            <p><small>${repo.description || 'Sin descripcion proporcionada.'}</small></p>
                            <p><small>Lenguaje principal: ${repo.language || 'Multiple / Sin definir'}</small></p>
                        </div>
                    `).join('');
                }
                apiSuccess.classList.remove('oculto');
            }

        } catch (error) {
            console.error('Fallo en la ejecucion del modulo Fetch API:', error.message);
            if (apiError) {
                apiError.textContent = `Fallo en la integracion asincrona: ${error.message}`;
                apiError.classList.remove('oculto');
            }
        } finally {
            if (apiLoading) apiLoading.classList.add('oculto');
        }
    };

    obtenerRepositoriosGitHub();
});