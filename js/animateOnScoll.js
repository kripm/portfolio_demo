let scroll =
    window.requestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
let elementsToShow = document.querySelectorAll(".show-on-scroll");

function loop() {
    elementsToShow.forEach(function (element) {
        let childElements = element.querySelectorAll(".child");
        if (isElementInViewport(element)) {
            childElements.forEach(boxes => {
                boxes.classList.add("is-visible");
            });
        } else { 
            childElements.forEach(boxes => {
                boxes.classList.remove("is-visible");
            });
        }
    });
    scroll(loop);
}

loop();

// literally stole it from StackOverflow. http://stackoverflow.com/a/7557433/274826.
// edited it so that if at least half of the element is in viewport, it will return true.
function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        !(Math.abs(rect.top) >= (rect.bottom / 2)) &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight + (window.innerHeight / 2) ||
                document.documentElement.clientHeight + document.documentElement.clientHeight / 2) &&
        rect.right <=
            (window.innerWidth ||
                document.documentElement.clientWidth)
    );
}
