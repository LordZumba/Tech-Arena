# TECH ARENA — Etapa 1

Proyecto web educativo de alfabetización digital.

## Ejecutar en Windows
1. Descomprime el ZIP.
2. Abre la carpeta `Tech-Arena` en Visual Studio Code.
3. Abre `index.html` con la extensión **Live Server** (clic derecho → Open with Live Server).
4. Registra un perfil de prueba y comienza en **Hardware Lab**.

## Reglas de progresión
- Hay 4 mundos y 12 misiones.
- Cada misión otorga 100 XP la primera vez que se completa. Repetirla no otorga XP adicional.
- El máximo es 1200 XP y el nivel máximo es 3.
- Hardware Lab está disponible al inicio. Los mundos siguientes se desbloquean al completar todas las misiones del mundo anterior.
- El progreso de esta versión se conserva en `localStorage` del navegador y del equipo donde se juega.

## Archivos principales
- `index.html`: estructura y pantallas.
- `styles.css`: diseño visual.
- `script.js`: misiones, progresión, experiencia y guardado local.
- `jspdf.umd.min.js`: biblioteca utilizada para generar el informe PDF.


## Etapa 2: preguntas e ilustraciones

- Las 12 misiones tienen ahora una ilustración contextual propia hecha con SVG integrado; no requieren internet ni archivos de imagen adicionales.
- Se ajustaron las alternativas incorrectas para que sean más plausibles y reflejen errores habituales, manteniendo la respuesta correcta definida en cada misión.
- Se mejoró la retroalimentación para explicar por qué una opción parece razonable pero no es la mejor decisión.
- Se conservan las 12 misiones, sus identificadores, las respuestas correctas, la progresión de mundos y el límite de 1,200 XP.

Para probar esta etapa, recorre cada mundo y abre sus tres misiones. Comprueba que cada una muestre una ilustración diferente y que al elegir una alternativa aparezca la explicación correspondiente.


## Etapa 3: navegación e interacción arcade

- `INSERT COIN` ahora es un botón real que abre el mundo de la próxima misión pendiente, igual que `ENTRAR A LA ARENA`.
- Las tarjetas muestran cuántas misiones se han completado en cada mundo.
- El contador de mundos abiertos se actualiza según el progreso; ya no muestra todos los mundos como disponibles desde el inicio.
- Los estados `DISPONIBLE`, `BLOQUEADO` y `COMPLETADO` se actualizan con el progreso guardado. Los botones de mundos bloqueados permanecen deshabilitados.
- Se añadieron nombres accesibles a botones de misiones y mundos, indicadores visibles al navegar con teclado y respeto por la preferencia de movimiento reducido del sistema.
- Volver al menú o al mundo no borra las misiones completadas ni la experiencia ya guardada. El progreso continúa almacenándose en el navegador de ese equipo.

### Prueba recomendada
1. Registra un perfil y comprueba que solo haya un mundo abierto.
2. Pulsa `INSERT COIN` y verifica que te lleve a Hardware Lab.
3. Completa una misión y vuelve al menú: debe aparecer `1 / 3 MISIONES` en Hardware Lab.
4. Completa las tres misiones de Hardware Lab: Cyber Defense debe desbloquearse.
5. Cierra y vuelve a abrir la página en el mismo navegador: el progreso debe mantenerse.


## Etapa 4: mapa explorable con WASD y flechas

- Se añadió un mapa interactivo con cuatro sectores conectados: Hardware Lab, Cyber Defense, Digital Creator y AI Arena.
- Puedes seleccionar un sector con clic, moverte con WASD o las flechas del teclado y entrar con Enter o con el botón del panel inferior.
- El panel de información muestra la descripción del sector, el avance de misiones y su estado. Los sectores bloqueados se pueden seleccionar para consultar qué falta, pero no permiten entrar antes de tiempo.
- El botón `ENTRAR A LA ARENA` y `INSERT COIN` llevan al mapa y seleccionan el mundo de la próxima misión pendiente.
- Se conservó la lista de tarjetas como acceso alternativo, junto con el sistema de XP, los mundos secuenciales, las 12 misiones y el guardado local existente.
- El mapa funciona sin imágenes externas: el recorrido, los efectos y los indicadores se dibujan con HTML, CSS y SVG.

### Prueba recomendada
1. Inicia sesión y pulsa `ENTRAR A LA ARENA`: el mapa debe quedar enfocado en Hardware Lab.
2. Usa WASD y las flechas para recorrer los cuatro sectores; el panel inferior debe actualizarse.
3. Selecciona Cyber Defense antes de completar Hardware Lab: debe indicar que está bloqueado y desactivar el botón de entrada.
4. Completa las tres misiones de Hardware Lab y vuelve al mapa: Cyber Defense debe aparecer disponible.
5. Comprueba también la selección con clic y la entrada mediante el botón del mapa.


## Etapa 5: personaje RPG arcade

- Se añadió un personaje pixel-art visible en el mapa.
- El personaje se desplaza por los caminos con W/A/S/D o las flechas; el movimiento queda limitado a los senderos del mapa.
- Al acercarse a un portal, se selecciona el mundo y se actualiza el panel de información.
- Los portales también se pueden seleccionar con el ratón, y el personaje aparece junto al portal seleccionado.
- Se agregaron detalles de terreno, árboles, rocas y cristales con una estética RPG retro.

