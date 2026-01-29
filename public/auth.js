$("#commitRegister").click(async () => { 
  const userName = $("#inputUser").val();
  const passFirst = $("#inputPassFirst").val();
  const passSecond = $("#inputPassSecond").val();
  const result = await addUser({userName, passFirst, passSecond});
  console.log(result);
  
});

$("#commitLogin").click(async () => { 
  const userName = $("#inputUser").val();
  const passFirst = $("#inputPass").val();
  const result = await logUser({userName, passFirst});
  console.log(result);
  
});