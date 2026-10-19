/**
 * Asignatura: Tecnologias Web I (SIS-214)
 * Evaluacion Practica 2: Landing Page y Portafolio Profesional Interactivo
 * Estudiante: Joseph Wendell Hans Cortez Chura
 */

document.addEventListener('DOMContentLoaded', () => {

    const btnTema = document.getElementById('btn-tema');
    const rootElement = document.documentElement;
    const THEME_STORAGE_KEY = 'user_theme_config';

    const aplicarTema = (tema) => {
        rootElement.setAttribute('data-theme', tema);
        if (btnTema) {
            btnTema.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
        }
    };

    const recuperarTema = () => {
        try {
            const serializado = localStorage.getItem(THEME_STORAGE_KEY);
            if (serializado) {
                const datos = JSON.parse(serializado);
                aplicarTema(datos.mode);
            } else {
                aplicarTema('light');
            }
        } catch (error) {
            console.error('Fallo al recuperar preferencia de almacenamiento local:', error);
            aplicarTema('light');
        }
    };

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const temaActual = rootElement.getAttribute('data-theme') || 'light';
            const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
            aplicarTema(nuevoTema);

            try {
                const paquete = { mode: nuevoTema, actualizado: new Date().toISOString() };
                localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(paquete));
            } catch (error) {
                console.error('No se pudo persistir el estado del tema:', error);
            }
        });
    }

    recuperarTema();

    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.getElementById('menu-principal');

    if (btnMenu && navPrincipal) {
        btnMenu.addEventListener('click', () => {
            const activo = navPrincipal.classList.toggle('activo');
            btnMenu.setAttribute('aria-expanded', activo ? 'true' : 'false');
            btnMenu.textContent = activo ? 'Cerrar' : 'Menu';
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
            id: 'tienda-deportiva',
            titulo: 'Tienda Deportiva Web',
            resumen: 'Plataforma web comercial con gestion de inventario y conexion a bases de datos relacionales.',
            tecnologia: 'JavaScript / HTML5 / SQL',
            arquitectura: 'Cliente/Servidor monolítico con scripts DOM y consultas SQL optimizadas.',
            rol: 'Desarrollador y diseñador de base de datos.',
            retos: 'Modelado de la integridad referencial para el catalogo de productos y persistencia de compras.',
            enlace: 'https://github.com/JosephCortez15/Tienda-Deportiva.git'
        },
        {
            id: 'red-servitep',
            titulo: 'Red Corporativa SERVITEP S.R.L.',
            resumen: 'Diseno e implementacion de infraestructura de red integral para empresa de servicios.',
            tecnologia: 'Cisco Packet Tracer / Redes / VLSM',
            arquitectura: 'Segmentacion jerarquica mediante VLSM, switches de distribucion y routers perimetrales.',
            rol: 'Arquitecto de red y administrador de configuraciones.',
            retos: 'Calculo exacto de mascaras de subred para optimizar el espacio de direcciones IPv4 corporativo.',
            enlace: 'https://github.com/JosephCortez15'
        },
        {
            id: 'graphos-visualizer',
            titulo: 'Graphos - Visualizador de Grafos y Arboles',
            resumen: 'Herramienta interactiva para analisis visual de estructuras de datos no lineales y grafos.',
            tecnologia: 'React / Flutter / Algoritmos',
            arquitectura: 'Modelado de nodos y aristas en canvas interactivo con visualizacion de recorridos BFS y DFS.',
            rol: 'Desarrollador frontend y logica algoritmica.',
            retos: 'Gestion de estados de animacion para ilustrar la ejecucion paso a paso de Dijkstra y Kruskal.',
            enlace: 'https://github.com/JosephCortez15'
        },
        {
            id: 'ayj-music',
            titulo: 'A&J Music - Plataforma de Streaming',
            resumen: 'Arquitectura multicapa de almacenamiento de datos para streaming de musica.',
            tecnologia: 'PostgreSQL / Data Warehouse / MongoDB',
            arquitectura: 'Esquema transaccional OLTP en PostgreSQL acoplado a modelo analitico en estrella (OLAP) y NoSQL en MongoDB.',
            rol: 'Disenador de base de datos y procesos ETL.',
            retos: 'Consolidacion de metricas de reproduccion y extraccion de datos hacia colecciones no relacionales.',
            enlace: 'https://github.com/JosephCortez15'
        },
        {
            id: 'puzzle-astar',
            titulo: 'Optimizador de Rutas y Puzzle A*',
            resumen: 'Aplicacion movil con captura de imagenes y resolucion automatizada mediante A* Pathfinding.',
            tecnologia: 'Flutter / Dart / Algoritmos A*',
            arquitectura: 'Modulo de integracion de camara nativa acoplado a un motor heuristico de optimizacion espacial.',
            rol: 'Desarrollador movil de extremo a extremo.',
            retos: 'Optimizacion de la funcion f(n) = g(n) + h(n) en memoria del dispositivo para resolver matrices complejas en milisegundos.',
            enlace: 'https://github.com/JosephCortez15'
        }
    ]);

    const inputBuscador = document.getElementById('input-buscador');
    const gridProyectos = document.getElementById('grid-proyectos');

    const modal = document.getElementById('modal-proyecto');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalCuerpo = document.getElementById('modal-cuerpo');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');


    const renderizarTarjetas = (lista) => {
        if (!gridProyectos) return;

        if (lista.length === 0) {
            gridProyectos.innerHTML = '<p class="estado-ui">No se encontraron proyectos para el criterio de busqueda ingresado.</p>';
            return;
        }

        gridProyectos.innerHTML = lista.map(item => `
            <article class="card-proyecto" data-id="${item.id}">
                <div>
                    <h3>${item.titulo}</h3>
                    <span class="badge-tech">${item.tecnologia}</span>
                    <p>${item.resumen}</p>
                </div>
                <button type="button" class="btn-detalle" data-id="${item.id}">Ver Especificacion Tecnica</button>
            </article>
        `).join('');

        gridProyectos.querySelectorAll('.btn-detalle').forEach(boton => {
            boton.addEventListener('click', () => {
                const proyectoId = boton.getAttribute('data-id');
                abrirDetalleProyecto(proyectoId);
            });
        });
    };

    const abrirDetalleProyecto = (id) => {
        const proyecto = PROYECTOS_DATA.find(p => p.id === id);
        if (!proyecto || !modal) return;

        modalTitulo.textContent = proyecto.titulo;
        modalCuerpo.innerHTML = `
            <p><strong>Stack Tecnologico:</strong> ${proyecto.tecnologia}</p>
            <p><strong>Arquitectura del Sistema:</strong> ${proyecto.arquitectura}</p>
            <p><strong>Rol Desempenado:</strong> ${proyecto.rol}</p>
            <p><strong>Retos Tecnicos Resueltos:</strong> ${proyecto.retos}</p>
            <p><strong>Repositorio Oficial:</strong> <a href="${proyecto.enlace}" target="_blank" rel="noopener noreferrer">${proyecto.enlace}</a></p>
        `;

        modal.classList.remove('oculto');
        modal.setAttribute('aria-hidden', 'false');
        btnCerrarModal.focus();
    };

    const cerrarModal = () => {
        if (!modal) return;
        modal.classList.add('oculto');
        modal.setAttribute('aria-hidden', 'true');
    };

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', cerrarModal);
    }

    if (modal) {
        modal.addEventListener('click', (evento) => {
            if (evento.target === modal) cerrarModal();
        });
    }

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && modal && !modal.classList.contains('oculto')) {
            cerrarModal();
        }
    });

    if (inputBuscador) {
        inputBuscador.addEventListener('input', (evento) => {
            const consulta = evento.target.value.toLowerCase().trim();
            const filtrados = PROYECTOS_DATA.filter(p => 
                p.titulo.toLowerCase().includes(consulta) ||
                p.tecnologia.toLowerCase().includes(consulta) ||
                p.resumen.toLowerCase().includes(consulta)
            );
            renderizarTarjetas(filtrados);
        });
    }

    renderizarTarjetas(PROYECTOS_DATA);

    const formulario = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const selectMotivo = document.getElementById('motivo');
    const inputMensaje = document.getElementById('mensaje');
    const feedbackExito = document.getElementById('form-exito');

    const errNombre = document.getElementById('error-nombre');
    const errCorreo = document.getElementById('error-correo');
    const errMotivo = document.getElementById('error-motivo');
    const errMensaje = document.getElementById('error-mensaje');

    const validarInput = (campo, contenedorError, esValido, mensajeError) => {
        if (!esValido) {
            campo.classList.remove('valido');
            campo.classList.add('invalido');
            contenedorError.textContent = mensajeError;
            return false;
        } else {
            campo.classList.remove('invalido');
            campo.classList.add('valido');
            contenedorError.textContent = '';
            return true;
        }
    };

    if (inputNombre) {
        inputNombre.addEventListener('input', () => {
            validarInput(inputNombre, errNombre, inputNombre.value.trim().length >= 3, 'El nombre debe contener al menos 3 caracteres.');
        });
    }

    if (inputCorreo) {
        inputCorreo.addEventListener('input', () => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            validarInput(inputCorreo, errCorreo, regex.test(inputCorreo.value.trim()), 'Ingrese un correo electronico corporativo o institucional valido.');
        });
    }

    if (selectMotivo) {
        selectMotivo.addEventListener('change', () => {
            validarInput(selectMotivo, errMotivo, selectMotivo.value !== '', 'Debe seleccionar un motivo de contacto.');
        });
    }

    if (inputMensaje) {
        inputMensaje.addEventListener('input', () => {
            validarInput(inputMensaje, errMensaje, inputMensaje.value.trim().length >= 10, 'El mensaje debe contener al menos 10 caracteres explicativos.');
        });
    }

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();

            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const vNom = validarInput(inputNombre, errNombre, inputNombre.value.trim().length >= 3, 'El nombre es obligatorio (min. 3 caracteres).');
            const vCor = validarInput(inputCorreo, errCorreo, regex.test(inputCorreo.value.trim()), 'El correo electronico es invalido.');
            const vMot = validarInput(selectMotivo, errMotivo, selectMotivo.value !== '', 'Seleccione un motivo.');
            const vMen = validarInput(inputMensaje, errMensaje, inputMensaje.value.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres.');

            if (vNom && vCor && vMot && vMen) {
                if (feedbackExito) {
                    feedbackExito.classList.remove('oculto');
                    feedbackExito.textContent = 'Formulario validado con exito. Datos procesados en el cliente.';
                }
                formulario.reset();
                [inputNombre, inputCorreo, selectMotivo, inputMensaje].forEach(el => el.classList.remove('valido'));

                setTimeout(() => {
                    if (feedbackExito) feedbackExito.classList.add('oculto');
                }, 4000);
            }
        });
    }

    const apiLoading = document.getElementById('api-loading');
    const apiError = document.getElementById('api-error');
    const apiSuccess = document.getElementById('api-success');
    
    const GITHUB_USER = 'JosephCortez15';
    const GITHUB_ENDPOINT = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=4`;

    const consumirRepositorios = async () => {
        if (apiLoading) apiLoading.classList.remove('oculto');
        if (apiError) apiError.classList.add('oculto');
        if (apiSuccess) apiSuccess.classList.add('oculto');

        try {
            const respuesta = await fetch(GITHUB_ENDPOINT);

            if (!respuesta.ok) {
                if (respuesta.status === 404) {
                    throw new Error(`Recurso no encontrado (HTTP 404): Usuario "${GITHUB_USER}" inexistente.`);
                } else if (respuesta.status === 403) {
                    throw new Error('Limite de tasa de peticiones alcanzado en GitHub API (HTTP 403).');
                } else if (respuesta.status >= 500) {
                    throw new Error(`Error en el servidor remoto de GitHub (HTTP ${respuesta.status}).`);
                } else {
                    throw new Error(`Peticion no resuelta con codigo HTTP ${respuesta.status}.`);
                }
            }

            const datos = await respuesta.json();

            if (apiSuccess) {
                if (datos.length === 0) {
                    apiSuccess.innerHTML = '<p class="estado-ui">No se registran repositorios publicos recientes.</p>';
                } else {
                    apiSuccess.innerHTML = datos.map(r => `
                        <article class="repo-card">
                            <p><a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a></p>
                            <p><small>${r.description || 'Sin descripcion publica asignada en GitHub.'}</small></p>
                            <p><small>Lenguaje base: ${r.language || 'Configuracion multiple'}</small></p>
                        </article>
                    `).join('');
                }
                apiSuccess.classList.remove('oculto');
            }

        } catch (error) {
            console.error('Excepcion asincrona capturada:', error.message);
            if (apiError) {
                apiError.textContent = `Fallo en la sincronizacion con la API: ${error.message}`;
                apiError.classList.remove('oculto');
            }
        } finally {
            if (apiLoading) apiLoading.classList.add('oculto');
        }
    };

    consumirRepositorios();
});