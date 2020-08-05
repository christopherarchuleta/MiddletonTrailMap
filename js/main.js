//begin script when window loads
window.onload = setMap();




// Set up map
function setMap(){


  // Map frame dimensions
  // const width = window.innerWidth;
  // const height = window.innerHeight


  // Initialize the map center and zoom level
  // var mymap = L.map('mapid', {
  //   layers:
  // }).setView([43.07292, -89.574164], 16);



  // Set up tiles and constrain zoom
  var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/cjarchuleta/ckddn2c3i2o611iqhhhpqgp7m.html?fresh=true&title=copy&access_token=pk.eyJ1IjoiY2phcmNodWxldGEiLCJhIjoiY2syYW9pcTAyMWV5ejNtbzZhM25zNnpsdSJ9.7Gl9zzKB40HnoFIWBW-Tvg', {
    attribution: ' © <a href="https://www.openstreetmap.org/">OpenStreetMap</a><a href="https://www.mapbox.com/gallery/#frank"> Style</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 15,
    id: 'cjarchuleta',
    tileSize: 256,
    accessToken: 'pk.eyJ1IjoiY2phcmNodWxldGEiLCJhIjoiY2syYW9pcTAyMWV5ejNtbzZhM25zNnpsdSJ9.7Gl9zzKB40HnoFIWBW-Tvg'
  });

  // Initialize the map center and zoom level
  var mymap = L.map('mapid', {
    layers: tiles
  }).setView([43.07292, -89.574164], 16);



  // Function for individualized Popups
  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Name) {
      layer.bindPopup(feature.properties.Name);
    }
  };





  // Add GeoJSON layers to map

  // Boundary styling
  var boundaryStyle = {
    "color": "#000000",
    "weight": "1",
    "fillColor": "#ffffff",
    "fillOpacity": "1"
  };
  var boundaryLayer = new L.GeoJSON.AJAX("Data/Boundary/Boundarygeo.json",{
    style: boundaryStyle
  });
  boundaryLayer.addTo(mymap);

  // Road styling
  var roadsStyle = {
    "color": "#000000",
    "weight": "2"
  };
  var roadsLayer = new L.GeoJSON.AJAX("Data/Middleton_Roads/Town_of_Middleton_Roadsgeo.json",{
    style: roadsStyle
  });
  roadsLayer.addTo(mymap);

  // Middleton parcel styling
  var midParStyle = {
    "color": "#000000",
    "fillColor": "#ffdda6",
    "fillOpacity": "0.5",
    "weight": "1"
  };
  var midParLayer = new L.GeoJSON.AJAX("Data/Parcels/middleton_parcels_reprojgeo.json",{
    style: midParStyle
  });
  midParLayer.addTo(mymap);

  // School-owned parcels styling
  var schParStyle = {
    "color": "#000000",
    "fillColor": "#fec44f",
    "fillOpacity": "0.5",
    "weight": "1"
  };
  var schParLayer = new L.GeoJSON.AJAX("Data/Parcels/school_parcels_reprojgeo.json",{
    style: schParStyle
  })

  // Parks styling
  var parkStyle = {
    "weight": "1",
    "color": "#000000",
    "fillColor": "#e0ffba",
    "fillOpacity": "1"
  };
  var parksLayer = new L.GeoJSON.AJAX("Data/Trails/parks_reprojgeo.json",{
    style: parkStyle
  });
  parksLayer.addTo(mymap);


  // Trail styling
  var trailsStyle = {
    "color": "#34e03c"
  };
  var trailsLayer = new L.GeoJSON.AJAX("Data/Trails/exist_imp_ease_reprojgeo.json",{
    style: trailsStyle
  });
  trailsLayer.addTo(mymap);


  var roadsStyle = {
    "color": "#000000",
    "weight": "2"
  };
  var roadsLayer = new L.GeoJSON.AJAX("Data/Middleton_Roads/Town_of_Middleton_Roadsgeo.json",{
    style: roadsStyle
  });
  roadsLayer.addTo(mymap);
  //
  var coordinatesStyle = {
    "fillOpacity": "0",
    "color": "red",
  };
  var coordinatesLayer = new L.GeoJSON.AJAX("Data/Points/MiddletonCoordinatesNewgeo.json",{
    onEachFeature : onEachFeature,
    style: coordinatesStyle
  });
  coordinatesLayer.addTo(mymap);

  var coordinateStyle = {
    "fillOpacity": "0"
  }
  var coordinateLayer = new L.GeoJSON.AJAX("Data/Points/Pioneer Park Coordinatesgeo.json",{
    style: coordinateStyle
  });
  coordinateLayer.addTo(mymap).bindPopup("<a href='https://www.google.com/maps/dir//43.074417,-89.573417/@43.074418,-89.5739642,19z/data=!4m10!1m7!3m6!1s0x0:0x0!2zNDPCsDA0JzI3LjkiTiA4OcKwMzQnMjQuMyJX!3b1!8m2!3d43.074417!4d-89.573417!4m1!3e1'>Directions</a><br>Pioneer Park/Town Hall");

 // Add legend
          // var legend = L.control({position: 'bottomright'});
          //
          // legend.onAdd = function(mymap) {
          //   var div = L.DomUtil.create('div', 'info legend');
          //   div.innerHTML += ["Trails</br>Trailheads</br>Middleton-owned Parcels</br><a href=lib/leaflet/images/marker-icon.png></a>"];
          //
          //
          //   return div;
          // };
          //
          // legend.addTo(mymap);

  // Create layer groups
  var coordinatesGroup = L.layerGroup([coordinatesLayer, coordinateLayer]);
  var parcelsGroup = L.layerGroup([midParLayer, schParLayer]);
  var baseLayers = {
    Basemap: tiles
  };
  var overlays = {
    Trailheads: coordinatesGroup,
    Parcels: parcelsGroup,
    Trails: trailsLayer
  };
  // Create layer control/pseudo-legend
  L.control.layers(baseLayers, overlays).addTo(mymap);


  // Add park label
  var parkPoint = {
    "type": "Feature",
    "properties": { "name":"Pioneer Park"}, "geometry": { "type": "Point", "coordinates": [43.07292, -89.574164]}};
  var parkLabel = L.geoJSON(null, {
    pointToLayer: function(){
      label = String("<strong>Pioneer Park</strong>")
      // Bind a permanent tooltip for makeshift label
      return new L.CircleMarker([43.0735, -89.57455], {
        radius: 1,
      }).bindTooltip(label, {permanent: true, direction: "center", className: "big-label", opacity: 1}).openTooltip();
    }
    });
  parkLabel.addData(parkPoint);
  parkLabel.addTo(mymap);

  // Add street labels
  var saukPoint = {
    "type": "Feature",
    "properties": { "name":"Old Sauk Rd"}, "geometry": { "type": "Point", "coordinates": [43.08, -89.578]}};
  var saukLabel = L.geoJSON(null, {
    pointToLayer: function(){
      label = String("Old Sauk Rd.")
      return new L.circleMarker([43.07485, -89.57], {
        radius: 1,
      }).bindTooltip(label, {permanent: true, direction: "center", className: "label", opacity: 1, transform: "rotate(45deg)"}).openTooltip();
    }
  });
