// Defining SVG Canvas


var draw = SVG('drawing1').size(648, 480);
var image = draw.image('./0.png')
var group = draw.group()

$('.ui.dropdown')
    .dropdown({
        onChange: function (value, text, $choice) {
            image.remove()
            image = draw.image('./'+(value-1)+'.png');
            group.front()
        }
    })
;
console.log(image)

function Point(x, y) {
    return {x: y, y: x}
}

var PointList = [
    Point(135.6, 279.),
    Point(135.6, 267.),
    Point(120.6, 231.),
    Point(108., 221.4),
    Point(96., 221.4),
    Point(86.4, 237.),
    Point(86.4, 258.),
    Point(92.4, 276.),
    Point(114., 294.6),
    Point(123., 294.6),
    Point(135.6, 279.)
];

var nArray = []
for (i = 0; i <= PointList.length; i++) {
    nArray.push(PointList[i % PointList.length])
}

// var nArray = [
//     PointList[0],
//     PointList[1],
//     PointList[2],
//     PointList[0],
//     PointList[3],
//     PointList[1],
//     PointList[4],
//     PointList[2],
//     PointList[5],
//     PointList[4]
// ];


function toDraw(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray.push([array[i].x, array[i].y])
    }
    return newArray
}

var makeCircle = function (position) {
    var circleName = draw.circle(10).center(PointList[position].x, PointList[position].y).fill('#1890E6').stroke({
        width: 1,
        color: '#1890E6 '
    });
    group.add(circleName)
    circleName.draggable();

    circleName.on('dragmove', function (event) {
        event.preventDefault();
        PointList[position].x = event.detail.p.x;
        PointList[position].y = event.detail.p.y;
        polyline.plot(toDraw(nArray));
        circleName.center(PointList[position].x, PointList[position].y);
    });
    circleName.addClass("marker");

    return circleName;
};


var polyline = draw.polyline(toDraw(nArray)).fill('none').stroke({width: 1, color: '#1890E6  '});
group.add(polyline)

for (i = 0; i < PointList.length; i++) {
    makeCircle(i)
}

