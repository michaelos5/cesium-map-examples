// NOTE: add cesium token
// Initialize Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer');

// Define the coordinates for points A, B, C, D, E
const positions = [
    Cesium.Cartesian3.fromDegrees(-75.5972, 40.0388), // A
    Cesium.Cartesian3.fromDegrees(-70.5972, 40.0388), // B
    Cesium.Cartesian3.fromDegrees(-70.5972, 41.0388), // C
    Cesium.Cartesian3.fromDegrees(-75.5972, 41.0388), // D
    Cesium.Cartesian3.fromDegrees(-75.5972, 40.0388)  // E (back to A)
];

// Array of materials for each segment
const materials = [
    new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.RED,
        outlineWidth: 2,
        outlineColor: Cesium.Color.WHITE
    }),
    new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.GREEN,
        outlineWidth: 2,
        outlineColor: Cesium.Color.WHITE
    }),
    new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.BLUE,
        outlineWidth: 2,
        outlineColor: Cesium.Color.WHITE
    }),
    new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.YELLOW,
        outlineWidth: 2,
        outlineColor: Cesium.Color.WHITE
    }),
    new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.PURPLE,
        outlineWidth: 2,
        outlineColor: Cesium.Color.WHITE
    })
];

// Descriptions for each segment
const descriptions = [
    "Segment from A to B: This segment is marked in red.",
    "Segment from B to C: This segment is marked in green.",
    "Segment from C to D: This segment is marked in blue.",
    "Segment from D to E: This segment is marked in yellow.",
    "Segment from E back to A: This segment is marked in purple."
];

// Create a polyline for each segment
for (let i = 0; i < positions.length - 1; i++) {
    viewer.entities.add({
        polyline: {
            positions: [positions[i], positions[i + 1]], // Segment between two consecutive points
            width: 5 + i, // Vary the width for each segment
            material: materials[i % materials.length], // Use different materials for each segment
            depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.WHITE.withAlpha(0.5),
                outlineWidth: 2,
                outlineColor: Cesium.Color.BLACK
            })
        },
        description: descriptions[i] // Add description for each segment
    });
}

// Adjust the camera to view the polylines
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-73.5972, 40.5388, 500000)
});
