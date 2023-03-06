$(function(){

  getData();

  function getData(){
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => showData(data.results[0]));
  }
    
  function showData(data){
    var item;
    for(var prop in data){
      if (data.hasOwnProperty(prop)) {
        if(typeof data[prop] == "object"){
          if(prop == "location"){
            item = $("#"+prop);
            item.text(locationGenerator(data[prop]));
          }
          showData(data[prop]);
        }
        else{
          if(data[prop] != null){
            //console.log(prop+": "+data[prop]);
            if(prop == "large"){
              $("img[id="+prop+"]").attr("src", data[prop]);
            }
            else if(prop=="gender"){
              genderGenerator(data[prop]);
            }
            else{
              item = $("#"+prop);
              item.text(data[prop]);
              //console.log(data[prop]);
            }
          }
        }
      }
    }
  }

  function locationGenerator(data){
    let result = "";
    for(var prop in data){
      if (data.hasOwnProperty(prop)) {
        if(typeof data[prop] != "object"){
          result += data[prop] + " ";
        }
        else{
          if(prop == "street"){
            result = locationGenerator(data[prop]);
            result += ", "
          }
        }
      }
    }
    return result;
  }

  function genderGenerator(data){
    console.log(data);
    let typed = $('.typed');
    if(data == "female"){
      typed.attr('data-typed-items',"Desarrolladora, Diseñadora, Freelancer");
    }
    console.log(typed);
  }


});