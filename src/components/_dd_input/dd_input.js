// Public interface

window.modules.dd_input = {
  collapse: collapse,
  getChecked: getChecked,
  addObserver: addObserver,
}

/// public impl
function collapse(element /*dd-input*/){
  dropdown_collapse(element)
}

function getChecked(element /*dd-input*/) {  
  return element.nextSibling.checked
}


/* functional observer yet
  function observer(element, checked:bool) {}
*/
function addObserver(element /*dd-input*/, observer) {
  if(element.observers === undefined)
    element.observers = []
  element.observers[element.observers.length] = observer
}

function notify(element /*dd-input*/, checked) {
  var obs = element.observers === undefined ? [] : element.observers
  
  for(i = 0; i < obs.length; i++) {
    obs[i](element, checked)
  }
}


///////////////////// 
// Private



function dropdown_expand(element /*dd-input*/) {
  var input = element
  input.classList.remove('input-border');
  input.classList.add('input-border-expanded');

  var pic = input.querySelector('.ico');
  pic.classList.remove('dd-pic-collapsed');
  pic.classList.add('dd-pic-expanded');

  var checkbox = input.nextSibling
  checkbox.checked = true;

  notify(element, true);
}

function dropdown_collapse(element) {

  if(!element.classList.contains("dd-always-expanded")) {
    var input = element;
    input.classList.remove('input-border-expanded');
    input.classList.add('input-border');

    var pic = input.querySelector('.ico');
    pic.classList.remove('dd-pic-expanded');
    pic.classList.add('dd-pic-collapsed');
    
    var checkbox = element.nextSibling;
    checkbox.checked = false;
    
    notify(element, false);
  }
}

function dropdown_toggle(element) {
  var checkbox = element.nextSibling 
  if(!checkbox.checked) dropdown_expand(element);
  else dropdown_collapse(element);
}

// handlers
function keyboard_handler(e) { 
  if (e.key == " " && (e.target.classList.contains("ico") || 
                       !e.target.classList.contains("dd-always-expanded"))
      )
    dropdown_toggle(getParentElementByClassName(e.target, "dd-input")) 
}

function onclick_handler(e) {
  dropdown_toggle(getParentElementByClassName(e.target, "dd-input")) 
}


function attachHandlers() {
  inputs = document.getElementsByClassName("dd-input");
  var i;
  for(i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', onclick_handler)
    //inputs[i].onclick = onclick_handler
    inputs[i].onkeydown = keyboard_handler
  }

}

window.addEventListener("load", attachHandlers);

var getParentElementByClassName = window.gservice.getParentElementByClassName

