import {sunglassesOptions, sunglasses} from './sunglasses.js';

// Updated from var to Const
const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

// Added Modal Code
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementsByClassName('close')[0];

// Open modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  
  // Close modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

// Updated from var to let
let sunglassesNew = ''

// updated to an arrow function
 const setSunglasses = (sunglassesNew = sunglasses) => {
    return sunglassesNew
}

// Arrow Function
const render = (sunglassesNew) => {
    // Destructered
    const { model, lenses, frame } = sunglassesNew;
  
    // updated from var to const
    const updatedSunglasses = {
      model: {
        name: model.name,
        price: model.price,
        thumbImg: model.thumbImg,
        cssClass: model.cssClass,
      },
      lenses: {
        color: lenses.color,
        price: lenses.price,
        cssClass: lenses.cssClass,
      },
      frame: {
        color: frame.color,
        price: frame.price,
        cssClass: frame.cssClass,
      },
    };
  
    // updated from var to const
    const price = `$${model.price + lenses.price + frame.price}`;
  
    productDetailsEl.innerHTML = `
      <h1>${model.name}</h1>
      <p>Custom: ${lenses.color} lenses, ${frame.color} frames</p>
      <p>${price}</p>
    `;
  
    // udpated from var to const
    const currClass = productImage.classList[1];
    productImage.classList.replace(currClass, updatedSunglasses.model.cssClass);
    //udpated from var to const
    const currFramesClass = productFrames.classList[1];
    productFrames.classList.replace(currFramesClass, updatedSunglasses.frame.cssClass);
    //udpated from var to const
    const currLensesClass = productLenses.classList[1];
    productLenses.classList.replace(currLensesClass, updatedSunglasses.lenses.cssClass);
  };
  

//Highlight current selection
// Updated to an arrow function
const addHighlight = (clickedItem) => {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        const siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", (event) => {
    const clickedItem = event.target;
  
    // If sunglassesNew is not defined, use original sunglasses object
    const updatedSunglasses = sunglassesNew || sunglasses;
  
    // Update model
    if (clickedItem.classList.contains("product-thumb")) {
      const currName = clickedItem.dataset.name;
      const modelOptions = sunglassesOptions.models.find((item) => item.name === currName);
  
      const { name, price, thumbImg, cssClass } = modelOptions;
  
      sunglassesNew = {
        model: {
          name,
          price,
          thumbImg: updatedSunglasses.model.thumbImg,
          cssClass,
        },
        lenses: {
          color: updatedSunglasses.lenses.color,
          price: updatedSunglasses.lenses.price,
          cssClass: updatedSunglasses.lenses.cssClass,
        },
        frame: {
          color: updatedSunglasses.frame.color,
          price: updatedSunglasses.frame.price,
          cssClass: updatedSunglasses.frame.cssClass,
        },
      };
  
      addHighlight(clickedItem);
      setSunglasses(sunglassesNew);
      render(sunglassesNew);
    }
  
    // Update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
      const currColor = clickedItem.dataset.color;
  
      if (clickedItem.closest("div").classList[0] === "product-lenses") {
        const colorOptions = sunglassesOptions.lenses.find((item) => item.color === currColor);
  
        const { color, price, cssClass } = colorOptions;
  
        sunglassesNew = {
          model: {
            name: updatedSunglasses.model.name,
            price: updatedSunglasses.model.price,
            thumbImg: updatedSunglasses.model.price,
            cssClass: updatedSunglasses.model.cssClass,
          },
          lenses: {
            color,
            price,
            cssClass,
          },
          frame: {
            color: updatedSunglasses.frame.color,
            price: updatedSunglasses.frame.price,
            cssClass: updatedSunglasses.frame.cssClass,
          },
        };
      } else {
        const colorOptions = sunglassesOptions.frames.find((item) => item.color === currColor);
  
        const { color, price, cssClass } = colorOptions;
  
        sunglassesNew = {
          model: {
            name: updatedSunglasses.model.name,
            price: updatedSunglasses.model.price,
            thumbImg: updatedSunglasses.model.price,
            cssClass: updatedSunglasses.model.cssClass,
          },
          lenses: {
            color: updatedSunglasses.lenses.color,
            price: updatedSunglasses.lenses.price,
            cssClass: updatedSunglasses.lenses.cssClass,
          },
          frame: {
            color,
            price,
            cssClass,
          },
        };
      }
  
      addHighlight(clickedItem);
      setSunglasses(sunglassesNew);
      render(sunglassesNew);
    }
  });
  

render(sunglasses)
