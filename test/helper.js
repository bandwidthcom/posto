"use strict";
let Hapi = require("co-hapi");
module.exports = {
  startServer: function*(options, port){
    let server = new Hapi.Server("localhost", port || 3001);
    options = options || {};
    if(!options.transport){
      options.transport = "stub";
    }
    if(!options.templatesOptions || !options.templatesOptions.directory){
      options.templatesOptions = options.templatesOptions || {};
      options.templatesOptions.directory = "test";
    }
    yield server.pack.register([
      require("./viewHelpers"),
      {plugin: require(".."), options: options}
    ]);
    yield server.start();
    return server;
  }
};
