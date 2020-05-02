function dropdown_show(element) {
  var input = element.querySelector('.dd-input');
  input.classList.remove('input-border');
  input.classList.add('input-border-expanded');

  var pic = input.querySelector('.ico');
  pic.classList.remove('dd-pic-collapsed');
  pic.classList.add('dd-pic-expanded');

  var content = element.querySelector('.dd-content');
  content.style.width = content.parentElement.offsetWidth + "px";
  content.hidden = false;
}

function dropdown_hide(element) {
  var input = element.querySelector('.dd-input');
  input.classList.remove('input-border-expanded');
  input.classList.add('input-border');

  var pic = input.querySelector('.ico');
  pic.classList.remove('dd-pic-expanded');
  pic.classList.add('dd-pic-collapsed');
  
  var content = element.querySelector('.dd-content');
  content.hidden = true;

}

function dropdown_toggle(element) {
  var content = element.querySelector('.dd-content');
  if(content.hidden) dropdown_show(element);
  else dropdown_hide(element);
}

function dropdown_hideall(e) {
  var drops = document.getElementsByClassName("dd-content");
  for(var i = 0; i < drops.length; i++)
    dropdown_hide(drops[i].parentElement);
}

// dropdown behaviour
function getType(element /*dropdown*/) {
  var content = element.getElementsByClassName("dd-content")[0]
  var type
  if(content.classList.contains("guests")) type = "guests"
  else if(content.classList.contains("rooms")) type = "rooms"

  return type
}

function increase(element /* dd-row */) {
  var num_element = element.querySelector(".dd-row-num")
  var v = parseInt(num_element.innerHTML)
  num_element.innerHTML = v<100 ? v + 1 : 100 
  show_clear_butt(getParentElementByClassName(element, "dropdown"))
}

function decrease(element /* dd-row */) {
  var num_element = element.querySelector(".dd-row-num")
  var v = parseInt(num_element.innerHTML)
  num_element.innerHTML = v>0 ? v - 1 : 0 
  show_clear_butt(getParentElementByClassName(element, "dropdown"))
}

function clear_all(element /*dropdown*/) {
  var num_elements = element.
                      querySelector(".dd-content").
                      querySelectorAll(".dd-row")
  var i
  for(i = 0; i < num_elements.length; i++) 
    num_elements[i].querySelector(".dd-row-num").innerHTML = 0
  show_clear_butt(element)
}

function apply_dd(element /*dropdown*/) {
  var input = element.getElementsByClassName("dd-input-text")[0]
  dropdown_hide(element)

  var type = getType(element), val
  var arr  = getQuantityArray(element)
  if(type == "guests") val = arr[0] + arr[1] + arr[2] + " гостя"
  else if(type == "rooms") val = arr[0] + " спальни, " + arr[1] + " кровати, " + arr[2] + " туалeта"
  input.value = val  
}

function getQuantityArray(element /*dropdown*/) {
  var num_elements = element.
                      querySelector(".dd-content").
                      querySelectorAll(".dd-row")
  var i, arr = []
  for(i = 0; i < num_elements.length; i++) 
    arr[i] = parseInt(num_elements[i].querySelector(".dd-row-num").innerHTML)

  return arr
}

function show_clear_butt(element /*dropdown*/) {
  var arr = getQuantityArray(element)  
  var clear_elements = element.getElementsByClassName("dd-clear")
  if(clear_elements.length)  
    clear_elements[0].hidden = (arr[0] + arr[1] + arr[2] == 0)
}

function dd_over(element /*dropdown*/) {
  var apply_butt = element.getElementsByClassName("dd-apply")
  if(apply_butt.length == 0) { apply_dd(element) }
 
  dropdown_hide(element)
}

// handlers
function keyboard_handler(e) { 
  if (e.key == " ")
    dropdown_toggle(getParentElementByClassName(e.target, "dropdown")) 
}

function onclick_handler(e) {
  dropdown_toggle(getParentElementByClassName(e.target, "dropdown")) 
}

function on_over(e) {
  dd_over(e.target)
}

function on_increase(e) { increase(e.target.parentElement) }
function on_increase_key(e) { if(e.key == " ") increase(e.target.parentElement) }
function on_decrease(e) { decrease(e.target.parentElement) }
function on_decrease_key(e) { if(e.key == " ") decrease(e.target.parentElement) }
function on_clear(e) { clear_all(getParentElementByClassName(e.target, "dropdown")) }
function on_clear_key(e) { if(e.key == " ") clear_all(getParentElementByClassName(e.target, "dropdown")) }
function on_apply(e) { apply_dd(getParentElementByClassName(e.target, "dropdown")) }
function on_apply_key(e) { if(e.key == " ") apply_dd(getParentElementByClassName(e.target, "dropdown")) }


function attachHandlers() {
  dropdowns = document.getElementsByClassName("dropdown");
  var i;
  for(i = 0; i < dropdowns.length; i++) {
    dropdowns[i].onmouseleave = on_over
    input = dropdowns[i].querySelector(".dd-input");
    // supposing 1 input
    input.onclick = onclick_handler
    input.onkeydown = keyboard_handler
  }

  increasers = document.getElementsByClassName("dd-row-pls")
  for(i = 0; i < increasers.length; i++) {
    increasers[i].onclick = on_increase
    increasers[i].onkeydown = on_increase_key
  }
  decreasers = document.getElementsByClassName("dd-row-mns")
  for(i = 0; i < decreasers.length; i++) {
    decreasers[i].onclick = on_decrease
    decreasers[i].onkeydown = on_decrease_key
  }

  ddclears = document.getElementsByClassName("dd-clear")
  for(i = 0; i < ddclears.length; i++) {
    ddclears[i].onclick = on_clear
    ddclears[i].onkeydown = on_clear_key
  }

  ddapplies = document.getElementsByClassName("dd-apply")
  for(i = 0; i < ddapplies.length; i++) {
    ddapplies[i].onclick = on_apply
    ddapplies[i].onkeydown = on_apply_key
  }
}

//document.addEventListener("click", dropdown_hideall);
window.addEventListener("load", attachHandlers);

var getParentElementByClassName = window.gservice.getParentElementByClassName

