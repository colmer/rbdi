import { Editor, EditorState } from 'draft-js';

class RichEditor extends Component {
  state = { editor: false, editorState: null };

  componentDidMount() {
    this.setState({
      editor: true,
      editorState: EditorState.createEmpty(),
    });
  }

  render() {
    const { handleSubmit } = props;
    return (
      <div className="rich-editor">
        <Editor className="asd" editorState={editorState} placeholder="Пишем тут..." />
      </div>
    );
  }
}

export default RichEditor;
