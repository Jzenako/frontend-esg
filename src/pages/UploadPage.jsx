import { useState } from 'react';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);

  function onPick(e) {
    const list = Array.from(e.target.files || []);
    // 仅演示：前端校验类型与大小
    const accepted = list.filter(
      (f) => /\.(pdf|docx?|PDF|DOCX?)$/.test(f.name) && f.size <= 20 * 1024 * 1024
    );
    setFiles(accepted);
  }

  async function onFakeUpload() {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800)); // 模拟上传
    setBusy(false);
    alert('模拟上传完成（Day 3 仅做静态演示）');
  }

  return (
    <div className="card">
      <h2>Upload</h2>
      <p className="helper">允许 PDF / DOC / DOCX，单文件 ≤ 20MB（仅示意）。</p>

      <div className="row">
        <input type="file" multiple accept=".pdf,.doc,.docx" onChange={onPick} />
        <button className="btn primary" onClick={onFakeUpload} disabled={!files.length || busy}>
          {busy ? '上传中…' : '上传（模拟）'}
        </button>
        <button className="btn" onClick={() => setFiles([])} disabled={!files.length || busy}>
          清空
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>文件名</th>
              <th>大小</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {files.length ? (
              files.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.name}</td>
                  <td>{(f.size / 1024 / 1024).toFixed(2)} MB</td>
                  <td>
                    <span className="helper">待上传</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="helper">
                  暂无文件
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
