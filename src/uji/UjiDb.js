const client = require('@supabase/supabase-js');

const supabaseUrl = 'https://vnbswqzgchmarttcvdmx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYnN3cXpnY2htYXJ0dGN2ZG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNzEzODksImV4cCI6MjAzNzY0NzM4OX0.vCMcnHJSS0JeuK-Zpn-DJH1urYUC_gTzpLs5h_AxO8g';
const supa = client.createClient(supabaseUrl, supabaseKey);

// Mengambil Data Pelanggan
const getPelangganById = async (id_pelanggan) => {
  const { data, error } = await supa
    .from('pelanggan')
    .select('*')
    .eq('id_pelanggan', id_pelanggan);

  if (error) {
    console.error('Error fetching data:', error);
    return null;
  }

  return data;
};

getPelangganById(1).then((data) => {
  console.log('Get Pelanggan :', data);
});

// Mengambil Data Penggunaan Bulanan
const getPenggunaanByBulan = async (id_pelanggan, bulan, tahun) => {
  const { data, error } = await supa
    .from('penggunaan')
    .select('*')
    .eq('id_pelanggan', id_pelanggan)
    .eq('bulan', bulan)
    .eq('tahun', tahun);

  if (error) {
    console.error('Error fetching data:', error);
    return null;
  }

  return data;
};
getPenggunaanByBulan(1, 'Januari', '2023').then((data) => {
    console.log('Get Penggunaan : ', data);
});