import { Link } from "react-router-dom";
import { Matrix } from "../../components/Matrix";

export function Diagram() {
  return (
    <>
      <Link to="/">Back</Link>
      <Matrix />
    </>
  );
}
