// Code here
document.addEventListener("DOMContentLoaded", () => {
    

    enterAllProducts()
    enterAllProductDetails(1)

});
    
//create a function that fetches all our products from our server and display it on our pages top selling products container
//it returns products that I have a added an event listener such that when clicked, the enterAllProductDetails(productID) function executes
 
 function enterAllProducts() {
   
    
     fetch(`http://localhost:3000/Tshirts`)
    .then(res => (res.json()))
    .then( ourTshirtArrayData => { 
        const card = document.getElementById('display-card')
        card.innerHTML = ourTshirtArrayData.map(Tshirt => `<li>
        <a href="#reviewing-container">
        <img id="displayed-product-image" onClick="enterAllProductDetails(${Tshirt.id})" src=${Tshirt.image_url} class="card-img-top" alt="loading">
        </a>
            <div class="card-body">
              <h5 id ="displayed-product-title" class="card-title">${Tshirt.name}</h5>
              <p id ="displayed-product-description"class="card-text">${Tshirt.description}</p>
              <p id="displayed-product-price"class="card-text">Ksh ${Tshirt.price}</p>
              <h5>Client Reviews</h5>
              <ul id ="displayed-product-reviews">
              ${Tshirt.reviews.map(review => `<li>${review}</li>`).join('')};
              </ul>
            </div>
            </li>`).join('')  
    })
} 
// create a function that returns the product details from our server after clicking the product image
function enterAllProductDetails(TshirtId){
  fetch(`http://localhost:3000/Tshirts/${TshirtId}`)
  .then(res => (res.json()))
  .then(Tshirt => {
      console.log(Tshirt)
      const productName = document.getElementById('selected-image-title')
      const productPrice = document.getElementById("selected-image-price")
      const productDescription = document.getElementById("selected-image-description")
      const productImage = document.getElementById("selected-image")
      const productReviews = document.getElementById("selected-image-reviews")

      productName.innerHTML = Tshirt.name
      productPrice.innerHTML = `Ksh ${Tshirt.price}`
      productDescription.innerText = Tshirt.description
      productImage.src = Tshirt.image_url
      productReviews.innerHTML = Tshirt.reviews.map(review => `<li>${review}</li>`).join('');
      
  })
} 
//create a function that adds a new review to the reviews
function addingReview(){
  const clientReview = document.getElementById("client-review").value
      document.getElementById("selected-image-reviews").innerHTML += `<li>${clientReview}</li>`
}

//added an event listener to describe what happens when the user input is submitted

const reviewForm = document.querySelector("form#review-selected-form");

reviewForm.addEventListener("submit", (e) => {
e.preventDefault();
console.log("reviewed");
const clientReview = document.getElementById("client-review").value


console.log(clientReview);
let PatchRequest = () => {
  // sending PATCH request with fetch API in javascript
  fetch(`http://localhost:3000/Tshirts`, {
    method: "PATCH",	
      headers: {
      "Content-Type": "application/json"
      },
      // Fields that to be updated are passed
      body: JSON.stringify({
      reviews: clientReview
      })
  })
      .then(resp => (resp.json()))
      .then( addingReview())
  };
  
  PatchRequest();
  reviewForm.reset()
})