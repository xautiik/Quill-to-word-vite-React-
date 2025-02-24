import { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';

const App = () => {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (window.Quill && quillRef.current) {
      quillInstance.current = new window.Quill(quillRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  const exportToWord = async () => {
    if (!quillInstance.current) return;
    const delta = quillInstance.current.getContents();
    const config = { exportAs: 'blob' };
    const blob = await quillToWord.generateWord(delta, config);
    saveAs(blob, 'exported-document.docx');
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Vite + React - Quill to DOCX Export</h2>
      <div ref={quillRef} style={{ height: '300px' }}></div>
      <button
        onClick={exportToWord}
        style={{
          marginTop: '15px',
          padding: '10px 15px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Export to DOCX
      </button>
    </div>
  );
};

export default App;
