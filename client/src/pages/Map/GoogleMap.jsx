import { useEffect, useRef, useState } from "react";

const GoogleMap = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [output, setOutput] = useState({ distance: "", duration: "" });
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsDisplayRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const myLat = { lat: 38.346, lng: -0.4907 };
      const mapOptions = {
        center: myLat,
        zoom: 7,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Initialize Directions Service and Renderer
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsDisplayRef.current = new window.google.maps.DirectionsRenderer();

      // Link DirectionsRenderer to the map
      directionsDisplayRef.current.setMap(map);

      // Autocomplete setup
      const autocompleteFrom = new window.google.maps.places.Autocomplete(
        fromRef.current
      );
      autocompleteFrom.addListener("place_changed", () => {
        const place = autocompleteFrom.getPlace();
        if (place && place.geometry) {
          setFrom(place.formatted_address);
        }
      });

      const autocompleteTo = new window.google.maps.places.Autocomplete(
        toRef.current
      );
      autocompleteTo.addListener("place_changed", () => {
        const place = autocompleteTo.getPlace();
        if (place && place.geometry) {
          setTo(place.formatted_address);
        }
      });
    };

    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = loadMap; // Assign loadMap to window for the callback
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script on unmount
      delete window.initMap;
    };
  }, []);

  const calcRoute = (event) => {
    event.preventDefault(); // Prevent form submission

    const request = {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    };

    directionsServiceRef.current.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        // Display the route on the map
        directionsDisplayRef.current.setDirections(result);

        // Calculate distance and duration
        const distance = result.routes[0].legs[0].distance.text;
        const duration = result.routes[0].legs[0].duration.text;

        // Update output state
        setOutput({ distance, duration });
      } else {
        setOutput({
          distance: "",
          duration: "Could not calculate distance.",
        });
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <div className="container">
          <h1 className="text-center">Find the Distance between Two Places</h1>
          <form className="form-horizontal" onSubmit={calcRoute}>
            <div className="form-group">
              <label htmlFor="from">From location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Origin location"
                ref={fromRef}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="to">To location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Destination location"
                ref={toRef}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-info btn-lg">
                Calculate
              </button>
            </div>
          </form>
          <div id="output">
            {output.distance ? (
              <div className="alert alert-info">
                Distance: {output.distance} <br /> Duration: {output.duration}
              </div>
            ) : (
              <div className="alert alert-danger">{output.duration}</div>
            )}
          </div>
        </div>
      </div>
      <div className="md:w-1/2">
        <div
          id="googleMap"
          ref={mapRef}
          style={{ width: "100%", height: "400px" }}
        ></div>
      </div>
    </div>
  );
};

export default GoogleMap;

    
 
