const BASE_URL = 'http://localhost:5001/api/articles';

export const fetchArticles = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};