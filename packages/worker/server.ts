import amqp from 'amqplib';

import vm from 'vm';

import { createMongoDBConnection, Func } from '@nodeless/util';

const CONN_URL = 'amqp://localhost';
const queue = 'user-messages';

(async () => {
  try {
    const mongoose = await createMongoDBConnection('mongodb://mongo/nodeless');
    const conn = await amqp.connect(CONN_URL);
    const channel = await conn.createChannel();
    channel.prefetch(1);

    // const func = new Func({ title: "Chris", code: `!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var o=t();for(var r in o)("object"==typeof exports?exports:e)[r]=o[r]}}(global,(function(){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){console.log("Hello World from %project%")}}])}));` });
    // await func.save();
    await channel.assertQueue(queue);
    channel.consume(queue, async (msg) => {
      setTimeout(async () => {
        const func = await Func.findOne();
        const sandbox = {};

        const script = new vm.Script(func.code);

        await channel.ack(msg);
      }, 2000);
    });
  } catch (err) {
    console.error(err);
  }
})();
