import { vi, describe, it, expect, afterEach} from "vitest";
import {getModule} from "../node_modules/@iprog/test/test/getModule";

vi.mock("mobx-react-lite", function(){
    return {
        observer(x){x.observer=true; return x;}
    };
});

vi.mock(import('react-router-dom'), async function(importOriginal) {
  const mod = await importOriginal() ;
    return {
        ...mod,
        createHashRouter:vi.fn(mod.createHashRouter)
    }
})

import {createHashRouter} from "react-router-dom"

vi.mock(import('vue-router'), async function(importOriginal) {
    const mod = await importOriginal() ;
    return {
        ...mod,
        createRouter:vi.fn(mod.createRouter)
    }
})

import {createRouter} from "vue-router"

vi.mock("/src/reactjs/sidebarPresenter");
vi.mock("/src/reactjs/searchPresenter");
vi.mock("/src/reactjs/detailsPresenter");
vi.mock("/src/reactjs/summaryPresenter");

vi.mock("/src/vuejs/sidebarPresenter");
vi.mock("/src/vuejs/searchPresenter");
vi.mock("/src/vuejs/detailsPresenter");
vi.mock("/src/vuejs/summaryPresenter");

import.meta.glob("/src/reactjs/sidebarPresenter.*sx")
import.meta.glob("/src/reactjs/detailsPresenter.*sx")
import.meta.glob("/src/reactjs/searchPresenter.*sx")
import.meta.glob("/src/vuejs/sidebarPresenter.*sx")
import.meta.glob("/src/vuejs/detailsPresenter.*sx")
import.meta.glob("/src/vuejs/searchPresenter.*sx")

const runVue=  (await getModule("/src/vuejs/sidebarPresenter")).Sidebar &&
      (await getModule("/src/vuejs/searchPresenter")).Search &&
      (await getModule("/src/vuejs/detailsPresenter")).Details;

const runReact=  (await getModule("/src/reactjs/sidebarPresenter")).Sidebar &&
      (await getModule("/src/reactjs/searchPresenter")).Search &&
      (await getModule("/src/reactjs/detailsPresenter")).Details;


function mockPresenter(){
    return "dummy presenter"+ Math.random();
}

import {reactRender, vueRender} from "../node_modules/@iprog/test/test/render";
import {ReactRoot} from "./reactjs/ReactRoot";

import {h} from "vue";
function vueRenderWRouter(x, props){
    window.React={createElement:h};
    return vueRender(x, props, makeRouter?{plugins:[makeRouter(props.model)]}:{});
}

function testWarnCB(param){
    return param?.indexOf && param.indexOf("React Router Future Flag Warning")!=-1;
}

const oldConsoleWarn= console.warn;

console.warn= function(...params){
    if(!params?.find(testWarnCB))
        oldConsoleWarn(...params);
};

function toInclude(rendering, mock1, mock2, props){
    try{
        expect(mock1, "sidebar should be called").toHaveBeenCalled();
        expect(mock2, "presenter for "+window.location.hash+" should be called").toHaveBeenCalled();
        expect(mock1.mock.lastCall[0], "correct props should be passed to sidebar").toEqual(props);
        expect(mock2.mock.lastCall[0], "correct props should be passed to presenter").toEqual(props);
        expect(rendering.container.textContent, "sidebar should be rendered, then the router output")
            .toMatch(RegExp("^"+mock1.mock.results[0].value+"\\s*"+mock2.mock.results[0].value+"\\s*$"));
        return {
            pass:true
        };
    }catch(e){
        return {
            pass:false,
            message(){ return e.toString();}
        };
    }
    finally{
        mock1.mockClear();
        mock2.mockClear();
    }
}

expect.extend({toInclude});

describe.for([
    {   name:"ReactRoot",   render: reactRender,  root: ReactRoot, routerSpy: createHashRouter, run:runReact},
])("TW3.3.1 $name router", function(framework){
    it.runIf(framework.run)("renders Sidebar, then corrent presenter for each route", async function(test){
        const path= framework.name=="VueRoot"?"vuejs":"reactjs";

        const sidebar= vi.spyOn(await import("/src/"+path+"/sidebarPresenter"), "Sidebar")
              .mockImplementation(mockPresenter);

        const summary= vi.spyOn(await import("/src/"+path+"/summaryPresenter"), "Summary")
              .mockImplementation(mockPresenter);

        const search= vi.spyOn(await import("/src/"+path+"/searchPresenter"), "Search")
              .mockImplementation(mockPresenter);

        const details= vi.spyOn(await import("/src/"+path+"/detailsPresenter"), "Details")
              .mockImplementation(mockPresenter);;
      
        // ReactRoot or VueRoot import (aliased) : 
        const props={model:{ready:true}};
        const root= framework.root;

        window.location.hash="search";
        let result=framework.render(root, props);
        await new Promise(r=>setTimeout(r));  // needed by Vue

        if(!framework.routerSpy.mock.calls[0])
            // no router was created
            test.skip();

        // TODO: here we could check if the router was created with correct params
        
        expect(result).toInclude(sidebar, search,  props);

        window.location.hash="summary";
        result= framework.render(root, props);
        await new Promise(r=>setTimeout(r));
        
        expect(result).toInclude(sidebar, summary, props);

        window.location.hash="details";
        result= framework.render(root, props);
        await new Promise(r=>setTimeout(r));

        expect(result).toInclude(sidebar, details, props);

        window.location.hash="";
        result= framework.render(root, props);
        await new Promise(r=>setTimeout(r));

        expect(result).toInclude(sidebar, search, props);
    });    
});

