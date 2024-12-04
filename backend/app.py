from flask import Flask, jsonify, request
from flask_cors import CORS
from geopy.geocoders import Nominatim
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

#Restrict CORS to specific origin
CORS(app, resources={
    r"/api/*": {"origins": ["http://localhost:3000"]}
})

# Add rate limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per minute"],
)

# Function to geocode a location using geopy
def geocode_location(location):
    geolocator = Nominatim(user_agent="ssw590-skifindr-app")
    try:
        location_data = geolocator.geocode(location)
        if location_data:
            return {
                "latitude": location_data.latitude,
                "longitude": location_data.longitude
            }
    except Exception as e:
        print(f"Error: {e}")
    return None

# API endpoint to get coordinates
@app.route('/api/geocode', methods=['POST'])
@limiter.limit("100 per minute")
def geocode():
    data = request.json
    location = data.get('location')
    if not location:
        return jsonify({'error': 'Location is required'}), 400

    coords = geocode_location(location)
    if coords:
        return jsonify(coords)
    else:
        return jsonify({'error': 'Unable to find location'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000)

