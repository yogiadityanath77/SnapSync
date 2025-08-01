import React, { useRef, useEffect, useState } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;
  const [olReady, setOlReady] = useState(false);

  // Wait for OpenLayers to be loaded
  useEffect(() => {
    const checkOL = setInterval(() => {
      if (window.ol && window.ol.Map) {
        clearInterval(checkOL);
        setOlReady(true);
      } else {
        console.log("⏳ Waiting for OpenLayers to load...");
      }
    }, 100);
    return () => clearInterval(checkOL);
  }, []);

  useEffect(() => {
    if (!olReady) return;

    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom, olReady]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
