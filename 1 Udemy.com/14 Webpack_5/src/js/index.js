import _ from "lodash";
import "../scss/main.scss";

console.log('_.join(["Index", "module", "loaded!"], " "):', _.join(["Index", "module", "loaded!"], " "));

(function foo(name) {
  console.log(`Hello ${name}`);
})("Michal");
