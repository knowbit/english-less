function get_list_words() {
  let result = {};
  let table_tr = $('table').children();
  for (let tr of table_tr) {
    let inp = $(tr).children();
    let letters = [];
    for (let td of inp) {
      let arr = [$(td).html()];
      let cl = $(td).attr('class').split(' ');
      if (cl.length === 3) {
        arr.push(cl[2]);
      } else arr.push(false);
      letters.push(arr);
    }
    result[$(tr).attr('class')] = letters;
  }
  return separat_words(result);
}

function separat_words(data) {
  let result = {};
  for (let cl in data) {
    let line = data[cl];
    let index = ['', 0, 0];
    result[cl] = {};
    for (let i = 0; i < 22; i++) {
      if (line[i][1] === false) continue;
      if (index[0] === '') {
        index[0] = line[i][1];
        index[1] = i;
        for (; i < 22; i++) {
          if (index[0] !== line[i][1]) {
            index[2] = i - 1;
            result[cl][index.join('')] = index;
            index = ['', 0, 0];
            i = i - 1;
            break;
          } else if (i === 21) {
            index[2] = 21;
            result[cl][index.join('')] = index;
            index = ['', 0, 0];
          }
        }
      }
    }
  }
  return result;
}

function check() {
  let correct = true;
  $('table tr').off('mouseenter');
  const verify_words = get_list_words();
  for (let line in verify_words) {
    for (let renge in verify_words[line]) {
      if (corect_words[line].hasOwnProperty(renge)) {
        print_border(line, verify_words[line][renge], 'rgb(0, 102, 255)');
      } else {
        correct = false;
        print_border(line, verify_words[line][renge], 'rgb(204, 0, 0)');
      }
    }
  }
  if (!correct) {
    $('.check').css('display', 'none');
    $('.try_again').css('display', 'block');
    $('.circle').html('').removeClass('button_hover').off('click');
    $('#ERASE').html('').removeClass('button_hover').off('click');
  } else {
    $('.try_again').css('display', 'none');
    $('.again').css('display', 'block');
    $('.NEXT').css('display', 'block');
    $('.correct').css('display', 'block');
    $('.check').css('display', 'none');
    $('#markers').css('display', 'none');
    $('#img_corr').css('display', 'block');
  }
}

function border_left(color) {
  return {
    'border': '3px solid ' + color,
    'border-right': 'none',
    '-webkit-border-radius': '50% 0% 0% 50%',
    '-moz-border-radius': '50% 0% 0% 50%',
    'border-radius': '50% 0% 0% 50%'
  }
}

function border_center(color) {
  return {
    'border-bottom': '3px solid ' + color,
    'border-top': '3px solid ' + color
  }
}

function border_right(color) {
  return {
    'border': '3px solid ' + color,
    'border-left': 'none',
    '-webkit-border-radius': '0% 50% 50% 0%',
    '-moz-border-radius': '0% 50% 50% 0%',
    'border-radius': '0% 50% 50% 0%'
  }
}

function border_one(color) {
  return {
    'border': '3px solid ' + color,
    '-webkit-border-radius':'50% 50% 50% 50%',
    '-moz-border-radius': '50% 50% 50% 50%',
    'border-radius': '50% 50% 50% 50%'
  }
}

function print_border(line, renge, color) {
  line = $(`.${line}`).children();
  let num_1 = Number(renge[1]) + 1;
  const num_2 = Number(renge[2])
  if (num_1 - 1 === num_2) {
    $(line[num_2]).css(border_one(color));
    return;
  }
  $(line[renge[1]]).css(border_left(color));
  $(line[renge[2]]).css(border_right(color));

  for (; num_1 < num_2; num_1++) {
    $(line[num_1]).css(border_center(color));
  }
}
