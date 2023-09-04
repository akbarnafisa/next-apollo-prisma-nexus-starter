import { AnySchema, object, string } from "yup";
import { NexusGenInputs } from "../../generated/nexus";

export const userInputSchema = object<Record<keyof NexusGenInputs['UserInput'], AnySchema>>({
  name: string().trim().required('Name is required').max(5, 'Name is too long'),
});
