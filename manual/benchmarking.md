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

|                                                                                                                                                        | **[to-do list](https://todos.mokokom.com/)**                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| <br>**requests**: 12 <br>**transfered**: 16.0KB <br>**ressources**: 46.5KB <br>**finish**: 297ms <br>**DOMContentLoaded**: 308ms <br>**loaded**: 307ms | ![Technology lookup](/images/benchmarking/performance/todos_overwall_network.png) <br> |

2. **[todolistme.net](http://todolistme.net/)** network performances

|                                                                                                                                                       | **[todolistme.net](http://todolistme.net/)** <br>                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <br>**requests**: 129 <br>**transfered**: 1.3MB <br>**ressources**: 3.4MB <br>**finish**: 6.76s <br>**DOMContentLoaded**: 2.68s <br>**loaded**: 5.73s | ![Technology lookup](/images/benchmarking/performance/todolistme_overall_network.png) <br>                                                                                                                                                                             |
| Notes                                                                                                                                                 | - png files (texture.png load in 3.47s!), ads and <code>jquery-ui.js</code> slow down site's loading. <br> - coverage tool show that only 95,6% of jQuery and 97.2% of jquery-ui is used <br> ![jQuery coverage](/images/benchmarking/performance/jquery_coverage.png) |
| **Improvements**                                                                                                                                      | <br> - optimization of png files (ex: replace texture.png background with CSS background or SVG ) <br> - block ads <br> - ES6 instead of jQuery <br> - integrated only useful jquery-ui functions <br> - use cache <br>                                                |

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

|                         | **[to-do list](https://todos.mokokom.com/)**                                 | Improvements                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global score**        | ![todos global score](/images/benchmarking/audit/todos_global_score.png)     |                                                                                                                                                             |
| **Performance**         | ![todos performance](/images/benchmarking/audit/todos_perf.png)              | - Preload key requests: add <code> <link rel=preload></code> to prioritize fetching resources that are currently requested later in page load.              |
| **Accessibility**       | ![todos accessibility](/images/benchmarking/audit/todos_access.png)          |                                                                                                                                                             |
| **Best practices**      | ![todos best practices](/images/benchmarking/audit/todos_best_practices.png) |                                                                                                                                                             |
| **SEO**                 | ![todos seo](/images/benchmarking/audit/todos_seo.png)                       |                                                                                                                                                             |
| **Progressive web app** | ![todos progressive web app](/images/benchmarking/audit/todos_pwa.png)       | - add service worker to the app to cache files locally and use it offline <br> - prompt user to install the web app <br> - configure a custom splash screen |

2. **[todolistme.net](http://todolistme.net/)** audit

|                         | **[to-do list](https://todos.mokokom.com/)**                           | Improvements                                                                                                                                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global score**        | ![todos global score](/images/benchmarking/audit/tlm_global_score.png) | - Performance <br> - Accessibility <br> - Best practices <br> - SEO <br> - Progressive web app                                                                                                                                                                                                          |
| **Performance**         | ![todos performance](/images/benchmarking/audit/tlm_perf.png)          | - Serve images in next-gen formats (like JPEG 2000, JPEG XR, and WebP) <br> - Eliminate render-blocking resources (use <code>async</code> for non-critical scripts)<br> - Minify JavaScript (use [UglifyJS](https://github.com/mishoo/UglifyJS2))<br> - Remove unused CSS <br> - Defer offscreen images |
| **Accessibility**       | ![todos accessibility](/images/benchmarking/audit/tlm_access.png)      | - Fix issue with non-unique [id] attributes on the page <br> - Add title to <code><frame></code> elements <br> - Add [alt] attributes to image elements <br> - Add associated labels to form elements <br> - Add [lang] attribute to <code><html></code> element                                        |
| **Best practices**      | ![todos best practices](/images/benchmarking/audit/tlm_best_pract.png) | - Use HTTPS instead of HTTP <br> - Use HTTP/2 for all of the resources <br> - Avoid to use document.write() <br> - Check and remove the includes front-end JavaScript libraries with known security vulnerabilities                                                                                     |
| **SEO**                 | ![todos seo](/images/benchmarking/audit/tlm_seo.png)                   | - Add a <code><meta name="viewport"></code> tag with width or initial-scale <br> - Add image elements [alt] attributes                                                                                                                                                                                  |
| **Progressive web app** | ![todos progressive web app](/images/benchmarking/audit/todos_pwa.png) | - Add service worker to the app to cache files locally and use it offline <br> - Prompt user to install the web app <br> - Configure a custom splash screen <br> - Redirect HTTP traffic to HTTPS                                                                                                       |

## Resume

|                     | **[to-do list](https://todos.mokokom.com/)** | **[todolistme](http://todolistme.net/)** |
| ------------------- | -------------------------------------------- | ---------------------------------------- |
| Features            | -                                            | +                                        |
| Design              | +                                            | -                                        |
| Performance         | +                                            | -                                        |
| Accessibility       | +                                            | -                                        |
| Best Practices      | +                                            | -                                        |
| SEO                 | +                                            | -                                        |
| Progressive web app | -                                            | -                                        |

**[to-do list](https://todos.mokokom.com/)** is way more efficient than the competing app. However it offers less functionality. Areas of improvement includes:

- adding features(set a due date for tasks, syncinc option..)
- improving the Progressive Web App with points listed above (in Audit)
- working on responsive design to offer a fully user experience
