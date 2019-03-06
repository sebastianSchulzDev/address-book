var myDataBase = [
  { name: "James Kowalski", email: "james@gmail.com", phonenumber: 666666666 },
  { name: "Marc Nowak", email: "marc@gmail.com", phonenumber: 777777777 },
  { name: "Louis Witą", email: "luis@gmail.com", phonenumber: 888888888 }
];

(function Avatars(db) {
  var init = function() {
    generateList();
    enterUser();
  };

  var generateList = function() {
    var parent = document.querySelector("#parent_avatars");
    var template = "";
    for (var i = 0; i < db.length; i++) {
      template += '<div class="col-sm-4">';
      template += '<div class="card">';
      template += '<div class="card-delete" data-card="' + i + '">✖</div>';
      template += '<div class="card-block">';
      template += '<h3 class="card-title">' + db[i].name + "</h3>";
      template += '<p class="card-text">';
      template += "<strong>E-Mail</strong>:<span>" + db[i].email + "</span>";
      template += "</p>";
      template += '<p class="card-text">';
      template +=
        "<strong>Nr telefonu</strong>:<span>" + db[i].phonenumber + "</span>";
      template += "</p>";
      template += "</div>";
      template += "</div>";
      template += "</div>";
    }

    parent.innerHTML = "";
    parent.insertAdjacentHTML("afterbegin", template);
    deleteCard();
  };

  var enterUser = function() {
    function grabUser() {
      var name = document.querySelector("#user_name").value;
      var email = document.querySelector("#user_email").value;
      var phonenumber = document.querySelector("#user_phonenumber").value;

      var elements = [name, email, phonenumber];

      if (validateUser(elements)) {
        document.querySelector("#myForm").reset();
        db.push({ name: name, email: email, phonenumber: phonenumber });
        generateList();
      } else {
        document.querySelector("#error").style.display = "block";
        setTimeout(function() {
          document.querySelector("#error").style.display = "none";
        }, 2000);
      }
    }

    document
      .querySelector("#myForm")
      .addEventListener("submit", function(event) {
        event.preventDefault();
        grabUser();
      });
  };

  var validateUser = function(elements) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] == "") {
        return false;
      }
    }
    return true;
  };

  var deleteCard = function() {
    var buttons = document.querySelectorAll(".card-delete");

    function deleteThis(element) {
      var obj = parseInt(element.getAttribute("data-card"));

      db.splice(obj, 1);
      generateList();
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function(e) {
        deleteThis(this);
      });
    }
  };

  init();
})(myDataBase);
