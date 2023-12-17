const map = new ol.Map({
    target: "map",  // 表示するHTML要素ID
    layers: [ // OpenStreetMapをレイヤーに追加
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({ // 初期表示領域
      center: ol.proj.fromLonLat([0,0]),
      zoom: 6
    })
});