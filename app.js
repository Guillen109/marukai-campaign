"use strict";
(function () {
  const button = document.getElementById("shareMain");
  const status = document.getElementById("shareStatus");
  if (!button || !status) return;
  button.addEventListener("click", async () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("source", "compartido");
    const shareUrl = url.toString();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Márukai: Clash of the Yayas",
          text: "Conoce Márukai y sus tres plataformas oficiales.",
          url: shareUrl
        });
        status.textContent = "Gracias por compartir Márukai.";
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        status.textContent = "Enlace de Márukai copiado.";
      } else {
        status.textContent = "Comparte este enlace: " + shareUrl;
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
      status.textContent = "Comparte este enlace: " + shareUrl;
    }
  });
})();
