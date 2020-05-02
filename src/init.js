function getParentElementByClassName(element, className) {
  var i_el = element
  while (i_el.tagName != "BODY") {
    if(i_el.classList.contains(className)) return i_el;
    i_el = i_el.parentElement;
  }
  return null;
}

window.gservice = {}
window.gservice.getParentElementByClassName = getParentElementByClassName

window.handlers = {};
