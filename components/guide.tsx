import styles from '../styles/guide.module.css';
import showdown from "showdown";
import parse from 'html-react-parser';
import {readFileSync} from "fs";

export default function Guide() {
    var converter = new showdown.Converter();
    var md = fs.readFileSync(process.cwd() + '/MDGuides/test.md', {encoding: 'utf-8',});
    let html = converter.makeHtml(md);


    var out = parse(html);
   
    return (
        <div className={styles.container}>
            {out}
        </div>
    )
}