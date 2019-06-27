// Run when page is loaded to add tasks
$(document).ready(function() {

    var menu = new HumanMenu()
    menu.load_csv("human-menu.csv")

    // Function to add a new item
    $("#addButton").click(function(){
        var name = $("#newItem").val();
        menu.addItem(name);
        menu.showSuggestion(name);
    })

    // Or refresh items
    $("#refreshButton").click(function() {
        menu.clearSuggestions();
    });
});