saukLabel.addData(saukPoint);
saukLabel.addTo(mymap);







};

  //create new svg container for the map
  // var map = d3.select("div.mapContainer")
  //     .append("svg")
  //     .attr("class", "map")
  //     .attr("width", width)
  //     .attr("height", height);

  // Set custom UTM projection (Rotation to mimic UTM Zone 16N)
  // var projection = d3.geoTransverseMercator()
  //     .center([-1.78, 43.08])
  //     .rotate([87, 0])
  //     .translate([width / 2, height / 2])
  //     .scale(180000)
  //     .clipAngle(90);

  // Generate paths according to specified projection
  // var path = d3.geoPath()
  //     .projection(projection);
      // .context(context);

  // Create pan and zoom behavior
  // var zoom = d3.zoom()
  //   .scaleExtent([1,8])
  //   .on('zoom', function() {
  //     map.selectAll('path')
  //       .attr('transform', d3.event.transform);
  //   });


  // Connect zoom behavior to map
  // map.call(zoom);


      //Use Promise.all to parallelize asynchronous data loading
      // var promises = [];
      // promises.push(d3.json('Data/Boundary/BoundaryTopo.json')) //Load Middleton Town boundary
      // promises.push(d3.json('Data/Middleton_Roads/Town_of_Middleton_RoadsTopo.json')) //Load roads
      // promises.push(d3.json('Data/Trails/Exist_Imp_Ease_ReprojTopo.json')) //Load different trail types
      // promises.push(d3.json('Data/Trails/Parks_ReprojTopo.json'))
      // promises.push(d3.json('Data/Trails/Plan_Ease_ReprojTopo.json'))
      // promises.push(d3.json('Data/Trails/Plan_No_Ease_ReprojTopo.json'))
      // promises.push(d3.json('Data/Trails/Seg_Not_Rec_ReprojTopo.json'))
      // promises.push(d3.json('Data/Trails/Uncert_ReprojTopo.json'))
      // promises.push(d3.json('Data/Parcels/Middleton_Parcels_ReprojTopo.json')) //Load different parcel types
      // promises.push(d3.json('Data/Parcels/School_Parcels_ReprojTopo.json'))
      // promises.push(d3.json('Data/Points/MiddletonCoordinates.geojson'))


      // promises.push(d3.csv('data/State_Voting_Laws_Updated.csv')); //Load CSV attributes


      // Promise.all(promises).then(callback);

      // Callback initiated once all promises are pushed
      // function callback(data){
      //   	boundary = data[0];
      //     road = data[1];
      //     improveTrailEasement = data[2];
      //     park = data[3];
      //     plannedEasement = data[4];
      //     plannedNoEasement = data[5];
      //     notRecorded = data[6];
      //     uncertain = data[7];
      //     midParcels = data[8];
      //     schoolParcels = data[9];
      //     trailCoordinates = data[10];



          //Translate US TopoJSON to GeoJSON
          // var middletonBoundary = topojson.feature(boundary, boundary.objects.Boundary).features
          // var middletonRoads = topojson.feature(road, road.objects.Town_of_Middleton_Roads).features
          // var improvedTrailsEasements = topojson.feature(improveTrailEasement, improveTrailEasement.objects.exist_imp_ease_reproj).features
          // var middletonParks = topojson.feature(park, park.objects.parks_reproj).features
          // var plannedEasements = topojson.feature(plannedEasement, plannedEasement.objects.plan_ease_reproj).features
          // var plannedNoEasements = topojson.feature(plannedNoEasement, plannedNoEasement.objects.plan_no_ease_reproj).features
          // var middletonNotRecorded = topojson.feature(notRecorded, notRecorded.objects.seg_not_rec_reproj).features
          // var middletonUncertain = topojson.feature(uncertain, uncertain.objects.uncert_reproj).features
          // var middletonParcels = topojson.feature(midParcels, midParcels.objects.middleton_parcels_reproj).features
          // var schoolOwnParcels = topojson.feature(schoolParcels, schoolParcels.objects.school_parcels_reproj).features
          // var middletonCoordinates = trailCoordinates.features
          // join csv data to GeoJSON data
          // usaStates = joinData(usaStates, csvData);
          //add enumeration units to the map
          // setEnumerationUnits(usaStates, map, path);

          // Create popup for clicks
          // var popup = d3.select("div.mapContainer")
          //   .append("div")
          //     .style("position", "absolute")
          //     .style("visibility", "hidden")
          //     .text("Test");


          // Add Middleton town boundary to map
          // var boundaries = map.selectAll(".boundaries")
          //     .data(middletonBoundary)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "boundaries"
          //     })
          //     .attr("d", path);
          //
          // var midPar = map.selectAll(".midPar")
          //   .data(middletonParcels)
          //   .enter()
          //   .append("path")
          //   .attr("class", function(d){
          //     return "midPar"
          //   })
          //   .attr("d", path);
          //
          // var schPar = map.selectAll(".schPar")
          //   .data(schoolOwnParcels)
          //   .enter()
          //   .append("path")
          //   .attr("class", function(d){
          //     return "schPar"
          //   })
          //   .attr("d", path);
          //
          // var roads = map.selectAll(".roads")
          //     .data(middletonRoads)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "roads"
          //     })
          //     .attr("d", path);
          //
          // var impTrailEase = map.selectAll(".impTrailEase")
          //     .data(improvedTrailsEasements)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "impTrailEase"
          //     })
          //     .attr("d", path);
          //
          //   var parks = map.selectAll(".parks")
          //     .data(middletonParks)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "parks"
          //     })
          //     .attr("d", path);
          //
          //   var planEase = map.selectAll(".planEase")
          //     .data(plannedEasements)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "planEase"
          //     })
          //     .attr("d", path);
          //
          //   var planNoEase = map.selectAll(".planNoEase")
          //     .data(plannedNoEasements)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "planNoEase"
          //     })
          //     .attr("d", path);
          //
          //   var notRec = map.selectAll(".notRec")
          //     .data(middletonNotRecorded)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "notRec"
          //     })
          //     .attr("d", path);
          //
          //   var uncert = map.selectAll(".uncert")
          //     .data(middletonUncertain)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "uncert"
          //     })
          //     .attr("d", path);
          //
          //   var trailCoord = map.selectAll(".trailCoord")
          //     .data(middletonCoordinates)
          //     .enter()
          //     .append("path")
          //     .attr("class", function(d){
          //       return "trailCoord"
          //     })
          //     .attr("d", path)
          //       .on("click", function(d){
          //         console.log(popup)
          //         return popup.style("visibility", "visible")
                  // popup.style("top", (event.pageY))

                // });





        // function highlight(props, usaStates){
            //change STROKE highlight method
            //Call setlabel to create label
        //     for(var i =0; i < stateAbbs.length; i++) {
        //       var tempStr = "#" + stateAbbs[i];
        //       d3.selectAll(tempStr)
        //         .style("opacity", "0.5");
        //     }
        //     var selected = d3.selectAll("#" + props.StateAbb)
        //         .style("stroke", "#00FFFF") //highlight color
        //         .style("stroke-width", "2px")
        //         .style("opacity", "1"); //highlight width
        //     setLabel(props);
        // };
  // d3.json("Data/Boundary/BoundaryTopo.json", function(error, world) {
  //   var land = topojson.feature(boundary, boundary.objects.Boundary),
  //       center = -180,
  //       velocity = .015,
  //       zone, zoneText, zoneStart, zoneEnd,
  //       t0;

    // d3.timer(function() {
    //   context.clearRect(0, 0, width, height);
    //   projection.rotate([-center, 0]);
    //
    //   zone = utmZone(center);
    //   zoneText = (1e15 + zone + "").slice(-2), // Add leading zero
    //   zoneStart = -186 + zone * 6;
    //   zoneEnd = zoneStart + 6;
    //   t0 = Date.now();
    //
    //   render();
    //
    //   center += velocity * (Date.now() - t0);
    //   if (center >= 180) { // New roundtrip
    //     center = -180;
    //   }
    // });

    // function render() {
    //   context.beginPath();
    //   path(land);
    //   context.fillStyle = 'black';
    //   context.fill();
    //
    //   context.beginPath();
    //   path({
    //     "type": "Polygon",
    //     "coordinates": [[[zoneStart, 84], [zoneEnd, 84],  [zoneEnd, -80], [zoneStart, -80], [zoneStart, 84]]]
    //   });
    //   context.fillStyle = "rgba(255, 255, 0, .5)";
    //   context.fill();
    //
    //   context.beginPath();
    //   path(graticule());
    //   context.lineWidth = .5;
    //   context.stroke();
    //
    //   context.beginPath();
    //   context.fillStyle = "#eee";
    //   context.strokeStyle = "black";
    //   context.lineWidth = 1;
    //   context.font = "bold 40px Verdana";
    //   context.fillText(zoneText, width / 2 - 30, height / 2);
    //   context.strokeText(zoneText, width / 2 - 30, height / 2);
    // }

