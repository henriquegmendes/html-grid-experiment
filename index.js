const squaresClass = 'colored-div';

let currentRedElement;
let currentGreenElement;

function defineNewCoordinates(height, width, targetHeight, targetWidth) {
  const newCoordinates = {
    height: targetHeight,
    width: targetWidth,
  }

  if (targetHeight < height) {
    newCoordinates.height = targetHeight + 1
    return newCoordinates;
  }

  newCoordinates.height = 1
  if (targetWidth >= width) {
    newCoordinates.width = 1;
    return newCoordinates;
  }

  newCoordinates.width += 1;
  return newCoordinates
}

function action(height, width) {
  return function(event) {
    if (currentRedElement) {
      currentRedElement.style.backgroundColor = 'darkblue';
    }

    currentRedElement = event.currentTarget
    event.currentTarget.style.backgroundColor = 'red';

    const currentTargetCoordinates = event.currentTarget.getAttribute('id')
    let targetHeight = currentTargetCoordinates.split('-')[0]
    let targetWidth = currentTargetCoordinates.split('-')[1]

    const newCoordinates = defineNewCoordinates(height, width, +targetHeight, +targetWidth);

    const neighbor = document.getElementById(`${newCoordinates.height}-${newCoordinates.width}`);

    if (currentGreenElement && currentGreenElement !== currentRedElement) {
      currentGreenElement.style.backgroundColor = 'darkblue';
    }

    currentGreenElement = neighbor;
    neighbor.style.backgroundColor = 'green';
  }
}

function loadGrids(height, width, size) {

  const fatherOfAll = document.createElement('div');

  for (let i = 1; i <= height; i += 1) {
    const horizontalDiv = document.createElement('div');

    for (let j = 1; j <= width; j += 1) {
      const newDiv = document.createElement('div')
      newDiv.style.height = size;
      newDiv.style.width = size;
      newDiv.style.border = '1px solid red';
      newDiv.style.backgroundColor = 'darkblue';

      newDiv.setAttribute('id', `${i}-${j}`);
      newDiv.setAttribute('class', squaresClass);

      newDiv.onclick = action(height, width);

      horizontalDiv.appendChild(newDiv);
    }

    fatherOfAll.appendChild(horizontalDiv);
  }

  fatherOfAll.style.display = 'flex';

  document.body.appendChild(fatherOfAll);
}

loadGrids(5, 5, '200px');
