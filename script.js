const $ = (element) => document.getElementById(element);

function renderData(data) {
  const $container = $("results-list");
  const $template = $("result-template");

  /* clone the template */
  const clonedTemplate = $template.content.cloneNode(true);
  const $newResult = clonedTemplate.getElementById("category-result");
  const $newImage = clonedTemplate.getElementById("category-img");
  const $newCategory = clonedTemplate.getElementById("category");
  const $newScore = clonedTemplate.getElementById("category-score");

  /* Fill the template with the json values */
  $newResult.classList.add(`${data.category.toLowerCase()}`);
  $newImage.setAttribute("src", data.icon);
  $newCategory.textContent = data.category;
  $newScore.textContent = data.score;

  $container.appendChild($newResult);
}

const getData = async function () {
  const $averageResult = $("average-result");
  const res = await fetch("data.json");
  const data = await res.json();

  const scores = data.map((data) => data.score);
  const average = Math.round(
    scores.reduce((acc, curr) => acc + curr / scores.length, 0)
  );

  data.forEach((data) => renderData(data));
  $averageResult.textContent = average;
};

getData();
