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

| title          | infos                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| **Navigator**  | Google Chrome Version 78.0.3904.70                                     |
| **Parameters** | - incognito mode<br> - disabled cache <br> - default online connection |
| **Tools**      | 1. Chrome DevTools <br> - Network <br> - Coverage                      |

### Network

|                                                                                                                                                        | **[to-do list](https://todos.mokokom.com/)**                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 13 <br>**transfered**: 16.1KB <br>**ressources**: 46.3KB <br>**finish**: 397ms <br>**DOMContentLoaded**: 410ms <br>**loaded**: 409ms | ![Technology lookup](/images/benchmarking/todos_overwall_network.png) <br>                                                |
| Note                                                                                                                                                   | Everything seem to works find and load in time. One HTTP communication protocol error with <code>onlearn.json</code> <br> |
| **Improvement**                                                                                                                                        | fix issue <code>onlearn.json</code> file <br>                                                                             |

|                                                                                                                                                       | [todolistme.net](http://todolistme.net/) <br>                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 116 <br>**transfered**: 2.5MB <br>**ressources**: 5.0MB <br>**finish**: 5.71s <br>**DOMContentLoaded**: 1.35s <br>**loaded**: 4.22s | ![Technology lookup](/images/benchmarking/todolistme_overall_network.png) <br>                                                                                                                                          |
| Note 1                                                                                                                                                | <br> png files (texture.png load in 1.08s!), ads and <code>jquery-ui.js</code> slow down site's loading. see below: <br> ![loading content todolistme](/images/benchmarking/loading_content_todolistme.png) <br>        |
| Note 2                                                                                                                                                | <br> coverage tool show that only 95,6% of jQuery and 97.2% of jquery-ui is used <br> ![jQuery coverage](/images/benchmarking/jquery_coverage.png) <br>                                                                 |
| **Improvements**                                                                                                                                      | <br> - optimization of png files (ex: replace texture.png background with CSS background or SVG ) <br> - block ads <br> - ES6 instead of jQuery <br> - integrated only useful jquery-ui functions <br> - use cache <br> |

### Audit

notes comparaison:

- security https vs no https
- ES6 vs old js
- no librairie to load vs jQuery and jQuery UI
- not lot of feature vs more features
