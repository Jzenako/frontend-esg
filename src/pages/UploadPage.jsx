export default function UploadPage() {
  return (
    <div className="page">
      <h2>Upload</h2>
      <p>这里将实现文件上传功能（PDF/DOCX）。暂时先做占位。</p>
      <input type="file" accept=".pdf,.doc,.docx" />
      <button disabled>上传（占位）</button>
    </div>
  );
}