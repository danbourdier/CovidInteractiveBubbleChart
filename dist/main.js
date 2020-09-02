/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("  let radioListener = document.querySelector(\"div.radio-button-div\") \n  radioListener.addEventListener('click', e => {\n    if (e.target.value) {\n      d3.select(\"svg\").remove();\n    draw(e.target.value)\n    }\n  });\n\n  let resetRight = document.getElementById(\"reset-button-right\");\n\n  resetRight.addEventListener(\"click\", () => {\n    d3.select(\"svg\").remove();\n    draw(\"Recovered\")\n  });\n  \n  let helpBox = document.getElementById(\"help-box\")\n  let helpBoxContainer = document.getElementById(\"help-box-container\")\n  // helpBox.innerText = \"\"\n\n\n  function draw(filter) {\n    // IDEA; have a filter for recovery cases per capita in each state\n    const states = {\n      \"Alabama\": \"AL\", \"Alaska\": \"AK\", \"Arizona\": \"AZ\", \"Arkansas\": \"AR\",\n      \"California\": \"CA\", \"Colorado\": \"CO\", \"Connecticut\": \"CT\",\n      \"Delaware\": \"DE\",\"Florida\": \"FL\",\"Georgia\": \"GA\", \"Hawaii\": \"HI\", \"Idaho\": \"ID\",\n      \"Illinois\": \"IL\", \"Indiana\": \"IN\", \"Iowa\": \"IA\", \"Kansas\": \"KS\", \"Kentucky\": \"KY\", \n      \"Louisiana\": \"LA\", \"Maine\": \"ME\", \"Maryland\": \"MD\", \"Massachusetts\": \"MA\",\n      \"Michigan\": \"MI\", \"Minnesota\": \"MN\", \"Mississippi\": \"MS\", \"Missouri\": \"MO\", \n      \"Montana\": \"MT\", \"Nebraska\": \"NE\", \"Nevada\": \"NV\", \"New Hampshire\": \"NH\", \n      \"New Jersey\": \"NJ\", \"New Mexico\": \"NM\", \"New York\": \"NY\", \"North Carolina\": \"NC\", \n      \"North Dakota\": \"ND\", \"Ohio\": \"OH\", \"Oklahoma\": \"OK\", \"Oregon\": \"OR\", \n      \"Pennsylvania\": \"PA\", \"Rhode Island\": \"RI\", \"South Carolina\": \"SC\", \"South Dakota\": \"SD\", \n      \"Tennessee\": \"TN\", \"Texas\": \"TX\", \"Utah\": \"UT\",  \"Vermont\": \"VT\", \"Virginia\": \"VA\", \n      \"Washington\": \"WA\", \"West Virginia\": \"WV\", \"Wisconsin\": \"WI\", \"Wyoming\": \"WY\",\n    }\n\n    const COLORS = [\"#ee6407\", \"#585481\", \"#279af1\", \"#19297c\", \"#ffffff\"];\n    \n    const svg_width = 920;\n    const svg_height = 695;\n\n    let svg = d3.select(\".viewbox\")\n      .append(\"svg\")\n      .attr(\"height\", svg_height)\n      .attr(\"width\", svg_width)\n    // ABOVE CODE REFERENCED FROM http://bl.ocks.org/wimdows/1502762\n\n    // we use the below #queue when we have multiple files for use\n    d3.queue() // allows us to be able to set gaps in time of execution(TOE)\n      .defer(d3.csv, \"./src/06-20-2020.csv\")\n      // defer pretty much allows us halt execution of below until each file with a\n      // #defer is loaded.\n      .await(vis) // function that executes (below) upon load\n\n    let forceStrength = 0.2;\n    let forceXCombine = d3.forceX((svg_width + 30) / 2).strength(forceStrength);\n\n    let forceXSplit = d3.forceX(d => {\n      if (d.ISO3 === \"true\") {\n        return 300\n      } else {\n        return 625\n      }\n\n    }).strength(forceStrength);\n\n    const charge = d => {\n      targetFilter = d[filter];\n      return -Math.pow(d[filter], 0.78) * forceStrength\n    }\n    // above code references from D3's sample code for applying charge\n    ////////////////////////\n    // note; d3's force sim works in ticks, meaning nodes don't just\n    // \"snap\" into place\n    let sim = d3.forceSimulation()\n      // it doesnt matter what we name x and y below because they are just \n      // placeholders\n      .force(\"x\", forceXCombine)\n      .force(\"y\", d3.forceY((svg_height - 95) / 2).strength(forceStrength))\n      // the collide measurement on line 35 & line 46 must match so that the force between  \n      // center points of differing bubbles can be equal to each circles radius (if collision was smaller then circles\n      // would overlap)\n      .force('charge', d3.forceManyBody().strength(charge))\n    // the above code works better than collide alone!!! REPULSION FTW!!!\n    sim\n      .force(\"collide\", d3.forceCollide(d => ( scale(d[filter]) )) )\n\n\n    // let max = d3.max(data, function (d) { return +d.field_goal_attempts; });\n    let scale = d3.scaleSqrt().domain([0, 100000]).range([10, 80])\n    // the above code takes a max domain of expected values and proportionally sets it\n      // to our range value\n    function vis(error, datapoints) {\n      let g = svg.selectAll(\"g\")\n        .data(datapoints)\n        .enter()\n\n      g\n        .append(\"g\")\n        // .attr(\"r\", d => (\n        //   scale(d[filter])\n        // ))\n        // .attr(\"transform\", \"translate(0,0)\")\n\n\n      let bubbles = svg.selectAll(\"g\")\n        .append(\"circle\")\n        .attr(\"class\", \"state\")\n        .attr(\"r\", d => {\n          d[filter] = Math.floor(d[filter])\n          if (states[d.Province_State]) {\n            return scale( d[filter] )\n          }\n        }) \n        .attr(\"fill\", () => {\n          return COLORS[Math.floor(Math.random() * COLORS.length - 1) + 1]\n        })\n        .attr(\"cx\", () => {\n          cxvar = 500\n          return cxvar\n        })\n        .attr(\"cy\", () => {\n          cyvar = 500\n          return cyvar\n        })\n        .on(\"click\", d => {\n          d.ISO3 = 'true'\n          sim\n            .force(\"x\", forceXSplit)\n            .alphaTarget(0.20)\n            .restart()\n          d.ISO3 = 'false'\n          // d3.event.stopPropagation()\n          document.getElementById(`Province_State`)\n            .innerText = d.Province_State;\n          document.getElementById(`Recovered`)\n            .innerText = Number(d.Recovered);\n          document.getElementById(`Confirmed`)\n            .innerText = d.Confirmed;\n          document.getElementById(`Deaths`)\n            .innerText = Number(d.Deaths);\n          document.getElementById(`Active`)\n            .innerText = Number(d.Active);\n          document.getElementById(`Incident_Rate`)\n            .innerText = Number(d.Incident_Rate).toFixed(2);\n          document.getElementById(`People_Tested`)\n            .innerText = Number(d.People_Tested).toFixed(2);\n          document.getElementById(`People_Hospitalized`)\n            .innerText = Number(d.People_Hospitalized);\n          document.getElementById(`Mortality_Rate`)\n            .innerText = Number(d.Mortality_Rate).toFixed(2);\n          document.getElementById(`Testing_Rate`)\n            .innerText = Number(d.Testing_Rate).toFixed(2);\n          document.getElementById(`Hospitalization_Rate`)\n            .innerText = Number(d.Hospitalization_Rate).toFixed(2);\n        })\n\n      // d3 mouseover events\n\n      d3.select(\".header-links\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Google 10 non-tax related reasons to hire a Veteran!\"\n          helpBoxContainer\n            // .style.backgroundColor = \"lightgreen\"\n            .style.boxShadow = \"0px 10px 40px 20px lightgreen\"\n          \n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n          helpBoxContainer\n            .style.boxShadow = \"4px 4px 4px 0px #A3B1C6 inset, -4px -4px 4px 0px #ffffff inset\"\n        })\n\n      d3.select(\".left-text-area\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Window showing state COVID statistics\"\n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n        })\n        \n      d3.select(\"#reset-button-right\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Click to reset bubble proportions\"\n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n        })\n\n      d3.select(\".radio-button-div\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Click any button to size bubbles by selection\"\n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n        })\n\n      d3.select(\".button-reset\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Click to reset state data\"\n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n        })\n\n      d3.select(\"svg\")\n        .on(\"mouseover\", () => {\n          helpBox.innerHTML = \"Click on a state to view it's content on the left-hand side\"\n        })\n        .on(\"mouseout\", () => {\n          helpBox.innerHTML = \"Hover Over any Element for a Tool Tip\"\n        })\n      // d3 mouseover events above\n\n\n\n      // references above https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/cx\n\n      // perhaps the coolest thing ever! The d3.forceSimulation().nodes\n      // creates points of origination(nodes) that create force against other elements(nodes)\n      // reference:: https://medium.com/@bryony_17728/d3-js-two-v-4-network-charts-compared-8d3c66b0499c\n      // reference:: https://github.com/d3/d3-force  <--- DENSEEEEE\n      sim.nodes(datapoints)\n        .on('tick', ticked)\n \n      let words = svg.selectAll(\"g\");\n      words.append(\"text\")\n        .text(\n          d => (states[d.Province_State] ? states[d.Province_State] : \"\")\n          )\n      // ( d.Province_State.length > 1 ? d.Province_State[0] + d.Province_State.split(\" \")[d.Province_State.split(\" \").length - 1[0]] : \"welp\" \n\n      let texts = svg.selectAll(\"text\")\n\n      function ticked() {\n        bubbles\n          .attr(\"cx\", d => {\n            cxvart = d.x;\n            return d.x\n          })\n          .attr(\"cy\", d => {\n            cyvart = d.y;\n            return d.y\n          });\n\n        texts\n          .attr(\"x\", d => {\n\n            return d.x - 6\n          })\n          .attr(\"y\", d => {\n\n            return d.y\n          })\n          .style(\"font-size\", d => {\n            return (\n              Math.floor(Math.sqrt(d[filter]) / 6 + 24) / 3.14)\n            \n          })\n          .style(\"font-weight\", \"bold\")\n          .style(\"font-family\", \"Arial\")\n          .style(\"text-transform\", \"uppercase\")\n      }\n      // our buttons to override the forcesim factors\n      \n      d3.selectAll(\".button-reset\")\n        .on(\"click\", d => {\n          sim\n            .force(\"x\", forceXCombine)\n            .alphaTarget(0.20)\n            // https://stackoverflow.com/questions/46426072/what-is-the-difference-between-alphatarget-and-alphamin\n            .restart()\n          document.getElementById(`Province_State`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Recovered`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Confirmed`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Deaths`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Active`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Incident_Rate`)\n            .innerText = \"Select a State\";\n          document.getElementById(`People_Tested`)\n            .innerText = \"Select a State\";\n          document.getElementById(`People_Hospitalized`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Mortality_Rate`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Testing_Rate`)\n            .innerText = \"Select a State\";\n          document.getElementById(`Hospitalization_Rate`)\n            .innerText = \"Select a State\";\n\n        });\n\n    }\n\n  }\n\ndraw(\"Recovered\")\n  \n\n\n  ////////////////////////////////////////////////////////////////////////////////\n\n\n  //                       AHA MOMENTS\n  // 1. I spent all day debugging why small circles werent separated according to my conditional\n    // its because i couldn't appropiately identify what each circle represented because\n      // of the logic that sizes them defaults values < 200 to be equal to a relatively same \n        // size as opposed to other circles that had values of 70,000 (we need to add a scale!!!)\n\n  // 2. Force charge over force collission because collision acts as barriers preventing\n    // free flowing bubbles! Where as charge acts as a repulsion when set to a negative value!!!\n\n  // 3. My ticked method and setting the individual text's positioning\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });