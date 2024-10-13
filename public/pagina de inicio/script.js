document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    alert(`¡Hola, ${nombre}! Gracias por enviar tu nombre.`);
});
