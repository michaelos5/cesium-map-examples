// NOTE: Set token here
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

// Wrap your async code inside an async function
async function loadTileset() {
    try {
        // Use await inside this async function
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
        viewer.scene.primitives.add(tileset);

        const boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(
            boundingSphere,
            new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius + 500.0),
        );
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    } catch (error) {
        console.log(`Error loading tileset: ${error}`);
    }
}

// Call the async function
loadTileset();

const polygon = viewer.entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromRadiansArray([
                -1.3194369277314022, 0.6988062530900625, -1.3193955980204217,
                0.6988091578771254, -1.3193931220959367, 0.698743632490865,
                -1.3194358224045408, 0.6987471965556998,
            ]),
        ),
        material: Cesium.Color.RED.withAlpha(0.5),
        classificationType: Cesium.ClassificationType.BOTH,
    },
});

const polyline = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -75.60217330403601, 40.04102882709425, -75.59968252414251,
            40.04093615560871, -75.598020153828, 40.04079437042357, -75.59674934074435,
            40.040816173283304, -75.59630042791713, 40.03986900370842,
            -75.59563636849978, 40.03930996506271, -75.59492397899098,
            40.03873932846581, -75.59457991226778, 40.038392701955786,
            -75.59424838652453, 40.03775403572295, -75.59387104290336,
            40.03677022167725, -75.59355000490342, 40.03588760913535,
        ]),
        width: 8,
        material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.YELLOW,
            outlineWidth: 2,
            outlineColor: Cesium.Color.BLACK,
        }),
        clampToGround: true,
    },
});

const classificationOptions = [
    {
        text: "Classify Both",
        onselect: function () {
            polygon.polygon.classificationType = Cesium.ClassificationType.BOTH;
            polyline.polyline.classificationType = Cesium.ClassificationType.BOTH;
        },
    },
    {
        text: "Classify Terrain",
        onselect: function () {
            polygon.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
            polyline.polyline.classificationType = Cesium.ClassificationType.TERRAIN;
        },
    },
    {
        text: "Classify 3D Tiles",
        onselect: function () {
            polygon.polygon.classificationType =
                Cesium.ClassificationType.CESIUM_3D_TILE;
            polyline.polyline.classificationType =
                Cesium.ClassificationType.CESIUM_3D_TILE;
        },
    },
];

const materialOptions = [
    {
        text: "Red Material",
        onselect: function () {
            polygon.polygon.material = Cesium.Color.RED.withAlpha(0.5);
        },
    },
    {
        text: "Textured Material",
        onselect: function () {
            if (!Cesium.Entity.supportsMaterialsforEntitiesOnTerrain(viewer.scene)) {
                window.alert(
                    "Terrain Entity materials are not supported on this platform",
                );
            }
            polygon.polygon.material = "../images/Cesium_Logo_Color.jpg";
        },
    },
];

// Add toolbar menu options (specific to Sandcastle environment)
Sandcastle.addToolbarMenu(classificationOptions);
Sandcastle.addToolbarMenu(materialOptions);
