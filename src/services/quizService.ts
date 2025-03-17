const SHEET_ID = '1OHGZn1a5yr6AmPPLiy_vW30whbejsKyWTFgSSxRrzgY';
const API_KEY = 'AIzaSyA6Nj2FGa-Vsom8HRPZxNlQQ3rE7PSLqPQ';

export async function fetchQuizData(): Promise<QuizQuestion[]> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:G26?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }

    const data = await response.json();
    const rows = data.values.slice(1); // Skip header row

    return rows.map((row: string[], index: number) => ({
      id: index + 1,
      question: row[0],
      options: row.slice(1, 5),
      correctAnswer: row[5],
      explanation: row[6]
    }));
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
}