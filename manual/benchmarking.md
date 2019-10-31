# Benchmarking

**[todolistme.net](http://todolistme.net/)**

## Global application overview

### Features

**[todolistme](http://todolistme.net/)** is an todo list app. Its functionalities are as follows:

- create, delete, modify a custom list for the todos
- switch between your todos lists
- add, remove, modify a todo in whichever list
- organize todos according to four filter
- print todos list
- set a due date for tasks
- syncing option, to share or synchronise your todos with friends or multiple devices
- remote option, to open the todo list in a small new window

### Technology lookup

![Technology lookup](/images/benchmarking/technology_lookup.png)

_generate with [Wappalizer](https://www.wappalyzer.com/)_

## Performance

The test performance compare **[todolistme.net](http://todolistme.net/)** and your **[to-do list](https://todos.mokokom.com/)** app.

Details of the performance testing

**Navigator**: Google Chrome Version 78.0.3904.70

**Parameters**:

- incognito mode
- disabled cache
- default online connection

**Tools**:

1. Chrome DevTools:
   - Network
   - Coverage

### Network

|                                                                                                                                                        | **[to-do list](https://todos.mokokom.com/)**                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 13 <br>**transfered**: 16.1KB <br>**ressources**: 46.3KB <br>**finish**: 397ms <br>**DOMContentLoaded**: 410ms <br>**loaded**: 409ms | ![Technology lookup](/images/benchmarking/todos_overwall_network.png)                                                |
| Note                                                                                                                                                   | Everything seem to works find and load in time. One HTTP communication protocol error with <code>onlearn.json</code> |
| **Improvement**                                                                                                                                        | fix issue <code>onlearn.json</code> file                                                                             |

|                                                                                                                                                      | [todolistme.net](http://todolistme.net/)                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <br>**requests**: 89 <br>**transfered**: 1.1MB <br>**ressources**: 2.9MB <br>**finish**: 3.14s <br>**DOMContentLoaded**: 949ms <br>**loaded**: 2.62s | ![Technology lookup](/images/benchmarking/todolistme_overall_network.png)                                                                                                                                          |
| Note 1                                                                                                                                               | png files (texture.png load in 1.08s!), ads and <code>jquery-ui.js</code> slow down site's loading. see below: <br> ![loading content todolistme](/images/benchmarking/loading_content_todolistme.png) <br>        |
| Note 2                                                                                                                                               | coverage tool show that only 95,6% of jQuery and 97.2% of jquery-ui is used <br> ![jQuery coverage](/images/benchmarking/jquery_coverage.png)                                                                      |
| **Improvements**                                                                                                                                     | <br> - optimization of png files (ex: replace texture.png background with CSS background or SVG ) <br> - block ads <br> - ES6 instead of jQuery <br> - integrated only useful jquery-ui functions <br> - use cache |

### Audit

notes comparaison:

- security https vs no https
- ES6 vs old js
- no librairie to load vs jQuery and jQuery UI
- not lot of feature vs more features
