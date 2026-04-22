import Card from '../../../shared/components/ui/Card';
import Button from '../../../shared/components/ui/Button';
import usePwaInstall from '../../../shared/hooks/usePwaInstall';

export default function InstallAppCard() {
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();

  if (isInstalled) {
    return null;
  }

  return (
    <Card>
      <div className="form-stack">
        <div>
          <h3 style={{ marginTop: 0 }}>Instalar app</h3>
          <p style={{ color: 'var(--muted)' }}>
            Instalá la app en tu dispositivo para una experiencia más rápida y
            parecida a una app nativa.
          </p>
        </div>

        {canInstall ? (
          <Button onClick={promptInstall}>Instalar aplicación</Button>
        ) : (
          <div className="alert alert-success">
            Si no aparece el botón de instalación, abrí el menú del navegador y
            elegí “Agregar a pantalla de inicio”.
          </div>
        )}
      </div>
    </Card>
  );
}