# The Human Menu

[![https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg](https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg)](https://good-labs.github.io/greater-good-affirmation)
[![Gitter](https://badges.gitter.im/good-labs/community.svg)](https://gitter.im/good-labs/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

The [Human Menu](https://good-labs.github.io/human-menu/) project 
provides a prototype for a "human menu," or a selection of items
that contrasts the tendency to mindlessly browse social media or similar
applications. The project is inspired by the problems outlined 
by [The Center for Humane Technology](https://humanetech.com/problem/),
specifically that our attentions are captured by addictive "digital slot 
machines" to the detriment of our mental health.

## Why do we need it?

Humans use lists and suggestions to reduce cognitive load. Instead of
offering a list of YouTube videos, endlessly scrolling social media posts,
or phone apps, the Human Menu provides a selection of real world "human" options
such as "Call your Mom," or "Do a puzzle."

## How do I contribute?

The suggested items are read in from [human-menu.csv](human-menu.csv). 
If you look at [index.js](assets/js/index.js), you'll see that creating
the menu is a simple matter of instantiating a HumanMenu, and then reading 
from file:

```javascript
var menu = new HumanMenu()
menu.load_csv("human-menu.csv")
```

We then add custom interaction with buttons on the page, such as event listeners
for clicking the reset, refresh, or add new item button. I'm not a front
end developer, so the library is simple, and the interface is too. And
for this reason, your contribution would be greatly appreciated! How might you
contribute?

 - If you'd like to add an item with one or more tags, you can add a row to this list.
 - You can also use the current list in the web interface, and add your own items interactively. 
 - You can remove all items and use it as a simple todo list.
 - You can create a new interface for the same HumanMenu object.

When you've made a contribution, please open a pull request. If you have
any questions or issues, you can [open them here](https://www.github.com/good-labs/human-menu/issues).
