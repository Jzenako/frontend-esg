import Upload from "../components/Upload/Upload";

export default function UploadPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      {/* 页面标题 */}
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        文件上传中心
      </h1>

      {/* 上传组件 */}
      <Upload />

      {/* 说明文字 */}
      <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
        ⚠️ 请上传 PDF / DOC / DOCX 格式文件（单个 ≤ 20MB）。
      </p>
    </div>
  );
}
