import { FuturisticLoginForm } from "@/components/marketing/FuturisticLoginForm";

export default function FuturisticLoginFormPage() {
  return (
    <>
      <FuturisticLoginForm />
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <a 
          href="https://codepen.io/bsepiolo" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: '#70719C', 
            textDecoration: 'underline',
            fontSize: '12px',
            fontFamily: 'Tomorrow, sans-serif'
          }}
        >
          Source: codepen.io/bsepiolo
        </a>
      </div>
    </>
  );
}
