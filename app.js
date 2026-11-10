"use strict";
(function () {
  const button = document.getElementById("shareMain");
  const status = document.getElementById("shareStatus");
  const switcher = document.getElementById("langSwitch");
  // Pass the channel label between languages without setting cookies.
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source");
  if (switcher && source && /^[a-z0-9_-]{1,40}$/i.test(source)) {
    const next = new URL(switcher.href, window.location.href);
    next.searchParams.set("source", source);
    switcher.href = next.toString();
  }
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
          text: document.documentElement.lang === "en"
            ? "Discover Márukai and its three official platforms."
            : "Conoce Márukai y sus tres plataformas oficiales.",
          url: shareUrl
        });
        status.textContent = document.documentElement.lang === "en"
          ? "Thanks for sharing Márukai."
          : "Gracias por compartir Márukai.";
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        status.textContent = document.documentElement.lang === "en"
          ? "Márukai link copied."
          : "Enlace de Márukai copiado.";
      } else {
        status.textContent = (document.documentElement.lang === "en"
          ? "Share this link: " : "Comparte este enlace: ") + shareUrl;
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
      status.textContent = "Comparte este enlace: " + shareUrl;
    }
  });
  // Optional share-station link copied in the currently selected language.
  const copyButton = document.getElementById("copyCampaignLink");
  const copyStatus = document.getElementById("copyCampaignStatus");
  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const link = new URL(window.location.href);
      link.search = "";
      link.hash = "";
      link.searchParams.set("source", "compartido");
      const value = link.toString();
      try {
        if (!navigator.clipboard || !window.isSecureContext) {
          copyStatus.textContent = value;
          return;
        }
        await navigator.clipboard.writeText(value);
        copyStatus.textContent = document.documentElement.lang === "en"
          ? "Campaign link copied. Share it with friends!"
          : "Enlace copiado. ¡Compártelo con tus amigos!";
      } catch (error) {
        copyStatus.textContent = value;
      }
    });
  }
})();
