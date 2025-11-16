import React from 'react';
import { createRoot } from 'react-dom/client';
import TeamLanyards from './components/TeamLanyards.jsx';

console.log('🔍 Lanyard script loaded');

const el = document.getElementById('lanyard-root');
console.log('🔍 Mount element:', el);

if (el) {
  try {
    console.log('🚀 Creating React root...');
    el.innerHTML = '<p style="text-align:center;padding:20px;color:#0fe3b1;">React is mounting... Please wait.</p>';
    const root = createRoot(el);
    root.render(<TeamLanyards />);
    console.log('✅ Team lanyards rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering team lanyards:', error);
    el.innerHTML = '<p style="text-align:center;color:red;padding:20px;">Failed to load interactive cards: ' + error.message + '</p>';
  }
} else {
  console.error('⚠️ Lanyard mount point #lanyard-root not found in DOM');
  document.body.innerHTML += '<p style="position:fixed;bottom:0;left:0;background:red;color:white;padding:10px;z-index:9999;">ERROR: #lanyard-root not found</p>';
}