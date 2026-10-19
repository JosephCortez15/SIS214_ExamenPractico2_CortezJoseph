# SIS214_ExamenPractico2_CortezJoseph

Link de la pagina desplegada en GitHub Pages:
https://josephcortez15.github.io/SIS214_ExamenPractico2_CortezJoseph/

## De que trata este proyecto

Este trabajo es para la segunda evaluacion practica de Tecnologias Web I (SIS-214) de la UCB. La idea de esta entrega era no quedarnos solo con una maqueta plana o estatica, sino armar una landing page completa tipo portafolio profesional que responda bien a eventos, consuma APIs y guarde datos del usuario en el navegador sin usar librerias raras ni frameworks, puro codigo nativo

Para no empezar de cero, tome como base todo lo que ya habia estructurado en el primer examen practico. Ademas, meti proyectos reales que fui desarrollando en otras materias para que el portafolio tenga contenido tecnico de verdad y no texto de relleno:
- El proyecto web de la Tienda Deportiva donde aplique JavaScript y base de datos.
- El diseno y calculo de subredes VLSM de la red corporativa de SERVITEP en Cisco Packet Tracer.
- La herramienta Graphos para visualizar arboles y grafos que trabaje con React y Flutter.
- El diseno de base de datos multicapa A&J Music donde junte PostgreSQL, MongoDB y Data Warehouse.
- La app movil del puzzle con busqueda A* en Flutter.

## Que cosas tiene implementadas

El proyecto cumple con los 5 puntos tecnicos que se pidieron para esta unidad:
1. Conmutador de modo claro y oscuro: El boton cambia el atributo data-theme directamente en el html usando variables CSS en :root. Ademas usamos JSON.stringify y JSON.parse junto a localStorage para que si el usuario recarga la pagina o la cierra, su tema se quede guardado y no se resetee.
2. Menu hamburguesa responsivo: Para celulares y tablets el menu se oculta y aparece con un boton que va cambiando el atributo aria-expanded entre true y false para mantener la accesibilidad.
3. Buscador y filtro en tiempo real: En la parte de portafolio hay un input donde puedes escribir cualquier tecnologia (como Java, Redes, Flutter, SQL) y va filtrando las tarjetas al instante. No modifica el arreglo original, trabaja de forma inmutable usando una tuberia funcional encadenando .filter() con .map().
4. Modal con detalle tecnico de proyectos: Para que no sea solo una lista simple, cada tarjeta tiene su boton para abrir una ventana modal con rol dialog y aria-modal="true". Al hacer clic, JavaScript jala la arquitectura, el rol que tuve y los retos de ese proyecto sin recargar la pantalla. Tambien se puede cerrar presionando la tecla Escape.
5. Formulario de contacto interactivo: Al enviar el formulario interceptamos el evento con event.preventDefault() para que no se recargue la web. Valida en tiempo real mientras escribes (evento input), marcando los bordes en verde o rojo y mostrando mensajes de error si dejas campos vacios o pones un correo invalido.
6. Consumo asincrono con Fetch API: La seccion de actividad en GitHub consume directamente la API publica de repositorios de mi usuario (JosephCortez15) usando async/await dentro de un bloque try...catch. Maneja los 3 estados en la interfaz: primero muestra el mensaje de carga, si la respuesta es correcta (response.ok) pinta las tarjetas de los repositorios, y si falla algun codigo HTTP (404, 403, 500) muestra el mensaje de error correspondiente.

## Estructura de las carpetas
Siguiendo la separacion de responsabilidades de la materia, los archivos estan divididos así:
index.html: Toda la estructura con etiquetas semanticas de HTML5 (header, nav, main, section, article, aside, footer) y atributos WAI-ARIA.
css/styles.css: Todos los estilos ordenados con mobile-first, usando variables CSS en :root, reset universal con box-sizing: border-box, Flexbox para la navegacion y CSS Grid para la distribucion de las tarjetas y el layout.
js/main.js: Toda la logica en ES6+ separada en funciones claras para el tema, el menu, el filtro inmutable, el modal, el formulario y la llamada Fetch a la API.
assets/: Carpeta para recursos visuales e imagenes.
README.md: Documentacion del repositorio.

## Como probarlo de forma local
Si quieres correr el proyecto en tu maquina:
Clona el repositorio con:
1. git clone https://github.com/JosephCortez15/SIS214_ExamenPractico2_CortezJoseph.git
2. Entra a la carpeta del proyecto.
3. Abre el index.html directamente en el navegador o usando la extension Live Server en Visual Studio Code para probarlo en tiempo real.
Desarrollado por Joseph Wendell Hans Cortez Chura - 2026