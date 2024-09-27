import axios from 'axios';

// Function to get the user's current position
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

// Function to fetch the address from Nominatim (OpenStreetMap)
export const fetchAddress = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon,
        format: 'json',
        addressdetails: 1,
      },
    });
    const result = response.data.address;
    return {
      house_number: result.house_number || 'Unknown',
      road: result.road || 'Unknown street',
      suburb: result.suburb || result.neighbourhood || 'Unknown suburb',
      city: result.city || result.town || result.village || 'Unknown city',
      state: result.state || 'Unknown state',
      postcode: result.postcode || 'Unknown postcode',
      country: result.country || 'Unknown country',
    };
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};
