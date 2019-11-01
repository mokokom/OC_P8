# Benchmarking

The benchmarking will be based on the competitor site **[todolistme.net](http://todolistme.net/)**

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

The test performance compare your **[to-do list](https://todos.mokokom.com/)** app and **[todolistme.net](http://todolistme.net/)**.

### Network

Performance testing details

| title          | infos                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| **Navigator**  | Google Chrome Version 78.0.3904.70                                                                             |
| **Parameters** | - incognito mode<br> - disabled cache <br> - default online connection <br> - both site are hosted on a server |
| **Tools**      | Chrome DevTools <br> - Network <br> - Coverage                                                                 |

1. **[to-do list](https://todos.mokokom.com/)** network performances

|                                                                                                                                                        | **[to-do list](https://todos.mokokom.com/)**                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 13 <br>**transfered**: 16.1KB <br>**ressources**: 46.3KB <br>**finish**: 397ms <br>**DOMContentLoaded**: 410ms <br>**loaded**: 409ms | ![Technology lookup](/images/benchmarking/performance/todos_overwall_network.png) <br>                                                |
| Note                                                                                                                                                   | Except the one HTTP communication protocol error with <code>onlearn.json</code>, everything seems to work find and load in time. <br> |
| **Improvement**                                                                                                                                        | fix issue <code>onlearn.json</code> file <br>                                                                                         |

2. **[todolistme.net](http://todolistme.net/)** network performances

|                                                                                                                                                       | **[todolistme.net](http://todolistme.net/)** <br>                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 116 <br>**transfered**: 2.5MB <br>**ressources**: 5.0MB <br>**finish**: 5.71s <br>**DOMContentLoaded**: 1.35s <br>**loaded**: 4.22s | ![Technology lookup](/images/benchmarking/performance/todolistme_overall_network.png) <br>                                                                                                                                   |
| Note 1                                                                                                                                                | <br> png files (texture.png load in 1.08s!), ads and <code>jquery-ui.js</code> slow down site's loading. See below: <br> ![loading content todolistme](/images/benchmarking/performance/loading_content_todolistme.png) <br> |
| Note 2                                                                                                                                                | <br> coverage tool show that only 95,6% of jQuery and 97.2% of jquery-ui is used <br> ![jQuery coverage](/images/benchmarking/performance/jquery_coverage.png) <br>                                                          |
| **Improvements**                                                                                                                                      | <br> - optimization of png files (ex: replace texture.png background with CSS background or SVG ) <br> - block ads <br> - ES6 instead of jQuery <br> - integrated only useful jquery-ui functions <br> - use cache <br>      |

### Audit

Audit details

| title          | infos                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Navigator**  | Google Chrome Version 78.0.3904.70                                                            |
| **Device**     | Desktop                                                                                       |
| **Audits**     | - Performance<br> - Progressive web app <br> - Best practices <br> - Accessibility <br> - SEO |
| **Throttling** | Applied slow 4G, 4x CPU Slowdown                                                              |
|                | Clear storage                                                                                 |

1. **[to-do list](https://todos.mokokom.com/)** audit

|                         | **[to-do list](https://todos.mokokom.com/)**                                 | Improvements                                                                                                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global score**        | ![todos global score](/images/benchmarking/audit/todos_global_score.png)     | - Accessibility <br> - SEO                                                                                                                                                                            |
| **Performance**         | ![todos performance](/images/benchmarking/audit/todos_perf.png)              | add <code>\<link rel=preload></code> to prioritize fetching resources that are currently requested later in page load.                                                                                |
| **Accessibility**       | ![todos accessibility](/images/benchmarking/audit/todos_perf.png)            | add <code>type="text"</code> to the <code>input</code> element in index.html                                                                                                                          |
| **Best practices**      | ![todos best practices](/images/benchmarking/audit/todos_best_practices.png) | Fix learn.json: _Failed to load resource: the server responded with a status of 404_                                                                                                                  |
| **SEO**                 | ![todos seo](/images/benchmarking/audit/todos_seo.png)                       | - add <code>\<meta name="viewport"></code> tag with <code>width</code> or <code>initial-scale</code> <br> - add <code>meta description</code> <br> - add description text to link in /docs/index.html |
| **Progressive web app** | ![todos progressive web app](/images/benchmarking/audit/todos_pwa.png)       | - add service worker to the app to cache files locally and use it offline <br> - prompt user to install the web app <br> - configure a custom splash screen                                           |

notes comparaison:

- security https vs no https
- ES6 vs old js
- no librairie to load vs jQuery and jQuery UI
- not lot of feature vs more features
