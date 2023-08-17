const searchBtn=document.getElementById('search-btn');
const mealList=document.getElementById("meal");
const not=document.getElementById("not");
const tittle=document.getElementById("tittle");
const mealDetailsContent=document.querySelector(".meal-details-content");
const recipeCloseBtn=document.getElementById("recipe-close-btn");
addEventListener('change',getMealList);
searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    mealDetailsContent.parentElement.style.display="none";
})
  
function getMealList(){
    let searchInputTxt=document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response=>response.json())
    .then(data=>{
        let html="";
        if(data.meals){
            data.meals.forEach((meal)=>{
                html+=`
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>`;
            });
            tittle.style.display="block";
            mealList.classList.remove('notFound');
        }
        else{
            html="<h2>Sorry,We can't find any recipes</h2>";
            mealList.classList.add('notFound');
            tittle.style.display="none";
        }
        mealList.innerHTML=html;
    });
}
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>{
            getMealRecipeModal(data.meals)
        });
    }
}
function getMealRecipeModal(meal){
    meal=meal[0];
    let html=`
        <h2 class="recipe-tittle">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Intstructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Videos</a>
        </div>`;
        mealDetailsContent.innerHTML=html;
        mealDetailsContent.parentElement.style.display="block";
}