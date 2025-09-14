import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'Что-то пошло не так';
  let description = 'Произошла непредвиденная ошибка.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Страница не найдена';
      description = 'Мы не смогли найти такую страницу.';
    } else {
      title = `Ошибка ${error.status}`;
      description = error.statusText || description;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}


