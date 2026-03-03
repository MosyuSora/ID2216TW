//import{ plugin} from "n/vitest-react-native/plugin.js"
// or import own copy, depends on package flow-remove-types
 import {plugin } from "./node_modules/@iprog/test/vitest-react-native/plugin.js"

import { defineConfig, loadEnv } from "vite";
import fs from "fs";

import  {getAliases} from "./node_modules/@iprog/test/test/aliases"

// running tests from @iprog/test
// https://github.com/micromatch/micromatch?tab=readme-ov-file#extglobs
const exclude= ['node_modules/!(@iprog)/**', '**/__tests__/**'];

function splash(){   
    fs.readFile("./lab-pyramid.txt", "utf-8", (err,data)=> setTimeout(()=>console.log(data), 1000));
}
const splashPlugin = {
  name: 'build-index',
  // transformIndexHtml(){ splash(); },
  buildStart(){ splash(); },
};

export default defineConfig(function({mode,command, ...other}){
  const env = loadEnv(mode, process.cwd(), '')

  const nativePlugin=[plugin];
  return{
    plugins:  [
      ...nativePlugin,
      splashPlugin,
      //virtualHtml({pages})      // HTML mappings
    ],
    test:{
      environment: "happy-dom",
      //setupFiles: ['test-setup.js'],
      exclude: [...exclude, "**/*.web.test.*"],
      clearMocks:true,   // clear mocks after each test
      css:true
    },
    resolve:getAliases("/node_modules/@iprog/test/test/dummy/")
    };
});
