// "use strict"
 

const svg_marker = '<svg style="margin-top: 22px" width="26" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="highlighter" class="svg-inline--fa fa-highlighter fa-w-17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path fill="currentColor" d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path></svg>';

let class_select = 'NOUNS';
let marker = true;

$('input.letter').keyup((e) => {
  if (e.key.length > 1) {
    $(e.currentTarget).val('');
  } else {
    $(e.currentTarget).val('');
    let lett = e.key.toUpperCase();
    $(e.currentTarget).val(lett);
  }
});


$('table tr').mouseenter((elem) => {
// $('table tr').touchmove((elem) => {
  const selector = $(elem.currentTarget).children();
  if (marker) {
    select(selector);
  } else {
    remove(selector);
  }
})

$('table tr').mouseleave((elem) => {
  const selector = $(elem.currentTarget).children();
  selector.off('mouseenter');
  selector.off('mousedown');
})

function select(selector) {
  let start = id_1 = id_2 = 0;
  selector.mousedown((td) => {
    id_1 = $(td.currentTarget).attr('class').split(' ');
    $(td.currentTarget).removeClass(id_1[2]).addClass(class_select);
    selector.mouseenter((td) => {
      id_2 = $(td.currentTarget).attr('class').split(' ');
      if (Number(id_1[1]) < Number(id_2[1])) {
        $(td.currentTarget).removeClass(id_2[2]).addClass(class_select);
      }
    })
  })
  selector.mouseup(() => {
    selector.off('mouseenter');
  })
}

function remove(selector) {
  $(selector).mousedown((td) => {
    let rem_class = $(td.currentTarget).attr('class').split(' ');
    $(td.currentTarget).removeClass(rem_class[2]);
    $(selector).mouseenter((td) => {
      let rem_class = $(td.currentTarget).attr('class').split(' ');
      $(td.currentTarget).removeClass(rem_class[2]);
    })
  })
  $(selector).mouseup((td) => {
    $(selector).off('mouseenter');
  })
}

function eraser() {
  marker = false;
  $('.marker').html('');
}

$('.marker').click((elem) => {
  $('.marker').html('');
  class_select = $(elem.currentTarget).attr('id')
  marker = true;
  $(elem.currentTarget).html(svg_marker);
})
