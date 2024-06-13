import { DeleteIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableTextarea,
  EditablePreview,
  IconButton,
  Input,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppState } from "../../lib/store";
interface Props {
  taskId: string;
  diagramId?: string;
  defaultValue?: string;
}
export function ManageTask({ taskId, defaultValue, diagramId }: Props) {
  const { control, watch } = useForm();
  const hoverBackground = useColorModeValue("gray.100", "gray.700");
  const updateDiagramTaskName = useAppState(
    ({ updateDiagramTaskName }) => updateDiagramTaskName
  );
  const handleUpdate = useCallback(
    (name: string) => {
      if (diagramId) {
        updateDiagramTaskName({
          name,
          taskId,
          diagramId,
        });
      }
    },
    [diagramId, taskId, updateDiagramTaskName]
  );

  useEffect(() => {
    const subscription = watch(
      debounce(({ task }) => handleUpdate(task), 1000)
    );
    return () => subscription.unsubscribe();
  }, [watch, handleUpdate]);

  return (
    <form>
      <Controller
        name="task"
        defaultValue={defaultValue}
        control={control}
        render={(controlProps) => (
          <>
            <Editable
              textAlign="left"
              isPreviewFocusable={true}
              selectAllOnFocus={true}
              value={controlProps.field.value}
              placeholder="Assign Task..."
            >
              {({ isEditing, onCancel }) => (
                <>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <IconButton
                      size="xs"
                      aria-label="Cancel"
                      icon={<DeleteIcon />}
                      onClick={onCancel}
                    />
                  </Box>

                  <EditablePreview
                    noOfLines={3}
                    minHeight="12"
                    _placeholder={{
                      color: "red",
                    }}
                    _empty={{
                      background: "red",
                    }}
                    color={
                      controlProps.field.value
                        ? "inherit"
                        : "chakra-placeholder-color"
                    }
                    // _hover={{
                    //   background: hoverBackground,
                    // }}
                  />
                  <Input
                    as={EditableTextarea}
                    rows={14}
                    cols={10}
                    wrap="soft"
                    height="52px"
                    p="0"
                    {...controlProps.field}
                  />
                </>
              )}
            </Editable>
          </>
        )}
      />
    </form>
  );
}
