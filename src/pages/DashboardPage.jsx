export default function DashboardPage() {
  return (
    <div className="row">
      <section className="card" style={{ flex: '1 1 260px', minWidth: 260 }}>
        <h3>评分卡（占位）</h3>
        <p className="helper">E/S/G 分数与总分将显示在这里。</p>
        <div className="row">
          <div className="card" style={{ minWidth: 120 }}>
            <strong>E</strong>
            <div className="helper">72</div>
          </div>
          <div className="card" style={{ minWidth: 120 }}>
            <strong>S</strong>
            <div className="helper">65</div>
          </div>
          <div className="card" style={{ minWidth: 120 }}>
            <strong>G</strong>
            <div className="helper">80</div>
          </div>
        </div>
      </section>

      <section className="card" style={{ flex: '2 1 520px', minHeight: 260 }}>
        <h3>图表区域（占位）</h3>
        <div className="helper">后续用图表库渲染，这里先留容器。</div>
      </section>

      <section className="card" style={{ flex: '1 1 260px', minWidth: 260 }}>
        <h3>证据列表（占位）</h3>
        <ul className="helper">
          <li>E：碳排放措施 …</li>
          <li>G：独立董事会 …</li>
        </ul>
      </section>
    </div>
  );
}
