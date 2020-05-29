const characters = document.querySelectorAll('.characters .character');
const dropzones = document.querySelectorAll('.dropzone');

function log(message) {
  console.log(`> ${message}`);
}

function clone(toBeCloned) {
  const newObject = toBeCloned.cloneNode(true);

  newObject.addEventListener('dragstart', dragstart);
  newObject.addEventListener('dragend', dragend);

  return newObject;
}

function dragstart() {
  dropzones.forEach(dropzone => dropzone.classList.add('highlight'));

  this.classList.add('is-dragging');
}

function dragend() {
  dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));

  this.classList.remove('is-dragging');
}

/** Dropzone events  */
function dragover(e) {
  e.preventDefault();

  this.classList.add('over');

  const cardBeingDragged = document.querySelector('.is-dragging');
  
  this.querySelector('.characters-list').appendChild(cardBeingDragged);
}

function dragleave(e) {
  e.preventDefault();

  this.classList.remove('over');
}

function drop() {
  const cardBeingDragged = document.querySelector('.is-dragging');
  const cardBeingDraggedClone = clone(cardBeingDragged);
  
  cardBeingDraggedClone.classList.remove('is-dragging');

  document.querySelector('.characters').appendChild(cardBeingDraggedClone);

  this.classList.remove('over')
}

characters.forEach(character => {
  character.addEventListener('dragstart', dragstart);
  character.addEventListener('dragend', dragend);
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragover);
  dropzone.addEventListener('dragleave', dragleave);
  dropzone.addEventListener('drop', drop);
});

