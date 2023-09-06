import $ from "jquery";

const $h1 = $("<h1>").addClass(["text-white", "fw-bold"]).text("The Weather");
const $header = $("<header>").addClass(["d-flex", "align-items-center", "justify-content-center"]).append($h1);

const $container = $("<main>").addClass(["container-fluid"]);

$("body").append($header, $container);
