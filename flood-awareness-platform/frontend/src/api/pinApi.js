const BASE_URL = 'http://localhost:5001/api/pins';

export const fetchUserPins = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching pins:", error);
    throw error;
  }
};

export const savePin = async (pinData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pinData)
    });
    if (!response.ok) throw new Error('Failed to save pin');
    return await response.json();
  } catch (error) {
    console.error("Error saving pin:", error);
    throw error;
  }
};

export const deletePin = async (pinId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/${pinId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete pin');
    return await response.json();
  } catch (error) {
    console.error("Error deleting pin:", error);
    throw error;
  }
};