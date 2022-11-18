import { Input, InputGroup, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppState } from "../../lib/store";

interface Props {
  onCreate?: () => void;
}

export function NewPerson({ onCreate }: Props) {
  const { diagramId } = useParams<{ diagramId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ name: string }>({
    defaultValues: {
      name: ""
    }
  });
  const { addPerson, addDiagramPerson } = useAppState();
  const onSubmit = handleSubmit(({ name }) => {
    const personId = Date.now().toString();
    if (diagramId) {
      addPerson(name, personId);
      addDiagramPerson({ diagramId, personId });
      onCreate?.();
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <InputGroup size="sm">
        <Input {...register("name")} placeholder="Diagram Name" />
        {errors?.name && <p>{errors.name.message}</p>}

        <Button ml="1" type="submit">
          +
        </Button>
      </InputGroup>
    </form>
  );
}
