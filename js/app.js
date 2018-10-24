//holder for images
var imgList = [];
var visualBuffer = [];

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
        imgEl.src = images[i].path;
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

        visualBuffer.shift(randomNum);
        //images.push(imgList[i]);
        images.push(imgList[randomNum]);
    }
    if(visualBuffer.length > 2 * num){
        for(var i = 0; i< num; i++){
            visualBuffer.pop();
        }
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

renderImages();