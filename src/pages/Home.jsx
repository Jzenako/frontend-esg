import logo from '../assets/logo.png';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      {/* Logo 居中 */}
      <img 
        src={logo} 
        alt="ESG Logo" 
        style={{ width: '150px', marginBottom: '20px' }} 
      />

      {/* 标题 */}
      <h1>Hello AI-ESG Rating </h1>

      {/* 介绍文本（手动换行） */}
      <p>
        这是 ESG 自主评级系统。<br />
        点击上方导航栏进入 <strong>Upload</strong> 上传企业资料用于评级，<br />
        或 <strong>Dashboard</strong> 查看评级结果。
      </p>
    </div>
  );
}
