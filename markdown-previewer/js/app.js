
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

class Editor extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='editor'>
        <Header name='Editor' />
        <textarea
          rows="15" cols="115" onChange={this.props.handleChange}
          value={this.props.textArea}
        />
      </div>
  );
  }
}

class Previewer extends React.Component {

   constructor(props) {
     super(props);
   }

   render() {

     const markup = this.props.input.split('\n');
     const boldRegex = /\*\*/;
     const crossOutRegex = /~~/;
     const linksRegex = /\[links\]/;
     const singleTicksRegex = /(?<!`)`{1}(?!`)/;
     const multiTicksRegex = /^`{3}/gim;
     let items = [];

     for (let i = 0; i < markup.length; i++) {

        if (markup[i].startsWith('# ')) {
          items.push(<h1 style={{borderBottom: "solid black 3px"}}>{markup[i].split('# ')[1]}</h1>);
        }
        else if(markup[i].startsWith('## ')) {
            items.push(<h2 style={{borderBottom: "solid black 3px"}}>{markup[i].split('## ')[1]}</h2>);
        }
        else if(markup[i].startsWith('### ')) {
          items.push(<h3 style={{paddingTop: 20}}>{markup[i].split('## ')[1]}</h3>);
        }
        else if(markup[i] == ""){
          items.push(<br />)
        }
        else if(boldRegex.test(markup[i])) {
          let word = markup[i].split('**');
          let text = <p>
                      {word[0]}
                      <span style={{fontWeight: "bold"}}>{word[1].replace(/_/g,'')}</span>
                      {word.slice(2)}
                    </p>;
          items.push(text);
        } else if(crossOutRegex.test(markup[i])) {
          let word = markup[i].split('~~');
          let text = <p>
                      {word[0]}
                      <span style={{textDecoration: "line-through"}}>{word[1].replace(/~/g,'')}</span>
                      {word.slice(2)}
                    </p>;
          items.push(text);
        } else if(linksRegex.test(markup[i])) {
            let word = markup[i].split('[links]');
            /* parsing the url from the string */
            let linkLoc = word[1].slice(word[1].indexOf('https'), word[1].indexOf(')'));
            /* parsing remaining text from the given line */
            let lastWord = word[1].split(')').slice(1);
            let text =
                  <div>
                      <p>
                        {word[0]}
                        <a href={linkLoc} target="_blank">[links]</a>
                        {lastWord}
                       </p>
                  </div>
            items.push(text);
        } else if(singleTicksRegex.test(markup[i])) {
          let word = markup[i].split('`');
          let text = <p>
                  {word[0]}
                  <span style={{ backgroundColor: "white"}}>{word[1]}</span>
                  {word.slice(2)}
                 </p>
          items.push(text);
        } else if (multiTicksRegex.test(markup[i])) {
            let text = <span style={{ display: "block", whiteSpace: "pre", backgroundColor: "white"}}>{markup[i]}</span>
            items.push(text);
        }
        else {
          items.push(<p style={{whiteSpace: "pre"}}>{markup[i]}</p>);
        }
      }

      return (

         <div className='previewer'>
           <Header name='Previewer'/>
           {items}
         </div>
       );
   }
 }


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     inputValue: this.props.textArea
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
      this.setState({
        inputValue: event.target.value
   });
  }

  render() {

    return (
      <div>
        <div>
          <Editor textArea={this.state.inputValue} handleChange={this.handleChange} />
        </div>
        <div>
          <Previewer input={this.state.inputValue}/>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
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

ReactDOM.render(
  <App />,
  domContainer
);
