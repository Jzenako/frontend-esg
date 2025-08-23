export default function UploadItem({ file, onDelete }) {
  return (
    <div
      className="row"
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "8px 12px",
        marginBottom: "8px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong>{file.name}</strong>
        <div className="helper">
          {(file.size / 1024 / 1024).toFixed(2)} MB · {file.status}
        </div>
      </div>
      <button className="btn" onClick={onDelete}>
        ❌ 删除
      </button>
    </div>
  );
}