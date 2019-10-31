# Application architecture

The overwall app is based on the [Model–View–Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) software design pattern. The files interact with each other using the ES6 `export` / `import` modules.

### Application's structure diagram

![app file structure](/images/app_architecture/Todo_app_schema.png)

_Todo application MVC architecture_

### Application's files structure

![app file structure](/images/app_architecture/app_files_structure.png)

_Application's files structure_

`index.html` is the skeleton of the website homepage. It loads all scripts.

`app.js` launch the app by initializing the view.

`components` folder contain seven files. Each file represents a ES6 class module:

1.  `controllers.js` ([see documentation](/docs/class/js/components/controller.js~Controller.html))
2.  `helpers.js` ([see documentation](/docs/class/js/components/helpers.js~Helpers.html))
3.  `model.js` ([see documentation](/docs/class/js/components/model.js~Model.html))
4.  `store.js` ([see documentation](/docs/class/js/components/store.js~Store.html))
5.  `template.js` ([see documentation](/docs/class/js/components/template.js~Template.html))
6.  `todo.js` ([see documentation](/docs/class/js/components/todo.js~Todo.html))
7.  `view.js` ([see documentation](/docs/class/js/components/view.js~View.html))
