import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../lib/store";

type FormValues = {
  name: string;
};

export function NewDiagram() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: ""
    }
  });
  const addDiagram = useAppState(({ addDiagram }) => addDiagram);
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    addDiagram(data.name);
    navigate("/");
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...register("name")} placeholder="Diagram Name" />
      {errors?.name && <p>{errors.name.message}</p>}

      <input type="submit" />
    </form>
  );
}
