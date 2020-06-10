
function init() {
  var dpick = $('.calendar-card').children('.picker').data('datepicker') 
  var today = new Date('2019-08-08')
  if(typeof(dpick) != "undefined") {
    $('.calendar-card').children('.picker').datepicker.Body.prototype._dirtyToday = today
    dpick.selectDate([new Date('2019-08-19'), new Date('2019-08-23')])
    dpick.date = today
  }
}


window.addEventListener("load", () => {setTimeout(init, 1)})
