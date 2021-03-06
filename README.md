# grunt-grae

> A framework for generating HTML based UI Kit and Living Styleguide

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-grae --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-grae');
```

## The "grae" task

### Overview
In your project's Gruntfile, add a section named `grae` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grae: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default option simply creates a json file based on your toolkit folder structure and compiles your handlebar templates.

```js
grunt.initConfig({
  grae: {
    options: {},
    files: {
      cwd: "src/docs/_toolkit/",
      src: ['**'],
      mainFileFormat:"hbs",
      dest: 'dist/data.json'
    },
  },
})
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 William Donayre Jr. Licensed under the MIT license.
