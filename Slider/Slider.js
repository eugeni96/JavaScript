/**
 * Created by Eugen on 21.10.2015.
 */

var Slider = function(sliderDiv, numOfItemsInWindow, slideTime) {

    var items = sliderDiv.querySelectorAll(".item");

    var itemWidth = items[0].clientWidth;

    var numberOfItems = items.length;

    var currentItemIndex = 0;

    var startWindowIndex = 0;

    var wrapper = sliderDiv.querySelector(".wrapper");
    var leftArrow = sliderDiv.querySelector('.leftArrow');
    var rightArrow = sliderDiv.querySelector('.rightArrow');

    var animate = function(draw, duration, func) {

        var start = performance.now();

        requestAnimationFrame(function animateSlider() {
            var timePassed = performance.now() - start;
            if (timePassed > duration)
                timePassed = duration;

            var timeFraction = timePassed / duration;
            draw(func(timeFraction));

            if (timePassed < duration) {
                requestAnimationFrame(animateSlider);
            }
        });
    };

    var easeInOut = function (progress) {
            return Math.cbrt(progress);
    };

    var moveWrapperLeft = function() {
        var i = startWindowIndex;
        animate(function(progress) {
            wrapper.style.left = - i * itemWidth - progress * itemWidth + "px";
        }, slideTime, easeInOut);
        startWindowIndex++;
    };

    var moveCursorLeft = function(){
        items[currentItemIndex].classList.remove('selected');
        currentItemIndex--;
        items[currentItemIndex].classList.add('selected');
    };

    var moveWrapperRight = function() {
        var i = startWindowIndex;
        animate(function(progress) {
            wrapper.style.left = - i * itemWidth + progress * itemWidth + "px";
        }, slideTime, easeInOut);
        startWindowIndex--;
    };

    var moveCursorRight = function() {
        items[currentItemIndex].classList.remove('selected');
        currentItemIndex++;
        items[currentItemIndex].classList.add('selected');
    };

    var leftArrowOnClick = function () {
        if(currentItemIndex > startWindowIndex) {
            moveCursorLeft();
        }
        else {
            if(startWindowIndex > 0) {
                moveWrapperRight();
                setTimeout(function () {
                    moveCursorLeft();
                },slideTime);
            }
        }

    };

    var rightArrowOnClock = function() {
        if(currentItemIndex < startWindowIndex + numOfItemsInWindow -1) {
            moveCursorRight();
        }
        else {
            if(startWindowIndex + numOfItemsInWindow < numberOfItems) {
                moveWrapperLeft();
                setTimeout(function () {
                    moveCursorRight();
                }, slideTime);
            }
        }

    };

    leftArrow.addEventListener('click', leftArrowOnClick);
    rightArrow.addEventListener('click', rightArrowOnClock);

};

var slider = new Slider(document.querySelector('.slider'), 3, 1000);







