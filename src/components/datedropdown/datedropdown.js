// single input or start date input observer
function input_observer(element, checked) {
  var dd_element = getParentElementByClassName(element, "datedropdown")
  if(checked)
    on_dropdown_show(dd_element)
  else
    on_dropdown_hide(dd_element)
}

// finish date input observer
function input_observer_end(element, checked) {
  var dd_element = getParentElementByClassName(element, "datedropdown")
  if(checked)
    on_dropdown_show(dd_element, true)
  else
    on_dropdown_hide(dd_element, true)
}

function on_dropdown_show(element, end_date = false) {
  $(element).children('.picker').data('datepicker').show()
}

function on_dropdown_hide(element, end_date = false) {
  $(element).children('.picker').data('datepicker').hide()
}

///
function dd_hide(element) {
  var ddinputs = element.querySelectorAll(".dd-input")
  for(var i = 0; i < ddinputs.length; i++) {
    if(modules.dd_input.getChecked(ddinputs[i]))
      modules.dd_input.collapse(ddinputs[i])
  }
}

function onPickerHide(inst, animation) {
  if(animation) {
    var dd = getParentElementByClassName(inst.el, "datedropdown")
    dd_hide(dd)
  }
}

function onPickerApply(inst, a) {
  var dd = getParentElementByClassName(inst.el, "datedropdown")
  dd.querySelector('.dd-input-text').value = "fuck"
}

function attachHandlers() {
  dropdowns = document.getElementsByClassName("dropdown")
  for(i = 0; i < dropdowns.length; i++) {
  }

}

function init() {
  attachHandlers()
  
  datedropdowns = document.getElementsByClassName("datedropdown")
  var i;
  for(i = 0; i < datedropdowns.length; i++) {
    // obsersers
    var inputs = datedropdowns[i].querySelectorAll(".dd-input")
    console.log("inputs: " + inputs.length)
    modules.dd_input.addObserver(inputs[0], input_observer)
    if (inputs.length > 1)
      modules.dd_input.addObserver(inputs[1], input_observer_end)
  // datepicker events
    $(datedropdowns[i]).children('.picker').datepicker({onHide : onPickerHide, onApply: onPickerApply})
  }
}

window.addEventListener("load", init)
//document.addEventListener("click", on_globalclick)

var getParentElementByClassName = window.gservice.getParentElementByClassName
var modules = window.modules

