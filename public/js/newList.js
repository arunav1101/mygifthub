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
  // Gets the part of the url that comes after the "?" (which we have if we're updating a list)
  //var url = window.location.search;
  //var listId;

  // Sets a flag for whether or not we're updating a list to be false initially
  //var updating = false;

  // If we have this section in our url, we pull out the list id from the url
  // In '?list_id=1', listId is 1
 /*  if (url.indexOf("?list_id=") !== -1) {
    listId = url.split("=")[1];
    getListData(listId, "list");
  } */

  // A function for handling what happens when the form to create a new list is submitted

  // var userId;

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


    //   jQuery.post(`/api/list/${userId}`, list, function() {
    //   window.location.href = "/dashboard";
    // });
  }

  // Gets list data for the current list if we're editing
 /*  function getListData(id, type) {
    var queryUrl = "/api/list/" + id;
    $.ajax(queryUrl, {
      type: "GET"
    }).then(function (data) {
      if (data) {
        console.log(data.ListName || data.id);
        // If this list exists, prefill our cms forms with its data
        nameInput.val(data.ListName);
        category = data.category;
        // If we have a list with this id, set a flag for us to know to update the list
        // when we hit submit
        updating = true;
      }
    });
  } */

  // Update a given list, bring user to the dashboard page when done
/*   function updateList(list) {
    $.ajax({
      method: "PUT",
      url: "/api/lists",
      data: list
    }).then(function () {
      window.location.href = "/dashboard";
    });
  } */

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

      // If we're updating a list run updateList to update a list
      // Otherwise run submitList to create a whole new list
/*       if (updating) {
        newList.id = listId;
        updateList(newList);
      } else { */
        submitList(newList);
      //}
    });
  }
});
