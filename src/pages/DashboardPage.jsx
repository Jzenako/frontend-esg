import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  // 获取文件列表
  async function fetchFiles() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/files");
      setFiles(res.data);
      
      // 检查是否有需要处理状态的文件
      res.data.forEach(file => {
        if (file.status === "processing" && !processingIds.has(file.id)) {
          // 添加到处理中集合
          setProcessingIds(prev => new Set(prev).add(file.id));
          // 模拟处理过程
          simulateProcessing(file.id);
        }
      });
    } catch (err) {
      console.error(err);
      alert("获取文件列表失败，请确认 mock server 已启动");
    } finally {
      setLoading(false);
    }
  }

  // 模拟文件处理过程
  async function simulateProcessing(fileId) {
    // 随机处理时间（3-8秒）
    const processTime = 3000 + Math.random() * 5000;
    
    setTimeout(async () => {
      try {
        // 更新文件状态为 "done"
        await axios.patch(`http://localhost:4000/files/${fileId}`, {
          status: "done"
        });
        
        // 更新本地状态
        setFiles(prevFiles => 
          prevFiles.map(file => 
            file.id === fileId ? {...file, status: "done"} : file
          )
        );
        
        // 从处理中集合移除
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      } catch (err) {
        console.error("更新文件状态失败:", err);
      }
    }, processTime);
  }

  // 删除文件
  async function handleDelete(id) {
    if (!window.confirm("确定要删除该文件吗？")) return;
    try {
      await axios.delete(`http://localhost:4000/files/${id}`);
      fetchFiles(); // 删除后刷新列表
    } catch (err) {
      console.error(err);
      alert("删除失败");
    }
  }

  // 页面加载时获取一次
  useEffect(() => {
    fetchFiles();
  }, []);

  // 状态样式映射
  const statusStyles = {
    processing: {
      color: "#f59e0b",
      backgroundColor: "#fffbeb",
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold"
    },
    done: {
      color: "#10b981",
      backgroundColor: "#ecfdf5",
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold"
    },
    error: {
      color: "#ef4444",
      backgroundColor: "#fef2f2",
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold"
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        已上传的文件列表 Dashboard
      </h1>

      {/* 刷新按钮 */}
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <button className="btn" onClick={fetchFiles} disabled={loading}>
          {loading ? "加载中..." : "刷新"}
        </button>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : files.length === 0 ? (
        <p>暂无文件，请先上传</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f9fafb" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>文件名</th>
              <th style={thStyle}>大小 (MB)</th>
              <th style={thStyle}>状态</th>
              <th style={thStyle}>操作</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.id}>
                <td style={tdStyle}>{f.id}</td>
                <td style={tdStyle}>{f.name}</td>
                <td style={tdStyle}>
                  {(f.size / 1024 / 1024).toFixed(2)}
                </td>
                <td style={tdStyle}>
                  <span style={statusStyles[f.status] || {}}>
                    {f.status === "processing" ? "处理中..." : f.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button
                    className="btn"
                    onClick={() => handleDelete(f.id)}
                    disabled={f.status === "processing"}
                  >
                    {f.status === "processing" ? "⏳ 处理中" : "❌ 删除"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};