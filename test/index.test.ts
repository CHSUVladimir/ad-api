import { helloWorld } from  "../src/index";
//import 'jest-canvas-mock';
//import { describe } from "node:test";

describe("first step",()=>{
    test('Should return helloWorld', () => {
        expect(helloWorld()).toBe('Hello world!')
      })
})



