$(function(){

  getData();
/*
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

function getData() {
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => displayUser(data.results[0]));
}

function displayUser(user) {
  // Update image directly
  $('#large').attr('src', user.picture.large);

  // Update gender-specific content
  const typedElement = $('.typed');
  typedElement.attr('data-typed-items', 
    user.gender === 'female' ? "Desarrolladora, Diseñadora, Freelancer" : "Desarrollador, Diseñador, Freelancer"
  );

  // Update other fields using a mapping
  const fieldMapping = {
    'name': ['first', 'last'], // Combine first and last name
    'email': null,
    'location': ['street', 'city', 'state', 'country', 'postcode'] 
  };

  for (const [targetId, propPath] of Object.entries(fieldMapping)) {
    if (propPath) {
      const value = propPath.reduce((obj, prop) => obj?.[prop], user);
      $('#' + targetId).text(value || ''); // Handle missing values
    }
  }
}
*/
async function getData() {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    showData(data.results[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error appropriately, e.g., display an error message to the user
  }
}

function showData(data) {
  const itemCache = {}; // Store references to already found elements

  for (const prop in data) {
    if (!data.hasOwnProperty(prop)) continue;

    const value = data[prop];

    if (value === null) continue;

    if (typeof value === "object") {
      if (prop === "location") {
        const locationText = locationGenerator(value);
        updateElementText(prop, locationText);
      } else {
        showData(value);
      }
    } else {
      if (prop === "large") {
        updateImageSrc(prop, value);
      } else if (prop === "gender") {
        genderGenerator(value);
      } else {
        updateElementText(prop, value);
      }
    }
  }

  function updateElementText(id, text) {
    let item = itemCache[id];
    if (!item) {
      item = document.getElementById(id);
      itemCache[id] = item;
    }
    if (item) {
      item.textContent = text;
    }
  }

  function updateImageSrc(id, src) {
    const img = document.getElementById(id);
    if (img) {
      img.src = src;
    }
  }
}

function locationGenerator(data) {
  const addressParts = [];
  for (const prop in data) {
    if (!data.hasOwnProperty(prop)) continue;

    if (typeof data[prop] !== "object") {
      addressParts.push(data[prop]);
    } else if (prop === "street") {
      addressParts.push(locationGenerator(data[prop]));
    }
  }
  return addressParts.join(" ");
}

function genderGenerator(gender) {
  console.log(gender);
  const typed = document.querySelector('.typed');
  if (typed) {
    typed.dataset.typedItems = gender === "female"
      ? "Desarrolladora, Diseñadora, Freelancer"
      : ""; // Provide default items for male or other genders
  }
}

});