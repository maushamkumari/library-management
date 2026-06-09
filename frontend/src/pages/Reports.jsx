export default function Reports() {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Reports</h2>
        <span>Download backend-generated exports.</span>
      </div>
      <div className="report-actions">
        <a href="http://localhost:8080/reports/books.pdf">Book PDF</a>
        <a href="http://localhost:8080/reports/books.xlsx">Book Excel</a>
      </div>
    </section>
  );
}
