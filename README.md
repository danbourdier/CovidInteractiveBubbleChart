<img src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/favicon.png" width="100"> COVID-19 Interactive Bubble Chart
---


### Tech

* `Node.js`
* `JavaScript`
* `D3 library`
* `HTML 5`
* `CSS 3`


---

### Intro
Covid Interactive Bubble Chart or (CIBC) is a feature rich data visualization that works on the D3.js library. It enables the user direct, asynchronously updated elements through the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University. Updates are made everyday at 12pm. Users will be able to choose between available statistics such as recovery rate per country, current and new cases. 

---


# Table Of Contents

* [Intro](https://github.com/danbourdier/CovidInteractiveBubbleChart/#Intro)
* [Technologies](https://github.com/danbourdier/CovidInteractiveBubbleChart/#Tech)
* [Links](https://github.com/danbourdier/CovidInteractiveBubbleChart/#Links)
* [Featured](https://github.com/danbourdier/CovidInteractiveBubbleChart/#Featured)


---


## Hosting
* Github Pages

---


## Featured

#### Interface


* Intuitive and brave design that not only engages the Client, but allows for ease of flow through app while providing informational guidance in bottom left.
* With D3.js, the technology affords our user a seamless experiencing while parsing our targeted data and iteratively redrawing SVG elements to our measurements.

![Isolating Gif](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/gifShowcase.gif)


#### Filterable Data

* Client is able to render visually comparable data based on their choice of below options.


<img src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/filter-gif.gif" width="640" height="420" >


Our code below shows how D3 allows us to accomplish the feature above by binding our data points and re-rendering them with the chosen paramater.
By default, we size each datapoint(node) according to recovery cases. But with our passed argument `filter` we can achieve dynamic rendering.
![data_points](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/data_points.png)


#### View Node Data

* Client is able view data based on selected a selected state(node) giving an in-depth analysis of each node's bound data.


![Filter Gif](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/state-gif.gif)

---



## Links
* [Live Site](https://danbourdier.github.io/CovidInteractiveBubbleChart/)

* [API origination](https://systems.jhu.edu/)


---


## Support and advocate for your local VFW!
[Link to VFW locator!](https://www.vfw.org/find-a-post)


<!-- ### Wireframe


![wireframe](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/wireframe.png)

--- -->



 