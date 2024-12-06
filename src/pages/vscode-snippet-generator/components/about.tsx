export default function About() {
  return (
    <div>
      <div>
        <h2 className="text-xl">About</h2>
      </div>
      <div className="mt-4">
        <div>
          <h3 className="font-semibold">Keyboard Shortcuts</h3>
          <div className="mt-3">
            <p>
              To declare a placeholder: <code>Ctrl + {'<NUMBER>'}</code>. For
              example, hit <code>Ctrl + 1</code> will insert{' '}
              <code>{'${1:valuable}'}</code>.
            </p>
            <p>
              To denotes the final cursor position: <code>Ctrl + 0</code>.
            </p>
            <p>
              To select the word under cursor: <code>Ctrl + D</code>.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Others</h3>
          <div className="mt-3">
            <p>
              To read more about snippets in VSCode, go to:{' '}
              <a
                href="https://code.visualstudio.com/docs/editor/userdefinedsnippets"
                target="_blank"
              >
                VSCode Doc
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
