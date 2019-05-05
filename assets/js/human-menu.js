class HumanMenu {

    // Organize items by new / finished
    items = {
        suggestions: Array(),
        seen: Array()
    };

    // The constructor is called to create local storage
    constructor(number) {
        
        // The number to randomly select for the menu
        this.number = number || 5

        // Class Variables
        var hasStorage = (function() {
            try {
                localStorage.setItem(mod, mod);
                localStorage.removeItem(mod);
                return true;
            } catch (exception) {
                return false;
            }
        });

        this.hasStorage = hasStorage;

        // If we find storage, load up elements
        if (hasStorage == true) {
            this.storageLoad();
        }
    }

    // Set new item
    addItem(name) {
        if ( !(this.items["suggestions"].includes(name)) && !(this.items["seen"].includes(name))) {
            console.log("Adding new item, " + name)
            this.items["suggestions"].push(name)
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

            // Update the web interface with suggested and seen
            this.update();

        }.bind(this));
    }

    // Update methods
    update() {

        // If we don't have enough suggestions, refresh the list
        if (this.items["suggestions"].length < this.number) {

            console.log("Ran out of new items, refreshing list.")
            for(var i = 0; i<this.items["seen"].length;i++){
                var item = this.items["seen"][i];
 
                // Add to suggestions
                if (!this.items["suggestions"].includes(item)) {
                    this.items["suggestions"].push(item);
                }
            }
            this.items["seen"] = Array();
        }

        // If we have enough su
        if (this.items["suggestions"].length >= this.number) {
            console.log("Updating human list...");
            for(var i = this.items["suggestions"].length-1;i>=0;i--){
                var randomItem = this.items["suggestions"].splice(Math.floor(Math.random()*this.items["suggestions"].length), 1);

                // Add to seen
                if (!this.items["seen"].includes(randomItem[0])) {
                    this.items["seen"].push(randomItem[0]);
                }

                // Update interface
                $("#suggestions").append("<li>" + randomItem[0] + "</li>") 
            }
 
        } else {
            console.log("Not enough items to populate list.")
        }
    }

    // Storage save methods
    storageSave() {
        if (this.hasStorage == true) {
           localStorage.setItem('human-menu', this.items);    
        }
    }

    storageClear() {
        if (this.hasStorage == true) {
           localStorage.clear();    
        }
    }

    // Load previous suggestions and seen items
    storageLoad() {

        var items = localStorage.getItem('human-menu')
        if (items != null) {

            // The user has previous suggestions or seen items
            if ("suggestions" in items) {
                // Add items that aren't found in either, for each of suggestions and seen
                for (var i = 0; i < items["suggestions"].length; i++) {
                    item = items["suggestions"][i]
                    if ( !(this.items["suggestions"].includes(item)) && !(this.items["seen"].includes(item))) {
                        this.items["suggestions"].push(item)
                    }
                }
            }
            if ("seen" in items) {
                for (var i = 0; i < items["seen"].length; i++) {
                    item = items["seen"][i]
                    if ( !(this.items["suggestions"].includes(item)) && !(this.items["seen"].includes(item))) {
                        this.items["seen"].push(item)
                    }
                }
            }

        }
    }
}
