// Run when page is loaded to add tasks
$(document).ready(function() {

    var menu = new HumanMenu()
    menu.load_csv("human-menu.csv")
});
