document.addEventListener("DOMContentLoaded", function () {
  const collapsibles = document.querySelectorAll(".header");
  const collapsiblesArray = Array.from(collapsibles);

  console.log(collapsiblesArray);
  collapsiblesArray.forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("collapsible--expanded");
    });
  });
  console.log("Used");
});
