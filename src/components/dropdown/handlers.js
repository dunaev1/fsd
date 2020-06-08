// dd input handling
function input_observer(element, checked) {
  var dd_element = getParentElementByClassName(element, "dropdown")
  if(checked)
    on_dropdown_show(dd_element)
  else
    on_dropdown_hide(dd_element)
}

function on_dropdown_show(element) {
  var content = element.querySelector('.dd-content');
  if (!content.classList.contains("dd-layout-expand"))
    content.style.width = content.parentElement.offsetWidth + "px";
  content.hidden = false;
}

function on_dropdown_hide(element) {
  var content = element.querySelector('.dd-content');
  content.hidden = true;
}

///
function dd_hide(element) {
  var ddinput = element.querySelector(".dd-input")
  if(modules.dd_input.getChecked(ddinput))
    modules.dd_input.collapse(ddinput)
}


function getType(element /*dropdown*/) {
  var content = element.getElementsByClassName("dd-content")[0]
  var type
  if(content.classList.contains("guests")) type = "guests"
  else if(content.classList.contains("rooms")) type = "rooms"

  return type
}

function isButtonsFooter(element) {
  if(element.querySelector(".footer-row") != null) return true;
  return false;
}

function increase(element /* dd-row */) {
  var num_element = element.querySelector(".dd-row-num")
  var v = parseInt(num_element.innerHTML)
  if(v < 100) v++
  num_element.innerHTML = v
  on_change_numbers(getParentElementByClassName(element, "dropdown"))
}

function decrease(element /* dd-row */) {
  var num_element = element.querySelector(".dd-row-num")
  var v = parseInt(num_element.innerHTML)
  if(v>0) v--
  num_element.innerHTML = v 
  on_change_numbers(getParentElementByClassName(element, "dropdown"))
}

function enable_button(element /*dd-row-mns, dd-row-pls*/, enabled) {
  if(!enabled)
    element.classList.add("dd-butt-disabled")
  else
    element.classList.remove("dd-butt-disabled")
}

function on_change_numbers(element /*dropdown*/) {
  show_buttons(element)
  if (!isButtonsFooter(element))
    apply_dd(element)
}

function clear_all(element /*dropdown*/) {
  var num_elements = element.
                      querySelector(".dd-content").
                      querySelectorAll(".dd-row")
  var i
  for(i = 0; i < num_elements.length; i++) 
    num_elements[i].querySelector(".dd-row-num").innerHTML = 0
  show_buttons(element)
  apply_dd(element)

}

function apply_dd(element /*dropdown*/) {
  var input = element.getElementsByClassName("dd-input-text")[0]
  //dd_hide(element)

  var type = getType(element), val
  var arr  = getQuantityArray(element)
  var sum = arr[0] + arr[1] + arr[2]
  if(type == "guests") {
    val = (sum ? arr[0] + arr[1] + " гостя" : "") + 
          (arr[2] ? ", " + arr[2] + " младенец" : "")
  }
  else if(type == "rooms") val = arr[0] + " спальни, " + arr[1] + " кровати..." // + arr[2] + " туалeта"
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

function show_buttons(element /*dropdown*/) {
  // clear button
  var arr = getQuantityArray(element)  
  var clear_elements = element.getElementsByClassName("dd-clear")
  if(clear_elements.length)  
    clear_elements[0].hidden = (arr[0] + arr[1] + arr[2] == 0)
  // minus button
  var i
  var minus_buttons = element.querySelectorAll(".dd-row-mns")
  for(var j = 0; j < minus_buttons.length; j++) {
    var value = parseInt(minus_buttons[j].nextSibling.innerHTML) 
    enable_button(minus_buttons[j], value)
  }
}


function on_globalclick(e) {
  var current_dd = getParentElementByClassName(e.target, "dropdown")
  var dropdowns = document.getElementsByClassName("dropdown")
  var i;
  for(i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i] != current_dd) {
      if (!(dropdowns[i].querySelector(".dd-content").classList.contains("dd-layout-expand")))
        dd_hide(dropdowns[i])
    }
  }
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
  dropdowns = document.getElementsByClassName("dropdown")
  for(i = 0; i < dropdowns.length; i++) {
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

function init() {
  attachHandlers()
  
  // obsersers
  dropdowns = document.getElementsByClassName("dropdown")
  var i;
  for(i = 0; i < dropdowns.length; i++) {
    apply_dd(dropdowns[i])
    show_buttons(dropdowns[i])
      
    modules.dd_input.addObserver(dropdowns[i].querySelector(".dd-input"), input_observer)
  }
}

window.addEventListener("load", init)
document.addEventListener("click", on_globalclick)

var getParentElementByClassName = window.gservice.getParentElementByClassName
var modules = window.modules

