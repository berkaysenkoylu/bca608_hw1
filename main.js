const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

// Setup the random polygon points and order them angularly
var polygonPoints = [];
var polygon = new Polygon();
polygonPoints = polygon.generateRandomPolygonVertices(10);

var polygonCentroid = polygon.findCentroid();
polygonPoints = polygon.sortAngularly();

// Create a scene object and draw the polygon
var scene = new Scene(ctx);
scene.drawPolygon(polygonPoints);

let point = Point(polygonCentroid.x, polygonCentroid.y);

var endpoints = loadMap(polygonPoints, point);
var visibility = calculateVisibility(point, endpoints);

scene.drawVisibilityTriangles('#00f', point, visibility);








const move = (point) => {
    //endpoints = loadMap(polygonPoints, point);
    //visibility = calculateVisibility(point, endpoints);

    requestAnimationFrame(() => {
        ctx.clearRect(-10000, -10000, 20000, 20000);
        scene.drawPolygon(polygonPoints);
        
        

        //scene.drawVisibilityTriangles('#00f', point, visibility);
        //point.drawLine(ctx, polygonPoints[j][0], polygonPoints[j][1]);
            
    });
};

canvas.addEventListener('mousemove', ({pageX, pageY}) => {
    // Add a circle or sth to represent the agent
    // Point
    point = Point(pageX, pageY);
    //var point = new Point([pageX, pageY])

    move(point);
});




// Experimental
// polygon.drawPolygon('#F00');
//https://www.redblobgames.com/articles/visibility/
//https://github.com/berkaysenkoylu/2d-visibility/blob/master/src/drawScene.js
//https://stackoverflow.com/questions/4839993/how-to-draw-polygons-on-an-html5-canvas

// for(var j=0; j < polygonPoints.length-1; j++){
        //     let vertexPoint = Point(polygonPoints[j].x, polygonPoints[j].y);

        //     scene.drawSegment("#000", {p1: point, p2: vertexPoint});
        // }