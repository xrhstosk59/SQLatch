import styles from '../styles/guide.module.css';
import showdown from "showdown";

export default function Guide() {
    var converter = new showdown.Converter();
    var md = '[**Showdown**](http://www.showdownjs.com) is *great*\n' +
         'because:\n\n' +
         ' - it\'s easy to use\n' +
         ' - it\'s extensible\n' +
         ' - works in the server and in the browser';
    let html = converter.makeHtml(md);

    const parse = require('html-react-parser');
    var out = parse(html); // React.createElement('p', {}, 'Hello, World!')
   
    return (
        <div className={styles.container}>
            {out}
        </div>
    )
}