import { useState, useEffect } from 'react';
import FRONTEND_CONFIG from './frontend_config';
import perplexityLogo from './assets/perplexity_code_review.png'; // Add the logo image to your public or src folder

function App() {
  const [code, setCode] = useState('');
  const [responseSections, setResponseSections] = useState({
    codeReview: '',
    bom: '',
    license: ''
  });
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState('perplexity_sonar');

  const [codeReview, setCodeReview] = useState(true);
  const [bom, setBom] = useState(false);
  const [licenseCheck, setLicenseCheck] = useState(false);

  useEffect(() => {
    if (!selected) {
      setSelected('perplexity_sonar');
    }
  }, [selected]);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setResponseSections({ codeReview: '', bom: '', license: '' });

    const requestPayload = {
      code,
      model: selected,
      tasks: {
        codeReview,
        bom,
        licenseCheck
      }
    };

    setHistory([...history, { prompt: code }]);

    try {
      const res = await fetch(`${FRONTEND_CONFIG.BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      const data = await res.json();
      if (data.response) {
        setResponseSections({
          codeReview: data.response.codeReview || '',
          bom: data.response.bom || '',
          license: data.response.license || ''
        });
      } else {
        setResponseSections({ codeReview: '', bom: '', license: '' });
      }
    } catch (err) {
      setResponseSections({ codeReview: 'Server error', bom: '', license: '' });
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        margin: '2rem auto',
        maxWidth: '900px',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
        background: '#f9f9f9',
        fontFamily: 'Segoe UI, sans-serif'
      }}
    >
      <head>
        <title>Code Review with Sonar</title>
      </head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <img src={perplexityLogo} alt="Perplexity Logo" style={{ width: '40px', marginRight: '10px' }} />
        <h2 style={{ color: '#202124' }}>Code Review with Sonar</h2>
      </div>

      <textarea
        rows={10}
        placeholder="Paste or type your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: '14px',
          borderRadius: '10px',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ccc',
          padding: '12px',
          marginBottom: '1rem',
          backgroundColor: '#fff'
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <label><input type="checkbox" checked={codeReview} onChange={() => setCodeReview(!codeReview)} /> Code Review</label>
        <label><input type="checkbox" checked={bom} onChange={() => setBom(!bom)} /> Bill of Materials</label>
        <label><input type="checkbox" checked={licenseCheck} onChange={() => setLicenseCheck(!licenseCheck)} /> License Check</label>
      </div>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '8px' }}
      >
        <option value="perplexity_sonar">perplexity_sonar</option>
        <option value="openai">openai</option>
        <option value="llama3">llama3</option>
        <option value="llama2">llama2</option>
        <option value="deepseek">deepseek</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '0.5rem',
          background: '#60a5fa',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Submit for Review
      </button>

      {(codeReview || bom || licenseCheck) && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>Review Response:</h3>

          {codeReview && (
            <div style={{ background: '#e8f0fe', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4>🔍 Code Review</h4>
              <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                {responseSections.codeReview.split(/(?=Improved Code)/i).map((section, index) => {
                  const isImproved = section.trim().toLowerCase().startsWith('improved code');
                  return (
                    <div
                      key={index}
                      style={{
                        background: isImproved ? '#fff8dc' : 'transparent',
                        padding: isImproved ? '0.5rem' : '0',
                        borderRadius: isImproved ? '6px' : '0',
                        marginBottom: isImproved ? '0.5rem' : '0'
                      }}
                    >
                      {section}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {bom && (
            <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4>📦 Bill of Materials</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{responseSections.bom}</pre>
            </div>
          )}

          {licenseCheck && (
            <div style={{ background: '#f3e5f5', padding: '1rem', borderRadius: '8px' }}>
              <h4>📜 License Information</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{responseSections.license}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
