$(".menu-toggle").click(function(e) {
	e.preventDefault();
	$("#menu").toggleClass("active");
});

$(".desplegar-busqueda").click(function(e) {
	e.preventDefault();
	$("#despliegue-busqueda").toggleClass("active");
	$(".desplegar-busqueda").toggleClass("invertir");
});