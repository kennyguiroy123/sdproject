import '../styles/globals.css';
import { TaskStatusProvider } from '../context/taskStatusContext.js';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskStatusProvider>
      <Component {...pageProps} />
    </TaskStatusProvider>
  );
}

export default MyApp;


