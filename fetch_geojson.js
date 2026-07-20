const fs = require('fs');

async function getGeoJson() {
  const res = await fetch("https://nominatim.openstreetmap.org/search.php?q=Sukorame+Binangun+Blitar&polygon_geojson=1&format=json", {
    headers: { "User-Agent": "website-desa-sukorame-bot" }
  });
  const data = await res.json();
  if (data && data.length > 0) {
    fs.writeFileSync('./public/sukorame.geojson', JSON.stringify(data[0].geojson));
    console.log("Success! Saved to public/sukorame.geojson");
  } else {
    console.log("Not found in Nominatim.");
  }
}
getGeoJson();
