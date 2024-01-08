import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import OpacityControl from "maplibre-gl-opacity";
import "maplibre-gl-opacity/dist/maplibre-gl-opacity.css";

const map = new maplibregl.Map({
  container: "map",
  zoom: 5,
  center: [138, 37],
  minZoom: 5,
  maxZoom: 18,
  maxBounds: [122, 20, 154, 50], // 表示可能範囲
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        maxzoom: 19,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      // 洪水浸水想定区域（想定最大規模）
      flood: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 高潮浸水想定区域
      hightide: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 津波浸水想定
      tsunami: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 土砂災害警戒区域（土石流）
      dosekiryu: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 土砂災害警戒区域（急傾斜地の崩壊）
      kyukeisha: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 土砂災害警戒区域（地すべり）
      jisuberi: {
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '&copy; <a href="https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      // 指定緊急避難場所
      evacuation: {
        type: "vector",
        tiles: [
          `${location.href.replace(
            "/index.html",
            ""
          )}/evacuation-sites/{z}/{x}/{y}.pbf`,
        ],
        minzoom: 5,
        maxzoom: 8,
        attribution:
          '<a href="https://www.gsi.go.jp/bousaichiri/hinanbasho.html">国土地理院:指定緊急避難場所データ</a>',
      },
    },
    layers: [
      {
        id: "osm-layer",
        source: "osm",
        type: "raster",
      },
      {
        id: "flood-layer",
        source: "flood",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "hightide-layer",
        source: "hightide",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "tsunami-layer",
        source: "tsunami",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "dosekiryu-layer",
        source: "dosekiryu",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "kyukeisha-layer",
        source: "kyukeisha",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "jisuberi-layer",
        source: "jisuberi",
        type: "raster",
        paint: { "raster-opacity": 0.7 },
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-flood-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "flood"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-dosekiryu-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "dosekiryu"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-hightide-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "hightide"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-earthquake-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "earthquake"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-tsunami-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "tsunami"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-fire-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "fire"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-inlandflood-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "inlandflood"]],
        layout: { visibility: "none" },
      },
      {
        id: "evacuation-volcano-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
        filter: ["==", 1, ["get", "volcano"]],
        layout: { visibility: "none" },
      },
    ],
  },
});

map.on("load", () => {
  const hazardControl = new OpacityControl({
    baseLayers: {
      "flood-layer": "洪水浸水想定区域（想定最大規模）",
      "hightide-layer": "高潮浸水想定区域",
      "tsunami-layer": "津波浸水想定",
      "dosekiryu-layer": "土砂災害警戒区域（土石流）",
      "kyukeisha-layer": "土砂災害警戒区域（急傾斜地の崩壊）",
      "jisuberi-layer": "土砂災害警戒区域（地すべり）",
    },
  });
  map.addControl(hazardControl, "top-left");

  const evacuationControl = new OpacityControl({
    baseLayers: {
      "evacuation-flood-layer": "洪水",
      "evacuation-dosekiryu-layer": "崖崩れ/土石流/地滑り",
      "evacuation-hightide-layer": "高潮",
      "evacuation-earthquake-layer": "地震",
      "evacuation-tsunami-layer": "津波",
      "evacuation-fire-layer": "大規模な火事",
      "evacuation-inlandflood-layer": "内水氾濫",
      "evacuation-volcano-layer": "火山現象",
    },
  });
  map.addControl(evacuationControl, "top-left");

  map.on("mousemove", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        "evacuation-flood-layer",
        "evacuation-dosekiryu-layer",
        "evacuation-hightide-layer",
        "evacuation-earthquake-layer",
        "evacuation-tsunami-layer",
        "evacuation-fire-layer",
        "evacuation-inlandflood-layer",
        "evacuation-volcano-layer",
      ],
    });
    if (features.length > 0) {
      map.getCanvas().style.cursor = "pointer";
    } else {
      map.getCanvas().style.cursor = "";
    }
  });

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        "evacuation-flood-layer",
        "evacuation-dosekiryu-layer",
        "evacuation-hightide-layer",
        "evacuation-earthquake-layer",
        "evacuation-tsunami-layer",
        "evacuation-fire-layer",
        "evacuation-inlandflood-layer",
        "evacuation-volcano-layer",
      ],
    });
    if (features.length === 0) return;
    const feature = features[0];
    const popup = new maplibregl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
        `
      <div style="font-weight: 900;">${feature.properties.name}</div>
      <div>${feature.properties.address}</div>
      <div>${feature.properties.remarks ?? ""}</div>
      <span${
        feature.properties.flood ? "" : ' style="color: #ccc;"'
      }>洪水</span>
      <span${
        feature.properties.dosekiryu ? "" : ' style="color: #ccc;"'
      }>崖崩れ/土石流/地滑り</span>
      <span${
        feature.properties.hightide ? "" : ' style="color: #ccc;"'
      }>高潮</span>
      <span${
        feature.properties.earthquake ? "" : ' style="color: #ccc;"'
      }>地震</span>
      <span${
        feature.properties.tsunami ? "" : ' style="color: #ccc;"'
      }>津波</span>
      <span${
        feature.properties.fire ? "" : ' style="color: #ccc;"'
      }>大規模な火事</span>
      <span${
        feature.properties.inlandflood ? "" : ' style="color: #ccc;"'
      }>内水氾濫</span>
      <span${
        feature.properties.volcano ? "" : ' style="color: #ccc;"'
      }>火山現象</span>
      `
      )
      .addTo(map);
  });
});
