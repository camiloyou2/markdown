const markdownData = [
    "# Titulo 1\nEste es el contenido del **Título 1**. Puedes escribir en *Markdown* aquí.\n## Subtítulo 1.1\nMás contenido aquí.\n### Subsubtítulo 1.1.1\nContenido adicional.\n# Título 2\nEste es el contenido del **Título 2**. Incluye [enlaces](https://example.com) o imágenes.\n## Subtítulo 2.1\nOtro contenido.\n# Título 3\nEste es el contenido del **Título 3**. Markdown es muy **flexible** y fácil de usar.",
    "# Titulo 4\nContenido del **Título 4**.",
    "# Titulo 5\nContenido del **Título 5**.",
    "# Titulo 6\nContenido del **Título 6**.",
    "# Titulo 7\nContenido del **Título 7**.",
    "# Titulo 8\nContenido del **Título 8**.",
    "# Titulo 9\nContenido del **Título 9**.",
    "# Titulo 10\nContenido del **Título 10**.",
    "# Titulo 11\nContenido del **Título 11**.",
    "# Titulo 12\nContenido del **Título 12**.",
    "# Titulo 13\nContenido del **Título 13**.",
    "# Titulo 14\nContenido del **Título 14**.",
    "# Titulo 15\nContenido del **Título 15**.",
    "# Titulo 16\nContenido del **Título 16**.",
    "# Titulo 17\nContenido del **Título 17**.",
    "# Titulo 18\nContenido del **Título 18**.",
    "# Titulo 19\nContenido del **Título 19**.",
    "# Titulo 20\nContenido del **Título 20**."
];

// Crear una instancia del convertidor de Markdown a HTML
const converter = new showdown.Converter();
const html_seguido = []; // Array para almacenar el HTML convertido
const titleList = document.getElementById('title-list'); // Lista de títulos en la barra lateral
const contenedor = document.getElementById('markdown-content'); // Contenedor del contenido principal
let titleIndex = 0; // Índice único para los títulos

// Convertir cada entrada de Markdown a HTML y extraer títulos
markdownData.forEach(md => {
    // Convertir el texto de Markdown a HTML
    const html = converter.makeHtml(md);
    html_seguido.push(html);
    
    // Extraer los títulos y subtítulos de cada entrada de Markdown
    const titles = extractTitles(md);
    titles.forEach(title => {
        const listItem = document.createElement('li');
        const id = `title-${titleIndex++}`; // Crear un id único para cada título
        listItem.textContent = title.text;
        listItem.classList.add('title-item');
        listItem.dataset.id = id; // Añadir un id al dataset para identificación
        listItem.id = id; // Asignar el id al elemento <li>
        titleList.appendChild(listItem); // Añadir el elemento <li> a la lista de títulos
    });
});
// Función para normalizar texto eliminando acentos y caracteres especiales
function normalizeText(text) {
    return text
        .normalize("NFD") // Descompone caracteres Unicode en sus componentes
        .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos (acentos)
        .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales, excepto guiones y espacios
        .replace(/\s+/g, '-') // Reemplaza espacios por guiones
        .toLowerCase(); // Convierte todo a minúsculas
}

// Función para extraer títulos y subtítulos con IDs únicos y normalizados
function extractTitles(markdownText) {
    const headerRegex = /^(#+)\s+(.*)$/gm; // Expresión regular para encontrar todos los encabezados
    const matches = []; // Array para almacenar los encabezados encontrados
    let match;
    // Buscar todos los encabezados en el texto Markdown
    while ((match = headerRegex.exec(markdownText)) !== null) {
        const level = match[1].length; // Nivel del encabezado (número de #)
        const text = match[2]; // Texto del encabezado
        const normalizedText = normalizeText(text); // Normalizar el texto del encabezado
        const id = `title-${titleIndex}-${normalizedText}`; // Crear un id único para cada título
        matches.push({ level, text, id });
        titleIndex++; // Incrementar el índice para el próximo título
    }
    return matches; // Retornar los títulos extraídos
}

// Insertar el contenido HTML convertido en el contenedor
contenedor.innerHTML = html_seguido.join('');

// Modificar el HTML convertido para incluir los IDs de los títulos
document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3').forEach(header => {
    // Normaliza el texto del encabezado para usarlo como un id seguro en HTML
    const safeId = normalizeText(header.textContent.trim());
    header.id = safeId; // Asigna el ID normalizado al encabezado
});
// Manejar el clic en los elementos de la lista de títulos
titleList.addEventListener('click', (event) => {
    if (event.target && event.target.tagName === 'LI' && event.target.classList.contains('title-item')) {
        const titleId = event.target.dataset.id; // Obtener el id del título clickeado
        const clicked = document.getElementById(titleId); // Encontrar el elemento en la lista de títulos
       
        const listItems = document.querySelectorAll('#title-list li');
    
        // Recorrer cada elemento y remover la clase especificada
        listItems.forEach(item => {
            item.classList.remove('background');
        });
        clicked.classList.add('background');
        // Convertir el texto del título a un formato seguro para usar como id en HTML
        var updatedText = clicked.textContent.replace(/\s+/g, '-');

        
      
        // Buscar el encabezado en el contenido HTML
        const header = document.getElementById(normalizeText(updatedText.toLowerCase()));
        if (header) {
            // Hacer scroll al encabezado de forma suave
            header.scrollIntoView({ behavior: 'smooth' });
            const headers = document.querySelectorAll('#markdown-content h1, #markdown-content h2');
    
            // Recorrer cada elemento y remover la clase 'background'
            headers.forEach(header => {
                header.classList.remove('color');
            });
            header.classList.add('color');
        }
         // Agregar la clase 'highlight' al encabezado actual
       

    }
});
