var dataStore = {
  userId: null,
  listId: null
};
$(document).ready(function () {

  // Getting jQuery references to the new list name and category
  var nameInput = $("#ListName");
  var newListForm = $("#newList");
  var categorySelect = $("#category");
  var googleInput = $("#GoogleID");


  // Adding an event listener for when the form is submitted
  $(newListForm).on("submit", handleFormSubmit);

  // Submits a new list and brings user to launch page upon completion
  function submitList(list) {
    $.ajax("/api/list/" + dataStore.userId, {
      type: "POST",
      data: list
    }).then(
      function (data) {
        // Reload the page to get the updated list
        dataStore.listId = data.id
        window.location.href = "/dashboard";
      }
    );
    }
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the list if we are missing a name, or category
      if (!nameInput.val().trim() || !categorySelect.val()) {
        return;
      }
      var myvalue = googleInput.val();

      $.ajax("/api/users/id/" + myvalue, {
        type: "GET"
      }).then(function (res) {
        dataStore.userId = res.id;
        console.log('userID', dataStore.userId);
        // Constructing a newList object to hand to the database
        var newList = {
          ListName: nameInput.val().trim(),
          Category: categorySelect.val(),
          GoogleID: googleInput.val()
        };
        submitList(newList);

      });
    }
    $(".sharedBtn").on("click", function (event) {
      dataStore.listId = event.target.dataset.listid;
      $('.modal-body').empty();
      $("#Mymodal").modal("show");

      $('.modal-body').append(`<div class="form-group">
  <label for="usr">Enter the Email Address of your friend</label>
  <input type="text" class="form-control" id="sharedEmailId">
</div>`);
    });

    $(".sharedModal").on("click", function (event) {
      event.preventDefault();
      console.log($("#sharedEmailId").val());
      $.ajax("/api/users/email/" + $("#sharedEmailId").val(), {
        type: "GET"
      }).then(function (res) {

        console.log('sharedModall respose', res);
        console.log('UserId', res.id);
        var sharedToUser = {
          sharedTo: res.id
        };

        $.ajax("/api/shared/" + dataStore.listId, {
          type: "post",
          data: sharedToUser
        }).then(function (response) {
          console.log(response);
        });
      });
    });

    $(".deleteBtn").on("click", function (event) {
      dataStore.listId = event.target.dataset.listid;
      $.ajax("/api/list/" + dataStore.listId, {
        type: "delete",
      }).then(function (response) {
        console.log(response);
      });
    });
})
