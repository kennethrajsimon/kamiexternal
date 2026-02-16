const apiBase = '';

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
  const res = await fetch(`${apiBase}/api/saved-pages`);
  if (!res.ok) throw new Error('Failed to fetch drafts');
  return res.json();
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

export async function likePage(id: string) {
  const res = await fetch(`${apiBase}/api/pages/${id}/like`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to like page');
  return res.json();
}

export async function sharePage(id: string) {
  const res = await fetch(`${apiBase}/api/pages/${id}/share`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to share page');
  return res.json();
}

export async function getKamiProducts(pageNumber = 1, pageSize = 100, category?: string) {
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    pageNumber: String(pageNumber)
  });
  if (category && category.trim()) {
    params.set('cat', category.trim());
  }
  const res = await fetch(`https://api.kamiunlimited.com/content-management-service/products?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'BEARER eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..7rl064gd8TLl-4ouT6v18g.1rPuUNOF5r29_5MxCWl_ItIlHlzdkDR9xj-w2mM_q9-uPwglew2ocCitOMRavuske__SVNLFR6bZxKwIrfvdN60kT6cZUThOEfWCmrcitOM.n9R5AP-5PZ3aEeUxw4OQtA'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch Kami products');
  return res.json();
}

export async function getProductSets() {
  const res = await fetch(`${apiBase}/api/product-sets`);
  if (!res.ok) throw new Error('Failed to fetch product sets');
  return res.json();
}

export async function saveProductSet(payload: any) {
  const res = await fetch(`${apiBase}/api/product-sets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to save product set');
  return res.json();
}

export async function deleteProductSet(id: string) {
  const res = await fetch(`${apiBase}/api/product-sets/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product set');
  return res.json();
}

export async function getRecommendedArticleSets() {
  const res = await fetch(`${apiBase}/api/recommended-article-sets`);
  if (!res.ok) throw new Error('Failed to fetch recommended article sets');
  return res.json();
}

export async function saveRecommendedArticleSet(payload: any) {
  const res = await fetch(`${apiBase}/api/recommended-article-sets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to save recommended article set');
  return res.json();
}

export async function deleteRecommendedArticleSet(id: string) {
  const res = await fetch(`${apiBase}/api/recommended-article-sets/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete recommended article set');
  return res.json();
}

export async function setActiveRecommendedArticleSet(id: string) {
  const res = await fetch(`${apiBase}/api/recommended-article-sets/${id}/active`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to set active recommended article set');
  return res.json();
}
