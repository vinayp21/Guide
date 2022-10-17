const sampleApi = [
  {
    startTime: 10,
    endTime: 11,
    date: "30/08/2020",
    eventTitle: "Title1"
  },
  {
    startTime: 12,
    endTime: 14,
    date: "31/08/2020",
    eventTitle: "Title3"
  },
  {
    startTime: 20,
    endTime: 21,
    date: "01/09/2020",
    eventTitle: "Title2"
  },
  {
    startTime: 13,
    endTime: 15,
    date: "02/08/2020",
    eventTitle: "Title5"
  },
  {
    startTime: 23,
    endTime: 0,
    date: "04/08/2020",
    eventTitle: "Title4"
  }
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var curr = new Date();
var first = curr.getDate() - curr.getDay();
var last = first + 6;
getWeek(first, last);
function getWeek(first, last) {
  var firstday = new Date(new Date().setDate(first));
  var lastday = new Date(new Date().setDate(last));

  document.getElementById("week-display").innerHTML =
    "<div>" +
    firstday.getDate() +
    " " +
    months[firstday.getMonth()] +
    "-" +
    lastday.getDate() +
    " " +
    months[lastday.getMonth()] +
    "</div>";
}

function nextWeek() {
  for (var j = 0; j < days.length; j++) {
    last = last + 1;
    document.getElementById("week-table").rows[0].cells[j].innerHTML =
      new Date(new Date().setDate(last)).getDate() + " " + days[j];
  }
  getWeek(last - 6, last);
}
function prevWeek() {
  last = last - 14;
  for (var j = 0; j < days.length; j++) {
    last = last + 1;
    document.getElementById("week-table").rows[0].cells[j].innerHTML =
      new Date(new Date().setDate(last)).getDate() + " " + days[j];
  }
  getWeek(last - 6, last);
}
displayCalendar(sampleApi);

function displayCalendar(data) {
  var headerRow = document.createElement("tr");
  for (var j = 0; j < days.length; j++) {
    var headerColumn = document.createElement("th");
    headerColumn.append(
      new Date(new Date().setDate(first + j)).getDate() + " " + days[j]
    );

    headerRow.append(headerColumn);
  }
  document.getElementById("week-table").append(headerRow);

  const startTime = "10:30";
  const endTime = "12:30";
  const startTimeArr = startTime.split(":");
  const endTimeArr = endTime.split(":");
  startLine = parseInt(startTimeArr[0]) * 2;
  endLine = parseInt(endTimeArr[0]) * 2;
  if (startTimeArr !== "00") {
    startLine += 1;
  }
  if (endTimeArr !== "00") {
    endLine += 1;
  }
  for (let i = 0; i < 48; i++) {
    var row = document.createElement("tr");

    for (var j = 0; j < 7; j++) {
      var column = document.createElement("td");

      if (i >= startLine && i <= endLine) {
        column.className = "occupied";
      }
      let time = parseInt(i / 2);
      if (i % 2) {
        time = time + ":" + 30;
      }
      column.innerHTML = "<div><div>" + time + "</div><div></div>";

      row.append(column);
    }
    document.getElementById("week-table").append(row);
  }
}
