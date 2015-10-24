/**
 * Created by Eugen on 21.10.2015.
 */

var Slider = function(sliderDiv, numOfItemsInWindow) {

    var items = sliderDiv.querySelectorAll(".item");

    var itemWidth = items[0].clientWidth;
    var windowWidth = itemWidth * numOfItemsInWindow;

    var numberOfItems = items.length;

    var currentItemIndex = 0;

    var startWindowIndex = 0;

    var wrapper = sliderDiv.querySelector(".wrapper");
    var leftArrow = sliderDiv.querySelector('.leftArrow');
    var rightArrow = sliderDiv.querySelector('.rightArrow');

    var animate = function(draw, duration) {

        var start = performance.now();

        requestAnimationFrame(function animateSlider() {
            var timePassed = performance.now() - start;
            if (timePassed > duration)
                timePassed = duration;

            draw(timePassed);

            if (timePassed < duration) {
                requestAnimationFrame(animateSlider);
            }
        });
    };

    var moveLeft = function() {
        var i = startWindowIndex;
        animate(function(timePassed) {
            wrapper.style.left = - i * itemWidth - timePassed * 0.5 + "px";
        }, 800);
        startWindowIndex++;
    };

    var moveRight = function() {
        var i = startWindowIndex;
        animate(function(timePassed) {
            wrapper.style.left = - i * itemWidth + timePassed * 0.5 + "px";
        }, 800);
        startWindowIndex--;
    };

    var leftArrowOnClick = function () {
        if(currentItemIndex > startWindowIndex)
        {
            items[currentItemIndex].classList.remove('selected');
            currentItemIndex--;
            items[currentItemIndex].classList.add('selected');
        }
        else
        {
            if(startWindowIndex > 0) {
                moveRight();
                setTimeout(function () {
                    items[currentItemIndex].classList.remove('selected');
                    currentItemIndex--;
                    items[currentItemIndex].classList.add('selected');
                },800);
            }
        }

    };

    var rightArrowOnClock = function() {
        if(currentItemIndex < startWindowIndex + numOfItemsInWindow -1)
        {
            items[currentItemIndex].classList.remove('selected');
            currentItemIndex++;
            items[currentItemIndex].classList.add('selected');
        }
        else
        {
            if(startWindowIndex + numOfItemsInWindow < numberOfItems) {
                moveLeft();
                setTimeout(function () {
                    items[currentItemIndex].classList.remove('selected');
                    currentItemIndex++;
                    items[currentItemIndex].classList.add('selected');
                }, 800);
            }
        }

    };

    leftArrow.addEventListener('click', leftArrowOnClick);
    rightArrow.addEventListener('click', rightArrowOnClock);

};

var slider = new Slider(document.querySelector('.slider'), 3);







