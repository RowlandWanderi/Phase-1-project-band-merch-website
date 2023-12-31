
// Code here
//add an event listener to the DOM that loads our products with their respective details
document.addEventListener("DOMContentLoaded", () => {
    

    enterAllProducts();
    enterAllProductDetails(1);

});
    
//create a function that fetches all our products from our server and display it on our pages top selling products container
//it returns products that I have a added an event listener such that when the image is clicked, the enterAllProductDetails(productID) function executes
 
 function enterAllProducts() {
   
    
     fetch(`https://bnadwagon.onrender.com/Tshirts`)
    .then(res => (res.json()))
    .then( ourTshirtArrayData => { 
        const card = document.getElementById('display-card');
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
              <button onClick="deleteProduct(${Tshirt.id})">Delete</button>
            </div>
            </li>`).join('')  
    })
} 
// create a function that returns the product details from our server after clicking the product image
function enterAllProductDetails(TshirtId){
  fetch(`https://bnadwagon.onrender.com/Tshirts/${TshirtId}`)
  .then(res => (res.json()))
  .then(Tshirt => {
      console.log(Tshirt);
      const productName = document.getElementById('selected-image-title');
      const productPrice = document.getElementById("selected-image-price");
      const productDescription = document.getElementById("selected-image-description");
      const productImage = document.getElementById("selected-image");
      const productReviews = document.getElementById("selected-image-reviews");
      const theReviewSection = document.getElementById("the-review-section");

      productName.innerHTML = Tshirt.name
      productPrice.innerHTML = `Ksh ${Tshirt.price}`
      productDescription.innerText = Tshirt.description
      productImage.src = Tshirt.image_url
      productReviews.innerHTML = Tshirt.reviews.map(review => `<li>${review}</li>`).join('');
      theReviewSection.innerHTML = `
      <h3>Review This Product</h3>
                <div id="review-selected-form">
                    <div class="mb-3">
                        <label  class="form-label">Email address</label>
                        <input type="email" placeholder="E.g johnsmith@rockon.com"class="form-control" id="client-Email" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Your review</label>
                        <textarea class="form-control" placeholder="Enter your review" id="client-review" rows="3"></textarea>
                    </div>
                    <button onClick="addingReview(${TshirtId})" type="submit" class="btn btn-primary">Submit</button>
                </div>
      `
  })
} 
//create a function that adds a new review to the reviews
function addingReview(TshirtId){
  const clientReview = document.getElementById("client-review").value;
  console.log(clientReview);
  let PatchRequest = () => {
    // sending PATCH request with fetch API in javascript
    fetch(`https://bnadwagon.onrender.com/Tshirts/${TshirtId}`, {
      method: "PATCH",	
        headers: {
        "Content-Type": "application/json"
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
        reviews: [clientReview]
        })
    })
        .then(resp => (resp.json()))
        .then(() =>{
          document.getElementById("selected-image-reviews").innerHTML += `<li>${clientReview}</li>`
        })
    };
    
    PatchRequest();
      
}
// add an event listener to the submitting product form that will post it to our webpage
const submitForm = document.getElementById("submit-product-form")
submitForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    console.log(submitForm);

    const name = document.getElementById("submit-product-name").value;
    const price = document.getElementById("submit-product-price").value;
    const image = document.getElementById("submit-product-image").value;
    const description = document.getElementById("submit-product-description").value;
    const review = document.getElementById("submit-product-review").value;
// use fetch to update the values to the backend
    let postRequest = () => {
      // sending POST request with fetch API in javascript
      fetch(`https://bnadwagon.onrender.com/Tshirts`, {
        method: "POST",	
          headers: {
          "Content-Type": "application/json"
          },
          // Fields that to be updated are passed
          body: JSON.stringify({
            name: name, 
            price: price,
            image_url: image,
            description: description,
            reviews:[review]
          }),
      })
          .then(resp => (resp.json()))
          .then(() =>{
            alert("Your product has been submited");
          })
      };
      
      postRequest();
//Reset the submitted form
      submitForm.reset();
  })
  //create a function that deletes a single product
  function deleteProduct(TshirtId){
    fetch(`https://bnadwagon.onrender.com/Tshirts/${TshirtId}`,{
      method:"DELETE"
    })
    .then(resp => (resp.json()))
    .then(() =>{
      alert("Your product has been deleted successfully");
    })
  }