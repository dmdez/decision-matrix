import { HStack, IconButton, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppState } from "../../lib/store";
import { AddIcon } from "@chakra-ui/icons";

type FormValues = {
  name: string;
};

export function NewDiagram() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });
  const addDiagram = useAppState(({ addDiagram }) => addDiagram);
  const onSubmit = handleSubmit((data) => {
    addDiagram(data.name);
    reset();
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <HStack>
          <Input {...register("name")} placeholder="Create New Name" />
          {errors?.name && <p>{errors.name.message}</p>}
          <IconButton
            aria-label="Submit"
            icon={<AddIcon />}
            variant="ghost"
            type="submit"
          >
            Save
          </IconButton>
        </HStack>
      </form>
    </>
  );
}
