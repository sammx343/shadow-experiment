(function createTextShadow() {
  let heroElement = document.getElementById("hero-shadow");
  let lightBallElement = document.getElementById("shadow-light-ball");
  let shadowOverlay = document.getElementById("shadow-overlay");

  const containerWidth = heroElement.offsetWidth;
  const containerHeight = heroElement.offsetHeight;

  const shadowStyles = {
    textShadow: "textShadow",
    boxShadow: "boxShadow"
  };

  let shadowElements = [
    {
      el: document.getElementById("shadow-text"),
      property: shadowStyles.textShadow
    },
    {
      el: document.getElementById("shadow-text2"),
      property: shadowStyles.textShadow
    },
    {
      el: document.getElementById("shadow-container-1"),
      property: shadowStyles.boxShadow
    },
    {
      el: document.getElementById("shadow-container-2"),
      property: shadowStyles.boxShadow
    }
  ];

  heroElement.addEventListener("mousemove", event => {
    shadowElements.forEach(element => {
      //Element central position relative to parent
      const shadowPositionX =
        element.el.offsetLeft + element.el.offsetWidth / 2;

      const shadowPositionY =
        element.el.offsetTop + element.el.offsetHeight / 2;

      shadowEvent(
        element.el,
        element.property,
        shadowPositionX,
        shadowPositionY,
        event
      );
    });

    createSphere(event);
  });

  function createSphere(event) {
    let elementStartX = 0;
    let elementStartY = heroElement.offsetTop;

    let elementEndX = heroElement.offsetWidth;
    let elementEndY = heroElement.offsetHeight;

    let mouseX = event.pageX;
    let mouseY = event.pageY;

    const mouseLeaveFactor = 30;

    if (
      mouseX > elementStartX + mouseLeaveFactor &&
      mouseX < elementEndX - mouseLeaveFactor &&
      mouseY > elementStartY + mouseLeaveFactor &&
      mouseY < elementStartY + elementEndY - mouseLeaveFactor
    ) {
      console.log("1")
      shadowOverlay.style.opacity = 0.6;
      lightBallElement.style.opacity = 0.8;
      lightBallElement.style.width = "20px";
      lightBallElement.style.height = "20px";
      lightBallElement.style.left = mouseX;
      lightBallElement.style.top = mouseY - heroElement.offsetTop;
      heroElement.style.cursor = "none";
    } else {
      console.log("2")
      shadowOverlay.style.opacity = 0.9;
      lightBallElement.style.opacity = 0;
      lightBallElement.style.width = 0;
      lightBallElement.style.height = 0;
    }
  }

  function shadowEvent(
    element,
    elementProperty,
    shadowPositionX,
    shadowPositionY,
    event
  ) {
    let mouseRelativePositionX = event.pageX;
    let mouseRelativePositionY = event.pageY - heroElement.offsetTop;

    let shadowPercentageMultiplier = 10;

    if (elementProperty === shadowStyles.textShadow) {
      shadowPercentageMultiplier = 20;
    } else if (elementProperty === shadowStyles.boxShadow) {
      shadowPercentageMultiplier = 50;
    }

    let mouseParentPercentageX =
      ((shadowPositionX - mouseRelativePositionX) / containerWidth) *
      shadowPercentageMultiplier;

    let mouseParentPercentageY =
      ((shadowPositionY - mouseRelativePositionY) / containerHeight) *
      shadowPercentageMultiplier;

    let blur =
      (Math.abs(mouseParentPercentageX) + Math.abs(mouseParentPercentageY)) / 2;

    element.style[
      elementProperty
    ] = `${mouseParentPercentageX}px ${mouseParentPercentageY}px ${blur}px black`;
  }
})();
