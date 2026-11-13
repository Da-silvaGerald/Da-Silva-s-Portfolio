import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  const location = useLocation();

  return (
    <main id="main-content" className="notfound-page">
      <div className="console-container">
        <div className="notfound-box">
          <div className="notfound-box__bar">
            <span>ERR_CODE // 404_ROUTE_UNRESOLVED</span>
            <span>STATUS: TERMINATED</span>
          </div>

          <h1 className="notfound-box__title">404 // Target Dossier Not Found</h1>

          <p className="notfound-box__desc">
            The requested path <code>{location.pathname}</code> does not match any active node in My
            Portfolio: Da-Silva Oluwasegun.
          </p>

          <div className="notfound-box__actions">
            <Link to="/" className="btn-console btn-console--primary">
              ← Return to Home Console (/)
            </Link>
            <Link to="/projects/udemy-50-projects" className="btn-console">
              Inspect Primary Case Study (PRJ-001)
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
