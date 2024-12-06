import './app.css';

const ROUTES: string[] = ['favicon-generator', 'vscode-snippet-generator'];

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="header">
        <h1 className="text-3xl font-bold">Fish</h1>
        <p className="mt-2">A series of tiny apps.</p>
      </header>
      <div className="sites">
        {ROUTES.map((route) => (
          <a key={route} className="sites__item" href={route}>
            {route}
          </a>
        ))}
      </div>
      <footer className="footer mt-auto">
        <p>
          Source: <a href="https://github.com/ilenceye/fish">Github</a>
        </p>
      </footer>
    </div>
  );
}
