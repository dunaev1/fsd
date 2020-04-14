function dropdown_show(element) {
  var input = element.querySelector('.dd-input');
  input.classList.remove('input-border');
  input.classList.add('input-border-expanded');

  var pic = element.querySelector('.dd-pic');
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

  var pic = element.querySelector('.dd-pic');
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


document.addEventListener("click", dropdown_hideall);

window.handlers.guest_click = 
function g(element) {
  //dropdown_toggle(element);
  setTimeout(dropdown_toggle, 0, element);
  //document.getElementsByClassName("guestblock")[0].parentElement.hidden = true;
  //alert(element.className);
};
