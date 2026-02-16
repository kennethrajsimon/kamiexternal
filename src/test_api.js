// const fetch = require('node-fetch'); 
// Node 18+ has global fetch

const API_BASE = 'http://localhost:3001';

async function test() {
  console.log('--- Testing Kami API ---');
  try {
    const kamiRes = await fetch('https://api.kamiunlimited.com/content-management-service/products?pageSize=1&pageNumber=1', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'BEARER eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..7rl064gd8TLl-4ouT6v18g.1rPuUNOF5r29_5MxCWl_ItIlHlzdkDR9xj-w2mM_q9-uPwglew2ocCitOMRavuske__SVNLFR6bZxKwIrfvdN60kT6cZUThOEfWCmrcitOM.n9R5AP-5PZ3aEeUxw4OQtA'
      }
    });
    console.log('Kami API Status:', kamiRes.status);
    if (kamiRes.ok) console.log('Kami API: OK');
    else console.log('Kami API: Failed');
  } catch (e) {
    console.log('Kami API: Error', e.message);
  }

  console.log('--- Testing Backend API ---');
  const setId = 'test-set-' + Date.now();
  const payload = {
    id: setId,
    name: 'Test Set',
    products: [{ id: '1', name: 'Test Product', price: '$10.00', image: 'http://test.com/img.jpg' }],
    createdAt: new Date().toISOString()
  };

  try {
    // 1. Save
    const saveRes = await fetch(`${API_BASE}/api/product-sets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Save Set:', saveRes.status);
    
    // 2. List
    const listRes = await fetch(`${API_BASE}/api/product-sets`);
    const sets = await listRes.json();
    const found = sets.find(s => s.id === setId);
    console.log('List Sets:', found ? 'Found' : 'Not Found');

    // 3. Delete
    if (found) {
      const delRes = await fetch(`${API_BASE}/api/product-sets/${setId}`, { method: 'DELETE' });
      console.log('Delete Set:', delRes.status);
    }
  } catch (e) {
    console.log('Backend API: Error', e.message);
  }
}

test();
