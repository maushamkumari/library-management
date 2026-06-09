export default function Profile() {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Profile</h2>
        <span>Student profile and account settings</span>
      </div>
      <div className="form-grid compact">
        <input placeholder="Full name" />
        <input placeholder="Email" />
        <input placeholder="Phone" />
        <button type="button">Update Profile</button>
      </div>
    </section>
  );
}
