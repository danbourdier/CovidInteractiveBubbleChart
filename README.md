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



## Featured

#### Interface


* Intuitive and brave design that not only engages the Client, but allows for ease of flow through app while providing informational guidance in bottom left.
* With D3.js, the technology affords our user a seamless experiencing while parsing our targeted data and iteratively redrawing SVG elements to our measurements.

![Isolating Gif](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/gifShowcase.gif)
&nbsp;


Because of D3's integrated force sim, free-flowing nodes were realized. Force sim enables under-the-hood redrawing of nodes based on their x,y position in the 
contained window. With respect to each node's circumfrence we are able to calculate to the perfect measurement to prevent overlapping and stagnant positioning.
<img align="right" src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/applied_force_sim.png" width="450" height="350">
Force charge is leveraged in the opposite sense where conventionally it would be used to group nodes of a tree data structure together, but instead by setting
it to a negative value were we able to achieve repulsion contingent of each node's relative measurements.

&nbsp;

&nbsp;

&nbsp;

Movement is simulated with our ticked function which changes the positioning of each node and separate label coordinates each *frame* of our function.
<img align="left" src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/simulation_movement_calcs.png" width="450" height="350">

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;




#### Filterable Data

* Client is able to render visually comparable data based on their choice of below options.


<img src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/filter-gif.gif" width="640" height="420" >
&nbsp;

Our code below shows how D3 allows us to accomplish the feature above by binding our data points and re-rendering them with the chosen parameter.
<img align="right" src="https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/data_points.png" width="400">
By default, we size each datapoint(node) according to recovery cases. 
But with our passed argument `filter` we can achieve dynamic rendering.  
&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;


#### View Node Data

* Client is able view data based on selected a selected state(node) giving an in-depth analysis of each node's bound data.


![Filter Gif](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/vids/state-gif.gif)

---



## Links
* [Live Site](https://danbourdier.github.io/CovidInteractiveBubbleChart/)

* [API origination](https://systems.jhu.edu/)


---


## Hosting
* Github Pages

---

## Future Implementations

* Implement side by side comparison of two states my choice
* Include data comparison for countries 

---


## Support and advocate for your local VFW!
[Link to VFW locator!](https://www.vfw.org/find-a-post)


<!-- ### Wireframe


![wireframe](https://github.com/danbourdier/CovidInteractiveBubbleChart/blob/master/src/images/wireframe.png)

--- -->



 