Abre `index.html` con Live Server para jugar. En la pantalla principal, usa W/A/S/D o las flechas para recorrer los caminos y ENTER para acceder al mundo seleccionado.


## Etapa 6: exploración RPG mejorada

- El personaje tiene animación de pasos al moverse con WASD o las flechas.
- Se añadieron tres NPC con diálogos educativos. Acércate y pulsa **E** para pedir una pista.
- Se añadieron casas, letreros de orientación y ramales conectados a los caminos principales.
- Al completar una misión por primera vez aparece una celebración visual con destellos.
- El progreso, los niveles, las misiones y el desbloqueo secuencial de mundos se mantienen.

### Correcciones de mapa (hotfix tras pruebas visuales)
- La tecla `E` ya no depende de que el foco del teclado esté dentro de un elemento específico del mapa; se comprueba que el mapa esté visible y que no se esté escribiendo en un campo.
- Se eliminó el cierre automático del trazado principal que generaba una conexión diagonal no deseada.
- Los ramales secundarios ahora forman pequeñas conexiones de ida y vuelta con los caminos principales, en lugar de terminar sueltos.
- Se redujeron las tolerancias de movimiento para mantener al personaje más cerca del centro de los senderos.

## Etapa 7 — Ambiente RPG

- Los NPC tienen pequeñas animaciones de espera para que el mapa se sienta vivo.
- Al hablar con NOVA, BYTE o PIXEL, el aviso inferior cambia a un cuadro de diálogo con estilo RPG y muestra el nombre del personaje.
- Los letreros de los cuatro mundos se iluminan y elevan cuando el jugador se acerca.
- El cuadro de aviso presenta una indicación breve del letrero cercano; los diálogos permanecen visibles unos segundos para poder leerlos.
- Se respetan los controles, las misiones, el desbloqueo progresivo y el guardado del progreso existentes.

Para probar: acércate a un NPC y pulsa E; luego camina cerca de cada letrero y comprueba el resaltado. El movimiento y la apariencia final deben validarse en el navegador con Live Server.


## Etapa 8 — Personalidad y exploración

- NOVA, BYTE y PIXEL tienen varias líneas de diálogo con consejos y tonos diferenciados.
- La primera conversación con cada NPC registra un descubrimiento de exploración.
- Al hablar con los tres se muestra la insignia **Explorador de la Arena**. Esta recompensa es independiente de la XP, por lo que no altera el equilibrio de las misiones ni el desbloqueo de mundos.
- El registro de exploración se guarda localmente por perfil en el navegador.
- Se añadieron animaciones ambientales suaves a los cristales y árboles, además de un estilo especial para los mensajes de descubrimiento.

Para probarlo, inicia sesión, habla con NOVA, BYTE y PIXEL usando la tecla E y comprueba el contador de descubrimientos. Vuelve a hablar con cada personaje: sus líneas cambian y los descubrimientos no se duplican.


## Etapa 9 — Objetos secretos y colección

- Hay cinco objetos secretos colocados sobre distintos tramos del camino: chip, escudo digital, fragmento de código, cristal de energía y llave de datos.
- Acércate a un objeto y pulsa **E** para recogerlo. El objeto desaparece y aparece un aviso con una pista relacionada con tecnología.
- La colección muestra los objetos encontrados y el contador `n / 5`. Al completar la colección aparece un mensaje especial.
- Los objetos encontrados y los descubrimientos de NPC se guardan en `localStorage` por perfil en ese navegador. No alteran la XP ni el desbloqueo de mundos.
- Para probar desde cero, usa un perfil nuevo o borra únicamente la clave `techArenaExploration:<id-del-perfil>` en el almacenamiento local del navegador.


## Etapa 10 — Perfil de explorador

Esta versión añade un perfil visible en el mapa con el nombre del participante, resumen de progreso, título dinámico y cuatro insignias: Primer paso (primera misión), Amigo de la Arena (hablar con los tres NPC), Cazasecretos (recoger los cinco objetos) y Leyenda Tech (completar las 12 misiones). Los logros se calculan usando el progreso existente; no se alteran los requisitos de desbloqueo ni las recompensas de XP.

## Etapa 11 — Pantalla final de logros

Esta etapa cierra el recorrido de TECH ARENA con una presentación más visual del perfil:

- Barra de progreso para las cuatro insignias principales.
- Tarjeta de explorador con nombre, título actual, misiones completadas, secretos recogidos e insignias desbloqueadas.
- Botón **Descargar tarjeta PDF** para guardar una tarjeta personal y compartir los resultados al terminar la actividad.
- Animaciones breves al mostrar las insignias desbloqueadas, con respeto por la preferencia del sistema de reducir movimiento.

### Cómo probar la tarjeta

1. Abre `index.html` con Live Server e inicia sesión con un participante.
2. En el mapa, baja hasta **Perfil de explorador**.
3. Comprueba que el nombre, el título y los contadores coincidan con tu progreso.
4. Pulsa **Descargar tarjeta PDF** y abre el PDF generado.
5. Completa una misión, habla con los tres NPC y recoge los objetos para verificar que el progreso visual se actualiza.

La tarjeta PDF es un resumen de logros, no un certificado académico oficial. Los datos siguen las reglas de guardado local de este proyecto.
