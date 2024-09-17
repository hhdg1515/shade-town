import {sunglassesOptions, sunglasses} from './sunglasses.js';

const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]

let sunglassesNew = ''

const setSunglasses=(sunglassesNew = sunglasses)=> {
    return sunglassesNew
}

function render(sunglassesNew) {
    
    const {model, lenses,frame}=sunglassesNew;
    
    const sunglassesNew = {
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
        }     
    }
    const price = `$${model.price + lenses.price + frame.price}`
    
  
    productDetailsEl.innerHTML = 
    `<h1>${model.name}</h1> 
    <p>Custom:${lenses.color}lenses,${frame.color}frames</p> 
    <p>${price}</p>`;
    
    const currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)
    
    const currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)
    
    const currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)
    
}

//Highlight current selection
const addHighlight=(clickedItem)=> {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected") 
            }) 
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        var siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected") 
            })
    }
    clickedItem.classList.add("selected") 
}


document.body.addEventListener("click", (event)=> {
    const clickedItem = event.target
    //if sunglassesNew defined take variable from updates 
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }
    
    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        const currName = clickedItem.dataset.name

        const modelOptions = sunglassesOptions.models.filter((item) => item.name === currName)[0]
        
        const {name, price, thumbImg, cssClass}=modelOptions;
        
        sunglassesNew = {
            model: {name,price,thumbImg,cssClass},
            ...sunglassesNew,
        }
       
        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
    
    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        const currColor = clickedItem.dataset.color
        
        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            const colorOptions = sunglassesOptions.lenses
            .filter((item) =>{item.color === currColor})[0]
            
            const {color, price, cssClass}= colorOptions;
        
            sunglassesNew = {
               ...sunglassesNew,
                lenses: {color,price,cssClass}     
            }
        } 
        
        //frames
        else {
            var colorOptions = sunglassesOptions.frames
            .filter((item) =>{item.color === currColor})[0]
            
            const {color, price, cssClass}=colorOptions;
            
            sunglassesNew = {
               ...sunglassesNew,
                frame: {color,price,cssClass}     
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)
