import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null
        };
        this.editorDidMount = this.editorDidMount.bind(this);
    }
    editorDidMount(editor, monaco) {
        editor.focus();
        this.setState({
            editor,
        });
    }
    get model() {
        return this.state.editor.getModel();
    }
    render() {
        const {
            onChange,
            width = 800,
            height = 600,
            language = 'text',
            theme = 'vs-dark',
            defaultValue,
            value,
        } = this.props;

        const options = {
            selectOnLineNumbers: true,
        };
        return (
            <MonacoEditor
                width={width}
                height={height}
                language={language}
                theme={theme}
                value={value}
                defaultValue={defaultValue}
                options={options}
                onChange={onChange}
                editorDidMount={this.editorDidMount}
            />
        );
    }
}
