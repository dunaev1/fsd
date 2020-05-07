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

var formatDate
function fillDates(element, dates) {
  var dd = element
  var i
  var inputs = dd.querySelectorAll('.dd-input')
  if (inputs.length > 1) {
    //separated inputs
    for(i = 0; i < 2; i++)
      if(dates[i] != "")
        modules.dd_input.setText(inputs[i], formatDate("dd.mm.yyyy", dates[i]))
  } else {
    var strs = "", stre = "", str
    if(dates[0] != "") {
      strs = formatDate("dd MM", dates[0])
      strs = strs.substr(0, strs.indexOf(" ") + 4)
    }
    if(dates[1] != "") {
      stre = formatDate("dd MM", dates[1])
      stre = stre.substr(0, stre.indexOf(" ") + 4)
    }
    str = strs + " - " + stre
    modules.dd_input.setText(inputs[0], str.toLowerCase())
  }
}

function onPickerHide(inst, animation) {
  if(animation) {
    var dd = getParentElementByClassName(inst.el, "datedropdown")
    dd_hide(dd)
  }
}

function onPickerClear(inst) {
  var dd = getParentElementByClassName(inst.el, "datedropdown")
  var inputs = dd.querySelectorAll(".dd-input")
  for(i = 0; i < inputs.length; i++) 
    modules.dd_input.setText(inputs[i], "")
  
}

function onPickerApply(inst) {
  var dates = inst.selectedDates
  var dd = getParentElementByClassName(inst.el, "datedropdown")
  fillDates(dd, dates)
}

function attachHandlers() {

}

function init() {
  attachHandlers()
  var dpick

  datedropdowns = document.getElementsByClassName("datedropdown")
  // lame hack to get formatDate
  if (datedropdowns.length) {
    dpick = $(datedropdowns[0]).children('.picker').data('datepicker')
    formatDate = dpick.formatDate.bind(dpick)
  }

  var i, j;
  for(i = 0; i < datedropdowns.length; i++) {
    // obsersers
    var inputs = datedropdowns[i].querySelectorAll(".dd-input")
    modules.dd_input.addObserver(inputs[0], input_observer)
    if (inputs.length > 1)
      modules.dd_input.addObserver(inputs[1], input_observer_end)
    // datepicker events
    $(datedropdowns[i]).children('.picker').datepicker(
          {onHide : onPickerHide, onApply: onPickerApply, onClear:onPickerClear})
    // init dates
    var dates = [datedropdowns[i].getAttribute("sdate"),
                 datedropdowns[i].getAttribute("edate")]
    for(j = 0; j < 2; j++)
      if(dates[i] != "") dates[i] = new Date(dates[i])

    fillDates(datedropdowns[i], dates)
  }
  
}

//$(document).ready( () => { setTimeout(init, 1) })
//window.addEventListener("load", init)
window.addEventListener("load", () => {setTimeout(init, 1)})

var getParentElementByClassName = window.gservice.getParentElementByClassName
var modules = window.modules

