//holder for images
var imgList;
var visualBuffer;
var totalClicks;

//constructor
var productImage = function(name, filename){
    this.shown = 0;
    this.clicks = 0;
    this.id = name;
    this.path = 'img/' + filename;
    imgList.push(this);
}

//render images in the image section
var renderImages = function(images){
    var imageContainer = document.getElementById('images');
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

    localStorage.setItem('visualBuffer', JSON.stringify(visualBuffer));
    // console.log(visualBuffer);
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
    if(totalClicks < 25){
        clearImages();
        var imgIndex = parseInt(eventObject.target.id);
        console.log(imgIndex);
        imgList[imgIndex].clicks++;
        totalClicks++;
        localStorage.setItem('totalClicks', totalClicks);
        localStorage.setItem('imgList', JSON.stringify(imgList));
        renderImages(chooseImages(3));
    } else{
        renderTotals();
    }
    // console.log(imgList[parseInt(eventObject.target.id)]);
}

var renderTotals = function(){
    var canvas = document.getElementById("totals");
    // if(canvas.getContext){
        var ctx = canvas.getContext('2d');
        console.log(ctx);
        var clickArray = [];
        var shownArray = [];
        var nameArray = [];
        for(var i = 0; i < imgList.length; i++){
            clickArray.push(imgList[i].clicks);
            shownArray.push(imgList[i].shown);
            nameArray.push(imgList[i].id);
        }
        var chartData = {
            labels: nameArray,
            datasets: [{
                label: 'clicks',
                data: clickArray,
                backgroundColor: '#DD0044',
                borderColor: '#DD0044',
                borderWidth: 1
            },
            {
                label: 'shown',
                data: shownArray,
                backgroundColor: '#0088AA',
                borderColor: '#0088AA',
                borderWidth: 1
            }]
        }
        var chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
        }

        var barChart = {
            type: 'horizontalBar',
            data: chartData,
            options: chartOptions,
        }

        var myChart = new Chart(ctx, barChart);
    // } else {
    //     var listContainer = canvas.appendChild(document.createElement('ul'));
    //     for(var i = 0; i < imgList.length; i++){
    //         var liEl = document.createElement('li');
    //         liEl.textContent = imgList[i].id + ' was shown ' +imgList[i].shown + ' times and was clicked ' + imgList[i].clicks + ' times.'
    //         listContainer.appendChild(liEl);
    //     }
    // }
}

visualBuffer = JSON.parse(localStorage.getItem('visualBuffer'));
if(visualBuffer){
    totalClicks = parseInt(localStorage.getItem('totalClicks'));
    imgList = JSON.parse(localStorage.getItem('imgList'));
    renderImages(visualBuffer);
} else{
    visualBuffer = [];
    totalClicks = 0;
    imgList = [];
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
    localStorage.setItem('imgList', JSON.stringify(imgList));
    localStorage.setItem('totalClicks', totalClicks);
    renderImages(chooseImages(3));
}