//   };
// };









// function joinData(usaStates, csvData){
//     // assign csv attributes to GeoJSON with each loop
//     for (var i=0; i<csvData.length; i++){
//         // index states
//         var csvState = csvData[i];
//         // name is joining field
//         var csvKey = csvState.name;
//         csvKey = csvKey.replace(" ", "_").trim();
//
//         // loop through GeoJSON states to find correct one
//         for (var a=0; a<usaStates.length; a++){
//             var geojsonProps = usaStates[a].properties,
//             geojsonKey = geojsonProps.name;
//             geojsonKey = geojsonKey.replace(" ", "_").trim();
//
//             // conditional statement transferring data when names match
//             if (geojsonKey == csvKey){
//                 // when condition met, assign attributes and values
//                 attrArray.forEach(function(attr){
//                     // make variable equal to csv value, check if float or string
//                     var val = csvState[attr];
//                     if(!isNaN(csvState[attr])) {
//                       val=parseFloat(csvState[attr]);
//                     }
//                     // assign value to GeoJSON
//                     geojsonProps[attr] = val;
//                 });
//             };
//
//         };
//     };
//     return usaStates;
// };
//
//
// //function to create color scale generator
// function findFill(data, attArray){
//     // PURPLE COLOR SCALE
//     var  colorClasses = [
//         "#f2f0f7",
//         "#cbc9e2",
//         "#9e9ac8",
//         "#756bb1",
//         "#54278f"
//     ];
//     if(attArray.length == 5) {
//       if(data == attArray[0]) {
//         return colorClasses[0];
//       } else if (data == attArray[1]) {
//         return colorClasses[1];
//       } else if (data==attArray[2]) {
//         return colorClasses[2];
//       } else if (data==attArray[3]) {
//         return colorClasses[3];
//       } else if(data==attArray[4]){
//         return colorClasses[4];
//       };
//     };
//
//     if(attArray.length == 4) {
//       if(data == attArray[0]) {
//         return colorClasses[0];
//       } else if (data == attArray[1]) {
//         return colorClasses[1];
//       } else if (data==attArray[2]) {
//         return colorClasses[2];
//       } else if (data==attArray[3]) {
//         return colorClasses[4];
//       };
//     };
//
//     if(attArray.length == 3) {
//       if(data == attArray[0]) {
//         return colorClasses[0];
//       } else if (data == attArray[1]) {
//         return colorClasses[2];
//       } else if (data==attArray[2]) {
//         return colorClasses[4];
//       };
//     };
//
//     if(attArray.length == 2) {
//       if(isNaN(data)) {
//         return  colorClasses[4];
//       } else {
//         return colorClasses[0];
//       };
//     };
//
//   };
//
// function setEnumerationUnits(usaStates, map, path){
//
//     //add states to map
//     var states = map.selectAll(".states")
//         .data(usaStates)
//         .enter()
//         .append("path")
//         .attr("class", function(d){
//             return "State:" + d.properties.StateAbb;
//         })
//         .attr("id", function(d){
//             return d.properties.StateAbb;
//         })
//         .attr("d", path)
//           .on("mouseover", function(d){
//               highlight(d.properties, usaStates);
//           })
//           .on("mouseout", function(d){
//               dehighlight(d.properties, usaStates);
//           })
//         .attr("fill", function(d) {
//           return findFill(d.properties["Grade"], expressedOpt);
//         });
//
//
//         $(".collapsed1").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["Grade"], expressedOpt);
//               });
//           };
//         });
//         $(".collapsed2").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["EarlyVotingStatus"], collapse2Opt);
//               });
//           };
//         });
//         $(".collapsed3").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["IncorrectlyCastProvisionalVote"], collapse3Opt);
//               });
//           };
//         });
//         $(".collapsed4").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["OnlineRegImplementYr"], collapse4Opt);
//               });
//           };
//         });
//         $(".collapsed5").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["VoterIDRequirement"], collapse5Opt);
//               });
//           };
//         });
//         $(".collapsed6").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["ElectionDayVoteCenters"], collapse6Opt);
//               });
//           };
//         });
//         $(".collapsed7").click(function() {
//           for(var i =0; i < stateAbbs.length; i++) {
//             map.select("#" + stateAbbs[i])
//               .attr("fill", function(d) {
//                 return findFill(d.properties["RightsLosttoFelons"], collapse7Opt);
//               });
//           };
//         });
//
//       //alternate dehighlight for fill
//       var desc = states.append("desc")
//           .text('{"fill": "#000"}');
// };
//
//
// function highlight(props, usaStates){
//     //             //change STROKE highlight method
//     //Call setlabel to create label
//     for(var i =0; i < stateAbbs.length; i++) {
//       var tempStr = "#" + stateAbbs[i];
//       d3.selectAll(tempStr)
//         .style("opacity", "0.5");
//     }
//     var selected = d3.selectAll("#" + props.StateAbb)
//         .style("stroke", "#00FFFF") //highlight color
//         .style("stroke-width", "2px")
//         .style("opacity", "1"); //highlight width
//     setLabel(props);
// };
//
// //function to reset the element style on mouseout
// function dehighlight(props, usaStates, rectA, rectB, rectC, rectD, rectF){
//   //             // STROKE DEHIGHLIGHT
//   for(var i =0; i < stateAbbs.length; i++) {
//     var tempStr = "#" + stateAbbs[i];
//     d3.selectAll(tempStr)
//       .style("opacity", "1");
//   }
//   var selected = d3.selectAll("#" + props.StateAbb)
//         .style("stroke-width", "1.1px")
//         .style("stroke", "#fff");
//   defaultPanel();
//
// };
//
// //function to create dynamic label
// function setLabel(props){
//
//   //Update retrieve panel inner HTML with hover
//   var textBox = props.name +"<br/>" + "Grade: " + props.Grade + "<br/>";
//   if(isNaN(props["OnlineRegImplementYr"])) {
//     textBox+= "Online Registration: No<br/>";
//   } else {
//     textBox+= "Online Registration: Yes<br/>";
//   };
//   textBox+="Early Voting Status: " + props["EarlyVotingStatus"] + "<br/>" + "Voter ID Requirement: " + props["VoterIDRequirement"] + "<br/>";
//   textBox+= "Election Day Vote Centers: " + props["ElectionDayVoteCenters"] + "<br/>";
//   textBox+= "Voting Rights Lost to Felons: " + props["RightsLosttoFelons"] + "<br/>";
//   textBox+= "Incorrectly Cast Provisional Vote: " + props["IncorrectlyCastProvisionalVote"] + "<br/>";
//
//   document.getElementById("retrieveTitle").innerHTML=textBox;
//   d3.select("#retrieveTitle")
//     .style("size", "14pt")
//     .style("color", "white"); //retrieve text color
//
// };
// function defaultPanel() {
//   document.getElementById("retrieveTitle").innerHTML="No State Selected";
// };
