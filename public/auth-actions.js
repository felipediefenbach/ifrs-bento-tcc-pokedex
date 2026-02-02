async function login(fulldata) {

  try {
    const response = await $.ajax({
      type: "POST",
      url: "/auth/login",
      data: JSON.stringify(fulldata),
      contentType: "application/json",
    });

    return response;

  } catch (error) {
    return {
      result: error,
      status: "error",
    };
  }
}

async function register(fulldata) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/auth/register",
      data: JSON.stringify(fulldata),
      contentType: "application/json",
    });

    return response;

  } catch (error) {
    return {
      result: error,
      status: "error",
    };
  }
}

function infoToast(title, message) {
  const TOAST = `
    <div id="infoToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="favicon.png" class="rounded me-2" style="width: 32px; height: 32px;" alt="">
        <strong class="me-auto">${title}</strong>
        <small>Info</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;

  $("#infoToast").remove();
  $(".toast-container").append(TOAST);
  $("#infoToast").toast("show");
}