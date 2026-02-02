$("#commitLogin").click(async () => { 

  const username = $("#inputUser").val();
  const password = $("#inputPass").val();
  
  const logged = await login({username, password});

  if ( logged["status"] ) {
    localStorage.setItem('accessToken', logged["accessToken"]);
    localStorage.setItem('refreshToken', logged["refreshToken"]);
    localStorage.setItem('username', logged["username"]);

    window.location.href = `/battle?token=${encodeURIComponent(logged["accessToken"])}`;

  } else {
    infoToast(`Ops`,`${logged["result"]}`); 
  }

});

$("#commitRegister").click(async () => { 

  const username = $("#inputUser").val();
  const password = $("#inputPassFirst").val();
  const passConfirm = $("#inputPassSecond").val();
  
  const registered = await register({username, password, passConfirm});
  
  if ( registered["status"] ) {

    $("#inputUser").empty();
    $("#inputPassFirst").empty();
    $("#inputPassSecond").empty();
    infoToast(`Ok`,`${registered["result"]}`);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);

  } else {
    infoToast(`Ops`,`${registered["result"]}`);

  }

});
