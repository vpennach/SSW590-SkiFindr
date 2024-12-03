from geopy.geocoders import Nominatim

def test_geopy():
    geolocator = Nominatim(user_agent="ssw590-skifindr-app")
    location = geolocator.geocode("Brooklyn, NY")
    if location:
        print(f"Latitude: {location.latitude}, Longitude: {location.longitude}")
    else:
        print("Unable to geocode location")

print(test_geopy())