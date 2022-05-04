

function get_less() {
  const id = $('#list_id').val();
  if (id !== null) {
    $.post(
      "/admin/get_less",
      {id: id},
      onAjaxSuccess
    );
    function onAjaxSuccess(data) {
      $('#name-lesson').html(data[0]._id);
      print_uploaded_lesson(data);
    }
  }
}

// ================================
// Delete selected lesson.
function remove_less() {
  const id = $('#list_id').val();
  if (id !== null) {
    $.post(
      "/admin/drop_less",
      {id: id},
      onAjaxSuccess
    );
    function onAjaxSuccess(data) {
      get_id();
      new_lesson();
    }
  }
}

// ================================
// Get a list of all lessons.
get_id();
function get_id() {
  $.get( '/admin/get_id', function(jsonData) { // загружаем данные с сервера с помощью HTTP запроса методом GET
    list_id_generate(jsonData);
  })
}

// ================================
// Print a list of all lessons
function list_id_generate(jsonData) {
  $('#list_id').html('');
  $('#list_id').append($('<option>',
  {
    'class': 'button_id',
    'disabled': 'true',
    'selected': 'true'
  }).html('Select a lesson to edit or delete'));
  for (let id of jsonData) {
    $('#list_id').append($('<option>', {'class': 'button_id'}).html(id));
  }
}
// ================================
// Publishing the lesson
function publish_lesson() {
  let data = create_lesson();
  if (data) {

    alert('Created: ' + data.name);
    $.post(
      "/admin/create_less",
      data,
      onAjaxSuccess
    );
    function onAjaxSuccess(data) {
      get_id();
      new_lesson();
    }
  }
}
// ================================
// Create object for publication.
function create_lesson() {
  let words = {};
  let name = print_name();
  if (name) {
    const table_tr = $('table tr');
    for (let tr of table_tr) {
      let class_tr = $(tr).attr('class');
      let tr_inp = $(tr).children();
      words[class_tr] = [];
      for (let inp of tr_inp) {
        let letter = [$(inp).val()];
        let class_inp = $(inp).attr('class').split(' ');
        if (class_inp.length === 3) {
          letter.push(class_inp[2]);
        } else letter.push(false);
        words[class_tr].push(letter);
      }
    }
    console.log(words);
    return {words: JSON.stringify(words), name: name};
  } else return false;
}

function print_name() {
  let text = $('#name-lesson').text();
  text = (text === '<...>') ? ' ' : text;
  text = prompt('Write lesson name "least three symbol": ', text);
  if (!text) {
    return false;
  } else if (text.length <= 2) {
    alert('ERROR !!!');
    return false;
  } else {
    return text.replace(/ /g, '-');
  }
}

function print_uploaded_lesson(data) {
  let words = JSON.parse(data[0].words);
  for (let elem in words) {
    let inp = $(`.${elem}`).children();
    let line = words[elem];
    for (let num = 0; num < 22; num++) {
      if (line[num][1]) {
        $(inp[num]).attr('class', `letter ${num} ${line[num][1]}`);
      }
      $(inp[num]).val(line[num][0]);
    }
  }
}

function new_lesson() {
  $('#name-lesson').text('<...>');
  for (let i = 0; i < 17; i++) {
    let tr = $(`.line_${i}`).children();
    for (let t = 0; t < 22; t++) {
      $(tr[t]).attr('class', `letter ${t}`).val('+');
    }
  }
}

print_new_lesson();
function print_new_lesson() {
  for (let i = 0; i < 17; i++) {
    let tr = $('<tr>', {"class": 'line_'+i});
    for (let id = 0; id < 22; id++) {
      tr.append(
        $('<input>', {'class': 'letter ' + id})
        .val('+')
      );
    }
    $('table').append(tr);
  }
}
