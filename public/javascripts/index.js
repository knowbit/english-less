#!/usr/bin/env node

let corect_words;

const svg_marker =
`<svg style="margin-top: 16px" width="21" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="highlighter" class="svg-inline--fa fa-highlighter fa-w-17" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512">
<path fill="currentColor" d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z">
</path>
</svg>`;

const svg_ears =
`<svg style="margin-top: 16px" width="21" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z">
</path>
</svg>`;

let class_select = 'NOUNS';
let marker = true;
let br = 2.32323;
console.log( br.toString(2));

function event_select() {

  $('#markers').css('display', 'block');
  $('#img_corr').css('display', 'none');

  $('.try_again').css('display', 'none');
  $('.again').css('display', 'none');
  $('.NEXT').css('display', 'none');
  $('.correct').css('display', 'none');
  $('.check').css('display', 'block')
  .css('cursor', 'default');

  $('table tr').mouseenter((elem) => {
    const selector = $(elem.currentTarget).children();
    if (marker) {
      select(selector);
    } else {
      remove(selector);
    }
  }).mouseleave((elem) => {
    const selector = $(elem.currentTarget).children();
    selector.off('mouseenter');
    selector.off('mousedown');
  })
}

$('.check').mouseenter(() => {
  if (checkall()) {
    $('.check')
    .addClass('button_hover')
    .dblclick(check)
    .css('cursor', 'pointer');
  }
}).mouseleave(() => {
  $('.check')
  .removeClass('button_hover')
  .off('dblclick');
}).css('display', 'block');

$('.again').dblclick(get_less);
$('.try_again').dblclick(get_less);
$('.NEXT').dblclick(get_less);

function checkall() {
  const table_tr = $('table tr');
  for (let tr_td of table_tr) {
    let result = false;
    tr_td = $(tr_td).children();
    for (let i = 0; i < 22; i++) {
      if ($(tr_td[i]).attr('class').split(' ').length > 2) {
        break;
      } else if (i === 21) {
        return false;
      }
    }
  }
  return true;
}

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
  }).mouseup(() => {
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
  }).mouseup((td) => {
    $(selector).off('mouseenter');
  })
}

function select_marker() {

  $('.circle').addClass('button_hover');
  $('.marker').click((elem) => {
    $('#ERASE').css('color', '#747a75');
    $('.marker').html('');
    class_select = $(elem.currentTarget).attr('id')
    marker = true;
    $(elem.currentTarget).html(svg_marker);
  }).html('');

  $('#ERASE').click((elem) => {
    $(elem.currentTarget).css('color', 'black');
    marker = false;
    $('.marker').html('');
  }).html(svg_ears);
  console.log('lughlihb');
  class_select = 'NOUNS';
  marker = true;

  $('#NOUNS').html(svg_marker);
}
