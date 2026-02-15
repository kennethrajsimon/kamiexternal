const getApiBase = () => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
      // @ts-ignore
      return process.env.NEXT_PUBLIC_API_URL;
    }
  } catch (e) {}
  
  try {
    // @ts-ignore
    if (import.meta.env?.VITE_API_URL) {
      // @ts-ignore
      return import.meta.env.VITE_API_URL;
    }
  } catch (e) {}
  
  return ''; // Use relative path to leverage Next.js proxy
};

const apiBase = getApiBase();

export async function saveDraft(payload: any) {
  const res = await fetch(`${apiBase}/api/saved-pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to save draft');
  return res.json();
}

export async function getDrafts() {
  try {
    const res = await fetch(`${apiBase}/api/saved-pages`);
    if (!res.ok) throw new Error('Failed to fetch drafts');
    return res.json();
  } catch (error) {
    console.error("Error fetching drafts. Is the backend server running? Run 'npm run server' in the src directory.", error);
    throw error;
  }
}

export async function getDraftById(id: string) {
  const res = await fetch(`${apiBase}/api/saved-pages/${id}`);
  if (!res.ok) throw new Error('Failed to fetch draft');
  return res.json();
}

export async function deleteDraft(id: string) {
  const res = await fetch(`${apiBase}/api/saved-pages/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete draft');
  return res.json();
}
