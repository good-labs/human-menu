class HumanMenu {

    // Organize items by new / finished
    items = {
        suggestions: Array(),
        done: Array()
    };

    // The constructor is called to create local storage
    constructor(number, suggestionsId, doneId, itemClass) {
        
        // The number to randomly select for the menu
        this.number = number || 5

        // The div ids for suggestions and seen items
        this.suggestionsId = suggestionsId || "#suggestions"
        this.doneId = doneId || "#done"
        this.itemClass = itemClass || "human-menu-item"

        // Class Variables
        var hasStorage = (function() {
            try {
                localStorage.setItem("human-menu-test", 'test');
                localStorage.removeItem("human-menu-test");
                return true;
            } catch (exception) {
                return false;
            }
        });

        this.hasStorage = hasStorage();

        // Tell the user the chosen parameters
        this.status()

        // If we find storage, load up elements
        if (this.hasStorage == true) {
            this.storageLoad();
        }
    }

    // Print a status for the user
    status() {

        console.log("hasStorage: " + this.hasStorage)
        console.log("number: " + this.number)
        console.log("itemClass: " + this.itemClass)
        console.log("suggestionsId: " + this.suggestionsId)
        console.log("doneId: " + this.doneId)

    }

    // Set new item
    addItem(name) {
        if ( !(this.items.suggestions.includes(name)) && !(this.items.done.includes(name))) {
            console.log("Adding new item, " + name)
            this.items.suggestions.push(name)
        }
    }

    // Add an item to the suggestions shown
    showSuggestion(name) {

      // Update interface
      $(this.suggestionsId).append("<li class='human-menu-item' data-name='" + name + "'>" + name + "</li>")
      // Bind the class to the correct function
      $("." + this.itemClass).on('click', {client: this}, this.chooseItemEvent);

    }

    // Choose an item (expects to be bound on click to element)
    chooseItemEvent(event) {
 
        var name = event.target.getAttribute('data-name')
        var client = event.data.client
        var items = client.items
        var index = items.suggestions.indexOf(name);

        // Non -1 index indicates we found it
        if (index > -1) {
            console.log('Choosing ' + name);

            // Remove from items
            items.suggestions.splice(index, 1);

            // Add to done if not seen
            if (!items.done.includes(name)){
                items.done.push(name);
            }

            // Remove from suggestions, add to done
            $(event.target).removeClass('human-menu-item');
            $(event.target).appendTo(client.doneId);
            client.storageSave(items)
       }
    }

    // Load suggestions into the csv
    load_csv(filename) {

        filename = filename || "human-menu.csv";

        var promise = new Promise(function(resolve, reject) {

            var additions = Array();

            $.get(filename, function(data) {
                data = data.split("\n").slice(1,)
                $.each(data, function(i, d){
                    var items = d.split(",")
                    if (!(items[0] === undefined) && !(items[0]=="") ) {
                        additions.push(items[0]);
                    }
                });
                resolve(additions);
            });
        });

        // Bind the class to the resolution function to add items
        promise.then(function(additions) {
            for(var i = 0; i < additions.length; i++){
                this.addItem(additions[i]);    
            }

            // Finish with save to localStorage
            if (this.hasStorage == true) {
                this.storageSave();
            }

            console.log(this.items);
            this.update();


        }.bind(this));
    }

    // Clear current suggestions
    clearSuggestions() {
        $(this.suggestionsId).empty();
        this.update();
    }

    // Update methods
    update() {

        // If we don't have enough suggestions, refresh the list
        if (this.items.suggestions.length < this.number) {

            $.notify("Ran out of new items, refreshing list.", "info");
            for(var i = 0; i<this.items.done.length;i++){
                var item = this.items.done[i];
 
                // Add to suggestions
                if (!this.items.suggestions.includes(item)) {
                    this.items.suggestions.push(item);
                }
            }
            this.items["done"] = Array();
        }

        // If we have enough suggestions
        if (this.items.suggestions.length >= this.number) {
            console.log("Updating human list...");

            // Create a copy of the list to remove from
            var suggestions = this.items.suggestions.slice();
            for(var i = 0; i<this.number; i++){
                var randomItem = suggestions.splice(Math.floor(Math.random()*suggestions.length), 1);
                this.showSuggestion(randomItem[0])
            }

        } else {
            $.notify("Not enough items to populate list.", "error");
        }

        // Update done items
        $(this.doneId).empty();
        for(var i = 0; i<this.items.done.length; i++){
            var item = this.items.done[i]
            $(this.doneId).append("<li class='human-menu-item' data-name='" + item + "'>" + item + "</li>")
        }
    }

    // Storage save methods
    storageSave(items) {
        var items = items || this.items
        if (this.hasStorage == true) {
           localStorage.setItem('human-menu', JSON.stringify(items));
        }
    }

    storageClear() {
        if (this.hasStorage == true) {
           localStorage.clear();    
        }
    }

    // Load previous suggestions and seen items
    storageLoad() {

        console.log('Loading items from storage...')
        var items = JSON.parse(localStorage.getItem('human-menu'));

        if (items != null) {

            // The user has previous suggestions or seen items
            if ("suggestions" in items) {

                // Add items that aren't found in either, for each of suggestions and seen
                for (var i = 0; i < items.suggestions.length; i++) {
                    var item = items.suggestions[i]
                    if ( !(this.items.suggestions.includes(item)) && !(this.items.done.includes(item))) {
                        this.items.suggestions.push(item)
                    }
                }
            }
            if ("done" in items) {
                for (var i = 0; i < items.done.length; i++) {
                    var item = items.done[i]
                    if ( !(this.items.suggestions.includes(item)) && !(this.items.done.includes(item))) {
                        this.items.done.push(item)
                    }
                }
            }

        }
    }
}
