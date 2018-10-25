//holder for images
var imgList = [];
var visualBuffer = [];
var totalClicks = 0;

//constructor
var productImage = function(name, filename){
    this.shown = 0;
    this.clicks = 0;
    this.id = name;
    this.path = 'img/' + filename;
    imgList.push(this);
}

//initialize images
new productImage('bag', 'bag.jpg');
new productImage('banana', 'banana.jpg');
new productImage('bathroom', 'bathroom.jpg');
new productImage('boots', 'boots.jpg');
new productImage('breakfast', 'breakfast.jpg');
new productImage('bubblegum', 'bubblegum.jpg');
new productImage('chair', 'chair.jpg');
new productImage('cthulhu', 'cthulhu.jpg');
new productImage('dog-duck', 'dog-duck.jpg');
new productImage('dragon', 'dragon.jpg');
new productImage('pen', 'pen.jpg');
new productImage('pet-sweep', 'pet-sweep.jpg');
new productImage('scissors', 'scissors.jpg');
new productImage('shark', 'shark.jpg');
new productImage('sweep', 'sweep.png');
new productImage('tauntaun', 'tauntaun.jpg');
new productImage('unicorn', 'unicorn.jpg');
new productImage('usb', 'usb.gif');
new productImage('water-can', 'water-can.jpg');
new productImage('wine-glass', 'wine-glass.jpg');


//render images in the image section
var renderImages = function(){
    var imageContainer = document.getElementById('images');
    var images = chooseImages(3);
    for(var i = 0; i < images.length; i++){
        var imgEl = document.createElement('img');
        imgEl.src = imgList[images[i]].path;
        imgEl.id = images[i];
        imgEl.addEventListener('click', picClickHandler);
        imageContainer.appendChild(imgEl);
    }

}

//chose and return the indices of a number of images in the images array
var chooseImages = function(num){
    var images = [];
    for(var i = 0; i < num; i++){
        var randomNum;
        do{
            randomNum = Math.floor(Math.random() * imgList.length);
        } while (visualBuffer.includes(randomNum));
        console.log(randomNum);

        imgList[randomNum].shown++;
        visualBuffer.push(randomNum);
        //images.push(imgList[i]);
        images.push(randomNum);
    }
    while(visualBuffer.length > num){
        visualBuffer.shift();
    }

    console.log(visualBuffer);
    return images;
}

//clear all images
var clearImages = function(){
    var imageContainer = document.getElementById('images');
    while(imageContainer.firstChild){
        imageContainer.removeChild(imageContainer.firstChild);
    }
}

var picClickHandler = function(eventObject){
    clearImages();
    if(totalClicks < 25){
        var imgIndex = parseInt(eventObject.target.id);
        console.log(imgIndex);
        imgList[imgIndex].clicks++;
    }
    totalClicks++;
    renderImages();
    console.log(imgList[parseInt(eventObject.target.id)]);
}

renderImages();