const BASE_URL = 'http://localhost:5001/api/checklists';

export const fetchGuestChecklist = async () => {
  try {
    const response = await fetch(`${BASE_URL}/guest`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching checklist:", error);
    throw error;
  }
};

export const fetchUserChecklist = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/my`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching user checklist:", error);
    throw error;
  }
};

export const createChecklistItem = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checklist item');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating checklist item:", error);
    throw error;
  }
};