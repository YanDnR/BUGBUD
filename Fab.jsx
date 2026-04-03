export default function Fab({ onClick }) {
  return (
    <div style={{
      background: 'var(--color-background-primary)',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 18px',
      borderTop: '0.5px solid var(--color-border-tertiary)',
      flexShrink: 0,
    }}>
      <button
        onClick={onClick}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          background: '#1D9E75',
          border: 'none',
          color: 'white',
          fontSize: 24,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '8px 0',
        }}
      >
        +
      </button>
    </div>
  );
}
