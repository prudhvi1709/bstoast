/* globals bootstrap */
let container;

export function bstoast(options) {
  if (typeof options === "string") options = { body: options };

  const {
    title = "Alert",
    body,
    color = "primary",
    append = true,
    timeout = 5000,
    icon,
    position = "top-0 end-0",
  } = options;

  if (!body) throw new Error("bstoast: body is required");
  if (typeof bootstrap == "undefined") throw new Error("bstoast: Bootstrap 5 is required");

  // Reset container if it exists but is not in the DOM
  if (container && !document.body.contains(container)) container = null;

  if (!container) {
    container = document.createElement("div");
    container.className = `toast-container position-fixed ${position} p-3`;
    document.body.appendChild(container);
  } else {
    container.className = `toast-container position-fixed ${position} p-3`;
  }

  if (!append) container.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = /* html */ `
    <div class="toast-header text-bg-${color}">
      ${icon ? `<i class="bi bi-${icon} me-2"></i>` : ""}
      <strong class="me-auto">${title}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">${body}</div>
  `;

  container.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast, { autohide: timeout !== false, delay: timeout });
  bsToast.show();
}
