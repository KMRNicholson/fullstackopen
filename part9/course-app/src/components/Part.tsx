interface NullableProps {
  description?: string,
  backgroundMaterial?: string,
  groupProjectCount?: number,
  requirements?: string[],
}

interface PartProps extends NullableProps {
  name: string,
  exerciseCount: number,
}

interface StringContent {
  content: string
}

const Description = (props: StringContent) => <div><i>{props.content}</i></div>;

const ProjectCount = (props: StringContent) => <div>project exercises {props.content}</div>

const Background = (props: StringContent) => <div>submit to {props.content}</div>;

const Part = (props: PartProps) =>
  <div style={{paddingTop: 10}}>
    <b>
      {props.name} {props.exerciseCount}
    </b>
    {!props.description ? null : <Description content={props.description} />}
    {!props.groupProjectCount ? null : <ProjectCount content={`${props.groupProjectCount}`} />}
    {!props.backgroundMaterial ? null : <Background content={props.backgroundMaterial} />}
    {!props.requirements ? null : <div>required skills: {props.requirements.join(', ')}</div>}
  </div>

export default Part;