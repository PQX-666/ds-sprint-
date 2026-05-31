interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export default function CodeBlock({ code, editable, onChange }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-card border border-cyber-border">
      <div className="bg-cyber-elevated flex items-center gap-2 px-4 py-2.5 border-b border-cyber-border">
        <span className="w-3 h-3 rounded-full bg-neon-red/70" />
        <span className="w-3 h-3 rounded-full bg-neon-yellow/70" />
        <span className="w-3 h-3 rounded-full bg-neon-green/70" />
      </div>
      <pre className="bg-code-bg text-code-text p-4 overflow-x-auto text-sm leading-relaxed font-mono m-0 rounded-t-none">
        {editable ? (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-transparent text-code-text outline-none resize-none font-mono text-sm"
            rows={code.split('\n').length}
            spellCheck={false}
          />
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
}
