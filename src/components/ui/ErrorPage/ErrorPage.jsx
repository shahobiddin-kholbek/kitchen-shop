import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>{error.status}</h1>
    </div>
  );
}
