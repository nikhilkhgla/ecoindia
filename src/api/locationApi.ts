export const getLocationName = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
    );
    
    if (!response.ok) {
      throw new Error('Location reverse geocoding failed');
    }
    
    const data = await response.json();
    
    // Extract city and state or district
    const address = data.address;
    let location = '';
    
    if (address.city || address.town || address.village) {
      location = address.city || address.town || address.village;
    }
    
    if (address.state || address.state_district) {
      location += location ? `, ${address.state || address.state_district}` : address.state || address.state_district;
    }
    
    return location || 'Unknown Location';
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Unknown Location';
  }
};
