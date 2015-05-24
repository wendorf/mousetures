var actionsNode = document.getElementById("actions");

chrome.storage.sync.get('gestureMap', function (items) {
  var gestureMap = items['gestureMap'];
  var actionMap = Object.keys(gestureMap).reduce(function (map, gesture) {
    map[gestureMap[gesture]] = gesture;
    return map;
  }, {});

  actionsNode.innerHTML = "" +
    actions.map(function (action) {
      return "" +
        "<tr>" +
        "<td>" + action.shortDescription + "</td>" +
        "<td><input name='" + action.id + "' value='" + actionMap[action.id] + "' /></td>" +
        "</tr>"
        ;
    }).join('')
  ;
});

document.getElementById("options").addEventListener("submit", function (event) {
  event.preventDefault();
  var newMap = {};
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    if (element.value === 'Save') {
      continue;
    }
    newMap[element.value] = element.name;
  }

  chrome.storage.sync.set({'gestureMap': newMap}, function () {
    var saved = document.getElementById("saved");
    saved.classList.add("visible");
    saved.classList.remove("hidden");
    setTimeout(function () {
      saved.classList.remove("visible");
      saved.classList.add("hidden");
    }, 1000);
  });
}, false);
