function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
const elementID = document.getElementById('appendElement');
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let appendData = data.meals;
  console.log(appendData);
  return appendData.map(function(appendData) {
    let div = createNode('div');   
    let img = createNode('img');
    let span = createNode('span'); 
    img.src = appendData.strMealThumb;
    img.style = 'width:100%;float:left';
    span.innerHTML = `${appendData.strMeal}`;   
    span.style = 'float:left';
    append(div, img); 
    append(div, span); 
    append(elementID, div);

    const elementBtn = document.createElement('div'); 
        const btnInfo = `<button class="pull-right btn btn-sm btn-info" onclick ="ingredients('${appendData.idMeal}')"> Details </button>`;
        elementBtn.innerHTML = btnInfo; 
        div.appendChild(elementBtn);
  
  })
})
.catch(function(error) {
  console.log(error);
});
function ingredients(idMeal){
    const elementID = document.getElementById('appendElement');
    elementID.innerHTML = "";
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+idMeal; 
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    let ingDet = data.meals;
    console.log(ingDet);
        return ingDet.map(function(ingDet) {
            let div = createNode('div');   
            let img = createNode('img');
            let span = createNode('span');  
            let ingredientsTitle = createNode('h3');  
            let ingredientsDiv = createNode('div');  
            let ul = createNode('ul');  
            img.src = ingDet.strMealThumb;
            img.style = 'width:100%;float:left';
            span.innerHTML = `${ingDet.strMeal}`;   
            ingredientsTitle.innerHTML = `Ingredients`;   
            append(div, img); 
            append(div, span); 
            append(ingredientsDiv, ingredientsTitle);  
            for(i = 1; i<10;i++){  
                let li = createNode('li');  
                li.innerHTML = ingDet['strIngredient'+i]; 
                append(ul, li); 
            }
            append(ingredientsDiv, ul); 
            append(div, ingredientsDiv); 
            append(elementID, div);  
        })
    })
    .catch(function(error) {
         console.log(error);
    });
}