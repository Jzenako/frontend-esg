import { useState } from "react";
import axios from "axios";
import UploadItem from "./UploadItem";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 选择文件
  function handlePick(e) {
    const picked = Array.from(e.target.files || []);
    const accepted = [];

    picked.forEach((f) => {
      if (!/\.(pdf|docx?)$/i.test(f.name)) {
        alert(`${f.name} 格式不支持，仅限 PDF/DOC/DOCX`);
        return;
      }
      if (f.size > 20 * 1024 * 1024) {
        alert(`${f.name} 超过 20MB`);
        return;
      }
      accepted.push({
        id: Date.now() + Math.random(), // 临时 id
        name: f.name,
        size: f.size,
        status: "待上传",
      });
    });

    setFiles([...files, ...accepted]);
  }

  // 删除文件
  function handleDelete(id) {
    setFiles(files.filter((f) => f.id !== id));
  }

  // 真正上传（调用 json-server）
  async function handleUpload() {
    if (!files.length) return;
    setLoading(true);

    try {
      const uploaded = [];
      for (const f of files) {
        const res = await axios.post("http://localhost:4000/files", {
          name: f.name,
          size: f.size,
          status: "processing",
        });
        uploaded.push({ ...res.data, status: "已上传" });
      }
      setFiles(uploaded);
      alert("文件已上传到 mock server ✅");
    } catch (err) {
      console.error(err);
      alert("上传失败，请检查 mock server 是否启动");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>上传文件</h2>
      <p className="helper">仅支持 PDF/DOC/DOCX，单个文件 ≤ 20MB</p>

      <div className="row">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={handlePick}
        />
        <button
          className="btn primary"
          disabled={!files.length || loading}
          onClick={handleUpload}
        >
          {loading ? "上传中..." : "上传"}
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {files.length ? (
          files.map((f) => (
            <UploadItem
              key={f.id}
              file={f}
              onDelete={() => handleDelete(f.id)}
            />
          ))
        ) : (
          <p className="helper">暂无文件</p>
        )}
      </div>
    </div>
  );
}