// Scene object where drawing line segments, polygons and visibility triangles reside
function Scene(ctx) {

    this.ctx = ctx;

    // Method for drawing a polygon, given its vertex array, fill color and stroke color
    this.drawPolygon = function(pointsArray, fillColor, strokeColor="#000") {
        if (pointsArray.length <= 0) 
            return;

        this.ctx.moveTo(pointsArray[0].x, pointsArray[0].y);

        for (var i = 0; i < pointsArray.length-1; i++) {
            this.drawSegment(strokeColor, { p1: pointsArray[i], p2: pointsArray[i+1] });
        }

        if (fillColor != null && fillColor != undefined) {
            this.ctx.fillStyle = fillColor;
            //this.ctx.fill();
        }
    };

    // Method for drawing a segment from point 1 (p1) to point 2 (p2)
    this.drawSegment = function(color, {p1, p2}) {
        this.ctx.save();
        this.ctx.beginPath();
        if (color){
            this.ctx.strokeStyle = color;
        } else {
            this.ctx.strokeStyle = 'black';
        }
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();
    };

    // Method for drwaing a visibility triangles, visibilityInfo is an array of the array of two points such as [[p1, p2], ...]
    this.drawVisibilityTriangles = function(color, point, visibilityInfo) {
        this.ctx.save();
        this.ctx.strokeStyle = color;
        for(var i = 0; i < visibilityInfo.length; i++){
            let [p1, p2] = visibilityInfo[i];
            this.ctx.moveTo(point.x, point.y);
            this.ctx.lineTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.ctx.restore();
    };

    // Method for drawing the scene given polygon vertices, point, visibility, and color informations
    this.drawScene = function(pointsArray, point, visibility, polygonColor, triangleColor) {
        this.ctx.clearRect(-10000, -10000, 20000, 20000);
        this.drawPolygon(pointsArray, polygonColor);

        // Check if the mouse cursor is in the polygon
        if (this.pointInPolygon(pointsArray, point) === true) {
            this.drawVisibilityTriangles(triangleColor, point, visibility);
        }
    }

    // Method for checking if a given point resides within the polygon with given vertices
    this.pointInPolygon = function(pointsArray, point) {
        let i = 0;
        let j = 0;
        let c = 0;

        for (i = 0, j = pointsArray.length - 1; i < pointsArray.length; j = i++) {
            if (((pointsArray[i].y > point.y) !== (pointsArray[j].y > point.y)) && 
                (point.x < (pointsArray[j].x - pointsArray[i].x) * (point.y - pointsArray[i].y) / (pointsArray[j].y - pointsArray[i].y) + pointsArray[i].x)) {
                    c = !c;
                }
        }

        return c;
    }
}
