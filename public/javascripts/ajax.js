let id = '0';

get_less()
function get_less() {
  if (id !== null) {
    $.post(
      "/get_less",
      {id: id},
      on_success
    );
    function on_success(data) {
      id = data[0]._id;
      print_uploaded_lesson(data);
      event_select();
      corect_words = separat_words(JSON.parse(data[0].words));
      select_marker();
    }
  }
}

function print_uploaded_lesson(data) {
  let words = JSON.parse(data[0].words);
  for (let elem in words) {
    let td = $(`.${elem}`).children();
    let line = words[elem];
    for (let num = 0; num < 22; num++) {
      $(td[num]).attr('class', `letter ${num}`);
      $(td[num]).css({
        'border-radius': '0%',
        'border-left': 'none',
        'border-right': 'none'
      });
      $(td[num]).css({
        'border-top': '3px solid rgba(0, 0, 0, 0)',
        'border-bottom': '3px solid rgba(0, 0, 0, 0)'
      });


      $(td[num]).html(line[num][0]);
    }
  }
}

print_new_lesson();
function print_new_lesson() {
  for (let i = 0; i < 17; i++) {
    let tr = $('<tr>', {"class": 'line_'+i});
    for (let id = 0; id < 22; id++) {
      tr.append($('<td>', {'class': 'letter ' + id}));
    }
    $('table').append(tr);
  }
}
