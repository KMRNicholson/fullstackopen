import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  part: CoursePart
}

const Content = (props: ContentProps) => {
  const part = props.part;
  switch (part.kind) {
    case "basic":
      return <Part
        name={part.name}
        exerciseCount={part.exerciseCount}
        description={part.description}
      />
    
    case "group":
      return <Part
        name={part.name}
        exerciseCount={part.exerciseCount}
        groupProjectCount={part.groupProjectCount}
      />
    
    case "background":
      return <Part
        name={part.name}
        exerciseCount={part.exerciseCount}
        description={part.description}
        backgroundMaterial={part.backgroundMaterial}
      />
    
    case "special":
      return <Part
        name={part.name}
        exerciseCount={part.exerciseCount}
        description={part.description}
        requirements={part.requirements}
      />
  
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Content;