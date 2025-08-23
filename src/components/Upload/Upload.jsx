import { useState } from "react";
import axios from "axios";
import UploadItem from "./UploadItem";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 选择文件
  function handlePick(e) {
    const picked = Array.from(e.target.files || []);
    const accepted = [];
    const errors = [];

    picked.forEach((f) => {
      // 校验文件格式
      if (!/\.(pdf|docx?)$/i.test(f.name)) {
        errors.push(`${f.name} 格式不支持，仅限 PDF/DOC/DOCX`);
        return;
      }
      
      // 校验文件大小
      if (f.size > 20 * 1024 * 1024) {
        errors.push(`${f.name} 超过 20MB 限制`);
        return;
      }
      
      // 检查是否已存在同名文件
      if (files.some(existingFile => existingFile.name === f.name)) {
        errors.push(`${f.name} 已存在文件列表中`);
        return;
      }
      
      accepted.push({
        id: Date.now() + Math.random(), // 临时 id
        name: f.name,
        size: f.size,
        type: getFileType(f.name),
        status: "pending", // 待上传状态
        rawFile: f // 保留原始文件对象用于后续上传
      });
    });

    // 显示错误信息
    if (errors.length > 0) {
      setError(errors.join("; "));
      setTimeout(() => setError(null), 5000); // 5秒后清除错误
    }
    
    // 添加有效文件到列表
    if (accepted.length > 0) {
      setFiles([...files, ...accepted]);
    }
    
    // 清空input值，允许选择相同文件再次触发onChange
    e.target.value = null;
  }

  // 根据文件名获取文件类型
  function getFileType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const typeMap = {
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return typeMap[extension] || 'application/octet-stream';
  }

  // 删除文件
  function handleDelete(id) {
    setFiles(files.filter((f) => f.id !== id));
  }

  // 上传文件到 mock server
  async function handleUpload() {
    if (!files.length) return;
    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        try {
          // 更新文件状态为上传中
          setFiles(prev => prev.map(f => 
            f.id === file.id ? {...f, status: "uploading"} : f
          ));
          
          // 调用 POST /files 接口
          const res = await axios.post("http://localhost:4000/files", {
            name: file.name,
            size: file.size,
            type: file.type,
            status: "processing", // 后端处理中状态
            uploadDate: new Date().toISOString()
          });
          
          // 更新文件状态为已上传
          return {
            ...file,
            id: res.data.id, // 使用服务器返回的真实ID
            status: "uploaded",
            serverId: res.data.id
          };
        } catch (err) {
          // 更新文件状态为上传失败
          console.error(`文件 ${file.name} 上传失败:`, err);
          return {
            ...file,
            status: "error",
            error: err.message
          };
        }
      });

      // 等待所有文件上传完成
      const results = await Promise.all(uploadPromises);
      setFiles(results);
      
      // 检查是否有上传失败的文件
      const failedUploads = results.filter(f => f.status === "error");
      if (failedUploads.length > 0) {
        setError(`${failedUploads.length} 个文件上传失败，请检查控制台获取详情`);
      } else {
        alert("所有文件已成功上传到服务器! ✅");
      }
    } catch (err) {
      console.error("上传过程发生错误:", err);
      setError("上传失败，请检查服务器连接: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // 计算已选择文件的总大小
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="upload-container">
      <h2>上传 ESG 报告文件</h2>
      <p className="helper-text">
        支持格式: PDF, DOC, DOCX | 单个文件 ≤ 20MB
      </p>

      {/* 错误提示 */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* 文件选择和上传按钮 */}
      <div className="upload-controls">
        <label className="file-input-label">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handlePick}
            disabled={loading}
          />
        </label>
        
        <button
          className={`upload-button ${loading ? 'loading' : ''}`}
          disabled={!files.length || loading}
          onClick={handleUpload}
        >
          {loading ? (
            <><span className="spinner"></span> 上传中...</>
          ) : (
            `上传 (${files.length} 个文件, ${totalSizeMB} MB)`
          )}
        </button>
      </div>

      {/* 文件列表 */}
      <div className="files-list">
        {files.length > 0 ? (
          <>
            <div className="files-header">
              <span>文件名</span>
              <span>大小</span>
              <span>状态</span>
              <span>操作</span>
            </div>
            {files.map((file) => (
              <UploadItem
                key={file.id}
                file={file}
                onDelete={() => handleDelete(file.id)}
                disabled={loading}
              />
            ))}
          </>
        ) : (
          <p className="no-files">暂无待上传文件</p>
        )}
      </div>
    </div>
  );
}