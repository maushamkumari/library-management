import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <main className="auth-page">
      <form className="auth-panel">
        <h1>Student Registration</h1>
        <input placeholder="Full name" required />
        <input type="email" placeholder="Email" required />
        <input placeholder="Phone" />
        <input placeholder="Enrollment number" required />
        <input placeholder="Department" />
        <input placeholder="Semester" />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm password" required />
        <button type="button">Register</button>
        <Link to="/login">Back to login</Link>
      </form>
    </main>
  );
}
