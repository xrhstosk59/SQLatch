import { AppProps } from 'next/app';
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SQLiteProvider } from '../contexts/SQLiteContext';
import { BlocklyProvider } from '../contexts/BlocklyContext';
import { QueryHistoryProvider } from '../contexts/QueryHistoryContext';
import { AutoSaveProvider } from '../contexts/AutoSaveContext';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SQLiteProvider>
            <BlocklyProvider>
                <AutoSaveProvider>
                    <QueryHistoryProvider>
                        <Component {...pageProps} />
                    </QueryHistoryProvider>
                </AutoSaveProvider>
            </BlocklyProvider>
        </SQLiteProvider>
    );
}
