interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export default function CodeBlock({ code, editable, onChange }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
      <div className="bg-gray-800 flex items-center gap-2 px-4 py-2.5">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
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
