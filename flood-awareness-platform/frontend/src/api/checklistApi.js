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