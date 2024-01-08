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
        id: "evacuation-layer",
        source: "evacuation",
        "source-layer": "evacuation", // ベクトルタイル内のレイヤー名
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 2, 14, 6],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      },
    ],
  },
});

map.on("load", () => {
  const opacity = new OpacityControl({
    baseLayers: {
      "flood-layer": "洪水浸水想定区域（想定最大規模）",
      "hightide-layer": "高潮浸水想定区域",
      "tsunami-layer": "津波浸水想定",
      "dosekiryu-layer": "土砂災害警戒区域（土石流）",
      "kyukeisha-layer": "土砂災害警戒区域（急傾斜地の崩壊）",
      "jisuberi-layer": "土砂災害警戒区域（地すべり）",
    },
  });
  map.addControl(opacity, "top-left");
});
