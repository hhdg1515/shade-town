import { sunglassesOptions, sunglasses } from './sunglasses.js';

const productDetailsEl = document.getElementById("productDetails");
const productImage = document.querySelector(".product-image"); // More specific selector
const productFrames = document.querySelector(".product-image_frame"); // More specific selector
const productLenses = document.querySelector(".product-image_lenses"); // More specific selector

let currentSunglasses = sunglasses; // Use a more descriptive variable name

function renderSunglasses(sunglasses) {
  const { model, lenses, frame } = sunglasses;
  const price = `$${model.price + lenses.price + frame.price}`;

  productDetailsEl.innerHTML = `
    <h1>${model.name}</h1>
    <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
    <p>${price}</p>`;   


  productImage.classList.replace(productImage.classList[1], model.cssClass);
  productFrames.classList.replace(productFrames.classList[1], frame.cssClass);
  productLenses.classList.replace(productLenses.classList[1], lenses.cssClass);
}

function highlightSelection(clickedItem) {
  const siblings = clickedItem.closest("ul").querySelectorAll("button");
  siblings.forEach((swatch) => swatch.classList.remove("selected"));
  clickedItem.classList.add("selected");
}

document.body.addEventListener("click", (event) => {
  const clickedItem = event.target;   

  // Update model
  if (clickedItem.classList.contains("product-thumb"))   
 {
    const currName = clickedItem.dataset.name;
    const chosenModel = sunglassesOptions.models.find((item) => item.name === currName);

    currentSunglasses = {
      model: chosenModel,
      ...currentSunglasses, // Update the rest of currentSunglasses
    };

    highlightSelection(clickedItem);
    renderSunglasses(currentSunglasses);
  }

  // Update colors for frames/lenses
  if (clickedItem.classList.contains("product-color-swatch")) {
    const currColor = clickedItem.dataset.color;   

    const colorType = clickedItem.closest("div").classList[0];

    let updatedSunglasses;
    if (colorType === "product-lenses") {
      const chosenLens = sunglassesOptions.lenses.find((lens) => lens.color === currColor);
      updatedSunglasses = {
        ...currentSunglasses,
        lenses: chosenLens,
      };
    } else if (colorType === "product-frames") {
      const chosenFrame = sunglassesOptions.frames.find((frame) => frame.color === currColor);
      updatedSunglasses = {
        ...currentSunglasses,
        frame: chosenFrame,
      };
    }

    if (updatedSunglasses) { // Update only if a valid option is chosen
      currentSunglasses = updatedSunglasses;
      highlightSelection(clickedItem);
      renderSunglasses(currentSunglasses);
    }
  }
});

renderSunglasses(currentSunglasses); // Render initial state
