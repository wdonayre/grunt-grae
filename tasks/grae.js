/*
 * grunt-grae
 *
 *
 * Copyright (c) 2015 William Donayre Jr
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var util = require('util');
  var path = require('path');
  var matter = require('gray-matter');
  var fs = require("fs"); //Load the filesystem module
  var _ = grunt.util._;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('grae', 'A framework for generating HTML Based UI Kits and Living Styleguide', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      files: true,
      folder: true
    });

    // Iterate over all specified file groups.
    //console.log("this:"+ util.inspect(this, false, null));

    var JSON_OBJ = [];
    JSON_OBJ.length = 0;
    var refObj = {};
    var mainFileFormat;

    // Iterate over all specified file groups.
    //grunt.log.subhead('Indexing All Files and Folders...');
    this.files.forEach(function(f){
      mainFileFormat = f.mainFileFormat;

      var src = f.src.filter(function(filepath) {
        if(filepath != ""){
          var fullPath = filepath;

          if( f.cwd ){
            //add trailing slash if not added
            if(f.cwd.slice(-1)!=="/"){
              f.cwd = f.cwd + "/";
            }
            fullPath = f.cwd + filepath;
          }

          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(fullPath)) {
            grunt.log.warn('Source file "' + fullPath + '" not found.');
            return false;
          } else {
            createJSON(f.cwd,filepath);
            return true;
          }
        }
      });

      // Convert structure object to JSON
      var contents = JSON.stringify(JSON_OBJ);
      grunt.file.write(f.dest, contents);
    });


    function pushObj(arr,cwd,filepath){

      var tmpParentFolder  = arr[arr.length - 2];
      //console.log("PARENT " + tmpParentFolder);
      var fileName=arr[arr.length - 1],tmpfilepath;

      tmpfilepath = filepath.replace("/" + fileName, "");

      createJSON(cwd, tmpfilepath);

      var ymlData = matter.read(cwd+filepath);
      refObj[ tmpParentFolder ].sub.push({
        name: fileName,
        path: cwd+tmpfilepath + "/",
        data: ymlData.data,
        content: ymlData.content
      });

      //console.log("JSONOBJ:"+ util.inspect(JSON_OBJ, false, null));
    }

    function createJSON(cwd,filepath){
      var ret = null;
      var arr = filepath.split("/");
      if(fs.statSync(cwd+filepath).isDirectory()){

        var tmpLen = arr.length;
        var key = "";

        for(var i=0;i<tmpLen;i++){
          key = arr[i];

          if(!(key in refObj)){
            var tmpObj;
            if(i<1) {
              var currentLen = JSON_OBJ.length;
              tmpObj = {name: key, index: currentLen, sub: []}
              JSON_OBJ.push(tmpObj);
            }
            else {
              var prevKey = arr[i-1];
              tmpObj = {name: key, index: refObj[ prevKey].sub.length , sub: []};
              refObj[ prevKey ].sub.push(tmpObj);
            }
            refObj[ key ] = tmpObj;

            //check if there is template that has the same name with the folder
            var directFilePath = filepath + "/" + arr[arr.length-1] + "." + mainFileFormat;
            if(grunt.file.exists(cwd+directFilePath)){
              //console.log(directFile);

              arr.push(arr[arr.length-1]+"."+mainFileFormat);
              pushObj(arr,cwd,directFilePath);
              arr.pop();
            }
          }
        }

        var tmpArray = fs.readdirSync(cwd+filepath);
        var len = tmpArray.length; // user defined length

        //for(var i = 0; i < len; i++) {
        //  tmpObj.sub.push(null);
        //}

      }
      else if(fs.statSync(cwd+filepath).isFile()){
        if(arr.length > 1) {
          //check if this filename is equals to parent folders name. we should not push because its already added
          if(arr[arr.length-2]!==arr[arr.length-1].replace("."+mainFileFormat,"")){
            pushObj(arr,cwd,filepath);
          }
        }
        else{
          //console.log("HOW COME THE array LENGTH IS less than 2 ??");
        }
      }

      //defaultObj = {};
      return ret;
    }


  });

};
