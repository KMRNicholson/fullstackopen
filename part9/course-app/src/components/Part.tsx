interface PartProps {
  name: string,
  exerciseCount: number,
  description?: string,
  backgroundMaterial?: string,
  groupProjectCount?: number,
}

const Part = (props: PartProps) =>
  <p>
    {props.name} {props.exerciseCount} {props.description} {props.backgroundMaterial} {props.groupProjectCount}
  </p>

export default Part;