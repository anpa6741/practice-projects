
const domContainer = document.getElementById('container');

class Header extends React.Component {
  render() {
    return (
        <header>
          <div className="header-left">
            (<i className="fa fa-fire">)</i>
            <h1>{this.props.name}</h1>
          </div>
          <div className="header-right">
            <a><i className="fa fa-window-maximize style-icon"></i></a>
          </div>
        </header>
    );
  }
}

class TextArea extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      textArea: this.props.textArea
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
      console.log("Handle Change");
      this.setState({
        textArea: event.target.value
      });
  }

  render() {
    return (
      <textarea
        rows="15" cols="115" onChange={this.handleChange}
        value={this.state.textArea}
      />
  );
  }
}

TextArea.defaultProps = {
   textArea: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
 }


class Editor extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='editor box-layout'>
        <Header name='Editor'/>
        <TextArea/>
      </div>
    );
  }
}

class Previewer extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='previewer box-layout'>
        <Header name='Previewer'/>
      </div>
    );
  }
}


const App = (
  <div>
    <Editor />
    <Previewer />
  </div>
);

ReactDOM.render(
  App,
  domContainer
);
