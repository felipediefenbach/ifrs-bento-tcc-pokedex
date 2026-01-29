async function addUser(fulldata) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/auth/add",
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

async function LogUser(fulldata) {
  try {
    const response = await $.ajax({
      type: "POST",
      url: "/auth/log",
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